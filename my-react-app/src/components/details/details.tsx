import './details.scss';
import { useState, useEffect, useRef } from 'react';
import { Dictionary, ResponseData } from '../../models/response.model';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';

interface OutletContext {
  itemUrl: string;
  domainUrl: string;
}

export default function Details() {
  const ref = useRef<HTMLDivElement>(null);
  const [detailsInfo, setDetailsInfo] = useState<string[][] | null>();
  const [isLoading, setLoader] = useState(false);
  const { itemUrl, domainUrl }: OutletContext = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!itemUrl) {
      return;
    }

    (function getData() {
      setLoader(true);
      fetch(itemUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ResponseData<Dictionary<string | string[]>>) => {
          formatData(data);
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
          setDetailsInfo(null);
        });
    })();
  }, [itemUrl]);

  function formatData(data: ResponseData<Dictionary<string | string[]>>) {
    const info = Object.entries(data);
    setDetailsInfo(info);
  }

  function handleClickOutside() {
    const el = ref?.current;
    if (!el || el.contains(event!.target as Node)) {
      return;
    }
    navigate(domainUrl);
  }

  return (
    <div className="outside-area" onClick={handleClickOutside}>
      <div className="details__wrapper" ref={ref}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <NavLink to={domainUrl}>
              <span className="close-btn"> X </span>
            </NavLink>
            <p className="info">
              {detailsInfo?.map(
                (el, idx) =>
                  typeof el[1] === 'string' && (
                    <span key={idx}>
                      <strong>{`${el[0].split('_').join(' ')}: `}</strong>
                      {`${el[1]}`}
                    </span>
                  )
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

import './details.scss';
import { useState, useEffect, useRef } from 'react';
import { Dictionary, ResponseData } from '../../models/response.model';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';

interface OutletContext {
  detailsUrl: string;
}

function formatData(
  data: ResponseData<Dictionary<string | string[]>>
): Array<string[]> {
  return Object.entries(data);
}

function handleClickOutside(ref: React.RefObject<HTMLDivElement>): boolean {
  const el = ref?.current;
  if (!el || el.contains(event!.target as Node)) {
    return false;
  }
  return true;
}

export default function Details() {
  const ref = useRef<HTMLDivElement>(null);
  const [backUrl, setBack] = useState('');
  const [detailsInfo, setDetailsInfo] = useState([['']]);
  const [isLoading, setLoader] = useState(false);
  const value: OutletContext = useOutletContext();
  const urlArr = value ? value.detailsUrl.split('/') : [];
  const navigate = useNavigate();

  useEffect(() => {
    const url = value ? value?.detailsUrl : '';
    if (!url) {
      navigate('/');
    }

    setBack('/' + urlArr[urlArr.length - 3]);

    const getData = () => {
      setLoader(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ResponseData<Dictionary<string | string[]>>) => {
          setDetailsInfo(formatData(data));
          setLoader(false);
        });
    };

    getData();
  }, [value]);

  return (
    <div
      className="outside-area"
      onClick={() => (handleClickOutside(ref) ? navigate(backUrl) : null)}
    >
      <div className="details__wrapper" ref={ref}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <NavLink to={backUrl}>
              <span className="close-btn"> X </span>
            </NavLink>
            <p className="info">
              {detailsInfo.map(
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

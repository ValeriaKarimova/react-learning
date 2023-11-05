import './details.scss';
import { useState, useEffect } from 'react';
import {
  Dictionary,
  ResponseData
} from '../../models/response.model';
import { useOutletContext, NavLink } from 'react-router-dom';
import Loader from '../loader/loader';

export default function Details() {
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [isLoading, setLoader] = useState(false);
  //   const context = useContext(SearchContext)?.searchContext;
  const value = useOutletContext();
  const urlArr = value ? value.detailsUrl.split('/') : [];
  const backUrl = "/" + urlArr[urlArr.length - 3];

  useEffect(() => {
    const url = value ? value?.detailsUrl : '';
    (function getData() {
        setLoader(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ResponseData<Dictionary<string | string[]>>) => {
          formatData(data);
            setLoader(false);
        });
    })();
  }, [value]);

  function formatData(data: ResponseData<Dictionary<string | string[]>>) {
    const info = Object.entries(data);
    setDetailsInfo(info);
  }

  return (
    <div className="details__wrapper">
        {
            isLoading ?
        <Loader /> :
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
      </p></>
}
    </div>
  );
}

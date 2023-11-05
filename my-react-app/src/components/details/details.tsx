import './details.scss';
import { useState, useEffect } from 'react';
import {
  Dictionary,
  ResponseData
} from '../../models/response.model';
import { useOutletContext } from 'react-router-dom';

export default function Details() {
  const [detailsInfo, setDetailsInfo] = useState([]);
  //   const context = useContext(SearchContext)?.searchContext;
  const value = useOutletContext();

  useEffect(() => {
    const url = value ? value?.detailsUrl : '';
    (function getData() {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ResponseData<Dictionary<string | string[]>>) => {
          formatData(data);
        });
    })();
  }, [value]);

  function formatData(data: ResponseData<Dictionary<string | string[]>>) {
    const info = Object.entries(data);
    setDetailsInfo(info);
  }

  return (
    <div className="details__wrapper">
      <p className="info">
        {detailsInfo.map(
          (el) =>
            typeof el[1] === 'string' && (
              <span>
                <strong>{`${el[0].split('_').join(' ')}: `}</strong>
                {`${el[1]}`}
              </span>
            )
        )}
      </p>
    </div>
  );
}

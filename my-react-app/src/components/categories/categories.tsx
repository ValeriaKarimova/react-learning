import React, { useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './categories.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { Dictionary, ResponseData } from '../../models/response.model';

export interface Category {
  name: string;
  url: string;
}

export default function Categories() {
  const [isLoading, setLoader] = useState(false);
  const [categories, update] = useState([
    {
      name: '',
      url: '',
    },
  ]);

  useEffect(() => {
    (function getData() {
      setLoader(true);
      fetch('https://swapi.dev/api')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ResponseData<Dictionary<string | string[]>>) => {
          setLoader(false);
          if (categories.length > 1) return;
          createArray(data);
        });
    })();
  }, []);

  function createArray(data: ResponseData<Dictionary<string | string[]>>) {
    const objectArr: Array<string[]> = Object.entries(data);
    objectArr.map((el) => {
      const category: Category = {
        name: el[0],
        url: el[1],
      };
      update((prevState) => [...prevState, category]);
    });
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h1>Choose the Category</h1>
      <div className="categories-wrapper">
        {categories.map(
          (el: Dictionary<string | string[]>, idx: number) =>
            el.name !== '' && (
              <NavLink to={`/${el.name}`} key={idx}>
                <div className="categories-item">{el.name}</div>
              </NavLink>
            )
        )}
      </div>
      <Outlet />
    </>
  );
}

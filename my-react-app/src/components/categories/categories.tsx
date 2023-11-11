import React, { useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './categories.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { Dictionary, ResponseData } from '../../models/response.model';

export interface Category {
  name: string;
  url: string;
}

function createArray(
  data: ResponseData<Dictionary<string | string[]>>
): Category[] {
  const objectArr: Array<string[]> = Object.entries(data);
  const categories: Category[] = [];
  objectArr.map((el) => {
    const category: Category = {
      name: el[0],
      url: el[1],
    };
    categories.push(category);
  });
  return categories;
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
          const caregories = createArray(data);
          update(caregories);
        });
    })();
  }, []);

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

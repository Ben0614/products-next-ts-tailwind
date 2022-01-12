import React, { useCallback } from "react";
import type { NextPage } from "next";
// import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const changeCategoryColor = useCallback(
    () =>
      dispatch({
        type: "category_active",
        payload: { index: 4, index2: 1 },
      }),
    [dispatch]
  );
  return (
    <>
      <div className="container mt-60">
        <div
          className="text-center text-4xl font-bold my-10"
          onClick={changeCategoryColor}
        >
          <Link href="/prodList/page/1">
            <a>ProdList</a>
          </Link>
        </div>
        <div className="text-center text-4xl font-bold my-10">
          <Link href="/addProduct">
            <a>AddProduct</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

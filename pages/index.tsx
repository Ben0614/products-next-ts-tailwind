import React, { useCallback } from "react";
import type { NextPage } from "next";
// import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  // 進入商品列表頁，就調用這個函式，讓分類的active顏色停留在全部商品
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
        {/* 商品列表 */}
        <div
          className="text-center text-4xl font-bold my-10"
          onClick={changeCategoryColor}
        >
          <Link href="/prodList/page/1">
            <a>ProdList</a>
          </Link>
        </div>
        {/* 添加商品 */}
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

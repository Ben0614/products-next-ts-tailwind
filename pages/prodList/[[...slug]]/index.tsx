import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Category from "../../../components/category";
import ProductListButton from "../../../components/productListButton";
// props 類型
interface Props {
  data: {
    page: number;
    perPage: number;
    rows: [
      {
        EXP: string;
        Edible_Method: string;
        Location: string;
        MFD: string;
        Name: string;
        brand_company: string;
        categories: string;
        create_at: string;
        image: string;
        images2: string;
        nutrient: string;
        place_origin: string;
        price: number;
        quantity: string;
        sid: number;
        special_offer: string;
      }
    ];
    totalPages: number;
    totalRows: number;
  };
  params: { slug: Array<string> };
}
// 商品 類型
interface V {
  EXP: string;
  Edible_Method: string;
  Location: string;
  MFD: string;
  Name: string;
  brand_company: string;
  categories: string;
  create_at: string;
  image: string;
  images2: string;
  nutrient: string;
  place_origin: string;
  price: number;
  quantity: string;
  sid: number;
  special_offer: string;
}
// 瀏覽紀錄 類型
interface BrowserRecodeState {
  browserRecode: {
    browserRecode: [
      {
        EXP: string;
        Edible_Method: string;
        Location: string;
        MFD: string;
        Name: string;
        brand_company: string;
        categories: string;
        create_at: string;
        image: string;
        images2: string;
        nutrient: string;
        place_origin: string;
        price: number;
        quantity: string;
        sid: number;
        special_offer: string;
      }
    ];
    updateBrowserRecode: Function;
  };
}

function ProdList({ data, params }: Props) {
  // console.log(data);
  // console.log(params);
  const router = useRouter();
  // console.log(router);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  // 傳內容給button
  dispatch({
    type: "productList_params_data",
    payload: { params, data },
  });

  // 如果搜索框為空，分類顏色就在全部商品
  const changeCategoryColor = useCallback(
    () =>
      dispatch({
        type: "category_active",
        payload: { index: 4, index2: 1 },
      }),
    [dispatch]
  );

  // 從redux獲取瀏覽紀錄狀態
  const browserRecodeState = useSelector((state: BrowserRecodeState) => {
    return state.browserRecode;
  });

  // console.log("browserRecode", browserRecodeState);

  // 更新瀏覽紀錄
  const updateBrowserRecode = (prod: V) => {
    // 獲取localStorage
    let newBrowserRecode = JSON.parse(
      localStorage.getItem("browserRecode") || "[]"
    );
    // 確認現在點擊的商品是否有在瀏覽紀錄李
    let index = newBrowserRecode.findIndex((v: V) => {
      return v.sid === prod.sid;
    });

    // > -1 代表有在紀錄裡
    if (index > -1) {
      // 先排除這個商品，再重新添加
      newBrowserRecode = newBrowserRecode.filter((v: V) => {
        return v.sid !== prod.sid;
      });
      newBrowserRecode.push(prod);
    } else {
      // 直接添加
      newBrowserRecode.push(prod);
    }

    // 紀錄最多4筆
    if (newBrowserRecode.length > 4) {
      // 超過4筆就刪除最舊的(index為0的)，然後再更新localStorage
      newBrowserRecode = newBrowserRecode.filter((v: V, i: number) => {
        return i !== 0;
      });
      localStorage.setItem("browserRecode", JSON.stringify(newBrowserRecode));
    } else {
      // 直接更新localStorage
      localStorage.setItem("browserRecode", JSON.stringify(newBrowserRecode));
    }

    // 重新獲取瀏覽紀錄並傳送到redux
    getAndSendBrowserRecode();
  };

  // 取得和傳送瀏覽紀錄
  const getAndSendBrowserRecode = useCallback(() => {
    const browserRecode = JSON.parse(
      localStorage.getItem("browserRecode") || "[]"
    );

    dispatch({
      type: "browser_recode",
      payload: {
        browserRecode: browserRecode,
        updateBrowserRecode,
      },
    });
  }, [dispatch, updateBrowserRecode]);

  // 一掛載就獲取並傳送瀏覽紀錄
  useEffect(() => {
    getAndSendBrowserRecode();
  }, [getAndSendBrowserRecode]);

  if (!data) return "";
  return (
    <>
      {/* wrap */}
      <div className="container">
        {/* 搜索框 */}
        <div className="flex justify-center my-5">
          <input
            ref={inputRef}
            type="text"
            className="border pl-1"
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                changeCategoryColor();
                // 搜索框為空字串，就跳轉到全部商品
                if ((e.target as HTMLInputElement).value === "") {
                  router.push(`/prodList/page/1`);
                } else {
                  // 跳轉到搜索的頁面
                  router.push(
                    `/prodList/keyword/${
                      (e.target as HTMLInputElement).value
                    }/1`
                  );
                }
              }
            }}
          />
          <button
            className="bg-gray-300 rounded p-1"
            onClick={() => {
              changeCategoryColor();
              if (inputRef.current!.value === "") {
                router.push(`/prodList/page/1`);
              } else {
                router.push(`/prodList/keyword/${inputRef.current!.value}/1`);
              }
            }}
          >
            搜索
          </button>
        </div>
        {/* main */}
        <div className="flex justify-between">
          {/* category */}
          <Category />
          {/* list */}
          <div className="w-[70%]">
            {/* button */}
            <ProductListButton />
            {/* prodList */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {/* item */}
              {data.rows.map((prod) => {
                return (
                  <div
                    key={prod.sid}
                    className="text-center border p-2 rounded-xl text-sm lg:text-xl border-gray-400"
                  >
                    <div className="relative w-2/3 pb-[66.6666%] mx-auto mb-2 lg:w-1/2 lg:pb-[50%]">
                      <Image
                        sizes="10vw"
                        layout="fill"
                        objectFit="contain"
                        src={prod.image}
                        alt=""
                      />
                    </div>
                    <h4 className="truncate mb-2">
                      {/* 跳轉到商品細頁 並更新瀏覽紀錄 */}
                      <Link href={`/prodDetail/${prod.sid}`}>
                        <a
                          onClick={() => {
                            updateBrowserRecode(prod);
                          }}
                        >
                          {prod.Name}
                        </a>
                      </Link>
                    </h4>
                    {/* 判斷是否有特惠價 有就顯示特惠價並且文字為紅色 沒有就顯示原價並且文字為黑色 */}
                    <p
                      className={
                        prod.special_offer === ""
                          ? "text-black font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      $
                      {prod.special_offer === ""
                        ? prod.price
                        : prod.special_offer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* browser-recode */}
          <div className="w-[15%] text-center">
            <h3 className="text-2xl mb-5">瀏覽紀錄</h3>
            {/* 瀏覽紀錄倒轉排序 新的在上方 */}
            {browserRecodeState.browserRecode
              ? browserRecodeState.browserRecode
                  .slice(0)
                  .reverse()
                  .map((prod) => {
                    return (
                      <div
                        key={prod.sid}
                        className="mb-5 p-1 border rounded-xl border-gray"
                      >
                        <div className="relative w-1/2 pb-[50%] mx-auto mb-2">
                          <Image
                            src={prod.image}
                            sizes="10vw"
                            layout="fill"
                            objectFit="contain"
                            alt=""
                          ></Image>
                        </div>
                        <h4 className="mb-2">
                          <Link href={`/prodDetail/${prod.sid}`}>
                            <a
                              onClick={() => {
                                updateBrowserRecode(prod);
                              }}
                            >
                              {prod.Name}
                            </a>
                          </Link>
                        </h4>
                        <p
                          className={
                            prod.special_offer === ""
                              ? "text-black font-bold"
                              : "text-red-500 font-bold"
                          }
                        >
                          $
                          {prod.special_offer === ""
                            ? prod.price
                            : prod.special_offer}
                        </p>
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

// 根據不同params來選擇呼叫data
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let r: AxiosResponse;
  switch (params!.slug![0]) {
    case "page":
      r = await axios.get("http://localhost:3001/product", {
        params: { page: params!.slug![1] },
      });
      break;
    case "keyword":
      // /prodList/keyword/???/page/1
      r = await axios.get("http://localhost:3001/product", {
        params: { keyword: params!.slug![1], page: params!.slug![2] },
      });
      break;
    case "category":
      r = await axios.get("http://localhost:3001/product", {
        params: { category: params!.slug![1], page: params!.slug![2] },
      });
      break;
    case "location":
      r = await axios.get("http://localhost:3001/product", {
        params: { location: params!.slug![1], page: params!.slug![2] },
      });
      break;
    default:
      break;
  }

  return {
    props: {
      data: r!.data,
      params,
    },
  };
};

export default ProdList;

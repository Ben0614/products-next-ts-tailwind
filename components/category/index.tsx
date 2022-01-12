import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const category = ["保健食品", "生活用品", "醫療器材"];
const body = [
  "頭部",
  "臉部",
  "眼睛",
  "口腔",
  "身體",
  "骨骼",
  "血液",
  "腸胃",
  "睡眠",
  "皮膚",
  "手部",
  "足部",
  "其他",
];
interface State {
  changeCategoryColor: { index: number; index2: number };
}

// 傳送index到redux
const Category = () => {
  const dispatch = useDispatch();
  const changeCategoryColor = useCallback(
    (i, y) =>
      dispatch({
        type: "category_active",
        payload: { index: i, index2: y },
      }),
    [dispatch]
  );

  // 獲取index判斷要變色的分類
  const activeNumber = useSelector((state: State) => {
    return state.changeCategoryColor;
  });
  // console.log("activeNumber", activeNumber);

  const categoryContentRef = useRef<HTMLDivElement>(null);
  const bodyContentRef = useRef<HTMLDivElement>(null);

  // 展開category區域
  const cateShow = () => {
    if (categoryContentRef.current) {
      const cateHeight = categoryContentRef.current!.scrollHeight + "px";
      if (activeNumber.index2 === 1) {
        categoryContentRef.current!.style.height = "0";
        categoryContentRef.current!.style.transition = ".3s";
      } else {
        categoryContentRef.current!.style.height = cateHeight;
        categoryContentRef.current!.style.transition = ".3s";
        bodyContentRef.current!.style.height = "0";
        bodyContentRef.current!.style.transition = ".3s";
      }
    }
  };
  // 展開body區域
  const bodyShow = () => {
    if (bodyContentRef.current) {
      const bodyHeight = bodyContentRef.current!.scrollHeight + "px";
      if (activeNumber.index2 === 2) {
        bodyContentRef.current!.style.height = "0";
        bodyContentRef.current!.style.transition = ".3s";
      } else {
        bodyContentRef.current!.style.height = bodyHeight;
        bodyContentRef.current!.style.transition = ".3s";
        categoryContentRef.current!.style.height = "0";
        categoryContentRef.current!.style.transition = ".3s";
      }
    }
  };

  // 判斷要展開category或body (換頁時)
  const keepShow = useCallback(() => {
    if (activeNumber.index2 === 1) {
      const cateHeight = categoryContentRef.current!.scrollHeight + "px";
      categoryContentRef.current!.style.height = cateHeight;
      categoryContentRef.current!.style.transition = ".3s";
    } else if (activeNumber.index2 === 2) {
      const bodyHeight = bodyContentRef.current!.scrollHeight + "px";
      bodyContentRef.current!.style.height = bodyHeight;
      bodyContentRef.current!.style.transition = ".3s";
    }
  }, [activeNumber.index2]);

  // 一掛載就調用
  useEffect(() => {
    keepShow();
  }, [keepShow]);

  return (
    <>
      <div className="w-[10%]">
        <div className="mb-2">
          <div
            className={
              activeNumber.index2 === 1
                ? "mb-1 font-bold text-xl text-sky-500 cursor-pointer"
                : "mb-1 font-bold text-xl text-black cursor-pointer"
            }
            onClick={() => {
              activeNumber.index2 === 1
                ? changeCategoryColor(activeNumber.index, null)
                : changeCategoryColor(activeNumber.index, 1);
              cateShow();
            }}
          >
            商品種類
          </div>
          <div ref={categoryContentRef} className="h-0 overflow-hidden">
            <div className="">
              <Link href="/prodList/page/1">
                <a
                  className={
                    activeNumber.index === 4 ? "text-sky-500" : "text-black"
                  }
                  onClick={() => {
                    changeCategoryColor(4, 1);
                  }}
                >
                  全部商品
                </a>
              </Link>
            </div>
            {category.map((v, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    changeCategoryColor(i + 1, 1);
                  }}
                  className="mb-1"
                >
                  <Link href={`/prodList/category/${v}/1`}>
                    <a
                      className={
                        activeNumber.index === i + 1
                          ? "text-sky-500"
                          : "text-black"
                      }
                    >
                      {v}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={() => {
            activeNumber.index2 === 2
              ? changeCategoryColor(activeNumber.index, null)
              : changeCategoryColor(activeNumber.index, 2);
            bodyShow();
          }}
          className={
            activeNumber.index2 === 2
              ? "mb-1 font-bold text-xl text-sky-500 cursor-pointer"
              : "mb-1 font-bold text-xl text-black cursor-pointer"
          }
        >
          身體部位
        </div>
        <div ref={bodyContentRef} className="h-0 overflow-hidden">
          {body.map((v, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  changeCategoryColor(i + 5, 2);
                }}
                className="mb-1"
              >
                <Link href={`/prodList/location/${v}/1`}>
                  <a
                    className={
                      activeNumber.index === i + 5
                        ? "text-sky-500"
                        : "text-black"
                    }
                  >
                    {v}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Category;

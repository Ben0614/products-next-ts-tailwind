import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface State {
  prodListParams: {
    params: { slug: Array<string> };
    nextPage: () => void;
    prevPage: () => void;
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
  };
}

function ProductListButton() {
  const prodListParams = useSelector((state: State) => {
    return state.prodListParams;
  });
  // console.log('prodListParams',prodListParams);
  const router = useRouter();

  const prevPage = () => {
    switch (prodListParams.params.slug[0]) {
      case "page":
        router.push(`/prodList/page/${+prodListParams.params.slug[1] - 1}`);
        break;
      case "keyword":
        router.push(
          `/prodList/keyword/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] - 1
          }`
        );
        break;
      case "category":
        router.push(
          `/prodList/category/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] - 1
          }`
        );
        break;
      case "location":
        router.push(
          `/prodList/location/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] - 1
          }`
        );
        break;
      default:
        break;
    }
  };
  const nextPage = () => {
    switch (prodListParams.params.slug[0]) {
      case "page":
        router.push(`/prodList/page/${+prodListParams.params.slug[1] + 1}`);
        break;
      case "keyword":
        router.push(
          `/prodList/keyword/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] + 1
          }`
        );
        break;
      case "category":
        router.push(
          `/prodList/category/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] + 1
          }`
        );
        break;
      case "location":
        router.push(
          `/prodList/location/${prodListParams.params.slug[1]}/${
            +prodListParams.params.slug[2] + 1
          }`
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        {/* 上一頁 */}
        <button
          disabled={
            prodListParams.params.slug[0] === "page"
              ? +prodListParams.params.slug[1] <= 1
                ? true
                : false
              : +prodListParams.params.slug[2] <= 1
              ? true
              : false
          }
          className="mx-2 disabled:text-gray-400"
          onClick={() => {
            prevPage();
          }}
        >
          上一頁
        </button>
        {/* 數字-1 */}
        {prodListParams.params.slug[0] === "page" ? (
          +prodListParams.params.slug[1] <= 1 ? (
            ""
          ) : (
            <button
              className="mx-2 w-7 h-7 text-center leading-7"
              onClick={() => {
                prevPage();
              }}
            >
              {+prodListParams.params.slug[1] - 1}
            </button>
          )
        ) : +prodListParams.params.slug[2] <= 1 ? (
          ""
        ) : (
          <button
            className="mx-2 w-7 h-7 text-center leading-7"
            onClick={() => {
              prevPage();
            }}
          >
            {+prodListParams.params.slug[2] - 1}
          </button>
        )}
        {/* 數字本頁 */}
        <button className="mx-2 w-7 h-7 text-center leading-7 rounded-full bg-sky-300">
          {prodListParams.params.slug[0] === "page"
            ? +prodListParams.params.slug[1]
            : +prodListParams.params.slug[2]}
        </button>
        {/* 數字+1 */}
        {prodListParams.params.slug[0] === "page" ? (
          +prodListParams.params.slug[1] >= prodListParams.data.totalPages ? (
            ""
          ) : (
            <button
              className="mx-2 w-7 h-7 text-center leading-7"
              onClick={() => {
                prevPage();
              }}
            >
              {+prodListParams.params.slug[1] + 1}
            </button>
          )
        ) : +prodListParams.params.slug[2] >= prodListParams.data.totalPages ? (
          ""
        ) : (
          <button
            className="mx-2 w-7 h-7 text-center leading-7"
            onClick={() => {
              nextPage();
            }}
          >
            {+prodListParams.params.slug[2] + 1}
          </button>
        )}
        {/* 下一頁 */}
        <button
          disabled={
            prodListParams.params.slug[0] === "page"
              ? +prodListParams.params.slug[1] >= prodListParams.data.totalPages
                ? true
                : false
              : +prodListParams.params.slug[2] >= prodListParams.data.totalPages
              ? true
              : false
          }
          className="mx-2 disabled:text-gray-400"
          onClick={() => {
            nextPage();
          }}
        >
          下一頁
        </button>
      </div>
    </>
  );
}

export default ProductListButton;

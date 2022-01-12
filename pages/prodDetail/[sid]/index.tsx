import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import Category from "../../../components/category";

interface Props {
  prod: {
    data: {
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
    };
  };
  params: { slug: Array<string> };
}
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

function ProdDetail({ prod, params }: Props) {
  // console.log(prod);
  // console.log(params);
  const router = useRouter();
  // console.log(router);

  const browserRecodeState = useSelector((state: BrowserRecodeState) => {
    return state.browserRecode;
  });

  // console.log("browserRecodeState", browserRecodeState);

  if (!prod) return "";
  return (
    <>
      {/* wrap */}
      <div className="h-screen container flex justify-between mt-[72px]">
        <Category />
        {/* Item */}
        <div className="w-4/5 text-center">
          <div className="relative w-1/3 pb-[33.33%] mx-auto mb-3">
            <Image
              sizes="30vw"
              layout="fill"
              objectFit="contain"
              src={prod.data.image}
              alt=""
            ></Image>
          </div>
          <h3 className="mb-3 text-xl">{prod.data.Name}</h3>
          <p
            className={
              prod.data.special_offer === ""
                ? "text-black text-xl"
                : "text-red-500 text-xl"
            }
          >
            $
            {prod.data.special_offer === ""
              ? prod.data.price
              : prod.data.special_offer}
          </p>
        </div>
        {/* browser-recode */}
        <div className="w-1/5 text-center">
          <h3 className="text-2xl font-bold mb-5">瀏覽紀錄</h3>
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
                              browserRecodeState.updateBrowserRecode(prod);
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const r = await axios.get(`http://localhost:3001/product/${params!.sid}`);
  return {
    props: {
      prod: r.data,
      params,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const r = await axios.get(`http://localhost:3001/product`);
  let arrayNumber = [];
  for (let i = 1; i <= r.data.totalRows; i++) {
    arrayNumber.push(i);
  }
  const paths = arrayNumber.map((v) => {
    return { params: { sid: v + "" } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ProdDetail;

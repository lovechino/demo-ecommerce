"use client";
import { setListProduct } from "@/Redux/product";
import axiosInstance from "@/Utils/Axios";
// import { ProductType } from "@/Utils/type";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getAllProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.post(
        "/Product/GetListProductByGroup",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setListProduct(response.data));
    };
    fetchData();
  }, [dispatch]);
};

export const GetProductById = async (id: string) => {
  return await axiosInstance
    .post(
      `/Product/GetProduct?productCode=${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getReviewProducts = async () => {
  return await axiosInstance
    .get("/MobileLogin/GetListProductReview")
    .then((res) => res.data);
};

export const GetListGroupProduct = async () => {
  return await axiosInstance
    .get("/MobileLogin/GetListGroupProduct")
    .then((res) => res.data);
};

export const GetListProductByGroup = async (id: string) => {
  return await axiosInstance
    .post(`/Product/GetListProductByGroup?groupcode=${id}`)
    .then((res) => res.data);
};

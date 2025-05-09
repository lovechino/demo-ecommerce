"use client";
import { useDispatch } from "react-redux";
import axiosInstance from "@/Utils/Axios";
import { setListProduct } from "@/Redux/product";
import { useEffect, useState } from "react";

export const getAllProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.post(
          "/Product/GetListProductByGroup",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        dispatch(setListProduct(response.data));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [dispatch]);
};

export const GetListProductByGroup = async (id: string) => {
  return await axiosInstance
    .post(`/Product/GetListProductByGroup?groupCode=${id}`, {})
    .then((res) => res.data);
};

export const GetProductById = async (id: string) => {
  return await axiosInstance
    .post(
      `/Product/GetProduct?productCode=${id}`,
      {},
      { headers: { "Content-Type": "application/json" } }
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

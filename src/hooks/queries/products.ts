"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/products?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    refetchInterval: 3600000,
  });
};
export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axiosApi.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useGetProductsByCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosApi.get(`/products/categories`);
      return response.data;
    },
  });
};
// export const useGetProductsByCategory = (category: string, page = 1, limit = 10) => {
//   return useQuery({
//     queryKey: ["products", "category", category, page, limit],
//     queryFn: async () => {
//       const response = await axiosApi.get(`/products/category/${category}?page=${page}&limit=${limit}`);
//       return response.data;
//     },
//     enabled: !!category,
//   });
// };

"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useFaq = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["faqs", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(`/faqs?page=${page}&limit=${limit}`);
      return response.data;
    },
    refetchInterval: 3600000,
  });
};

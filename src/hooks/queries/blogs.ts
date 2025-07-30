"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(`/blog?page=${page}&limit=${limit}`);
      return response.data;
    },
    refetchInterval: 3600000,
  });
};

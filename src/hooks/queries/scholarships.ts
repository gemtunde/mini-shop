"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
// Transaction history query
export const useScholarships = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["scholarships", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/scholarships?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    refetchInterval: 60000,
  });
};

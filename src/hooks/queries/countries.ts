"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useCountries = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["countries", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/countries?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    refetchInterval: 3600000,
  });
};

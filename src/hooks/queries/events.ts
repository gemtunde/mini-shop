"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useEvents = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["events", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/events?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    refetchInterval: 3600000,
  });
};

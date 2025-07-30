import { create } from "zustand";
import { Product, FilterState } from "@/types/product";
import { api } from "@/lib/api";
//import { api } from '@/lib/api'
//import axiosApi from "@/services/axiosApi";

interface ProductStore {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  filteredProducts: Product[];

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  applyFilters: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    priceRange: [0, 1000],
    searchTerm: "",
  },
  filteredProducts: [],

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await api.getProducts();
      set({ products, loading: false });
      get().applyFilters();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await api.getCategories();
      set({ categories });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, filters } = get();
    let filtered = products;

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(
        // (product) => product.category === filters.category
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    set({ filteredProducts: filtered });
  },
}));

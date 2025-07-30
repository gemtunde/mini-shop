"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store/useProductStore";

export function ProductFilters() {
  const { filters, categories, setFilters, filteredProducts, products } =
    useProductStore();
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ searchTerm: localSearchTerm });
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setFilters]);

  const handleClearFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 1000],
      searchTerm: "",
    });
    setLocalSearchTerm("");
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ category: value === "all" ? "" : value });
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFilters({
      priceRange: [value, filters.priceRange[1]],
    });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFilters({
      priceRange: [filters.priceRange[0], value],
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.searchTerm ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        <Input
          placeholder="Search products..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="pl-10"
          aria-label="Search products"
        />
      </div>

      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              {[filters.category, filters.searchTerm].filter(Boolean).length +
                (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000
                  ? 1
                  : 0)}
            </Badge>
          )}
        </Button>

        <div className="flex items-center gap-2">
          {!hasActiveFilters && (
            <span className="text-sm text-primary">
              {filteredProducts.length} of {products.length} products
            </span>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category:{" "}
              {filters.category
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              <button
                onClick={() => setFilters({ category: "" })}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                aria-label="Remove category filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.searchTerm}"
              <button
                onClick={() => {
                  setFilters({ searchTerm: "" });
                  setLocalSearchTerm("");
                }}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                aria-label="Remove search filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button
                onClick={() => setFilters({ priceRange: [0, 1000] })}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                aria-label="Remove price filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card id="filter-panel">
          <CardContent className="p-4 space-y-4">
            {/* Category Filter */}
            <div>
              <label
                htmlFor="category-select"
                className="text-sm font-medium block mb-2"
              >
                Category ({categories.length} available)
              </label>
              <Select
                value={filters.category || "all"}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label
                htmlFor="price-min"
                className="text-sm font-medium block mb-2"
              >
                Price Range
              </label>
              <div className="flex gap-2">
                <Input
                  id="price-min"
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={handlePriceMinChange}
                  aria-label="Minimum price"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={handlePriceMaxChange}
                  aria-label="Maximum price"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

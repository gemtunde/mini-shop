"use client";

import { useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useProductStore } from "@/store/useProductStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ProductGrid() {
  const { filteredProducts, loading, error, fetchProducts, fetchCategories } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading products: {error}</AlertDescription>
      </Alert>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-primary">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="grid"
      aria-label="Product catalog"
    >
      {filteredProducts.map((product) => (
        <div key={product.id} role="gridcell">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

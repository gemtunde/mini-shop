"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Plus, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [showModal, setShowModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <>
      <Card
        className="group cursor-pointer transition-all hover:shadow-lg"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={product.image}
              alt={product.title}
              fill
              className={`object-contain transition-opacity group-hover:scale-105 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>

            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-primary"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-primary">
                ({product.rating.count})
              </span>
            </div>

            <p className="text-sm text-primary line-clamp-2">
              {product.description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-bold text-lg">${product.price.toFixed(2)}</div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center gap-2"
            aria-label={`Add ${product.title} to cart`}
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <ProductModal
        product={product}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}

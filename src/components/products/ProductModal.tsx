"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Star, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const { addItem, items, updateQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

  const cartItem = items.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onOpenChange(false);
  };

  const handleUpdateCart = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
    >
      <Card
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6 pt-0">
            {/* Product Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <Image
                src={product.image}
                alt={product.title}
                fill
                className={`object-contain ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 id="product-title" className="text-2xl font-bold">
                  {product.title}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating.rate)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-primary"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-primary">{product.description}</p>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span
                      id="quantity"
                      className="w-12 text-center font-medium"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart or Update Cart */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>

                  {currentQuantity > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary">
                        In cart: {currentQuantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateCart(0)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

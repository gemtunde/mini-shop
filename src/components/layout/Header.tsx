"use client";

import { ShoppingCart, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useMounted } from "@/hooks/useMounted";

export function Header() {
  const { getTotalItems } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = getTotalItems();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Search className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">MiniShop</span>
            </a>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
                aria-label={`Open cart with ${totalItems} items`}
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

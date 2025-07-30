import { Header } from "@/components/layout/Header";
import { ProductFilters } from "@/components/filters/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container p-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Product Catalog
            </h1>
            <p className="text-primary">
              Discover amazing products at great prices
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 ">
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <ProductFilters />
              </div>
            </aside>

            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

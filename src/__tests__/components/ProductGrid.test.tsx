import { render, screen } from "@testing-library/react";
import { useProductStore } from "@/store/useProductStore";
import "@testing-library/jest-dom";
import { ProductGrid } from "@/components/products/ProductGrid";

jest.mock("@/store/useProductStore", () => ({
  useProductStore: jest.fn(),
}));

// Mock ProductCard
jest.mock("./ProductCard", () => ({
  ProductCard: ({ product }: { product: any }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

const mockUseProductStore = useProductStore as unknown as jest.Mock;

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    category: "category",
    description: "desc",
    image: "image.jpg",
    rating: { rate: 4, count: 100 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    category: "category",
    description: "desc",
    image: "image.jpg",
    rating: { rate: 5, count: 200 },
  },
];

describe("ProductGrid", () => {
  it("shows loader when loading", () => {
    mockUseProductStore.mockReturnValue({
      filteredProducts: [],
      loading: true,
      error: null,
      fetchProducts: jest.fn(),
      fetchCategories: jest.fn(),
    });

    render(<ProductGrid />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    mockUseProductStore.mockReturnValue({
      filteredProducts: [],
      loading: false,
      error: "Failed to fetch products",
      fetchProducts: jest.fn(),
      fetchCategories: jest.fn(),
    });

    render(<ProductGrid />);

    expect(
      screen.getByText(/Error loading products: Failed to fetch products/)
    ).toBeInTheDocument();
  });

  it("shows empty message when no products match", () => {
    mockUseProductStore.mockReturnValue({
      filteredProducts: [],
      loading: false,
      error: null,
      fetchProducts: jest.fn(),
      fetchCategories: jest.fn(),
    });

    render(<ProductGrid />);

    expect(
      screen.getByText("No products found matching your criteria.")
    ).toBeInTheDocument();
  });

  it("renders grid of products", () => {
    mockUseProductStore.mockReturnValue({
      filteredProducts: mockProducts,
      loading: false,
      error: null,
      fetchProducts: jest.fn(),
      fetchCategories: jest.fn(),
    });

    render(<ProductGrid />);

    const grid = screen.getByRole("grid", { name: "Product catalog" });
    expect(grid).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});

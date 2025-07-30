import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ProductCard } from "@/components/products/ProductCard";

// @ts-ignore
declare const jest: any;

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock useCartStore
const addItemMock = jest.fn();
jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => ({
    addItem: addItemMock,
  }),
}));

// Mock ProductModal
jest.mock("./ProductModal", () => ({
  ProductModal: ({ open }: { open: boolean }) =>
    open ? <div role="dialog">Product Modal</div> : null,
}));

const mockProduct = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    addItemMock.mockClear();
  });

  it("renders product content correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("img", { name: mockProduct.title })
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(
      screen.getByText(`(${mockProduct.rating.count})`)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$109\.95/)).toBeInTheDocument();
    expect(screen.getByText(/Your perfect pack/)).toBeInTheDocument();
  });

  it("calls addItem when 'Add to Cart' is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: `Add ${mockProduct.title} to cart`,
    });

    fireEvent.click(addButton);
    expect(addItemMock).toHaveBeenCalledWith(mockProduct);
  });

  it("opens modal when card is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const card = screen.getByRole("button", {
      name: `View details for ${mockProduct.title}`,
    });

    fireEvent.click(card);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens modal when Enter key is pressed", () => {
    render(<ProductCard product={mockProduct} />);

    const card = screen.getByRole("button", {
      name: `View details for ${mockProduct.title}`,
    });

    fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens modal when Space key is pressed", () => {
    render(<ProductCard product={mockProduct} />);

    const card = screen.getByRole("button", {
      name: `View details for ${mockProduct.title}`,
    });

    fireEvent.keyDown(card, { key: " ", code: "Space" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

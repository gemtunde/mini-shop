import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ProductModal } from "@/components/products/ProductModal";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img alt={props.alt} {...props} />,
}));

const addItemMock = jest.fn();
const updateQuantityMock = jest.fn();
jest.mock("@/store/useCartStore", () => ({
  useCartStore: () => ({
    addItem: addItemMock,
    updateQuantity: updateQuantityMock,
    items: [{ id: 1, quantity: 2 }], // simulate item already in cart
  }),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 49.99,
  description: "A test product description.",
  category: "test-category",
  image: "https://fakestoreapi.com/img/test.jpg",
  rating: {
    rate: 4.5,
    count: 12,
  },
};

describe("ProductModal", () => {
  const onOpenChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render if open is false", () => {
    const { container } = render(
      <ProductModal
        product={mockProduct}
        open={false}
        onOpenChange={onOpenChangeMock}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders modal with product details", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProduct.rating.rate} (${mockProduct.rating.count} reviews)`
      )
    ).toBeInTheDocument();
  });

  it("updates quantity when buttons are clicked", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    const incrementBtn = screen.getByLabelText("Increase quantity");
    const decrementBtn = screen.getByLabelText("Decrease quantity");
    //const quantityDisplay = screen.getByText("1");

    fireEvent.click(incrementBtn);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(decrementBtn);
    expect(screen.getByText("1")).toBeInTheDocument(); // Should not go below 1
  });

  it("calls addItem multiple times based on quantity", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    const incrementBtn = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementBtn); // quantity = 2

    const addButton = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addButton);

    expect(addItemMock).toHaveBeenCalledTimes(2);
    expect(addItemMock).toHaveBeenCalledWith(mockProduct);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it("calls updateQuantity when remove is clicked", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    const removeBtn = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeBtn);

    expect(updateQuantityMock).toHaveBeenCalledWith(mockProduct.id, 0);
  });

  it("closes modal when background or close button is clicked", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    // Click close icon
    const closeBtn = screen.getByLabelText("Close modal");
    fireEvent.click(closeBtn);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);

    // Re-render with open again
    onOpenChangeMock.mockClear();
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={onOpenChangeMock}
      />
    );

    // Click outside card
    fireEvent.click(screen.getByRole("dialog"));
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });
});

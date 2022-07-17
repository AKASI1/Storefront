import Product from "../product.model";

const product: Product = new Product();

describe("Product Model", () => {
  it("should have a createProduct  method", () => {
    expect(product.createProduct).toBeDefined();
  });
  it("should have a showProducts method", () => {
    expect(product.showProducts).toBeDefined();
  });
  it("should have a getProductById method", () => {
    expect(product.getProduct).toBeDefined();
  });
  it("should have a deleteProduct method", () => {
    expect(product.deleteProduct).toBeDefined();
  });

  it("should create a product using createProduct method", async () => {
    const result = await product.createProduct({
      name: "iPhone",
      price: 645,
    });
    expect(result).toEqual({
      id: 1,
      name: "iPhone",
      price: 645,
    });
  });
  it("should return a list of products using getProducts", async () => {
    const result = await product.showProducts();
    expect(result.length).toEqual(1);
  });

  it("should return the correct product using getProductByName", async () => {
    const result = await product.getProduct(1);
    expect(result).toEqual({
      id: 1,
      name: "iPhone",
      price: 645,
    });
  });
  it("should delete the correct product using deleteProduct", async () => {
    const result = await product.deleteProduct(1);
    expect(result).toEqual({
      id: 1,
      name: "iPhone",
      price: 645,
    });
  });
});

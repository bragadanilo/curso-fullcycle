import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("p1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => {
      let product = new Product("p1", "p1", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    let product = new Product("123", "p1", 100);
    product.changeName("p2");
    expect(product.name).toBe("p2");
  });

  it("should change price", () => {
    let product = new Product("123", "p1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});

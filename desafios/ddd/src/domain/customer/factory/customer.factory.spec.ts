import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer A");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street A", 1, "37600-000", "City A");
    const customer = CustomerFactory.createWithAddress("Customer A", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBe(address);
  });
});

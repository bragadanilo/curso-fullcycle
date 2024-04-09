import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "john");

    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("should throw error when address is undefined when you anctivate", () => {
    expect(() => {
      const customer = new Customer("1", "customer 1");

      customer.activate();
    }).toThrow();
  });

  it("should activate the customer", () => {
    const customer = new Customer("1", "customer 1");
    const address = new Address("street1", 1, "30600-987", "cambui");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate the customer", () => {
    expect(() => {
      const customer = new Customer("1", "customer 1");

      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});

import Order from "../order.model";

const order: Order = new Order();

describe("Order Model", () => {
  it("should have an getCurrentOrderByUserId  method", () => {
    expect(order.getCurrentOrderByUserId).toBeDefined();
  });
  it("should have a getCompletedOrdersByUserId method", () => {
    expect(order.getCompletedOrdersByUserId).toBeDefined();
  });
  it("should have an getActiveOrdersByUserId  method", () => {
    expect(order.getActiveOrdersByUserId).toBeDefined();
  });
  it("should have a showOrders method", () => {
    expect(order.showOrders).toBeDefined();
  });
  it("should have an updateOrderStatus  method", () => {
    expect(order.updateOrderStatus).toBeDefined();
  });
  it("should have a deleteOrder method", () => {
    expect(order.deleteOrder).toBeDefined();
  });
  it("should have a createOrder method", () => {
    expect(order.createOrder).toBeDefined();
  });
  describe("Manipulate Order methods", () => {
    it("should create order using createOrder method", async () => {
      const result = await order.createOrder({
        product_id: 1,
        quantity: 10,
        user_id: 1,
        status: "active",
      });
      expect(result).toEqual({
        id: 1,
        product_id: "1",
        quantity: 10,
        user_id: "1",
        status: "active",
      });
    });
    it("should return all orders of user using showOrders method", async () => {
      const result = await order.showOrders(1);
      expect(result).toEqual([
        {
          id: 1,
          product_id: "1",
          quantity: 10,
          user_id: "1",
          status: "active",
        },
      ]);
    });
    it("should return current order of user using getCurrentOrderByUserId method", async () => {
      const result = await order.getCurrentOrderByUserId(1);
      expect(result).toEqual({
        id: 1,
        product_id: "1",
        quantity: 10,
        user_id: "1",
        status: "active",
      });
    });
    it("should return active orders of user using getActiveOrdersByUserId method", async () => {
      const result = await order.getActiveOrdersByUserId(1);
      expect(result).toEqual([
        {
          id: 1,
          product_id: "1",
          quantity: 10,
          user_id: "1",
          status: "active",
        },
      ]);
    });
    it("should return completed orders of user using getCompletedOrdersByUserId method", async () => {
      const result = await order.getCompletedOrdersByUserId(1);
      expect(result).toEqual([]);
    });
    it("should update order status using updateOrderStatus method", async () => {
      const result = await order.updateOrderStatus("complete", 1);
      expect(result).toEqual({
        id: 1,
        product_id: "1",
        quantity: 10,
        user_id: "1",
        status: "complete",
      });
    });
    it("should delete the correct order", async () => {
      const result = await order.deleteOrder(1);
      expect(result).toEqual({
        id: 1,
        product_id: "1",
        quantity: 10,
        user_id: "1",
        status: "complete",
      });
    });
  });
});

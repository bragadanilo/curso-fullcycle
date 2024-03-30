import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import Order from "../../domain/entity/order";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order-item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => this.orderItemModelOrderItem(item))
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"] });
    return orders.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => this.orderItemModelOrderItem(item))
      );
    });
  }

  private orderItemModelOrderItem(orderItemModel: OrderItemModel): OrderItem {
    return new OrderItem(
      orderItemModel.id,
      orderItemModel.name,
      orderItemModel.price,
      orderItemModel.product_id,
      orderItemModel.quantity
    );
  }
}

import Order from "./order.dto";

class Purchase {
  private user_id: number;
  private name: string;
  private orders: Order[];

  constructor(user_id: number, name: string) {
    this.user_id = user_id;
    this.name = name.trim();
    this.orders = [];
  }

  public addOrder(order_id: number, date: number) {
    const order: Order = new Order(order_id, this.formatDate(date));
    this.orders.push(order);
    return order;
  }

  public getOrder(order_id: number) {
    return this.orders.find((order) => order.getOrderId() === order_id);
  }

  public getUserId(): number {
    return this.user_id;
  }

  private formatDate(date: number): string {
    const dateAux: string = date.toString();
    const year: string = dateAux.slice(0, 4);
    const month: string = dateAux.slice(4, 6);
    const day: string = dateAux.slice(6, 8);

    return `${year}-${month}-${day}`;
  }
}
export default Purchase;

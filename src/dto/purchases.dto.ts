import Purchase from "./purchase.dto";

class Purchases {
  private purchases: Purchase[];

  constructor(purchase: Purchase) {
    this.purchases = [];
    this.purchases.push(purchase);
  }

  public addPurchase(user_id: number, userName: string) {
    const purchase: Purchase = new Purchase(user_id, userName);
    this.purchases.push(purchase);
    return purchase;
  }

  public getPurchase(user_id: number) {
    return this.purchases.find((purchase) => purchase.getUserId() === user_id);
  }
}
export default Purchases;

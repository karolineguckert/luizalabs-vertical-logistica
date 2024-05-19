import Product from "./product.dto";

export class Order {
    private order_id: number;
    private total: number;
    private date: string;
    private products: Product[];

    constructor(order_id: number, date: string) {
        this.order_id = order_id;
        this.total = 0;
        this.date = date;
        this.products = [];
    }

    public addProduct(product_id: number, value: number){
        const product: Product = new Product(product_id, value);
        this.products.push(product);
        this.sumTotal(value);
    }

    public getOrderId(): number{
        return this.order_id;
    }

    public sumTotal(value: number){
        this.total = this.total + value;
    }
}
export default Order;
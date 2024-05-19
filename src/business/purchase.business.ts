import PurchaseInterface from "../entity/purchase.entity";
import Purchase from "../dto/purchase.dto";
import Purchases from "../dto/purchases.dto";
import Order from "../dto/order.dto";
import PurchaseRepository from "../repository/purchase.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
class PurchaseBusiness {

    constructor(private purchaseRepository: PurchaseRepository) {}

    public async getAllPurchases (){
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getAllPurchases();
        return this.createPurchaseObject(purchasesFromEntity);
    }

    public async getPurchaseByDate (beginDate: number, endDate: number){
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getPurchaseByDate(beginDate, endDate);
        return this.createPurchaseObject(purchasesFromEntity);
    }

    public async getPurchaseByOrderId (orderId: number){
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getPurchaseByOrderId(orderId);

        if(purchasesFromEntity.length > 0){
            let purchasesListObject: Purchases = new Purchases(this.createFirstPurchase(purchasesFromEntity));

            purchasesFromEntity.map(purchaseFromEntity => {
                let purchase = purchasesListObject.getPurchase(purchaseFromEntity.userId);

                if(purchase !== undefined){
                    let order = purchase.getOrder(purchaseFromEntity.orderId);

                    if(order !== undefined){
                        order.addProduct(purchaseFromEntity.productId, purchaseFromEntity.value);
                    }
                }
            })
            return purchasesListObject;
        }
        return {};
    }

    /** Method that create a Purchase in database from a auxiliary object
     *
     * @param initialPurchase is the auxiliary object of Purchase
     */
    public async createPurchase (initialPurchase: any){
        return this.purchaseRepository.createPurchase(
            parseFloat(initialPurchase.userId),
            initialPurchase.userName,
            parseFloat(initialPurchase.orderId),
            parseFloat(initialPurchase.productId),
            parseFloat(initialPurchase.value.toString()),
            parseInt(initialPurchase.date)
        );
    }

    private createPurchaseObject(purchasesFromEntity : PurchaseInterface[]){
        if(purchasesFromEntity.length > 0){
            let purchasesListObject: Purchases = new Purchases(this.createFirstPurchase(purchasesFromEntity));

            purchasesFromEntity.map(purchaseFromEntity => {
                let purchase = this.getCurrentPurchaseFromList(purchasesListObject, purchaseFromEntity);
                let order = this.getCurrentOrderFromPurchase(purchase, purchaseFromEntity);

                order.addProduct(purchaseFromEntity.productId, purchaseFromEntity.value);

            })
            return purchasesListObject;
        }
        return {};
    }

    private createFirstPurchase(purchases : PurchaseInterface[]): Purchase {
        const firstPurchase: PurchaseInterface = purchases[0];
        const initialPurchase: Purchase = new Purchase(firstPurchase.userId, firstPurchase.userName);
        initialPurchase.addOrder(firstPurchase.orderId, firstPurchase.date);

        return initialPurchase;
    }

    private getCurrentPurchaseFromList(purchasesListObject: Purchases, purchaseFromEntity: PurchaseInterface): Purchase {
        let purchase = purchasesListObject.getPurchase(purchaseFromEntity.userId);

        if(purchase === undefined){
            purchase = purchasesListObject.addPurchase(purchaseFromEntity.userId, purchaseFromEntity.userName);
        }
        return purchase;
    }

    private getCurrentOrderFromPurchase(purchase: Purchase, purchaseFromEntity: PurchaseInterface): Order {
        let order = purchase.getOrder(purchaseFromEntity.orderId);

        if(order === undefined){
            order = purchase.addOrder(purchaseFromEntity.orderId, purchaseFromEntity.date);
        }
        return order;
    }

}
export default PurchaseBusiness;
import PurchaseInterface from "../entity/purchase.entity";
import Purchase from "../dto/purchase.dto";
import Purchases from "../dto/purchases.dto";
import Order from "../dto/order.dto";
import PurchaseRepository from "../repository/purchase.repository";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

@Injectable()
class PurchaseBusiness {

    constructor(private purchaseRepository: PurchaseRepository) {}

    /** Method that returns all a Purchase formatted
     */
    public async getAllPurchases (){
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getAllPurchases();
        return this.createPurchaseObject(purchasesFromEntity);
    }

    /** Method that returns all a Purchase by date formatted
     *
     * @param beginDate is the initial date to filter
     * @param endDate is the end date to filter
     */
    public async getPurchaseByDate (beginDate: number, endDate: number){
        if(beginDate > endDate){
            throw new HttpException("Final data lower than initial data!", HttpStatus.NOT_FOUND);
        }
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getPurchaseByDate(beginDate, endDate);
        return this.createPurchaseObject(purchasesFromEntity);
    }

    public async getPurchaseByOrderId (orderId: number){
        const purchasesFromEntity : PurchaseInterface[] = await this.purchaseRepository.getPurchaseByOrderId(orderId);
        return this.createPurchaseByOrderId(purchasesFromEntity);
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

    /** Auxiliary method to create an object from result of dataBase
     *
     * @param purchasesFromEntity is the list of results from dataBase
     * @private
     */
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
        throw new HttpException("No results found!", HttpStatus.NOT_FOUND);
    }

    /** Auxiliary method to create the first purchase that is not in the resultant object to return
     *
     * @param purchasesFromEntity is the list of results from dataBase
     * @private
     */
    private createFirstPurchase(purchasesFromEntity : PurchaseInterface[]): Purchase {
        const firstPurchase: PurchaseInterface = purchasesFromEntity[0];
        const initialPurchase: Purchase = new Purchase(firstPurchase.userId, firstPurchase.userName);
        initialPurchase.addOrder(firstPurchase.orderId, firstPurchase.date);

        return initialPurchase;
    }

    /** Auxiliary method to create an object from result of dataBase by orderId
     *
     * @param purchasesFromEntity is the list of results from dataBase
     * @private
     */
    private createPurchaseByOrderId(purchasesFromEntity : PurchaseInterface[]){
        if(purchasesFromEntity.length > 0){
            let purchasesListObject: Purchases = new Purchases(this.createFirstPurchase(purchasesFromEntity));

            purchasesFromEntity.map(purchaseFromEntity => {
                let purchase = purchasesListObject.getPurchase(purchaseFromEntity.userId);

                if(purchase){
                    let order = purchase.getOrder(purchaseFromEntity.orderId);

                    if(order){
                        order.addProduct(purchaseFromEntity.productId, purchaseFromEntity.value);
                    }
                }
            })
            return purchasesListObject;
        }
        throw new HttpException("No results found!", HttpStatus.NOT_FOUND);
    }

    /** Auxiliary method to get the principal Purchase of the list, or create a new if not exists
     *
     * @param purchasesListObject is the list of all purchases
     * @param purchaseFromEntity is the current purchase
     * @private
     */
    private getCurrentPurchaseFromList(purchasesListObject: Purchases, purchaseFromEntity: PurchaseInterface): Purchase {
        let purchase = purchasesListObject.getPurchase(purchaseFromEntity.userId);

        if(!purchase){
            purchase = purchasesListObject.addPurchase(purchaseFromEntity.userId, purchaseFromEntity.userName);
        }
        return purchase;
    }

    /** Auxiliary method to get the principal Order from a principal purchase, or create a new if not exists
     *
     * @param purchase is the principal purchase from the list
     * @param purchaseFromEntity is the current purchase
     * @private
     */
    private getCurrentOrderFromPurchase(purchase: Purchase, purchaseFromEntity: PurchaseInterface): Order {
        let order = purchase.getOrder(purchaseFromEntity.orderId);

        if(!order){
            order = purchase.addOrder(purchaseFromEntity.orderId, purchaseFromEntity.date);
        }
        return order;
    }

}
export default PurchaseBusiness;
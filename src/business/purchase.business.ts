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


    /** Manipulate the text given from the file to an object to include in database
     *
     * @param text is the content information of the original file
     */
    public async createPurchases (text: string){
        const listOfPurchasesText: string[] = text.split("\n")

        listOfPurchasesText.map(async purchaseText => {

            let initialPurchase: any = {
                userId: "",
                orderId: "",
                productId: "",
                userName: "",
                value: "",
                date: "",
                completePurchaseText: purchaseText
            }
            const userIdExpMatch = this.getExpMatchID(initialPurchase.completePurchaseText);
            initialPurchase = this.manipulatePurchaseObject("userId", initialPurchase, userIdExpMatch);

            const userNameExpMatch = this.getExpMatchUserName(initialPurchase.completePurchaseText);
            initialPurchase = this.manipulatePurchaseObject("userName", initialPurchase, userNameExpMatch);

            const orderIdExpMatch = this.getExpMatchID(initialPurchase.completePurchaseText);
            initialPurchase = this.manipulatePurchaseObject("orderId", initialPurchase, orderIdExpMatch);

            const productIdExpMatch = this.getExpMatchID(initialPurchase.completePurchaseText);
            initialPurchase = this.manipulatePurchaseObject("productId", initialPurchase, productIdExpMatch);

            initialPurchase = this.setDate(initialPurchase);
            initialPurchase = this.setValue(initialPurchase);


            if (this.isAllFieldsWithValue(initialPurchase)) {
                await this.purchaseRepository.createPurchase(
                    parseFloat(initialPurchase.userId),
                    initialPurchase.userName,
                    parseFloat(initialPurchase.orderId),
                    parseFloat(initialPurchase.productId),
                    parseFloat(initialPurchase.value.toString()),
                    parseInt(initialPurchase.date)
                );
            } // TODO incluir mensagem de erro
        })
        return "";
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

    /** Auxiliary method to set infos of the next object
     *
     * @param fieldName is the name of field in the auxiliary object Purchase
     * @param initialPurchase is the auxiliary object of Purchase
     * @param fieldExpMatch is the regex applied to get the current value
     * @private
     */
    private manipulatePurchaseObject(fieldName: string, initialPurchase: any, fieldExpMatch: RegExpMatchArray | null): any {
        if(fieldExpMatch){
            const lengthCompletePurchaseText = initialPurchase.completePurchaseText.length;
            initialPurchase[fieldName] = fieldExpMatch[0];
            initialPurchase.completePurchaseText = initialPurchase.completePurchaseText.slice(initialPurchase[fieldName].length, lengthCompletePurchaseText);
        }
        return initialPurchase;
    }

    /** Auxiliary method to validate if all information from the auxiliary Purchase object is filled
     *
     * @param initialPurchase is the auxiliary object of Purchase
     * @private
     */
    private isAllFieldsWithValue(initialPurchase: any){
        return initialPurchase.userId.length > 0 &&
            initialPurchase.orderId.length > 0 &&
            initialPurchase.productId.length > 0 &&
            initialPurchase.userName.length > 0 &&
            initialPurchase.date.length > 0;
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

    /** Auxiliary method to get the ID from the next information in the line
     *
     * @param auxTextPurchase is the text modified of the content file
     * @private
     */
    private getExpMatchID(auxTextPurchase: string){
        const regexID = '([0-9]){10}';
        return auxTextPurchase.match(regexID);
    }

    /** Auxiliary method to get the userName from the next information in the line
     *
     * @param auxTextPurchase is the text modified of the content file
     * @private
     */
    private getExpMatchUserName(auxTextPurchase: string){
        const regexUserName = '(\\s)+(([A-Za-z]|[\\s]|[.]|[\']){1,45})';
        return auxTextPurchase.match(regexUserName);
    }

    /** Auxiliary method to set the date in the auxiliary object, by getting the next information in the line
     *
     * @param initialPurchase is the auxiliary object of Purchase
     * @private
     */
    private setDate(initialPurchase: any){
        const lengthCompletePurchaseText = initialPurchase.completePurchaseText.length;
        const sizeOfDate = lengthCompletePurchaseText - 8;

        initialPurchase.date = initialPurchase.completePurchaseText.slice(sizeOfDate, lengthCompletePurchaseText);
        initialPurchase.completePurchaseText = initialPurchase.completePurchaseText.slice(0, sizeOfDate);

        return initialPurchase;
    }

    /** Auxiliary method to set the value of the product in the auxiliary object, by getting the next information in the line
     *
     * @param initialPurchase is the auxiliary object of Purchase
     * @private
     */
    private setValue(initialPurchase: any){
        initialPurchase.value = initialPurchase.completePurchaseText;
        initialPurchase.completePurchaseText = '';
        return initialPurchase;
    }

}
export default PurchaseBusiness;
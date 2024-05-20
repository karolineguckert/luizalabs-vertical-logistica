import {Injectable} from "@nestjs/common";
import PurchaseBusiness from "./purchase.business";

@Injectable()
class ManipulateFileService {
    constructor(private purchaseBusiness: PurchaseBusiness) {}

    /** Manipulate the text given from the file to an object to include in database
     *
     * @param text is the content information of the original file
     */
    public async createPurchasesFromContentOfFile (text: string){
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
                await this.purchaseBusiness.createPurchase(initialPurchase);
            }
        })
        return "Records added successfully!";
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
export default ManipulateFileService;
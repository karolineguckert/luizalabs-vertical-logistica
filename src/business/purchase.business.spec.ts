import PurchaseBusiness from "./purchase.business";
import PurchaseRepository from "../repository/purchase.repository";
import PurchaseInterface from "../entity/purchase.entity";

describe("purchaseBusiness", ()=> {
    const purchaseRepository = {
        getAllPurchases: jest.fn(() => {
            return [{
                userId: 70,
                userName: "Palmer Prosacco",
                orderId: 753,
                productId: 3,
                value: 1836.74,
                date: 20210308,
            }] as PurchaseInterface[]
        }),
    } as unknown as PurchaseRepository;

    it("should return all purchases", async () => {
        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);
        const result = await purchaseBusiness.getAllPurchases();
        expect(JSON.stringify(result)).toBe(JSON.stringify({
            purchases: [
                {
                    user_id: 70,
                    name: "Palmer Prosacco",
                    orders: [
                        {
                            order_id: 753,
                            total: 1836.74,
                            date: "2021-03-08",
                            products: [
                                {
                                    product_id: 3,
                                    value: 1836.74
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    })

});
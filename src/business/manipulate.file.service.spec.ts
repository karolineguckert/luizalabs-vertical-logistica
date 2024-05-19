import PurchaseRepository from "../repository/purchase.repository";
import PurchaseInterface from "../entity/purchase.entity";
import PurchaseBusiness from "./purchase.business";
import ManipulateFileService from "./manipulate.file.service";
import purchaseBusiness from "./purchase.business";
import manipulateFileService from "./manipulate.file.service";

describe("manipulateFileService", ()=> {
    const purchasePalmer = [
        {
            userId: 70,
            userName: "Palmer Prosacco",
            orderId: 753,
            productId: 3,
            value: 1836.74,
            date: 20210308,
        }
    ] as PurchaseInterface[];

    const resultOfPalmer =  {
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
    };

    it('should create all purchases and return message "Records added successfully!"', async () => {
        const purchaseBusiness = {
            createPurchase: jest.fn(() => {
                return purchasePalmer;
            }),
        } as unknown as PurchaseBusiness;

        const manipulateFileService = new ManipulateFileService(purchaseBusiness);
        const result = await manipulateFileService.createPurchasesFromContentOfFile("0000000046                                Vanetta Bogan00000004900000000005     1230.7720210716");
        expect(result).toBe("Records added successfully!");
    })
});
import PurchaseBusiness from "./purchase.business";
import PurchaseRepository from "../repository/purchase.repository";
import PurchaseInterface from "../entity/purchase.entity";

describe("purchaseBusiness", ()=> {
    const purchase = [
        {
            userId: 70,
            userName: "Palmer Prosacco",
            orderId: 753,
            productId: 3,
            value: 1836.74,
            date: 20210308,
        },
        {
            userId: 71,
            userName: "Alan Prosacco",
            orderId: 754,
            productId: 5,
            value: 16.74,
            date: 20210208,
        }
    ] as PurchaseInterface[]

    const purchasePalmer = [
        {
            userId: 70,
            userName: "Palmer Prosacco",
            orderId: 753,
            productId: 3,
            value: 1836.74,
            date: 20210308,
        }
    ] as PurchaseInterface[]

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


    const resultOfPurchaseAll = {
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
            },
            {
                user_id: 71,
                name: "Alan Prosacco",
                orders: [
                    {
                        order_id: 754,
                        total: 16.74,
                        date: "2021-02-08",
                        products: [
                            {
                                product_id: 5,
                                value: 16.74
                            }
                        ]
                    }
                ]
            }
        ]
    };

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return all purchases", async () => {
        const purchaseRepository = {
            getAllPurchases: jest.fn(() => {
                return purchase;
            }),
        } as unknown as PurchaseRepository;

        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);
        const result = await purchaseBusiness.getAllPurchases();
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
    })

    it(`should throw error "No results found!"`, async () => {
        const purchaseRepository = {
            getAllPurchases: jest.fn(() => {
                return [] as PurchaseInterface[]
            }),
        } as unknown as PurchaseRepository;

        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);

        try {
            await purchaseBusiness.getAllPurchases();
        } catch (e: any) {
            expect(e.message).toBe("No results found!");
        }
    })

    it(`should return all purchases in date period equal`, async () => {
        const purchaseRepository = {
            getPurchaseByDate: jest.fn(() => {
                return purchasePalmer
            }),
        } as unknown as PurchaseRepository;
        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);
        const result = await purchaseBusiness.getPurchaseByDate(20210308, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
    });

    it(`should return all purchases in date period that initial is lower than final`, async () => {
        const purchaseRepository = {
            getPurchaseByDate: jest.fn(() => {
                return purchase
            }),
        } as unknown as PurchaseRepository;
        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);
        const result = await purchaseBusiness.getPurchaseByDate(20210208, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
    });

    it(`should return all purchases in date period that initial is lower than final`, async () => {
        const purchaseRepository = {
            getPurchaseByDate: jest.fn(() => {
                return purchasePalmer
            }),
        } as unknown as PurchaseRepository;
        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);
        const result = await purchaseBusiness.getPurchaseByDate(20210209, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
    });

    it(`should throw error "Final data lower than initial data!"`, async () => {
        const purchaseRepository = {
            getPurchaseByDate: jest.fn(() => {
                return [] as PurchaseInterface[]
            }),
        } as unknown as PurchaseRepository;
        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);

        try {
            await purchaseBusiness.getPurchaseByDate(20211209, 20210308);
        } catch (e: any) {
            expect(e.message).toBe("Final data lower than initial data!");
        }
    });

    it(`should throw error "No results found!"`, async () => {
        const purchaseRepository = {
            getPurchaseByDate: jest.fn(() => {
                return [] as PurchaseInterface[]
            }),
        } as unknown as PurchaseRepository;

        const purchaseBusiness = new PurchaseBusiness(purchaseRepository);

        try {
            await purchaseBusiness.getPurchaseByDate(20211209, 20211209);
        } catch (e: any) {
            expect(e.message).toBe("No results found!");
        }
    })

});
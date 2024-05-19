import PurchaseInterface from "../entity/purchase.entity";
import PurchaseRepository from "../repository/purchase.repository";
import PurchaseBusiness from "../business/purchase.business";
import {PurchaseController} from "./purchase.controller";
import ManipulateFileService from "../business/manipulate.file.service";

describe("purchaseController", ()=> {
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

    const manipulateFileService = {
        createPurchasesFromContentOfFile: jest.fn(() => {
            return resultOfPurchaseAll;
        }),
    } as unknown as ManipulateFileService;

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should return all purchases", async () => {
        const purchaseBusiness = {
            getAllPurchases: jest.fn(() => {
                return resultOfPurchaseAll;
            }),
        } as unknown as PurchaseBusiness;

        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
        const result = await purchaseController.getAllPurchases();
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
    });

    it(`should throw error "No results found!"`, async () => {
        const purchaseBusiness = {
            getAllPurchases: jest.fn(() => {
                return [] as PurchaseInterface[];
            }),
        } as unknown as PurchaseBusiness;

        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);

        try {
            await purchaseController.getAllPurchases();
        } catch (e: any) {
            expect(e.message).toBe("No results found!");
        }
    })

    it("should return purchase by id", async () => {
        const purchaseBusiness = {
            getPurchaseByOrderId: jest.fn(() => {
                return resultOfPalmer;
            }),
        } as unknown as PurchaseBusiness;

        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
        const result = await purchaseController.getPurchaseByOrderId(753);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
    })

    it(`should throw error "No results found!"`, async () => {
        const purchaseBusiness = {
            getPurchaseByOrderId: jest.fn(() => {
                return [] as PurchaseInterface[]
            }),
        } as unknown as PurchaseBusiness;

        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);

        try {
            await purchaseController.getPurchaseByOrderId(755);
        } catch (e: any) {
            expect(e.message).toBe("No results found!");
        }
    })

    it(`should return all purchases in date period equal`, async () => {
        const purchaseBusiness = {
            getPurchaseByDate: jest.fn(() => {
                return resultOfPalmer;
            }),
        } as unknown as PurchaseBusiness;
        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
        const result = await purchaseController.getPurchaseByDate(20210308, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
    });

    it(`should return all purchases in date period that initial is lower than final`, async () => {
        const purchaseBusiness = {
            getPurchaseByDate: jest.fn(() => {
                return resultOfPurchaseAll;
            }),
        } as unknown as PurchaseBusiness;
        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
        const result = await purchaseController.getPurchaseByDate(20210208, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
    });

    it(`should return all purchases in date period that initial is lower than final`, async () => {
        const purchaseBusiness = {
            getPurchaseByDate: jest.fn(() => {
                return resultOfPalmer;
            }),
        } as unknown as PurchaseBusiness;
        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
        const result = await purchaseController.getPurchaseByDate(20210209, 20210308);
        expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
    });

    it(`should throw error "Final data lower than initial data!"`, async () => {
        const purchaseBusiness = {
            getPurchaseByDate: jest.fn(() => {
                return [] as PurchaseBusiness[];
            }),
        } as unknown as PurchaseBusiness;
        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);

        try {
            await purchaseController.getPurchaseByDate(20211209, 20210308);
        } catch (e: any) {
            expect(e.message).toBe("Final data lower than initial data!");
        }
    });

    it(`should throw error "No results found!"`, async () => {
        const purchaseBusiness = {
            getPurchaseByDate: jest.fn(() => {
                return [] as PurchaseInterface[];
            }),
        } as unknown as PurchaseBusiness;

        const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);

        try {
            await purchaseController.getPurchaseByDate(20211209, 20211209);
        } catch (e: any) {
            expect(e.message).toBe("No results found!");
        }
    })

    // it("should create a purchase", async () => {
    //     const purchaseBusiness = {
    //         createPurchasesFromContentOfFile: jest.fn(() => {
    //             return resultOfPalmer;
    //         }),
    //     } as unknown as PurchaseBusiness;
    //
    //     const purchaseController = new PurchaseController(purchaseBusiness, manipulateFileService);
    //     const file = readFile('./testCreatePurchase.txt')
    //     const result = await purchaseController.createPurchases(file);
    //     expect(result).toBe(resultOfPalmer);
    // });
})

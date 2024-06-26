import ManipulateFileService from "../business/manipulate.file.service";
import PurchaseBusiness from "../business/purchase.business";
import { PurchaseController } from "./purchase.controller";
import PurchaseInterface from "../entity/purchase.entity";

describe("purchaseController", () => {
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
                value: 1836.74,
              },
            ],
          },
        ],
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
                value: 16.74,
              },
            ],
          },
        ],
      },
    ],
  };

  const resultOfPalmer = {
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
                value: 1836.74,
              },
            ],
          },
        ],
      },
    ],
  };

  const manipulateFileService = {
    createPurchasesFromContentOfFile: jest.fn(() => {
      return resultOfPurchaseAll;
    }),
  } as unknown as ManipulateFileService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all purchases", async () => {
    const purchaseBusiness = {
      getAllPurchases: jest.fn(() => {
        return resultOfPurchaseAll;
      }),
    } as unknown as PurchaseBusiness;

    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );
    const result = await purchaseController.getAllPurchases();
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
  });

  it(`should throw error "No results found!"`, async () => {
    const purchaseBusiness = {
      getAllPurchases: jest.fn(() => {
        return [] as PurchaseInterface[];
      }),
    } as unknown as PurchaseBusiness;

    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );

    try {
      await purchaseController.getAllPurchases();
    } catch (e: any) {
      expect(e.message).toBe("No results found!");
    }
  });

  it("should return purchase by id", async () => {
    const purchaseBusiness = {
      getPurchaseByOrderId: jest.fn(() => {
        return resultOfPalmer;
      }),
    } as unknown as PurchaseBusiness;

    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );
    const result = await purchaseController.getPurchaseByOrderId(753);
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
  });

  it(`should throw error "No results found!"`, async () => {
    const purchaseBusiness = {
      getPurchaseByOrderId: jest.fn(() => {
        return [] as PurchaseInterface[];
      }),
    } as unknown as PurchaseBusiness;

    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );

    try {
      await purchaseController.getPurchaseByOrderId(755);
    } catch (e: any) {
      expect(e.message).toBe("No results found!");
    }
  });

  it(`should return all purchases in date period equal`, async () => {
    const purchaseBusiness = {
      getPurchaseByDate: jest.fn(() => {
        return resultOfPalmer;
      }),
    } as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );
    const result = await purchaseController.getPurchaseByDate(
      20210308,
      20210308,
    );
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
  });

  it(`should return all purchases in date period that initial is lower than final`, async () => {
    const purchaseBusiness = {
      getPurchaseByDate: jest.fn(() => {
        return resultOfPurchaseAll;
      }),
    } as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );
    const result = await purchaseController.getPurchaseByDate(
      20210208,
      20210308,
    );
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPurchaseAll));
  });

  it(`should return all purchases in date period that initial is lower than final`, async () => {
    const purchaseBusiness = {
      getPurchaseByDate: jest.fn(() => {
        return resultOfPalmer;
      }),
    } as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );
    const result = await purchaseController.getPurchaseByDate(
      20210209,
      20210308,
    );
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultOfPalmer));
  });

  it(`should throw error "Final data lower than initial data!"`, async () => {
    const purchaseBusiness = {
      getPurchaseByDate: jest.fn(() => {
        return [] as PurchaseBusiness[];
      }),
    } as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );

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

    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateFileService,
    );

    try {
      await purchaseController.getPurchaseByDate(20211209, 20211209);
    } catch (e: any) {
      expect(e.message).toBe("No results found!");
    }
  });

  it("should create a purchase", async () => {
    const manipulateServiceCreate = {
      createPurchasesFromContentOfFile: jest.fn(() => {
        return resultOfPalmer;
      }),
    } as unknown as ManipulateFileService;
    const purchaseBusiness = {} as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
      purchaseBusiness,
      manipulateServiceCreate,
    );

    const file = {
      buffer: {
        toString: jest.fn(() => {
          return "0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308";
        }),
      },
    } as unknown as Express.Multer.File;
    const result = await purchaseController.createPurchases(file);
    expect(result).toBe(resultOfPalmer);
  });

  it('should throw "The current file is empty!"', async () => {
    const manipulateServiceCreate = {
      createPurchasesFromContentOfFile: jest.fn(() => {
        return null;
      }),
    } as unknown as ManipulateFileService;

    const purchaseBusiness = {} as unknown as PurchaseBusiness;
    const purchaseController = new PurchaseController(
        purchaseBusiness,
        manipulateServiceCreate,
    );

    try {
      await purchaseController.createPurchases(null);
    } catch (e: any) {
      expect(e.message).toBe("The current file is empty!");
    }
  });
});

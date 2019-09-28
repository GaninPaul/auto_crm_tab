import { flow, types } from "mobx-state-tree";
import { SALE_PRODUCT_URL } from "../utils/constants";
import { post } from "../service/api";

const Product = types.model({
  product: types.number,
  count: types.number,
  price: types.number
});

const ItemsSales = types
  .model({
    products: types.optional(types.array(Product), []),
    totalAmount: types.optional(types.number, 0),
    isValidate: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      addProduct: ({ category }) => {
        self.products.push({ product: category, count: 1, price: 0.0 });
      },
      calcSum: () => {
        self.totalAmount = 0;
        self.products.forEach(item => {
          self.totalAmount += item.price;
        });
      },
      editProduct: (item, key) => {
        self.products[key] = {
          product: parseInt(item.product),
          count: 1,
          price: parseFloat(item.price)
        };
        self.calcSum();
      },
      deleteProduct: rowId => {
        const newData = [...self.products];
        newData.splice(rowId, 1);
        self.products = newData;
        self.calcSum();
      },
      clearProduct: () => {
        self.products.clear();
        self.isValidate = true;
        self.totalAmount = 0;
      },
      isValid: () => {
        let isValidete = false;
        self.isValidate = true;
        self.products.forEach(item => {
          if (!item.price > 0 || !item.product > 0) {
            self.isValidate = false;
            isValidete = true;
          }
        });
        return isValidete;
      },
      saleProducts: flow(function*() {
        self.totalAmount = 0;
        yield post({
          url: SALE_PRODUCT_URL,
          data: {
            product_list: self.products.slice(),
            purchase_type: "custom",
            payment_method: "cash"
          }
        });
        self.clearProduct();
      })
    };
  })
  .create();

export default ItemsSales;

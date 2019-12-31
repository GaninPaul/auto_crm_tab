import { flow, types } from "mobx-state-tree";
import { get } from "../service/api";
import moment from "moment";

const Logs = types
  .model({
    isOpenCheckBox: types.optional(types.boolean, false),
    cashierChange: types.optional(types.string, "")
  })
  .actions(self => {
    return {
      init: flow(function*() {
        const response = yield get({ url: "/api/shop/cashier/check" });
        if (response && response.cashier && response.cashier === "open") {
          self.isOpenCheckBox = true;
        }
      }),
      openCheckBox: flow(function*() {
        yield get({ url: "/api/shop/cashier/open" });
        yield new Promise((resolve, _) => {
          setTimeout(() => {
            resolve();
          }, 5000);
        });
        self.cashierChange = moment().format("HH:mm DD-MM-YYYY");
        self.isOpenCheckBox = true;
      }),
      closeCheckBox: flow(function*() {
        yield get({ url: "/api/shop/cashier/close" });
        yield new Promise((resolve, reject) => {
          setTimeout(resolve, 5000);
        });
        self.isOpenCheckBox = false;
      })
    };
  })
  .create();

export default Logs;

import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import Utility from "../services/UtilityService";

class ReportStore {
  loading = false;
  searching = false;
  receivables = [];
  tickets = [];
  assets = [];
  sales = [];

  getSalesReport = (data) => {
    try {
      this.searching = true;
      backend.post("report/sales", data).then((res) => {
        this.searching = false;
        if (res.data.status === 200) {
          this.sales = res.data.data;
          this.close = true;
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  getAssetReport = (data) => {
    try {
      this.searching = true;
      backend.post("report/assets", data).then((res) => {
        this.searching = false;
        if (res.data.status === 200) {
          this.assets = res.data.data;
          this.close = true;
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  getSalesReport = (data) => {
    try {
      this.searching = true;
      backend.post("report/sales", data).then((res) => {
        this.searching = false;
        if (res.data.status === 200) {
          this.sales = res.data.data;
          this.close = true;
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  get allSales() {
    return Object.keys(this.sales || {}).map((key) => ({
      ...this.sales[key],
      uid: key,
    }));
  }

  get info() {
    return {
      total: this.sales.length,
      status: this.sales.filter((cat) => cat.status).length,
    };
  }
}

decorate(ReportStore, {
  searching: observable,
  close: observable,
  error: observable,
  sales: observable,
  info: computed,
  loading: observable,
  getSalesReport: action,
  getAssetReport: action,
  payNow: action,
});

export default createContext(new ReportStore());

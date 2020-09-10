import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
import Utility from "../services/UtilityService";
class AssetStore {
  constructor() {
    this.fetchAsset();
  }

  error = false;
  close = false;
  exist = false;
  loading = false;
  deleting = false;
  sending = false;
  asset = [];
  assets = [];
  allocations = [];

  toggleClose = () => {
    this.close = false;
  };
  fetchAsset = () => {
    this.loading = true;
    backend.get("asset").then((res) => {
      this.assets = res.data.data;
      this.loading = false;
    });
  };
  confirmAsset = (sub, title) => {
    backend.get("asset/" + sub + "/" + title + "/exist").then((res) => {
      this.exist = res.data.exist;
    });
  };
  createAsset = (data) => {
    try {
      this.sending = true;
      backend.post("asset", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAsset();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (err) {
      this.sending = false;
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  updateAsset = (data) => {
    try {
      this.sending = true;
      backend.post("asset/update", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAsset();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  transferBulkAsset = (data) => {
    try {
      this.sending = true;
      backend.post("asset/bulk/transfer", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAsset();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeAsset = (id) => {
    try {
      this.deleting = true;
      backend.delete("asset/" + id).then((res) => {
        this.deleting = false;
        if (res.status === 200) {
          this.fetchAsset();
          Beedy("success", res.data.message);
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  getAssetById = (id) => {
    try {
      this.loading = true;
      backend
        .get("asset/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.asset = res.data.data[0];
          }
        })
        .catch((err) => {
          console.log("getProductById", err.code);
          console.log("getProductById", err.message);
          console.log("getProductById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  getAssetAllocations = (id) => {
    try {
      this.loading = true;
      backend
        .get("allocation/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.allocations = res.data.data;
          }
        })
        .catch((err) => {
          console.log("getProductById", err.code);
          console.log("getProductById", err.message);
          console.log("getProductById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  toggleStatus = (data) => {
    try {
      this.sending = true;
      backend.post("asset/status", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.getAssetById(data.id);
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  get info() {
    return Object.keys(this.assets || {}).map((key) => ({
      ...this.assets[key],
      uid: key,
    }));
  }
  get myAllocation() {
    return Object.keys(this.allocations || {}).map((key) => ({
      ...this.allocations[key],
      uid: key,
    }));
  }
  get totalAsset() {
    return this.assets.length;
  }
}
decorate(AssetStore, {
  sending: observable,
  deleting: observable,
  close: observable,
  error: observable,
  exist: observable,
  loading: observable,
  asset: observable,
  assets: observable,
  allocations: observable,
  info: computed,
  myAllocation: computed,
  totalAsset: computed,
  confirmAsset: action,
  createAsset: action,
  transferBulkAsset: action,
  updateAsset: action,
  removeAsset: action,
  getAssetById: action,
  getAssetAllocations: action,
  toggleClose: action,
});

export default createContext(new AssetStore());

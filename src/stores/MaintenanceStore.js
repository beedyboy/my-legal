import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
import Utility from "../services/UtilityService";

class MaintenanceStore {
  constructor() {
    this.fetchMaintenance();
  }

  close = false;
  loading = false;
  sending = false;
  maintenance = [];

  toggleClose = () => {
    this.close = false;
  };
  fetchMaintenance = () => {
    this.loading = true;
    backend.get("maintenance").then((res) => {
      this.maintenance = res.data.data;
      this.loading = false;
    });
  };

  createMaintenance = (data) => {
    try {
      this.sending = true;
      backend.post("maintenance", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchMaintenance();
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

  toggleStatus = (data) => {
    try {
      this.sending = true;
      backend.post("maintenance/status", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.getMaintenanceById(data.id);
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
    return Object.keys(this.maintenance || {}).map((key) => ({
      ...this.maintenance[key],
      uid: key,
    }));
  }
}
decorate(MaintenanceStore, {
  sending: observable,
  close: observable,
  loading: observable,
  maintenance: observable,
  info: computed,
  createMaintenance: action,
  toggleClose: action,
});

export default createContext(new MaintenanceStore());

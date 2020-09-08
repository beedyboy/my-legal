import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
import Utility from "../services/UtilityService";
class AllocationStore {
  constructor() {
    this.fetchAllocation();
  }

  error = false;
  close = false; 
  loading = false;
  deleting = false;
  sending = false;  
  allocations = [];

  toggleClose = () => {
    this.close = false;
  };
  fetchAllocation = () => {
    this.loading = true;
    backend.get("allocation").then((res) => {
      this.allocations = res.data.data;
      this.loading = false;
    });
  };
  
  createDept = (data) => {
    try {
      this.sending = true;
      backend.post("allocation/departmental", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAllocation();
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

  updateDept = (data) => {
    try {
      this.sending = true;
      backend.post("allocation/departmental/update", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAllocation();
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
  
  createIndividual = (data) => {
    try {
      this.sending = true;
      backend.post("allocation/individual", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAllocation();
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

  updateIndividual = (data) => {
    try {
      this.sending = true;
      backend.post("allocation/individual/update", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchAllocation();
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
  removeAllocation = (id) => {
    try {
      this.deleting = true;
      backend.delete("allocation/" + id).then((res) => {
        this.deleting = false;
        if (res.status === 200) {
          this.fetchAllocation();
          Beedy("success", res.data.message);
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }; 
  getAllocationById = (id) => {
    try {
      this.loading = true;
      backend
        .get("allocation/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.allocation = res.data.data[0];
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
      backend.post("allocation/status", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.getAllocationById(data.id);
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
    return Object.keys(this.allocations || {}).map((key) => ({
      ...this.allocations[key],
      uid: key,
    }));
  } 
}
decorate(AllocationStore, {
  sending: observable,
  deleting: observable,
  close: observable,
  error: observable, 
  loading: observable, 
  allocations: observable, 
  info: computed,   
  createDept: action,
  createIndividual: action,
  updateDept: action,
  updateIndividual: action,
  removeAllocation: action,
  getAllocationById: action, 
  toggleClose: action,
});

export default createContext(new AllocationStore());

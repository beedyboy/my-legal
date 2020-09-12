import { decorate, observable, action } from "mobx";
import { createContext } from "react"; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";

class CompanyStore { 

  error = false;
  loading = false;
  profiles = [];

  getProfile = () => {
    this.loading = true;
    backend.get("company/getProfile/").then((res) => {
      this.loading = false;
      if (res.status === 200) {
        this.profiles = res.data.data;
      }
    });
  };

  updateProfile = (data) => {
    backend.post("company/", data).then((res) => {
      if (res.data.status === 200) {
        this.getProfile();
        Beedy("success", res.data.message);
      }
    });
  };
}
decorate(CompanyStore, {
  error: observable,
  profiles: observable,
  loading: observable,
  getProfile: action,
  updateProfile: action,
});

export default createContext(new CompanyStore());

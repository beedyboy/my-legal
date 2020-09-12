import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import Utility from "../services/UtilityService";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";

class UserStore {
  constructor() {
    this.fetchUsers();
  }
  isAuthenticated = false;
  error = null;
  loading = false;
  emailExist = false;
  close = false;
  closeACL = false;
  closeLogin = false;
  users = [];
  profile = [];
  profiles = [];

  toggleClose = () => {
    this.close = false;
  };
  toggleCloseLogin = () => {
    this.closeLogin = false;
  };
  toggleACLClose = () => {
    this.closeACL = false;
  };

  fetchUsers = () => {
    this.loading = true;
    backend.get("user").then((res) => {
      this.users = res.data;
      this.loading = false;
    });
  };
  confirmEmail = (data) => {
    backend.get("user/" + data + "/exist").then((res) => {
      this.emailExist = res.data.exist;
    });
  };

  createStaff = (data) => {
    try {
      this.sending = true;
      backend.post("user", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchUsers();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
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
  createLogin = (data) => {
    this.sending = true;
    backend.post("user/create/login", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.fetchUsers();
        Beedy("success", res.data.message);
        this.closeLogin = true;
      } else {
        Beedy("error", res.data.message);
      }
    });
  };
  updateStaff = (data) => {
    this.sending = true;
    backend.post("user/update", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.fetchUsers();
        Beedy("success", res.data.message);
        this.close = true;
      } else {
        Beedy("error", res.data.message);
      }
    });
  };
  removeUser = (id) => {
    try {
      backend.delete("user/" + id).then((res) => {
        if (res.status === 200) {
          this.fetchUsers();
          Beedy("success", res.data.message);
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  getProfile = () => {
    backend.get("user/get/profile/").then((res) => {
      if (res.data.status === 200) {
        this.profiles = res.data.data;
      }
    });
  };

  getProfileById = (id) => {
    backend.get("user/profile/" + id).then((res) => {
      if (res.data.status === 200) {
        this.profile = res.data.data; 
      }
    });
  };

  updateProfile = (data) => {
    this.sending = true;
    backend.post("user/update/profile", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.getProfile();
        Beedy("success", res.data.message);
      } else {
        Beedy("error", res.data.message);
      }
    });
  };
  login = (Admin) => {
    this.sending = true;
    this.error = null;
    backend.post("auth/auth", Admin).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        Utility.save("name", res.data.staff[0].lastname);
        Utility.save("staff_token", res.data.token);
        Utility.save("acl", res.data.staff[0].acl);
        this.isAuthenticated = true;
      } else {
        Beedy("error", res.data.msg);
      }
    });
  };

  loginSuccessful = () => {
    this.isAuthenticated = false;
  };
  toggleUser = (data) => {
    backend.post("user/toggle", data).then((res) => {
      if (res.data.status === 200) {
        this.fetchUsers();
      }
    });
  };

  assignRole = (data) => {
    this.sending = true;
    backend.post("user/acl", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.fetchUsers();
        this.closeACL = true;
        Beedy("success", res.data.message);
      } else {
        Beedy("error", res.data.message);
      }
    });
  };
  get info() {
    return Object.keys(this.users || {}).map((key) => ({
      ...this.users[key],
      uid: key,
    }));
  }
  get userSelect() {
    return Object.keys(this.users || {}).map((key) => ({
      value: this.users[key].id,
      label: this.users[key].firstname + " " + this.users[key].lastname,
    }));
  }

  get totalUser() {
    return this.users.length;
  }
  get userStat() {
    return {
      total: this.users.length,
      completed: this.users.filter((User) => User.completed).length,
      notCompleted: this.users.filter((User) => !User.completed).length,
    };
  }
}
decorate(UserStore, {
  isAuthenticated: observable,
  error: observable,
  loading: observable,
  users: observable,
  profile: observable,
  profiles: observable,
  sending: observable,
  emailExist: observable,
  closeLogin: observable,
  closeACL: observable,
  toggleClose: action,
  fetchUsers: action,
  getProfile: action,
  getProfileById: action,
  updateProfile: action,
  createStaff: action,
  confirmEmail: action,
  removeUser: action,
  login: action,
  logOut: action,
  loginSuccessful: action,
  assignRole: action,
  createLogin: action,
  toggleCloseLogin: action,
  toggleACLClose: action,
  info: computed,
  userSelect: computed,
  totalUser: computed,
  toggleUser: action,
});

export default createContext(new UserStore());

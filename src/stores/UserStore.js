import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import Utility from "../services/UtilityService";
import { backend } from "../services/APIService";


class UserStore {

     isAuthenticated = false;
     error = null;
     loading = false;
     emailExist = false;

    users = [];
    profiles = [];

   addUser = (User) => {
    
    // this.users.push({ ...User, id: uuid() })
  }
  fetchUsers = () => {
    this.loading = true;
    backend.get('user').then( res => {  
          this.users = res.data;
      this.loading = false;
        
    }); 
  }
  confirmEmail = (data) => {
    backend.get('user/' + data + '/exist').then( res => { 
      this.emailExist = res.data.exist;
    })
  }
   

  createStaff = (data) => {
    try {    
      this.sending = true;
      backend.post('user', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchUsers(); 
          this.message = res.data.message;  
        } else {
          this.error = true;
        }
        
      })  
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }  
  }
  createLogin = (data) => {
    this.sending = true;
    backend.post('user/create/login', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchUsers();
      }
    })
   
 }
  updateStaff = (data) => {
    this.sending = true;
    backend.post('user/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchUsers();
      }
    }) 
 }
   removeStaff = (id) => {
    // this.Staffs = this.Staffs.filter(Staff => Staff.id !== id)
    console.log(id);
    backend.delete('user/' + id).then( res => {
      if(res.status === 200) {
        this.fetchUsers();
        this.message = res.message;
        // return <Toast opens={true} type="success" message={res.message} />;
      }
    })
  }
      
  getProfile = () => {
    backend.get('user/get/profile/').then( res => {
      // console.log('pay', res.data.data.fullname);
      if(res.data.status === 200) {
        this.profiles = res.data.data;
      }
    })
  }
   login = (Admin) => {
    this.sending = true;
    this.error = null;
    backend.post('auth/auth', Admin).then( res => { 
      if(res.data.status === 200) {  
        this.sending = false; 
        Utility.save('name', res.data.staff.lastname); 
        Utility.save('staff_token', res.data.token); 
        this.isAuthenticated = true; 
      }
    })
  }

    
  loginSuccessful = () => {
    this.isAuthenticated = false;
  }
   toggleUser = (data) => {
     backend.post('user/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.fetchUsers();
       }
     })
    
  }

  removeUser = (id) => {
    backend.delete('user/' + id).then( res => {
      if(res.status === 200) {
        this.fetchUsers();
        this.message = res.message; 
      }
    })
  }
  get info() {
    return  Object.keys(this.users || {}).map(key => ({...this.users[key], uid: key}));
   }
   get profile() {
    var data = []
    const d = {
      id: this.profiles.id,
      fullname: this.profiles.fullname,
      username: this.profiles.username,
      email: this.profiles.email,
      phone: this.profiles.phone,
      password: this.profiles.password,
      status: this.profiles.status,
      image: this.profiles.image,
      role: this.profiles.role,
      roleName: this.profiles.roleName,
      created_at: this.profiles.created_at,
      updated_at: this.profiles.updated_at
    }
     
       data.push(d);  
     return data; 
    }
    
   get stat() {
    return {
      total: this.users.length,
      completed: this.users.filter(User => User.completed).length,
      notCompleted: this.users.filter(User => !User.completed).length,
    }
  }
}
decorate(UserStore, {
  isAuthenticated: observable,
  error: observable,
  loading: observable,
  users: observable,
  profiles: observable,
  sending: observable,
  emailExist: observable,
  addUser: action,
  fetchUsers: action,
  removeUser: action,
  getProfile: action,
  confirmEmail: action,
  login: action,
  logOut: action,
  loginSuccessful: action,
  createLogin: action,
  info: computed,
  stat: computed, 
  profile: computed, 
  toggleUser: action
})

export default createContext(new UserStore())

import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
 
class DepartmentStore {
  constructor() {
    this.fetchDepartments();  
  }
  
     error = false;
     exist = false;
     close = false;
     loading = false;
     sending = false; 
     departments = [] 

    fetchDepartments = () => {
      this.loading = true;
     try {
      backend.get('department').then( res => {  
        this.departments = res.data;
          this.loading = false; 
        }); 
     } catch (error) {
       console.log(error);
     }
  }

  toggleClose = () => { 
    this.close = false;
  }
  
  confirmName = (data) => {
    backend.get('department/' + data + '/exist').then( res => { 
      this.exist = res.data.exist;
    })
  }
  createDept = (data) => {
    try {    
      this.sending = true;
      backend.post('department', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchDepartments(); 
          this.close = true;   
          Beedy('success', res.data.message) ;
         } else {
           Beedy('error', res.data.message) 
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

  updateDept = (data) => {
   try {
    this.sending = true;
    backend.post('department/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchDepartments();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
   } catch (error) {
     console.log(error)
   }   
 }
   removeDepartment = (id) => { 
   try {
    backend.delete('department/' + id).then( res => {
      if(res.status === 200) {
        this.fetchDepartments();
        Beedy('success', res.data.message)
      } else {
        Beedy('error', res.data.message)
      }
    })
   } catch (error) {
     console.log(error)
   }
  }
  get info() {
    return  Object.keys(this.departments || {}).map(key => ({...this.departments[key], uid: key}));
  }
  
  get deptSelect() {
    return Object.keys(this.departments || {}).map((key) => ({
      value: this.departments[key].id,
      label: this.departments[key].name,
    }));
  } 

} 
decorate(DepartmentStore, { 
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  info: computed, 
  deptSelect: computed, 
  loading: observable,
  departments: observable, 
  confirmName: action,
  createDept: action,
  updateDept: action,
  removeDepartment: action,
  toggleClose: action
})

 
export default createContext(new DepartmentStore())

import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
// import  Utility from "../shared/Storage";  
class DepartmentStore {
  constructor() {
    this.fetchDepartments(); 
    
  }
  
     error = false;
     message = '';
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
  
  createDept = (data) => {
    try {    
      this.sending = true;
      backend.post('department', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchDepartments(); 
          this.message = res.data.message; 
          this.response = true;   
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

  updateDept = (data) => {
    this.sending = true;
    backend.post('department/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchDepartments();
      }
    })
   
 }
   removeDepartment = (id) => {
    // this.Departments = this.Departments.filter(Department => Department.id !== id)
    console.log(id);
    backend.delete('department/' + id).then( res => {
      if(res.status === 200) {
        this.fetchDepartments();
        this.message = res.message;
        // return <Toast opens={true} type="success" message={res.message} />;
      }
    })
  }
  get info() {
   var data = []
    this.departments.map(res => {
      const d = {
        id: res.id,
        name: res.name,
        description: res.description,
        created_at: res.created_at,
        updated_at: res.updated_at, 
      }
      data.push(d);
    });
    return data;
    
  }

} 
decorate(DepartmentStore, { 
  sending: observable,
  message: observable,
  error: observable,
  info: computed, 
  loading: observable,
  departments: observable, 
  createDept: action,
  updateDept: action,
  removeDepartment: action
})

 
export default createContext(new DepartmentStore())

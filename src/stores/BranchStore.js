import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
// import  Utility from "../shared/Storage";  
class BranchStore {
  constructor() {
    this.fetchBranch(); 
    
  }
  
    error = false;
    close = false;
    exist = false;
     loading = false;
     sending = false; 
     branch = [] 

     toggleClose = () => { 
       this.close = false;
     }
    fetchBranch = () => {
      this.loading = true;
      backend.get('branch').then( res => {  
      this.branch = res.data;
        this.loading = false; 
      }); 
  }
  confirmName = (data) => {
    backend.get('branch/' + data + '/exist').then( res => { 
      this.exist = res.data.exist;
    })
  }
  createBranch = (data) => {
    try {    
      this.sending = true;
      backend.post('branch', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchBranch(); 
          Beedy('success', res.data.message) 
          this.close = true;   
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

  updateBranch = (data) => {
   try {
    this.sending = true;
    backend.post('branch/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchBranch();
       Beedy('success', res.data.message) 
       this.close = true;   
      } else {
        Beedy('error', res.data.message) 
      }
    })
   } catch (error) {
     console.log(error)
   }
   
 }
   removeBranch = (id) => { 
   try { 
    backend.delete('branch/' + id).then( res => {
      if(res.status === 200) {
        this.fetchBranch();
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
    return  Object.keys(this.branch || {}).map(key => ({...this.branch[key], uid: key})); 
  }
  get stats() {
  	return this.branch.length 
  }
  get branchSelect() {
    return Object.keys(this.branch || {}).map((key) => ({
      value: this.branch[key].id,
      label: this.branch[key].name,
    }));
  } 

} 
decorate(BranchStore, { 
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  info: computed, 
  stats: computed, 
  branchSelect: computed, 
  loading: observable,
  branch: observable, 
  confirmName: action,
  createBranch: action,
  updateBranch: action,
  removeBranch: action,
  toggleClose: action
})

 
export default createContext(new BranchStore())

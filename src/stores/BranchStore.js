import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
// import  Utility from "../shared/Storage";  
class BranchStore {
  constructor() {
    this.fetchBranch(); 
    
  }
  
     error = false;
     message = '';
     loading = false;
     sending = false; 
     branch = [] 

    fetchBranch = () => {
      this.loading = true;
      backend.get('branch').then( res => {  
      this.branch = res.data;
        this.loading = false; 
      }); 
  }
  
  createBranch = (data) => {
    try {    
      this.sending = true;
      backend.post('branch', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchBranch(); 
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

  updateBranch = (data) => {
    this.sending = true;
    backend.post('branch/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchBranch();
      }
    })
   
 }
   removeBranch = (id) => {
    // this.Branchs = this.Branchs.filter(Branch => Branch.id !== id)
    console.log(id);
    backend.delete('branch/' + id).then( res => {
      if(res.status === 200) {
        this.fetchBranch();
        this.message = res.message;
        // return <Toast opens={true} type="success" message={res.message} />;
      }
    })
  }
  get info() {
   var data = []
    this.branch.map(res => {
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
decorate(BranchStore, { 
  sending: observable,
  message: observable,
  error: observable,
  info: computed, 
  loading: observable,
  branch: observable, 
  createBranch: action,
  updateBranch: action,
  removeBranch: action
})

 
export default createContext(new BranchStore())

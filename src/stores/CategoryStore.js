import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 

class CategoryStore {
  constructor() {
    this.fetchCategory();  
  }
  
     error = false;
     exist = false;
     loading = false;
     close = false; 
     sending = false; 
     category = [] 

    fetchCategory = () => {
      this.loading = true;
      backend.get('category').then( res => {  
      this.category = res.data;
        this.loading = false; 
      }); 
  }
  
  toggleClose = () => { 
    this.close = false;
  }

  confirmName = (data) => {
    backend.get('category/' + data + '/exist').then( res => { 
      this.exist = res.data.exist;
    })
  }
  createCat = (data) => {
    try {    
      this.sending = true;
      backend.post('category', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchCategory(); 
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

  updateCat = (data) => {
    this.sending = true;
    backend.post('category/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchCategory();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
   
 }
   removeCategory = (id) => { 
   try {
    backend.delete('category/' + id).then( res => {
      if(res.status === 200) {
        this.fetchCategory(); 
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
    return  Object.keys(this.category || {}).map(key => ({...this.category[key], uid: key}));
  }

} 
decorate(CategoryStore, { 
  sending: observable,
  close: observable,
  error: observable,
  info: computed, 
  loading: observable,
  exist: observable,
  category: observable, 
  confirmName: action,
  createCat: action,
  updateCat: action,
  removeCategory: action,
  toggleClose: action
})

 
export default createContext(new CategoryStore())

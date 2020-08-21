import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;  
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 

class SubCategoryStore { 
  
  constructor() {
    this.fetchSubCategory();  
  }
  
     error = false;
     exist = false;
     loading = false;
     close = false; 
     sending = false; 
     subcategory = [];

     toggleClose = () => { 
      this.close = false;
    }

     fetchSubCategory = () => {
      this.loading = true;
      backend.get('subcategory').then( res => {  
      this.subcategory = res.data;
        this.loading = false; 
      }); 
  }
  
  confirmName = (cat, name) => {
    backend.get('subcategory/' + cat + '/'+ name + '/exist').then( res => { 
      this.exist = res.data.exist;
    })
  }
  createSubCat = (data) => {
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

  updateSubCat = (data) => {
    this.sending = true;
    backend.post('subcategory/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchSubCategory();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
   
 }
   removeSubCat = (id) => { 
   try {
    backend.delete('subcategory/' + id).then( res => {
      if(res.status === 200) {
        this.fetchSubCategory(); 
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
decorate( SubCategoryStore, { 
  sending: observable,
  close: observable,
  error: observable,
  info: computed, 
  loading: observable,
  exist: observable,
  subcategory: observable, 
  confirmName: action,
  createSubCat: action,
  updateSubCat: action,
  removeSubCat: action,
  toggleClose: action
})
 
export default createContext(new SubCategoryStore())

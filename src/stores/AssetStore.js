import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
// import  Utility from "../shared/Storage";  
class AssetStore {
  constructor() {
    this.fetchAsset(); 
    
  }
  
    error = false;
    close = false;
    exist = false;
     loading = false;
     sending = false; 
     assets = [] 

     toggleClose = () => { 
       this.close = false;
     }
    fetchAsset = () => {
      this.loading = true;
      backend.get('asset').then( res => {  
      this.assets = res.data.data;
        this.loading = false; 
      }); 
  }
  confirmAsset = (sub, title) => {
    backend.get('asset/' + sub + '/'+ title + '/exist').then( res => { 
      this.exist = res.data.exist;
    })
  }
  createAsset = (data) => {
    try {    
      this.sending = true;
      backend.post('asset', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchAsset(); 
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

  updateAsset = (data) => {
   try {
    this.sending = true;
    backend.post('asset/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchAsset();
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
   removeAsset = (id) => { 
   try { 
    backend.delete('asset/' + id).then( res => {
      if(res.status === 200) {
        this.fetchAsset();
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
    return  Object.keys(this.assets || {}).map(key => ({...this.assets[key], uid: key}));
    
  }

} 
decorate(AssetStore, { 
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  loading: observable,
  assets: observable, 
  info: computed, 
  confirmAsset: action,
  createAsset: action,
  updateAsset: action,
  removeAsset: action,
  toggleClose: action
})

 
export default createContext(new AssetStore())

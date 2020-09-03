import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";

class ProductStore {
  constructor() {  
    this.fetchProduct();   
  }
  
      filter = 'ALL';
      error = false;
      close = false;
      loading = false;
      sending = false;  
      close = false;
      exist = false; 
      product = [];
      products = [];
 
     
     setFilter = (data) => {
     	this.filter = data;
     }

     toggleClose = () => { 
      this.close = false;
    }

    fetchProduct = () => { 
    this.loading = true;
    backend.get('product').then( res => {  
      this.products = res.data;
      this.loading = false;
        
    }); 
  }
  
  confirmProduct = (cat, branch,name) => {
   try {
    backend.get('product/' + cat + '/'+ branch + '/'+ name+ '/exist').then( res => { 
      this.exist = res.data.exist;
    })
   } catch (error) {
     console.log(error)
   }
  }
   toggleProduct = (data) => {
     backend.post('product/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.fetchProduct();
       }
     })
    
  }

  createProduct = (data) => {
    try {    
      this.sending = true;
      backend.post('product', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchProduct(); 
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


  getProductById = (id) => {  
    try {
   this.loading = true;
   backend.get('product/' + id).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
         this.product = res.data.data[0]; 
      }
        
    })
    .catch(err => {
     console.log('getProductById', err.code);
     console.log('getProductById', err.message);
     console.log('getProductById', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }
  updateProduct = (data) => {
    this.sending = true;
    backend.post('product/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchProduct();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
 }
   removeProduct = (id) => { 
    backend.delete('product/' + id).then( res => {
      if(res.status === 200) {
        this.fetchProduct();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredProduct() {
    switch (this.filter) {
      case 'ALL':
        return this.products;
      case 'Active':
        return this.products.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.products.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.products.filter(s => s.section === 'Deleted');

      default:
        return this.products;
    }
  }
  get info() {
  	return Object.keys(this.products || {}).map(key => ({...this.products[key], uid: key})); 
  }
  get totalProduct() {
  	return  this.products.length
  }
} 
decorate(ProductStore, { 
  close: observable,
  error: observable,
  filter: observable,
  sending: observable,
  product: observable,
  loading: observable,
  products: observable, 
  createProduct: action, 
  updateProduct: action, 
  fetchProduct: action,
  getProductById: action,
  removeProduct: action,
  toggleProduct: action,
  confirmProduct: action,
  setFilter: action,
  filteredProduct: computed,
  totalProduct: computed,
  info: computed,
})

 
export default createContext(new ProductStore())

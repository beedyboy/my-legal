import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";


class OrderStore { 
  constructor() {
    this.cartOrder();
  }
     error = false;
     deleting = false;
     close = false;  
     loading = false; 
     sending = false; 
     searching = false; 
     cart = [];
     stock = []; 
     pos = []; 

   
    toggleClose = () => {
      this.close = false;
    }
  
    generateOrderNo = () => {
     const receiptNumber =  Math.ceil(Math.random() * 10)
    Utility.save('receiptNumber', receiptNumber);

    }

  productStockByName = (name) => {  
    try {
   this.searching = true;
   backend.get('stock/product/' + name + '/search').then( res => {   
      this.searching = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
         this.pos = res.data.data; 
      }
        
    })
    .catch(err => {
     console.log('my_stock', err.code);
     console.log('my_stock', err.message);
     console.log('my_stock', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }
    
    createOrder = (data) => {  
      try {
        this.sending = true;
        backend.post('order', data).then(res => {
          this.sending = false;
          if(res.data.status === 500) {
            Utility.logout();
          }
         else  if(res.data.status === 200) {
           this.cartOrder();
          Beedy('success', res.data.message);
         }
         
        })
      .catch(err => {
       console.log('save_order', err.code);
       console.log('save_order', err.message);
       console.log('save_order', err.stack);
      });
      } catch(err) {
        if(err.response.status === 500) {
          console.log("There was a problem with the server");
        } else {
          console.log(err.response.data.msg)
        }
      }
    }
    
  cartOrder = () => {  
    try {
    const order = Utility.get('receiptNumber');
   backend.get('order/cart/' + order).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
      this.close = true;
         this.cart = res.data.data; 
      }
        
    })
    .catch(err => {
     console.log('my_stock', err.code);
     console.log('my_stock', err.message);
     console.log('my_stock', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }
    updateOrder = (data) => {  
     try {
       this.sending = true;
       backend.post('order/update', data).then(res => {
         this.sending = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else  if(res.data.status === 200) {
         this.close = true;
         this.cartOrder();
         Beedy('success', res.data.message);
        }
        
       })
     .catch(err => {
      console.log('save_stock', err.code);
      console.log('save_stock', err.message);
      console.log('save_stock', err.stack);
     });
     } catch(err) {
       if(err.response.status === 500) {
         console.log("There was a problem with the server");
       } else {
         console.log(err.response.data.msg)
       }
     }
   }
 

   removeOrder = (product_id, id) => { 
    backend.delete('stock/' + id).then( res => {
      if(res.status === 200) {
        this.productOrder(product_id);
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('remove_stock', err.code);
     console.log('remove_stock', err.message);
     console.log('remove_stock', err.stack);
    });
  }
  
   deleteInBulk = (product_id, arr) => { 
     this.deleting = true;
    backend.delete('stock/bulk' + arr).then( res => {
      this.deleting = false;
      if(res.status === 200) {
        this.productOrder(product_id);
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('remove_stock', err.code);
     console.log('remove_stock', err.message);
     console.log('remove_stock', err.stack);
    });
  }
  getOrderById = (id) => {
  try { 
    backend.get('stock/' + id).then( res => {
      if(res.data.status === 200) { 
        this.stock = res.data.data[0];
      }
    })
    .catch(err => {
     console.log('stock_by_id', err.code);
     console.log('stock_by_id', err.message);
     console.log('stock_by_id', err.stack);
    });
  } catch(e) {
	console.error(e);
  }
  }
  
 
   get allProductOrders() {
    return   Object.keys(this.cart || {}).map(key => ({...this.cart[key], uid: key}));
  }
  get stocks() {
    return   Object.keys(this.pos || {}).map(key => ({...this.pos[key], uid: key}));
  }
   get info() {
  	return {
      total: this.cart.length,
      status: this.cart.filter(cat => cat.status).length
    }
   
  }

}  
  
decorate(OrderStore, { 
  sending: observable,
  deleting: observable,
  searching: observable,
  close: observable,
  error: observable, 
  stocks: computed,
  info: computed, 
  loading: observable,
  stock: observable,  
  cart: observable,  
  pos: observable,
  productStockByName: action,
  generateOrderNo: action,
  createOrder: action,
  updateOrder: action,
  cartOrder: action,
  removeOrder: action,
  deleteInBulk: action,
  toggleClose: action 
})

 
export default createContext(new OrderStore()) 

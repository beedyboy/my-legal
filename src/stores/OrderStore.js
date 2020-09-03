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
     ckclose = false;  
     loading = false; 
     sending = false; 
     searching = false; 
     cart = [];
     total = 0;
     stock = []; 
     pos = []; 

   
    toggleClose = () => { 
      this.close = false;
    }
    toggleCKClose = () => { 
      this.ckclose = false;
    }
  
    generateOrderNo = () => { 
     const active = Utility.get('receiptNumber'); 
     if (active === undefined || active === null) {
      var array = new Uint32Array(8);
      window.crypto.getRandomValues(array); 
      var number =''
      for (var i = 0; i < array.length; i++) {
          number = array[i]
      } 
      Utility.save('receiptNumber', number);
     } 
    }

    startNewOrder = () => {
      var array = new Uint32Array(8);
        window.crypto.getRandomValues(array); 
        var number =''
        for (var i = 0; i < array.length; i++) {
            number = array[i]
        } 
      Utility.remove('receiptNumber');
      Utility.save('receiptNumber', number);
      this.cartOrder();
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
     console.log('productStockByName', err.code);
     console.log('productStockByName', err.message);
     console.log('productStockByName', err.stack);
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
           this.close = true;
           this.cartOrder();
           this.cartTotal();
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
      const receiptNumber =  Math.ceil(Math.random() * 10)
     const active = Utility.get('receiptNumber'); 
     if (active === undefined || active === null) {
      this.startNewOrder()
     } else {
      const order = Utility.get('receiptNumber');
      backend.get('order/cart/' + order).then( res => {   
         this.loading = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else if(res.data.status === 200) {
          this.cartTotal();
         this.close = true;
          this.cart = res.data.data; 
         }
           
       })
       .catch(err => {
        console.log('cartOrder', err.code);
        console.log('cartOrder', err.message);
        console.log('cartOrder', err.stack);
       });
     } 
  
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
     
  cartTotal = () => {  
    try {
       const order = Utility.get('receiptNumber');
      backend.get('order/cart/' + order + '/total').then( res => {    
         if(res.data.status === 500) {
           Utility.logout();
         }
        else if(res.data.status === 200) { 
            this.total = res.data.data;  
         }
           
       })
       .catch(err => {
        console.log('cartTotal', err.code);
        console.log('cartTotal', err.message);
        console.log('cartTotal', err.stack);
       });
    
  
	} catch(e) {
		console.error(e);
	}
  }
  
   removeOrder = (id) => { 
    backend.delete('order/' + id).then( res => {
      if(res.status === 200) {
        this.cartOrder();
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('removeOrder', err.code);
     console.log('removeOrder', err.message);
     console.log('removeOrder', err.stack);
    });
  }
      
  emptyCart = () => {  
    try {
       const order = Utility.get('receiptNumber');
      backend.get('order/cart/' + order + '/empty').then( res => {   
         this.loading = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else if(res.data.status === 200) {
          this.cartOrder();
          Beedy('success', res.data.message)
         }
           
       })
       .catch(err => {
        console.log('emptyCart', err.code);
        console.log('emptyCart', err.message);
        console.log('emptyCart', err.stack);
       }); 
  
	} catch(e) {
		console.error(e);
	}
  }
  checkout = (data) => {  
    try {  
      this.sending = true;
      backend.post('sale', data).then( res => {   
         this.sending = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else if(res.data.status === 200) {
            Beedy('success', res.data.message)
            this.startNewOrder();
            this.ckclose = true;
         } else {
           Beedy('error', res.data.message)
         }
           
       })
       .catch(err => {
        console.log('checkout', err.code);
        console.log('checkout', err.message);
        console.log('checkout', err.stack);
       });
     
	} catch(e) {
		console.error(e);
	}
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
  getCartItemById = (id) => {
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
  total: observable,
  close: observable,
  ckclose: observable,
  error: observable, 
  stocks: computed,
  info: computed, 
  loading: observable,
  stock: observable,  
  cart: observable,  
  pos: observable,
  productStockByName: action,
  generateOrderNo: action,
  startNewOrder: action,
  createOrder: action,
  updateOrder: action,
  cartOrder: action,
  cartTotal: action,
  checkout: action,
  removeOrder: action,
  deleteInBulk: action,
  toggleClose: action,
  toggleCKClose: action
})

 
export default createContext(new OrderStore()) 

import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";


class StockStore { 
  
     error = false;
     close = false;  
     loading = false; 
     sending = false; 
     stocks = [];
     stock = []; 

   
    toggleClose = () => {
      this.close = false;
    }
    
    createStock = (data) => {  
      try {
        this.sending = true;
        backend.post('stock', data).then(res => {
          this.sending = false;
          if(res.data.status === 500) {
            Utility.logout();
          }
         else  if(res.data.status === 200) {
          this.close = true;
          // this.fetchStock();
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
    updateStock = (data) => {  
     try {
       this.sending = true;
       backend.post('stock/update', data).then(res => {
         this.sending = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else  if(res.data.status === 200) {
         this.close = true;
         // this.fetchStock();
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

  productStock = (id) => {  
    try {
   this.loading = true;
   backend.get('stock/product/' + id).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
         this.stocks = res.data.data; 
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

   removeStock = (id) => { 
    backend.delete('stock/' + id).then( res => {
      if(res.status === 200) {
        this.fetchStock();
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('remove_stock', err.code);
     console.log('remove_stock', err.message);
     console.log('remove_stock', err.stack);
    });
  }
  getStockById = (id) => {
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
  
 
   get allProductStocks() {
    return   Object.keys(this.stocks || {}).map(key => ({...this.stocks[key], uid: key}));
  }
   get info() {
  	return {
      total: this.stocks.length,
      status: this.stocks.filter(cat => cat.status).length
    }
   
  }

}  
  
decorate(StockStore, { 
  sending: observable,
  close: observable,
  error: observable, 
  info: computed, 
  loading: observable,
  stock: observable,  
  stocks: observable,  
  createStock: action,
  updateStock: action,
  removeStock: action,
  toggleClose: action 
})

 
export default createContext(new StockStore()) 

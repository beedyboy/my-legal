import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";


class SalesStore { 
   
     error = false;
     deleting = false;
     close = false;  
     loading = false; 
     sending = false; 
     searching = false; 
     sales = []; 

   
    toggleClose = () => {
      this.close = false;
    }
  
   
    startNewSales = () => {
      var array = new Uint32Array(8);
        window.crypto.getRandomValues(array); 
        var number =''
        for (var i = 0; i < array.length; i++) {
            number = array[i]
        } 
      Utility.save('receiptNumber', number);
     }
  
 
  getSalesById = (id) => {
  try { 
    backend.get('sale/' + id).then( res => {
      if(res.data.status === 200) { 
        this.sale = res.data.data[0];
      }
    })
    .catch(err => {
     console.log('sale_by_id', err.code);
     console.log('sale_by_id', err.message);
     console.log('sale_by_id', err.stack);
    });
  } catch(e) {
	console.error(e);
  }
  }
  
 
   get allSales() {
    return   Object.keys(this.sales || {}).map(key => ({...this.sales[key], uid: key}));
  }
 
   get info() {
  	return {
      total: this.sales.length,
      status: this.sales.filter(cat => cat.status).length
    }
   
  }

}  
  
decorate(SalesStore, { 
  sending: observable,
  deleting: observable,
  searching: observable,
  close: observable,
  error: observable, 
  sales: computed,
  info: computed, 
  loading: observable,
  sale: observable,  
  sales: observable,  
  pos: observable,
  productStockByName: action,
  generateSalesNo: action,
  startNewSales: action,
  createSales: action,
  updateSales: action,
  salesSales: action,
  removeSales: action,
  deleteInBulk: action,
  toggleClose: action 
})

 
export default createContext(new SalesStore()) 

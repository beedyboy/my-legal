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
     receivablesList = []; 
     salesItem = []; 
     invoices = []; 
     sale = []; 
     sales = []; 

   
    toggleClose = () => {
      this.close = false;
    }
   
    
  getReceivables = () => {
    try { 
      backend.get('sale/receivables').then( res => {
        if(res.data.status === 200) { 
          this.receivablesList = res.data.data;
        }
      })
      .catch(err => {
       console.log('getReceivables', err.code);
       console.log('getReceivables', err.message);
       console.log('getReceivables', err.stack);
      });
    } catch(e) {
    console.error(e);
    }
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
   
  getInvoiceDetails = (invoice) => {
    try { 
      backend.get('order/cart/' + invoice).then( res => {
        if(res.data.status === 200) { 
          this.salesItem = res.data.data;
        }
      })
      .catch(err => {
       console.log('getInvoiceDetails', err.code);
       console.log('getInvoiceDetails', err.message);
       console.log('getInvoiceDetails', err.stack);
      });
    } catch(e) {
    console.error(e);
    }
    }
      
    payNow = (id) => {  
      try {
     this.searching = true;
     backend.get('sale/' + id + '/pay').then( res => {   
        this.searching = false;
        if(res.data.status === 500) {
          Utility.logout();
        }
       else if(res.data.status === 200) {
         this.getReceivables();
         Beedy('success',  res.data.message);
        }
          
      })
      .catch(err => {
       console.log('payNow', err.code);
       console.log('payNow', err.message);
       console.log('payNow', err.stack);
      });
    
    } catch(e) {
      console.error(e);
    }
    }
 
      
    fetchSavedInvoice = (name) => {  
      try {
     this.searching = true;
     backend.get('sale/invoice/' + name + '/search').then( res => {   
        this.searching = false;
        if(res.data.status === 500) {
          Utility.logout();
        }
       else if(res.data.status === 200) {
           this.invoices = res.data.data; 
        }
          
      })
      .catch(err => {
       console.log('fetchSavedInvoice', err.code);
       console.log('fetchSavedInvoice', err.message);
       console.log('fetchSavedInvoice', err.stack);
      });
    
    } catch(e) {
      console.error(e);
    }
    }
 
    get allSales() {
      return   Object.keys(this.sales || {}).map(key => ({...this.sales[key], uid: key}));
    }
    get receivables() {
      return   Object.keys(this.receivablesList || {}).map(key => ({...this.receivablesList[key], uid: key}));
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
  receivables: computed,
  loading: observable,
  invoices: observable,  
  sale: observable,  
  sales: observable,  
  salesItem: observable,
  receivablesList: observable,
  fetchSavedInvoice: action,
  generateSalesNo: action, 
  getInvoiceDetails: action,
  payNow: action,
  salesSales: action,
  removeSales: action,
  deleteInBulk: action,
  toggleClose: action 
})

 
export default createContext(new SalesStore()) 

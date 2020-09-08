import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";
class TicketStore {
  constructor() {
    this.fetchTicket(); 
    
  }
  
    error = false;
    close = false;
    exist = false;
    loading = false;
    deleting = false;
    sending = false; 
    saved = false;
    ticket = [] 
    tickets = [] 
    staffTickets = [] 

     toggleClose = () => { 
       this.close = false;
       this.saved = false;
     }
    fetchTicket = () => {
      this.loading = true;
      backend.get('ticket').then( res => {  
        // console.log(res.data)
      this.tickets = res.data.data;
        this.loading = false; 
      }); 
  }
  fetchMyTicket = () => {
    this.loading = true;
    backend.get('ticket/myticket').then( res => {  
    this.staffTickets = res.data.data;
      this.loading = false; 
    }); 
}
  createTicket = (data) => {
    try {    
      this.sending = true;
      backend.post('ticket', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchTicket(); 
          this.fetchMyTicket(); 
          Beedy('success', res.data.message) 
          this.close = true;  
          this.saved = true; 
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

  updateTicket = (data) => {
   try {
    this.sending = true;
    backend.post('ticket/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchTicket();
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
 
 getTicketById = (id) => {  
  try {
 this.loading = true;
 backend.get('ticket/' + id).then( res => {   
    this.loading = false;
    if(res.data.status === 500) {
      Utility.logout();
    }
   else if(res.data.status === 200) {
       this.ticket = res.data.data[0]; 
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
 assignTicket = (data) => {
  try {
   this.sending = true;
   backend.post('ticket/assign', data).then(res => {
     this.sending = false;
     if (res.data.status === 200) {
      this.fetchTicket();
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

toggleStatus = (data) => {
  try {
   this.sending = true;
   backend.post('ticket/status', data).then(res => {
     this.sending = false;
     if (res.data.status === 200) {
      this.fetchTicket();
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
   removeTicket = (id) => { 
   try { 
     this.deleting = true;
    backend.delete('ticket/' + id).then( res => {
      this.deleting = false;
      if(res.status === 200) {
        this.fetchTicket();
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
    return  Object.keys(this.tickets || {}).map(key => ({...this.tickets[key], uid: key})); 
  }
  get myTickets() {
    return  Object.keys(this.staffTickets || {}).map(key => ({...this.staffTickets[key], uid: key})); 
  }

} 
decorate(TicketStore, { 
  sending: observable,
  saved: observable,
  close: observable,
  error: observable,
  exist: observable,
  ticket: observable,
  staffTickets: observable,
  info: computed, 
  myTickets: computed, 
  loading: observable,
  tickets: observable, 
  fetchTicket: action,
  fetchMyTicket: action,
  assignTicket: action,
  createTicket: action,
  updateTicket: action,
  getTicketById: action,
  removeTicket: action,
  toggleStatus: action,
  toggleClose: action
})

 
export default createContext(new TicketStore())

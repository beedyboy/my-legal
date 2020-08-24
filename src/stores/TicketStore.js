import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
class TicketStore {
  constructor() {
    this.fetchTicket(); 
    
  }
  
    error = false;
    close = false;
    exist = false;
    loading = false;
    sending = false; 
    tickets = [] 

     toggleClose = () => { 
       this.close = false;
     }
    fetchTicket = () => {
      this.loading = true;
      backend.get('ticket').then( res => {  
      this.tickets = res.data;
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
    backend.delete('ticket/' + id).then( res => {
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

} 
decorate(TicketStore, { 
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  info: computed, 
  loading: observable,
  tickets: observable, 
  assignTicket: action,
  createTicket: action,
  updateTicket: action,
  removeTicket: action,
  toggleStatus: action,
  toggleClose: action
})

 
export default createContext(new TicketStore())

import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";


class ConversationStore { 
  
     error = false;
     deleting = false;
     sending = false;  
     loading = false; 
     close = true; 
     conversations = [];  
     
     toggleClose = () => {
       this.close = !this.close;
     }
    
    createConversation = (data) => {  
      try {
        this.close = false;
        this.sending = true;
        backend.post('conversation', data).then(res => {
          this.sending = false;
          if(res.data.status === 500) {
            Utility.logout();
          }
         else  if(res.data.status === 200) { 
           this.close = true
          this.fetchConversation(data.ticket_id);
          Beedy('success', res.data.message);
         }
         
        })
      .catch(err => {
       console.log('save_conversation', err.code);
       console.log('save_conversation', err.message);
       console.log('save_conversation', err.stack);
      });
      } catch(err) {
        if(err.response.status === 500) {
          console.log("There was a problem with the server");
        } else {
          console.log(err.response.data.msg)
        }
      }
    }
    updateConversation = (data) => {  
     try {
       this.sending = true;
       backend.post('conversation/update', data).then(res => {
         this.sending = false;
         if(res.data.status === 500) {
           Utility.logout();
         }
        else  if(res.data.status === 200) { 
         this.fetchConversation(data.ticket_id);
         Beedy('success', res.data.message);
        }
        
       })
     .catch(err => {
      console.log('save_conversation', err.code);
      console.log('save_conversation', err.message);
      console.log('save_conversation', err.stack);
     });
     } catch(err) {
       if(err.response.status === 500) {
         console.log("There was a problem with the server");
       } else {
         console.log(err.response.data.msg)
       }
     }
   }

  fetchConversation = (id) => {  
    try {
   this.loading = true;
   backend.get('conversation/' + id).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
         this.conversations = res.data.data; 
      }
        
    })
    .catch(err => {
     console.log('my_conversation', err.code);
     console.log('my_conversation', err.message);
     console.log('my_conversation', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }

   removeConversation = (ticket_id, id) => { 
     this.deleting = true;
    backend.delete('conversation/' + id).then( res => {
      this.deleting= false;
      if(res.status === 200) {
        this.fetchConversation(ticket_id);
        Beedy('success', res.data.message);
      }
    })
    .catch(err => {
     console.log('remove_conversation', err.code);
     console.log('remove_conversation', err.message);
     console.log('remove_conversation', err.stack);
    });
  }
   
 
   get allConversations() {
    return   Object.keys(this.conversations || {}).map(key => ({...this.conversations[key], uid: key}));
  }
  
}  
  
decorate(ConversationStore, { 
  close: observable,
  sending: observable,
  deleting: observable,
  sending: observable,
  error: observable, 
  allConversations: computed, 
  loading: observable,  
  conversations: observable,  
  createConversation: action,
  updateConversation: action,
  removeConversation: action, 
  toggleClose: action 
})

 
export default createContext(new ConversationStore()) 

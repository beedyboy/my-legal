import axios from 'axios';
import Utility from './UtilityService'; 
 
const serverUrl = 'https://office-manager-server.herokuapp.com/api/';
// const serverUrl = 'http://localhost:8000/api/';
export const  backend = axios.create({
  baseURL: serverUrl,
  headers: {
    common: {
      Authorization: `Bearer ${Utility.get('staff_token')}`
    }
  }
}); 
// persist data t local storage
const Utils = {
    save:(key, value) => {
        localStorage.setItem(key, value);
    },
    get:(key) => {
      
        if (localStorage.getItem(key) === null) { 
            return "";
          }
          return localStorage.getItem(key);
    },
    clear:() => {
        localStorage.clear();
    },
    remove:(key) => {
        localStorage.removeItem(key);
    },
    canAccess: (key, priviledge) => {
      let access = Utils.get("acl");
      let acl;
      if (access && access.length > 0 && access !== "null") {
        acl = JSON.parse(access);
       if (acl[key] === undefined) {
         return false;
       } else {
         return acl[key][priviledge];
       } 
      }
      return false;
    },
     logout: () => {
        localStorage.removeItem('admin_token');  
        localStorage.removeItem('acl');  
        localStorage.removeItem('name');  
        window.location.href = '/#/admin/login'; 
    }
}
 
export default Utils;
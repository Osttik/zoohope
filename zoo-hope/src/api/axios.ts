import axios from "axios"

// get cookie by name 
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

axios.interceptors.request.use(function (config) {
   if(!!getCookie("access_token")){
      const token = getCookie("access_token")
      config.headers["authorization"] = token;
   } else {
      config.headers["authorization"] = null;
   }
   
   return config;
}, function(error){
   return Promise.reject(error)
})

export default axios
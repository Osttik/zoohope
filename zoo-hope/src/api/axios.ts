import axios from "axios"

// get cookie by name 
function getCookie(name: string) {
   const parts: string[] = document.cookie.split(`; `);
   const value = parts.find(part => part.split('=')[0] === name)
   if (!value) {
      return undefined;
   }
   return value.split('=')[1];
}

axios.interceptors.request.use(function (config) {

   console.log(getCookie("accessToken"), document.cookie)

   if(!!getCookie("accessToken")){
      const token = getCookie("accessToken")
      config.headers["authorization"] = token;
   } else {
      config.headers["authorization"] = null;
   }
   console.log("config headers", config.headers)
   return config;
}, function(error){
   return Promise.reject(error)
})

export default axios
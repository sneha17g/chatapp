
import axios from 'axios';
export const request = (path, data, method) => {
  try {
    let url = "http://localhost:3001";
   
    var options = {
      method: method,
      url: url + "/" + path,
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
        
      }      
    }
    
    if (method === "POST") {
      options["data"] = data;
    }
    // console.log(options.data)
    let res = axios(options);
    res.then(() => {

    }).catch(() => {

    })

    return res;
  } catch (error) {
    console.log(error)
  }
}
export const postrequest = (path, data) => {return request(path, data, "POST") }
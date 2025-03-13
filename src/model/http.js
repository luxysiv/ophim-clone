import axios from "axios";
//import store from "@/store"

function InitAxiosForSession()  
{
    axios.defaults.timeout = 300000;
    axios.defaults.withCredentials = true // allow use server api with  Session
}
function InitAxiosForNoNSession()  
{
    axios.defaults.timeout = 300000;
    axios.defaults.withCredentials = false // allow use server api with  Session
}

function Post(url, params, success, error) {
    InitAxiosForSession()
    //store.state.isLoading=true
    axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        data: params
      })
        .then((dat)=>{
            success(dat)
            //store.state.isLoading=false
        })
        .catch((er)=> {
            //store.state.isLoading=false
            error(er)
        })

}


function PostNoSession(url, params, success, error) {
    InitAxiosForNoNSession()
    //store.state.isLoading=true
    axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        data: params
      })
        .then((dat)=>{
            success(dat)
            //store.state.isLoading=false
        })
        .catch((er)=> {
            //store.state.isLoading=false
            error(er)
        })

}


function Get(url, params, success, error) {
    InitAxiosForSession()
    //store.state.isLoading=true
    axios({
        method: 'get',
        url: url,
        params: params,
        withCredentials: true,
        headers: {
            //'Access-Control-Allow-Origin': '*',  // CORS header
            'Content-Type': 'application/json'
        }
    })
        .then((dat)=>{ 
            success(dat)  
            //store.state.isLoading=false
        })
        .catch((er)=>{
            //store.state.isLoading=false
            error(er)
        })

}


function GetNonSession(url, params, success, error) {
    InitAxiosForNoNSession()
    //store.state.isLoading=true
    axios({
        method: 'get',
        url: url,
        params: params
    })
        .then((dat)=>{ 
            success(dat)  
            //store.state.isLoading=false
        })
        .catch((er)=>{
            //store.state.isLoading=false
            error(er)
        })

}



// function instance() {
//     axios.create({
//         baseURL: "/api", // Dùng proxy
//         timeout: 10000,
//         headers: {
//         "Content-Type": "application/json",
//         },
//     });
// }
function GetNew(url, params, success, error) {
    axios.create({
        baseURL: "/api", // Dùng proxy
        timeout: 10000,
        headers: {
        "Content-Type": "application/json",
        },
    })
      .get(url, { params })
      .then((res) => success(res.data))
      .catch((err) => error(err));
  }
  


// var form =new FormData()
//  form.append("name",file[0])
function PostFile(url, form, success, error) {
    InitAxiosForSession()
    //store.state.isLoading=true
    axios.post(url, form, {
        'Content-Type': 'multipart/form-data'
    }).then((dat)=>{
        success(dat)
        //store.state.isLoading=false

    }).catch((er)=>{
        error(er)
        //store.state.isLoading=false
    })
}
const http={Post,Get ,GetNonSession,PostNoSession,PostFile,GetNew}
export default http
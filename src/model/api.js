// import axios from "axios"
import http from "./http"

// Phim moi cap nhat
let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat"
// ex =>    let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1"
// Thong tin phim
let URLInfor = "https://ophim1.com/phim/"
// ex =>    let URLInfor = "https://ophim1.com/phim/ngoi-truong-xac-song"


export const urlImage = "https://img.ophim.live/uploads/movies/"
 export const ListmovieNew= (params, success, error) => http.GetNew(`${URL}`, params, success, error)
 export const ListmovieInfor= (params, success, error) => http.GetNew(`${URLInfor}`, params, success, error)
 export const MoveInfor= (params, success, error) => http.GetNew(`${URLInfor}${params}`, {}  , success, error)
    

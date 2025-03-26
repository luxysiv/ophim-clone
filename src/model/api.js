// import axios from "axios"
import http from "./http"

// Phim moi cap nhat
let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat"
// ex =>    let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1"
// Thong tin phim
let URLInfor = "https://ophim1.com/phim/"
// ex =>    let URLInfor = "https://ophim1.com/phim/ngoi-truong-xac-song"

// the loai phim
let urlListMoiveByCategoris = "https://ophim1.com/v1/api/danh-sach/"


// the loai phim
let urlCategoris = "https://ophim1.com/v1/api/the-loai/"

let urlCategorisHome = "https://ophim1.com/v1/api/"

// quoc gia
let urlCity = "https://ophim1.com/v1/api/quoc-gia/"

// tim kiem
let urlSearch = "https://ophim1.com/v1/api/tim-kiem"

export const urlImage = "https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/"
 export const ListmovieNew= (params, success, error) => http.GetNew(`${URL}`, params, success, error)
 export const ListmovieInfor= (params, success, error) => http.GetNew(`${URLInfor}`, params, success, error)
 export const MoveInfor= (params, success, error) => http.GetNew(`${URLInfor}${params}`, {}  , success, error)

 // the loai phim
 export const Categoris= (params, success, error) => http.GetNew(`${urlCategoris}`, ""  , success, error)

 // danh sach phim theo the loai phim
 export const ListMovieByCate= (params, success, error) => http.GetNew(`${urlListMoiveByCategoris}${params}`, {}  , success, error)
 export const ListMovieByCateHome= (params, success, error) => http.GetNew(`${urlCategorisHome}${params}`, {}  , success, error)

 // the loai phim
 export const CategorisDetail= (params, success, error) => http.GetNew(`${urlCategoris}${params}`, {}  , success, error)
    
 
 // quoc gia
 export const City= (params, success, error) => http.GetNew(`${urlCity}`, ""  , success, error)

 // the loai phim
 export const CityDetail= (params, success, error) => http.GetNew(`${urlCity}${params}`, {}  , success, error)

 
 // tim kiem phim
 export const Search= (params, success, error) => http.GetNew(`${urlSearch}`, params  , success, error)

// import axios from "axios"
import http from "./http"

// Phim moi cap nhat
let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat"
// ex =>    let URL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1"
// Thong tin phim
let URLInfor = "https://ophim1.com/phim/"

let URLInfor1 = "https://phimapi.com/phim/"


// ex =>    let URLInfor = "https://ophim1.com/phim/ngoi-truong-xac-song"

// the loai phim
let urlListMoiveByCategoris = "https://ophim1.com/v1/api/danh-sach/"

let urlListMoiveByCategoris1 = "https://phimapi.com/v1/api/danh-sach/"


// the loai phim
let urlCategoris = "https://ophim1.com/v1/api/the-loai/"

let urlCategoris1 = "https://phimapi.com/v1/api/the-loai/"


let urlCategorisHome = "https://ophim1.com/v1/api/"

let urlCategorisHome1 = "https://phimapi.com/v1/api/"

// quoc gia
let urlCity = "https://ophim1.com/v1/api/quoc-gia/"


let urlCity1 = "https://phimapi.com/v1/api/quoc-gia/"


// tim kiem
let urlSearch = "https://ophim1.com/v1/api/tim-kiem"


let urlSearch1 = "https://phimapi.com/v1/api/tim-kiem"


// api login
let urlAccount = "https://apiwebphim.onrender.com/api/auth"

export const urlImage = "https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/"
export const urlImage1 = "https://phimapi.com/image.php?url="

 export const ListmovieNew= (params, success, error) => http.GetNew(`${URL}`, params, success, error)
 export const ListmovieInfor= (params, success, error) => http.GetNew(`${URLInfor}`, params, success, error)
 export const MoveInfor= (params, success, error) => http.GetNew(`${URLInfor}${params}`, {}  , success, error)

 export const MoveInfor1= (params, success, error) => http.GetNew(`${URLInfor1}${params}`, {}  , success, error)


 // the loai phim
 export const Categoris= (params,success, error) => http.GetNew(`${urlCategoris}`,params  , success, error)

 export const Categoris1= (params,success, error) => http.GetNew(`${urlCategoris1}`,params  , success, error)

 // danh sach phim theo the loai phim
 export const ListMovieByCate= (params, success, error) => http.GetNew(`${urlListMoiveByCategoris}${params}`, {}  , success, error)

 export const ListMovieByCate1= (params, success, error) => http.GetNew(`${urlListMoiveByCategoris1}${params}`, {}  , success, error)

 export const ListMovieByCateHome= (params, success, error) => http.GetNew(`${urlCategorisHome}${params}`, {}  , success, error)

 export const ListMovieByCateHome1= (params, success, error) => http.GetNew(`${urlCategorisHome1}${params}`, {}  , success, error)

 // the loai phim
 export const CategorisDetail= (params, success, error) => http.GetNew(`${urlCategoris}${params}`, {}  , success, error)
    
 
 // quoc gia
 export const City= (params, success, error) => http.GetNew(`${urlCity}`, params  , success, error)

 // the loai phim
 export const CityDetail= (params, success, error) => http.GetNew(`${urlCity}${params}`, {}  , success, error)

 export const CityDetail1= (params, success, error) => http.GetNew(`${urlCity1}${params}`, {}  , success, error)

 
 // tim kiem phim
 export const Search= (params, success, error) => http.GetNew(`${urlSearch}`, params  , success, error)

 export const Search1= (params, success, error) => http.GetNew(`${urlSearch1}`, params  , success, error)
 

// api login
 export const Login = (params, success, error) => http.Post(`${urlAccount}/login`, params,success, error)

 // api login
 export const Register = (params, success, error) => http.Post(`${urlAccount}/register`, params,success, error)

 // add comment
 export const AddComment = (params, success, error) => http.Post(`${urlAccount}/addcomment`, params,success, error)

 // get comment
 export const GetComments = (params, success, error) => http.GetNew(`${urlAccount}/getcomments`, params,success, error)
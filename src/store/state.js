export default function state() {
    return {
      empInfor: {
        username: "",
        email: "",
        id: "",
        
      },
      curi18n: {
        curElLang: "", // current Lang i18n for Element plus
        curLang: "", //current lang i18n for system
      },
      isLoading: false,  // show loading icon full screen when call api
      curri18n: null,//  current $t for i18n
      
  
    }
  }
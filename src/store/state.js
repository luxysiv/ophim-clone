export default function state() {
    return {
      empInfor: {
        F_EMPNO: "",
        F_EMPNAME: "",
        F_EMPNAME_VI: "",
        F_EMPPHONE: "",
        F_EMPMOBILE: "",
        F_EMPMAIL: "",
        F_DEPT: "",
        F_DEPTNAME: "",
        F_FACTORYZONE: "",
        F_FACTORYZONE_LS: [],
        F_LEGAL: "",
        F_FEECODE: "",
        F_ROLE: "",
        F_SYSDATE: "",
        F_SYSID: "",
      },
      curi18n: {
        curElLang: "", // current Lang i18n for Element plus
        curLang: "", //current lang i18n for system
      },
      isLoading: false,  // show loading icon full screen when call api
      curri18n: null,//  current $t for i18n
      
  
    }
  }
import { createStore } from 'vuex'
import mutations from "./mutations"
import state from "./state"

const store = createStore({
    state,
    mutations
    
  })
export default store

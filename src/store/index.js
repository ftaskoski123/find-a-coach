import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
// import getters from "./modules/coaches/getters.js";
const store=createStore({
    modules:{
        coaches:coachesModule
    },
    state(){
        return{
            userId:'c3'
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
})


export default store;
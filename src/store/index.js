import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from "./mutations";
Vue.use(Vuex)

import { getMatrices } from "./storage";


const state = {
    matrices : getMatrices()
}

export default new Vuex.Store({
    state,
    mutations
})
import * as types from './mutation-types'
import { matricesStorage } from "./storage";

export const mutations = {
    [types.ADD_TODO] (state, payload){
        state.matrices = payload
    },
    [types.ADD_MATRICE] (state, matrice){
        state.matrices.push(matrice)
        matricesStorage.save(state.matrices)
    },
    [types.SAVE_TODO] (state, payload){
        state.matrices = payload
    },
    [types.REMOVE_TODO] (state, index){
        state.matrices.todos = payload
    },
    [types.SET_MATRICES] (state, payload){
        state.matrices = payload
    }
}
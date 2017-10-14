// localStorage persistence
let STORAGE_KEY = 'matrice-'

export const getMatrices = function(){
        let matrices = []
        for (let i =0;i < localStorage.length;i++){
            let key = localStorage.key(i)
            if (key.includes(STORAGE_KEY)){
                matrices.push(JSON.parse(localStorage.getItem(key) || '{todos: []}'))
            }
        }
        return matrices
    }

export const matricesStorage = {
    fetch: function (index) {
        let matrice = JSON.parse(localStorage.getItem(`${STORAGE_KEY}${index}`) || '{todos: []}')
        matrice.todos.forEach(function (todo, i) {
            todo.id = i
        })
        return matrice
    },

    uid: getMatrices().length,
    save: function (matrices) {
        matrices.forEach((matrice, index) =>{
            localStorage.setItem(`${STORAGE_KEY}${index}`, JSON.stringify(matrice))
        })
    }
}
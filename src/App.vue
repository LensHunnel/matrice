<template>
    <div id="app" class="container">
        <h1 class="title is-1">Liste des matrices</h1>
        <add-matrice></add-matrice>
        {{ $store.state.matrices }}
        <matrice v-for="(matrice, index) in matrices"
                 :matrice="matrice"
                 :index="index"
                 key="index"
        ></matrice>
    </div>
</template>

<script>
    import Matrice from './components/Matrice.vue'
    import addMatrice from './components/addMatrice.vue'
    import { getMatrices, matricesStorage } from './store/storage'
    import * as types from './store/mutation-types'
    export default {
        data(){
            return {
                matrices: getMatrices()
            }
        },
        components: {
            Matrice,
            addMatrice
        },
        watch:{
            matrices: {
                handler: function (matrices) {
                    matricesStorage.save(matrices)
                },
                deep: true
            }
        },
        mounted(){
            // Listen for the event.
                this.$el.addEventListener(types.ADD_MATRICE, function (e) {
                    console.log('EVENT')
                }, false);
        }

    }
</script>
<style lang="scss">
    @import "~bulma";
</style>

<template>
    <section class="section">
        <div class="container">
            <div class="field is-grouped">
                <div class="field">
                    <label></label>
                </div>
                <div class="control">
                    <input type="text" class="input" v-model="matrice.titre">
                </div>
                <div class="control">
                    <button @click="addMatrice" class="button is-primary">Ajout projet</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { matricesStorage } from '../store/storage'
    import * as types from '../store/mutation-types'
    export default {
        data(){
            return{
                matrice:{titre:'', todos:[]}
            }
        },
        methods:{
            addMatrice(){
                this.$store.commit(types.ADD_MATRICE, this.matrice)
                var event = new Event(types.ADD_MATRICE);

                // Dispatch the event.
                this.dispatchEvent(event);
                this.matrice = {titre:'', todos:[]}
            }
        }
    }
</script>
<style></style>
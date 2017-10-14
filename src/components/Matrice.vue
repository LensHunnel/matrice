<template>
    <div>

        <section class="section">
            <div class="container">
                <h2 class="title is-2">{{ matrice.titre }}</h2>
                <h3 class="title is-3">Tâches</h3>
                <div class="column">
                    <div class="field is-grouped">
                        <div class="field">
                            <div class="control ">
                                <input class="toggle-all" type="checkbox" v-model="allDone">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="input is-primary  new-todo is-medium" style="width: 570px;"
                                       autofocus autocomplete="off"
                                       placeholder="Tâches du jour?"
                                       v-model="newTodo.title"
                                       @keyup.enter="addTodo">
                            </div>
                        </div>
                        <div class="field ">
                            <div class="select">
                                <select  style="margin-left: 10px; height: 46px;" v-model="newTodo.urgence">
                                    <option>Urgent</option>
                                    <option>Non-Urgent</option>
                                </select>
                            </div>
                        </div>
                        <div class="field ">
                            <div class="select">
                                <select  style="margin-left: 10px; height: 46px;"  v-model="newTodo.importance">
                                    <option>Important</option>
                                    <option>Non-Important</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <section class="section" v-show="matrice.todos.length">

                        <ul class="todo-list">
                            <li v-for="todo in filteredTodos"
                                class="todo"
                                :key="todo.id"
                                :class="{ completed: todo.completed, editing: todo == editedTodo }">
                                <div class="view ">
                                    <div class="field is-grouped columns">
                                        <div class="control column is-1">
                                            <input class="toggle" type="checkbox" v-model="todo.completed">
                                        </div>
                                        <div class="control column is-6"  style="vertical-align: middle">
                                            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                                        </div>
                                        <div class="control column is-hidden-mobile"  style="vertical-align: middle">
                                            <label @dblclick="editTodo(todo)">{{ todo.urgence }}</label>
                                        </div>
                                        <div class="control column is-hidden-mobile"  style="vertical-align: middle">
                                            <label @dblclick="editTodo(todo)">{{ todo.importance }}</label>
                                        </div>
                                        <div class="control column">
                                            <span class="icon" @click="removeTodo(todo)"> <i class="fa fa-close"></i></span>
                                        </div>
                                    </div>


                                </div>
                                <div class="edit">
                                    <div class="field  is-grouped">
                                        <div class="control">
                                            <input class="input is-primary"  type="text" style=" height: 46px;"
                                                   v-model="todo.title"
                                                   v-todo-focus="todo == editedTodo"
                                                   @keyup.enter="doneEdit(todo)"
                                                   @keyup.esc="cancelEdit(todo)">
                                        </div>
                                        <div class="select">
                                            <select  style="margin-left: 10px; height: 46px;" v-model="todo.urgence">
                                                <option>Urgent</option>
                                                <option>Non-Urgent</option>
                                            </select>
                                        </div>

                                        <div class="select">
                                            <select  style="margin-left: 10px; height: 46px;"  v-model="todo.importance">
                                                <option>Important</option>
                                                <option>Non-Important</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>

                            </li>
                        </ul>
                    </section>
                    <div class="field is-grouped" v-show="matrice.todos.length">
                        <div class="tags">
                            <span class="tag"><strong>{{ remaining }} </strong>&nbsp;{{ remaining | pluralize }} restant</span>
                            <span class="tag" :class="{ 'is-white': visibility == 'all' }"><a href="#/all" >All</a></span>
                            <span class="tag" :class="{ 'is-white': visibility == 'active' }"><a href="#/active">Active</a></span>
                            <span class="tag" :class="{ 'is-white': visibility == 'completed' }"><a href="#/completed" :class="{ 'is-primary': visibility == 'completed' }">Completed</a></span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>Double-click to edit a todo</p>
                    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </div>
            </div>
        </footer>
    </div>

</template>

<script>


    // visibility filters
    var filters = {
        all: function (todos) {
            return todos
        },
        active: function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed
            })
        },
        completed: function (todos) {
            return todos.filter(function (todo) {
                return todo.completed
            })
        }
    }

    export default {
        name: 'matrice',
        props:['matrice'],
        data() {
            return {
//                todos: this.matrice.todos,
                newTodo: {title: '', urgence:'Non-Urgent', importance:'Non-Important', duree:''},
                editedTodo: null,
                visibility: 'all',
                title: ''
            }
        },
        // computed properties
        // http://vuejs.org/guide/computed.html
        computed: {
            filteredTodos: function () {
                return filters[this.visibility](this.matrice.todos)
            },
            remaining: function () {
                return filters.active(this.matrice.todos).length
            },
            allDone: {
                get: function () {
                    return this.remaining === 0
                },
                set: function (value) {
                    this.matrice.todos.forEach(function (todo) {
                        todo.completed = value
                    })
                }
            }
        },

        filters: {
            pluralize: function (n) {
                return n === 1 ? 'tâche' : 'tâches'
            }
        },
        watch:{
            matrice: function () {
                console.log('watch matrice')
            }
        },

        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            addTodo: function () {
                var value = this.newTodo.title && this.newTodo.title.trim()
                if (!value) {
                    return
                }
                this.matrice.todos.push({
                    id: this.matrice.todos.length,
                    title: value,
                    completed: false,
                    importance: this.newTodo.importance,
                    urgence: this.newTodo.urgence,
                    duree: this.newTodo.duree
                })
                this.newTodo = {title: '', urgence:'Non-Urgent', importance:'Non-Important', duree:''}
            },

            removeTodo: function (todo) {
                this.matrice.todos.splice(this.matrice.todos.indexOf(todo), 1)
            },

            editTodo: function (todo) {
                this.beforeEditCache = todo.title
                this.editedTodo = todo
            },

            doneEdit: function (todo) {
                if (!this.editedTodo) {
                    return
                }
                this.editedTodo = null
                todo.title = todo.title.trim()
                if (!todo.title) {
                    this.removeTodo(todo)
                }
            },
            // handle routing
            onHashChange () {
                var visibility = window.location.hash.replace(/#\/?/, '')
                if (filters[visibility]) {
                    this.visibility = visibility
                } else {
                    window.location.hash = ''
                    this.visibility = 'all'
                }
            },

            cancelEdit: function (todo) {
                this.editedTodo = null
                todo.title = this.beforeEditCache
            },

            removeCompleted: function () {
                this.matrice.todos = filters.active(this.matrice.todos)
            }
        },

        // a custom directive to wait for the DOM to be updated
        // before focusing on the input field.
        // http://vuejs.org/guide/custom-directive.html
        directives: {
            'todo-focus': function (el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        },
        mounted(){
            window.addEventListener('hashchange', this.onHashChange)
            this.onHashChange()
        }
    }


</script>
<style>
    .todo-list li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }
    label[for='toggle-all'] {
        display: none;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .toggle-all {
            background: none;
        }

        input[type="checkbox"]:focus{
            outline:0;
        }
        .toggle{
            -webkit-appearance: none;
        }
        .todo-list li .toggle:after {
            content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
        }

        .todo-list li .toggle:checked:after {
            content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
        }
        .toggle-all {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            -webkit-appearance: none;
            /*appearance: none;*/
        }
    }
    .toggle-all {
        position: absolute;
        width: 60px;
        height: 34px;
        left: -12px;
        text-align: center;
        border: none; /* Mobile Safari */
        z-index: 2;
    }
    .new-todo {

        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    .toggle-all:before {
        content: '❯';
        font-size: 22px;
        font-weight: 600;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked:before {
        color: #737373;
    }
    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 806px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }
    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .edit {
        display: none;
    }


</style>
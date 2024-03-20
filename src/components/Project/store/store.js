import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
    flag : null,
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    COMPLETE_TODO(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
      }
    },
    EDIT_TODO(state, updatedTodo) {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      }
      
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    removeTodo({ commit }, id) {
      commit('REMOVE_TODO', id);
    },
    completeTodo({ commit }, id) {
      commit('COMPLETE_TODO', id);
    },
    editTodo({ commit }, updatedTodo) {
      commit('EDIT_TODO', updatedTodo);
    }
  },
  getters: {
    allTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed),
  }
});

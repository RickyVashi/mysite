import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
    flag : null,
    formData: {
      email: '',
      gender: '',
      hobbies: ['Reading']
    },
    validationSchema: null
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
      },
      UPDATE_FORM_DATA(state, formData) {
        state.formData = formData;
      },
      SET_VALIDATION_SCHEMA(state, schema) {
        state.validationSchema = schema;
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
    },
    updateFormData({ commit }, formData) {
      commit('UPDATE_FORM_DATA', formData);
    } ,
    setValidationSchema({ commit }, schema) {
      commit('SET_VALIDATION_SCHEMA', schema);
    }
  },
  getters: {
    allTodos: state => state.todos.filter(todo => !todo.completed),
    completedTodos: state => state.todos.filter(todo => todo.completed),
    formData: state => state.formData,
    validationSchema: state => state.validationSchema
  }
});

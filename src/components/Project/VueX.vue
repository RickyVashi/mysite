<template>
    <div class="mx-24 my-8">
      <div class="todo-app">
        <h2 class="text-2xl font-bold mb-4">Todo List</h2>
        <div class="flex flex-col justify-center items-center mb-4">
          <input type="text" v-model="newTodo" placeholder="Title" class="px-3 py-2 border rounded-md" />
          <textarea v-model="newDescription" placeholder="Description" class="px-3 py-2 border rounded-md"></textarea>
          <button @click="addItemOrEdit" class="px-4 py-2 bg-blue-500 text-white rounded-md"> {{ editingTodoIndex === null ? 'Add' : 'Update' }} </button>
        </div>
      </div>
  
      <div class="card-container">
        <draggable class="list-group" :list="completedLists" group="people">
          <template v-slot:item="{ element : todo}">
            <div class="card thisCompleted border rounded-md p-4 mb-4">
              <p class="btn bg-green-500 text-white px-4 py-2 rounded-full mb-2">Completed</p>
              <h3 class="text-lg font-semibold mb-2"> {{ todo.title }} </h3>
              <p class="mb-2"> {{ todo.description }}</p>
              <button @click="removeTodo(todo.id)" class="remove-btn px-4 py-2 bg-red-500 text-white rounded-md">Remove</button>
            </div>
          </template>
        </draggable>
  
        <draggable class="list-group" :list="lists" group="people">
          <template v-slot:item="{ element : todo,index }">
            <div class="card border flex flex-col rounded-md p-4 mb-4 justify-center items-center" :class="{ 'edited-item': index === editedItemIndex }">
              <h3 class="text-lg font-semibold mb-2"> {{ todo.title }} </h3>
              <p class="mb-2"> {{ todo.description }}</p>
              <button @click="removeTodo(todo.id)" class="px-4 py-2 bg-red-600 w-full text-white rounded-md mt-6">Remove</button>
              <button @click="editTodo(todo)" v-if="show" class="edit-btn px-4 py-2 w-full bg-blue-500 text-white rounded-md">Edit</button>
              <button @click="completeTodo(todo.id)" class="complete-btn px-2 py-2 w-full bg-green-500 text-white rounded-md">Complete</button>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from "vuedraggable";
  export default {
    display: "Table",
    order: 8,
    components: {
      draggable
    },
    computed: {
      allTodos() {
        return this.$store.getters.allTodos;
      },
      completedTodos() {
        return this.$store.getters.completedTodos;
      }
    },
    data() {
      return {
        newTodo: '',
        newDescription: '',
        editingTodoIndex: null,
        id: 0,
        show: true,
        editedItemIndex: -1,
        dragging: false,
        lists: [],
        completedLists: []
      };
    },
    methods: {
      addItemOrEdit() {
        if (this.editingTodoIndex !== null) {
          // Editing existing todo
          this.$store.dispatch('editTodo', {
            id: this.editingTodoIndex,
            title: this.newTodo,
            description: this.newDescription,
          });
          // Reset editing state
          this.editingTodoIndex = null;
          this.editedItemIndex = -1;
          this.show = true;
        } else {
          // Adding new todo
          if (this.newTodo.trim() === '' && this.newDescription.trim() === '') return;
          this.$store.dispatch('addTodo', {
            id: this.id,
            title: this.newTodo,
            description: this.newDescription,
            completed: false
          });
          this.id = this.id + 1;
        }
        this.lists = this.allTodos;
        // Clear input fields
        this.newTodo = '';
        this.newDescription = '';
      },
      removeTodo(id) {
        this.$store.dispatch('removeTodo', id);
        this.newTodo = '';
        this.newDescription = '';
        this.editingTodoIndex = null;
        this.lists = this.allTodos;
        this.completedLists = this.completedTodos;
      },
      completeTodo(id) {
        this.$store.dispatch('completeTodo', id);
        this.newTodo = '';
        this.newDescription = '';
        this.editingTodoIndex = null;
        this.completedLists = this.completedTodos;
        this.lists = this.allTodos;
      },
      editTodo(todo) {
        // Set editingTodoIndex to the index of the todo item being edited
        this.editingTodoIndex = todo.id;
        this.editedItemIndex = this.allTodos.findIndex(item => item.id === todo.id);
        // Set input fields with todo data for editing
        this.newTodo = todo.title;
        this.newDescription = todo.description;
        this.show = false;
      }
    }
  }
  </script>
  

<style scoped>
.container {
    width: 70%;
    margin: 0 auto;
}

.todo-app {
    font-family: Arial, sans-serif;
    margin: 20px 0;
    padding: 20px;
    background-color: #e8e8e8;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

.add-todo {
    margin-bottom: 20px;
}

.card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    height: 250px;
}

.list-item {
    padding: 20px;
}

input[type="text"],
textarea {
    width: calc(100% - 40px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}


button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}






.card-container {
  padding: 0px;
  justify-content:space-between;
}

.list-group{
  display : flex;
  flex-wrap: wrap;
  gap : 28px;
  justify-content:flex-start;

}

.card {
    width: 160px;
    /* Three cards in a row with spacing */
    background-color: #faadad2c;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border : 1px solid rgb(52, 33, 198)
}

.list-item {
    padding: 20px;
    height: 100%;
    /* Ensure list-item fills the card height */
}

.list-item h3 {
    margin-bottom: 10px;
}

.list-item p {
    margin-bottom: 15px;
}

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}

.remove-btn,
.edit-btn,
.complete-btn {
    margin-top: 10px;
}

.complete-btn {
    background-color: #33cc33;
}

.edit-btn {
    background-color: #007bff;
}
.thisCompleted {
  background-color: rgba(154, 255, 30, 0.621);
}

.label {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #33cc33;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}



.edited-item{
  background-color: #968080;
}
</style>

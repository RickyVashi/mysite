<template>
    <div class="todo-list  mt-12 px-12">
      <div class="p-6 flex items-center bg-gray-100 justify-center rounded-xl">
        <input type="text" placeholder="Enter a Task" v-model="task" class="input-field px-3 py-2 border rounded-md mr-2" />
        <button @click="addTask" class="action-btn px-4 py-2 -mt-2 bg-blue-500 text-white rounded-md">Add</button>
      </div>
  
      <table class="task-table w-full border-collapse border border-gray-300 my-8">
        <thead>
          <tr>
            <th class="py-2 px-4 border-2 border-gray-300 w-[10%]">No</th>
            <th class="py-2 px-4 border-2 border-gray-300 w-[60%]">Task</th>
            <th class="py-2 px-4 border-2 border-gray-300 w-[40%]">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tasks" :key="item.id">
            <td class="py-2 px-4 border border-gray-300">{{ index 
                }}</td>
            <td class="py-2 px-4 border border-gray-300">
              <input v-model="editedTask" v-if="edittask === item.id" class="edit-input px-3 py-1 border rounded-md" />
              <span v-else>{{ item.task }}</span>
            </td>
            <td class="py-2 px-4 border border-gray-300">
              <button @click="deleteTask(item.id)" class="action-btn delete-btn px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
              <button @click="editTask(item.id)" v-if="show" class="action-btn edit-btn px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Edit</button>
              <button @click="saveTask(item.id)" v-if="edittask === item.id" class="action-btn save-btn px-4 py-2 bg-green-500 text-white rounded-md ml-2">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </template>
  
  <script>
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    name: 'HelloWorld',
    data() {
      return {
        task: '',
        tasks: [],
        edittask: null,
        editedTask: '',
        show: true
      };
    },
    methods: {
      addTask() {
        if (this.task.trim() !== '') {
          const newTask = {
            id: uuidv4(),
            task: this.task
          };
          this.tasks.push(newTask);
          this.task = '';
        }
      },
      deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
        }
      },
      editTask(taskId) {
        this.show = false;
        this.edittask = taskId;
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
          this.editedTask = task.task;
        }
      },
      saveTask(taskId) {
        this.show = true;
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1 && this.editedTask.trim() !== '') {
          this.tasks[taskIndex].task = this.editedTask;
          this.edittask = null;
          this.editedTask = '';
        }
      },
    },
  };
  </script>
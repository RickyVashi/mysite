<template>
    <div class="flex flex-col justify-center items-center w-full h-full">
      <h1>Blog Posts</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <p>{{ formatCreationDate(post.createdAt) }}</p>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  
  export default {
    data() {
      return {
        posts: [
          { id: 1, title: 'First Post', createdAt: '2022-01-01T12:00:00Z' },
          { id: 2, title: 'Second Post', createdAt: '2022-01-02T08:30:00Z' },
          { id: 3, title: 'Third Post', createdAt: '2022-01-03T15:45:00Z' }
        ]
      };
    },
    methods: {
      formatCreationDate(date) {
        return moment(date).fromNow();
      }
    }
  };
  </script>
  <!-- <template>
    <div>
      <span>Published on : {{new Date("07-12-2016") | timeDate}}</span>
      <span>Last updated : {{new Date() | timeAgo}}</span>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  export default {
    filters: {
      timeDate(value) {
        return moment(value).format('YYYY-MM-DD')
      },
      timeAgo(value) {
        return moment(value).fromNow()
      }
    }
  }
  </script> -->1
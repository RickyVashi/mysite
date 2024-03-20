<template>
  <div class="px-8">
    <div class="list-container">
        <h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Draggable List</h1>
      <draggable v-model="list" class="draggable-container mx-8">
          <template v-slot:item="{ element:item }">
              <div class="list-item">{{ item.name }}</div>
          </template>
      </draggable>
  </div>
  <div class="draggable-lists-container mx-8">
      <div class="list-container">
          <h3  class="font-bold">List 1</h3>
          <draggable class="list-group" :list="list1" group="people" @change="log">
              <template v-slot:item="{ element }">
                  <div class="list-item" :key="element.id">
                      {{ element.name }} {{ element.id }}
                  </div>
              </template>
          </draggable>
      </div>
  
      <div class="list-container">
          <h3  class="font-bold">List 2</h3>
          <draggable class="list-group" :list="list2" group="people" @change="log">
              <template v-slot:item="{ element }">
                  <div class="list-item" :key="element.id">
                      {{ element.name }} {{ element.id }}
                  </div>
              </template>
          </draggable>
      </div>
  </div>
  </div>

</template>

  
<script>
import draggable from "vuedraggable";

export default {
    order: 1,
    components: {
        draggable
    },
    data() {
        return {
            list: [{
                    id: 1,
                    name: 'Item 1'
                },
                {
                    id: 2,
                    name: 'Item 2'
                },
                {
                    id: 3,
                    name: 'Item 3'
                },
                {
                    id: 4,
                    name: 'Item 4'
                },
                {
                    id: 5,
                    name: 'Item 5'
                }
            ],
            list1: [{
                    name: "a",
                    id: 1
                },
                {
                    name: "a",
                    id: 2
                },
                {
                    name: "a",
                    id: 3
                },
                {
                    name: "a",
                    id: 4
                }
            ],
            list2: [{
                    name: "b",
                    id: 5
                },
                {
                    name: "b",
                    id: 6
                },
                {
                    name: "b",
                    id: 7
                }
            ]
        };
    },
    methods: {
        log: function (evt) {
            console.log(evt);
        }
    }
};
</script>

  
<style>
.draggable-lists-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
}

.list-container {
    flex: 1;
    margin-right: 20px;
}

.list-container:last-child {
    margin-right: 0;
    /* Remove margin from last list to prevent overflow */
}

.list-container h3 {
    margin-bottom: 10px;
}

.list-item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 5px;
}
</style>

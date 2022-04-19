<template>
  <Table :table="table"></Table>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Table from "@/components/table/Table.vue";

export default defineComponent({
  name: 'App',
  components: {Table},
  data() {
    return {
      table: {
        microserviceName: 'first',
        modelName: 'User',
        url: 'http://localhost/api',
        metadataActionName: 'getTablesMetadata',
        tableName: 'UsersMetadata',
      }
    }
  },

  methods: {},
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
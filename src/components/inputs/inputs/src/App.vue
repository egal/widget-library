<template>
  <FileUploader />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUploader from '@/components/FileUploader/FileUploader.vue'

export default defineComponent({
  name: 'App',
  components: { FileUploader },
  data() {
    return {
      options: [
        {
          name: 'Second option',
          key: 0,
        },
        {
          name: 'Kjhkjh',
          key: 1,
        },
        {
          name: 'Ouowidjw',
          key: 2,
        },
        {
          name: 'Jwdkjbkdjw',
          key: 3,
        },
        {
          name: 'Lkwjd',
          key: 4,
        },
        {
          name: 'Ooiwue',
          key: 5,
        },
      ],
      groupedOptions: [
        {
          groupName: 'Group 1',
          options: [
            {
              name: 'Second option',
              key: 0,
            },
            {
              name: 'Kjhkjh',
              key: 1,
            },
            {
              name: 'Ouowidjw',
              key: 2,
            },
            {
              name: 'Jwdkjbkdjw',
              key: 3,
            },
            {
              name: 'Lkwjd',
              key: 4,
            },
            {
              name: 'Ooiwue',
              key: 5,
            },
          ],
        },
        {
          groupName: 'Group 2',
          options: [
            {
              name: 'Lksdje',
              key: 6,
            },
            {
              name: 'Oiuoeun',
              key: 7,
            },
            {
              name: 'Poiwepor',
              key: 8,
            },
            {
              name: 'Gwojpjf',
              key: 9,
            },
            {
              name: 'Oiulasoeun',
              key: 7,
            },
            {
              name: 'Poiwdsepor',
              key: 8,
            },
            {
              name: 'Gwsdojpjf',
              key: 9,
            },
          ],
        },
      ],
    }
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>

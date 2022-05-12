<template>
  <div>
    <EFileUploader
      :data="{
        modelValue: [],
        label: '',
        helperText: '',
        multiple: false,
        size: 'sm',
        validators: [],
        accept: [],
        maxFiles: 1,
        maxSize: 0,
        disabled: false,
        deletable: true,
        domain: 'http://127.0.0.1:88',
        microservice: 'core',
        model: 'Image',
        text: 'Выберите файл или',
        actionText: 'Загрузите файл',
      }"
      @on:delete="deleteFile"
      @on:upload="createUploadChunkPath"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EFileUploader from '@/components/inputs/FileUploader/EFileUploader.vue'
export default defineComponent({
  name: 'App',
  components: { EFileUploader },
  data() {
    return {}
  },
  methods: {
    deleteFile() {
      console.log('deleteFile')
    },
    createUploadChunkPath() {
      console.log('createUploadChunkPath')
    },
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
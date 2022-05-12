<template>
  <div>
    <EFileUploader
      :data="{
        modelValue: [],
        text: 'Выберите файл или',
        actionText: 'Загрузите файл',
        domain: 'http://development.ow-apcs.sputnikfund.ru/api',
        model: 'Image',
        contentType: 'application/json',
        authToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoidXN0IiwiYXV0aF9pbmZvcm1hdGlvbiI6eyJpZCI6IjQ0YTVkMDYyLWFlNWEtMTFlYy1iOTA5LTAyNDJhYzEyMDAwMiIsImNyZWF0ZWRfYXQiOm51bGwsInVwZGF0ZWRfYXQiOm51bGwsInBob25lIjoiODExMTExMTExMTEiLCJhdXRoX2lkZW50aWZpY2F0aW9uIjoiNDRhNWQwNjItYWU1YS0xMWVjLWI5MDktMDI0MmFjMTIwMDAyIiwicm9sZXMiOlsiYWRtaW4iXSwicGVybWlzc2lvbnMiOlsiYXV0aGVudGljYXRlIl19LCJhbGl2ZV91bnRpbCI6IjIwMjItMDUtMTJUMDU6MTg6NDcuNjIzNzE5WiJ9.t36BFzxzs2uKYg3jtlPJ0nqbi0yMKH_Z8yemZx0o2sU',
      }"
      @deleteFile="deleteFile"
      @createUploadChunkPath="createUploadChunkPath"
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

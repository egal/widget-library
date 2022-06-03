#Изменения 
- В объект `:data` добавлены новые параметры:

| Параметр       | Тип    | По умолчанию     | Возможные значения | Описание                                     |
|:---------------|:-------|:-----------------|:-------------------|:---------------------------------------------|
| `loadingText`  | String | `'Loading...'`   | Любая строка       | Текст во время загрузки файла                |
| `tryAgainText` | String | `'Try again'`    | Любая строка       | Текст внутри компонента "Повторить загрузку" |
| `errorText`    | String | `''`             | Любая строка       | Текст во время загрузки файла                |


- Изменение примера использования 
````vue
<template>
  <div>
    <EFileUploader
      @on:upload="uploadFile"
      @error:upload="errorUploadFile"
      @on:delete="deleteFile"
      @error="onError"
      :data="{
        label: 'Изображение',
        helperText: 'Формат png, jpeg, до 4Мб',
        maxFiles: 2,
        maxSize: 0,
        multiple: true,
        size: 'lg',
        accept: ['image/png', 'image/jpeg'],
        validators: [],
        disabled: false,
        deletable: true,
        domain: 'http://127.0.0.1:88',
        microservice: 'core',
        model: 'Image',
        innerText: 'Выберите файл или',
        actionInnerText: 'Загрузите файл',
        errorText: error,
        modelValue: files,
      }"
    />
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EFileUploader from '@/components/inputs/FileUploader/EFileUploader.vue'

export default defineComponent({
  name: 'App',
  components: { EFileUploader },
  data() {
    return {
      files: [],

      error: '',
    }
  },
  mounted() {},
  methods: {
    errorUploadFile(er) {
      this.error = er?.message || ''
    },

    // После успешной загрузки файла - нужно обновить массив с файлами для modelValue
    uploadFile(file) {
      this.files.push(file)
    },

    deleteFile() {}
  },
})
</script>
````

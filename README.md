## Изменения
Добавлена зависимость @egalteam/framework

В передаваемый объект `:data` добавлены свойства:

| Параметр        |   Тип   |    По умолчанию     | Возможные значения | Описание                                                                                             |
|:----------------|:-------:|:-------------------:|:------------------:|:-----------------------------------------------------------------------------------------------------|
| innerText       | String  | 'Drop file here or' |    Любая строка    | Текст внутри drop области компонента                                                                 |
| actionInnerText | String  |    'Browse file'    |    Любая строка    | Текст внутри drop области компонента, по клику на который открывается окно выбора файла для загрузки |

 
## Пример использования
````vue
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
        innerText: 'Выберите файл или',
        actionInnerText: 'Загрузите файл',
      }"
      @on:delete="deleteFile"
      @on:upload="uploadFile"
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
    deleteFile() {},
    uploadFile() {},
  },
})
</script>
````
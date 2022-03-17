#Toaster
Добавлени
- В тостер можно передавать текст с HTML тегами через свойство `rawHtml`. Пример:
````javascript
this.$toaster.info({
      title: '',
      rawHtml: 'text must be <span style="color: red">red</span>',
      flat: true,
    })
````

- Добавлен проп (глобальный конфиг) `styleConfig` (тип: Object) для компонента `ToasterContainer`  

### Использование styleConfig 
(Только для изменения стилей заголовка (`title`), сообщения (`message`) и текста (`rawHtml`)).
Чтобы кастомизировать текст внутри тостера, нужно передать в `styleConfig` объект в виде:
````javascript
{
  title: {
    color: 'green'
  },
  message: {
   color: 'blue',
   fontSize: '18px'
  },
  rawHtml: {
    fontSize: '18px'
  },
}
````
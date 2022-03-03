# egal-widgets: calendar
 
## Calendar
Принимает 1 объект data, содержимое описано в таблице ниже
 

### Параметры объекта data
| Параметр                  |       Тип        | Возможные значения                                                                                              | Описание                                                                                                                                                     |
|---------------------------|:----------------:|:----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``fontFamily``            |      String      | Любая строка                                                                                                    | font-family текста                                                                                                                                           |
| ``fontWeight``            | [String, Number] | ``'regular'``, ``800``                                                                                          | font-weight текста                                                                                                                                           |
| ``fontSize``              |      String      | ``'14px'``                                                                                                      | font-size текста                                                                                                                                             |                                                     
| ``activeColor``           |      String      | ``"#0066FF"``                                                                                                   | Цвет фона выбранного дня (или первого и последнего дня, если выбран диапазон дней)                                                                           |                                                 
| ``activeBackgroundColor`` |      String      | ``"#E5F0FF"``                                                                                                   | Цвет фона дней внутри выбранного диапазона, также цвет фона при наведении                                                                                    |                                                          
| ``isAdaptiveSize``        |     Boolean      | ``true``, ``false``                                                                                             | Должен ли календарь растягиваться по ширине контейнера. Еслм значение - ``false``, календарь будет иметь дефолтные ширину и высоту                           | 
| ``isDouble``              |     Boolean      | ``true``, ``false``                                                                                             | Отображать ли "двойной" календарь                                                                                                                            |
| ``locale``                |      String      | ``'en-US'``                                                                                                     | Заданная локаль влияет на язык, на котором будут отображаться названия дней недели и месяца                                                                  |
| ``timePicker``            |      Object      |                                                                                                                 | Объект с параметрами для инпута с выбором времени                                                                                                            |
| ``timePicker.isAMPM``     |      Boolean       | ``true``, ``false``                                                                                             | Отображать время в 12-часовом или 24-часовом формате. Если значение - ``true``, время отображается в 12-часовом формате (добавляется селект с выбором AM/PM) | 
| ``timePicker.label``      |      String      | Любая строка                                                                                                    | Текст лейбла над селектом                                                                                                                                    |
| ``data``                  |      Object      |                                                                                                                 | Объект с данными (выбранные даты)                                                                                                                            |
| ``data.date_from``        |      String      | Дата или дата и время в формате ISO (``"2022-03-02T04:28:12.089Z"`` или ``"2022-03-02"``, если время не задано) | Начальная дата (если выбран диапазон) или выбранная                                                                                                          |
| ``data.date_to``          |      String      | Дата или дата и время в формате ISO                                                                             | Размер инпута                                                                    Конечная дата                                                               |            

### События

| Название            |   Тип параметров  | Описание                                                         |
|---------------------|:-----------------:|------------------------------------------------------------------|
|    ``error``        | String            | Возвращает ошибку из валидаторов                                                                                                                                                                                                                                                                                                                                                                    |
|``update:modelValue``| String            | Возвращает введенное значение
| ``keydown``         | Event             |  Вызывается при нажатии стрелки вниз на клавиатуре


#### Пример styleConfig

````javascript
styleConfig = {
        fontFamily: 'Open Sans',
        valueColor: 'black',
        valueFontWeight: '500',
        placeholderColor: 'gray',
        placeholderDisabledColor: 'gray',
        labelColor: 'black',
        labelFontWeight: '600',
        helperTextColor: 'gray',
        helperTextFontWeight: '400',
        helperTextFontSize: '10px',
        borderColor: 'gray',
        borderRadius: '6px',
        backgroundColor: 'white',
        backgroundDisabledColor: 'gray',
        focusBorderColor: 'blue',
        filledBackgroundColor: 'yellow',
        filledFontColor: 'blue',
        searchBackgroundColor: 'gray',
        iconColor: 'gray',
        errorColor: 'red',
        successColor: 'green'
      }
````

#### Пример функции валидатора

````javascript
// Валидаия на обязательное поле
const required = (value) => {
  if (
    !value ||
    value.length === 0 ||
    (value instanceof Object && !Array.isArray(value) && !value.value)
  ) {
    return 'This field is required' // Если нет значения выводим ошибку
  }
  return '' // Иначе ошибки нет
}
````


## Select

### Параметры
| Параметр         |   Тип             | По умолчанию      | Возможные значения                                                                         | Описание                                                                                                                                                                                                                                                                                                                                           |
|------------------|:-----------------:|:-----------------:|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``paceholder``   | String            |  ``''``           |    Любая строка                                                                            | Placeholder
|    ``label``     | String            |  ``''``           |    Любая строка                                                                            | Label
|  ``helperText``  | String            |  ``''``           |   Любая строка                                                                             | Мелкий текст под селектом
|    ``error``     | String            |  ``''``           |    Любая строка                                                                            | Вывод кастомной ошибки
|``modelValue``    | [Object, Array]   |  ``[]``           | Любой массив или объект с выбранным(и) из списка значением(ями) (можно использовать v-model)| Значение(я) селекта (можно использовать v-model)
|``options``       | Array             |  ``[]``           |    Массив объектов возможных значений                                                      | Список возможных значений
|``shownKey``      | String            |  ``name``         |    Любая строка                                                                            | Ключ, по которому выводить значение в селект и дропдаун
|  ``validators``  | Array             |  ``[]``           |    Массив функций-валидаторов                                                              | Проверка значения будет проходить через каждую функцию-валидатор
|    ``size``      | String            |  ``md``           |   ``sm``, ``md``, ``lg``                                                                   | Размер селекта
|    ``showError`` | Boolean           |  ``true``         |   ``true``, ``false``                                                                      | Показывать ошибку и состояние селекта
|``clearable``     | Boolean           |  ``true``         |   ``true``, ``false``                                                                      | Стирать введенное значение с помощью кнопки
|``multiple``      | Boolean           |  ``false``        |   ``true``, ``false``                                                                      | Возможность выбора более одного значения из списка
|``searchable``    | Boolean           |  ``false``        |   ``true``, ``false``                                                                      | Осуществлять поиск по списку значений
|``grouped``       | Boolean           |  ``false``        |   ``true``, ``false``                                                                      | Группировать список в дропдауне (нужен определенный вид options)
|``styleConfig``   | Object            |  ``{}``           |   Объект стилей                                                                            | Кастомизация стилей селекта
|``dropdownStyleConfig``| Object            |  ``{}``           |   Объект стилей                                                                            | Кастомизация стилей дропдауна

### События

| Название            |   Тип параметров  | Описание                                                         |
|---------------------|:-----------------:|------------------------------------------------------------------|
|    ``error``        | String            | Возвращает ошибку из валидаторов                                                                                                                                                                                                                                                                                                                                                                    |
|``update:modelValue``| String            | Возвращает выбранное(ые) значение(я)


#### Пример options
```javascript
options = [
    {
        name: 'Option one',
        key: 1
    },
    {
        name: 'Option two',
        key: 2
    },
    {
        name: 'Option three',
        key: 3
    }
]
```


#### Пример groupedOptions
```javascript
groupedOptions = [
    {
        groupName: 'First group',
        options: [
            {
                name: 'Option one',
                key: 1
            },
            {
                name: 'Option two',
                key: 2
            },
            {
                name: 'Option three',
                key: 3
            }
        ]
    },
    {
        groupName: 'Second group',
        options: [
            {
                name: 'Option four',
                key: 4
            },
            {
                name: 'Option five',
                key: 5
            }
        ]
    }
]
```

#### Пример styleConfig

````javascript
styleConfig = {
        fontFamily: 'Open Sans',
        valueColor: 'black',
        valueFontWeight: '500',
        placeholderColor: 'gray',
        placeholderFontSize: '12px',
        labelColor: 'black',
        labelFontWeight: '600',
        labelFontSize: '12px',
        helperTextColor: 'gray',
        helperTextFontWeight: '400',
        helperTextFontSize: '10px',
        borderColor: 'gray',
        borderRadius: '6px',
        backgroundColor: 'white',
        focusBorderColor: 'blue',
        filledBackgroundColor: 'yellow',
        filledFontColor: 'blue',
        crossColor: 'gray',
        arrowColor: 'gray',
        errorColor: 'red',
      }
````

#### Пример dropdownStyleConfig

````javascript
dropdownStyleConfig = {
        fontFamily: 'Open Sans',
        optionColor: 'black',
        optionHoverBackgroundColor: 'gray',
        optionFontWeight: 500,
        activeBackgroundColor: 'blue',
        activeOptionColor: 'white',
        groupNameColor: 'gray',
        groupNameFontWeight: 600,
        backgroundColor: 'white',
        borderColor: 'blue',
        borderRadius: '10px',
        boxShadow: '0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)'
      }
````


## Textarea

### Параметры
| Параметр         |   Тип             | По умолчанию      | Возможные значения                                                                         | Описание                                                                                                                                                                                                                                                                                                                                           |
|------------------|:-----------------:|:-----------------:|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``paceholder``   | String            |  ``''``           |    Любая строка                                                                            | Placeholder
|    ``label``     | String            |  ``''``           |    Любая строка                                                                            | Label
|  ``helperText``  | String            |  ``''``           |   Любая строка                                                                             | Мелкий текст под полем ввода
|    ``error``     | String            |  ``''``           |    Любая строка                                                                            | Вывод кастомной ошибки
|``modelValue``    | String            |  ``''``           |    Любая строка                                                                            | Значение инпута (можно использовать v-model)
|  ``validators``  | Array             |  ``[]``           |    Массив функций-валидаторов                                                              | Проверка значения будет проходить через каждую функцию-валидатор
|    ``size``      | String            |  ``md``           |   ``sm``, ``md``, ``lg``                                                                   | Размер поля ввода
|   ``disabled``   | Boolean           |  ``false``        |    ``true``, ``false``                                                                     | Заблокировать поле ввода
|``styleConfig``   | Object            |  ``{}``           |   Объект стилей                                                                            | Кастомизация стилей поля ввода

### События

| Название            |   Тип параметров  | Описание                                                         |
|---------------------|:-----------------:|------------------------------------------------------------------|
|    ``error``        | String            | Возвращает ошибку из валидаторов                                                                                                                                                                                                                                                                                                                                                                    |
|``update:modelValue``| String            | Возвращает выбранное(ые) значение(я)

#### Пример styleConfig

````javascript
styleConfig = {
        fontFamily: 'Open Sans',
        valueColor: 'black',
        valueFontWeight: '500',
        placeholderColor: 'gray',
        labelColor: 'black',
        labelFontWeight: '600',
        helperTextColor: 'gray',
        helperTextFontWeight: '400',
        borderColor: 'gray',
        borderRadius: '6px',
        backgroundColor: 'white',
        focusBorderColor: 'blue',
        errorColor: 'red',
      }
````



## Counter

### Параметры
| Параметр         |   Тип             | По умолчанию      | Возможные значения                                                                         | Описание                                                                                                                                                                                                                                                                                                                                           |
|------------------|:-----------------:|:-----------------:|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    ``label``     | String            |  ``''``           |    Любая строка                                                                            | Label
|  ``helperText``  | String            |  ``''``           |   Любая строка                                                                             | Мелкий текст под счетчиком
|``modelValue``    | Number            |  ``0``            |   Любое число                                                                              | Значение счетчика (можно использовать v-model)
|``min``           | Number            |  ``null``         |   Любое число                                                                              | Минимальное возможное значение
|``max``           | Number            |  ``null``         |   Любое число                                                                              | Максимальное возможное значение
|    ``size``      | String            |  ``md``           |   ``sm``, ``md``, ``lg``                                                                   | Размер счетчика
|``styleConfig``   | Object            |  ``{}``           |   Объект стилей                                                                            | Кастомизация стилей счетчика

### События

| Название            |   Тип параметров  | Описание                                                         |
|---------------------|:-----------------:|------------------------------------------------------------------|
|``update:modelValue``| String            | Возвращает выбранное значение

#### Пример styleConfig

````javascript
styleConfig = {
        fontFamily: 'Open Sans',
        valueColor: 'black',
        valueFontWeight: '500',
        labelColor: 'black',
        labelFontWeight: '600',
        helperTextColor: 'gray',
        helperTextFontWeight: '400',
        borderColor: 'gray',
        borderRadius: '6px',
        iconColor: 'gray'
      }
````



## File Uploader

### Параметры
| Параметр         |   Тип             | По умолчанию      | Возможные значения                                                                         | Описание                                                                                                                                                                                                                                                                                                                                           |
|------------------|:-----------------:|:-----------------:|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    ``label``     | String            |  ``''``           |    Любая строка                                                                            | Label
|  ``helperText``  | String            |  ``''``           |   Любая строка                                                                             | Мелкий текст под счетчиком
|``modelValue``    | Array             |  ``[]``           |   Массив файлов                                                                            | Массив объектов с полями id, name, size, file_url  (можно использовать v-model)
|  ``validators``  | Array             |  ``[]``           |    Массив функций-валидаторов                                                              | Проверка значения будет проходить через каждую функцию-валидатор
|``maxFiles``      | Number            |  ``1``            |   Любое число                                                                              | Максимальное количество файлов
|``maxSize``       | Number            |  ``0``            |   Любое число                                                                              | Максимальный размер файла в байтах (0 означает без ограничений)
|   ``disabled``   | Boolean           |  ``false``        |    ``true``, ``false``                                                                     | Заблокировать инпут
|   ``deletable``  | Boolean           |  ``true``         |    ``true``, ``false``                                                                     | Возможность удалять файлы
|   ``multiple``   | Boolean           |  ``false``        |    ``true``, ``false``                                                                     | Возможность загрузить несколько файлов
|    ``size``      | String            |  ``md``           |   ``sm``, ``md``, ``lg``                                                                   | Размер счетчика
|    ``domain``    | String            |  ``''``           |   Любая строка                                                                             | Домейн для интеграции загрузки и удаления
| ``microservice`` | String            |  ``core``         |   Любая строка                                                                             | Микросервис для интеграции загрузки и удаления
|   ``model``      | String            |  ``Document``     |   Любая строка                                                                             | Модель для интеграции загрузки и удаления
|    ``accept``    | Array             |  ``[]``           |   ``['image/png', 'image/gif', 'image/jpeg', 'image/webp', ...]``                          | Массив строк с допустимыми форматами файлов
|``styleConfig``   | Object            |  ``{}``           |   Объект стилей                                                                            | Кастомизация стилей счетчика

### События

| Название            |   Тип параметров  | Описание                                                         |
|---------------------|:-----------------:|------------------------------------------------------------------|
|``error``            | String            | Возвращает ошибку валидаторов
|``error:upload``     | [Object, String]  | Возвращает ошибку, возникшую при загрузке файла
|``error:delete``     | [Object, String]  | Возвращает ошибку, возникшую при удалении файла
|``on:upload``        | String            | Возвращает id файла, который был загружен
|``on:delete``        | String            | Возвращает id файла, который был удален

#### Пример styleConfig

````javascript
styleConfig = {
        fontFamily: 'Open Sans',
        fileBackgroundColor: 'gray',
        fileBorderRadius: '6px',
        fileIconColor: 'black',
        fileNameFontWeight: 600,
        fileNameFontSize: '12px',
        fileNameColor: 'black',
        fileSizeFontWeight: 'gray',
        fileSizeColor: '10px',
        labelColor: 'gray',
        labelFontWeight: 500,
        labelFontSize: '12px',
        helperTextColor: 'gray',
        helperTextFontWeight: 500,
        helperTextFontSize: '10px',
        borderColor: 'gray',
        borderRadius: '6px',
        iconColor: 'gray',
        dropLabelColor: 'gray',
        browseLabelColor: 'blue',
        uploaderLabelsFontWeight: 500,
        uploderLabelsFontSize: '12px',
      }
````

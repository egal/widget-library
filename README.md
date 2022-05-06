- поправлены стили в ESelect
- изменения в SelectTime

### ! Изменения в других компонентах: 
- ESelect: в data добавлен проп showFilled: true (как у EInputа, для отображения "заполненного" состояние селекта)


Обновленный ReadMe (добавлен styleConfig, 4 новых свойства у объекта data (в самом низу таблицы), 3 новых эмита, убран пример json, т.к. уже не очень актуальный):


------------------------------------

## Calendar

Определяется тэгом:
```vue
<e-calendar></e-calendar>
```

Принимает  2 параметра в качестве пропа: 
1. объект data, содержимое описано в таблице ниже

### Параметры объекта data
| Параметр                  |       Тип        | Возможные значения                                                                                              | Описание                                                                                                                                                     |
|---------------------------|:----------------:|:----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``fontFamily``            |      String      | Любая строка                                                                                                    | font-family текста                                                                                                                                           |
| ``fontWeight``            | [String, Number] | ``'regular'``, ``800``                                                                                          | font-weight текста                                                                                                                                           |
| ``fontSize``              |      String      | ``'14px'``                                                                                                      | font-size текста                                                                                                                                             |                                                     
| ``activeColor``           |      String      | ``"#0066FF"``                                                                                                   | Цвет фона выбранного дня (или первого и последнего дня, если выбран диапазон дней)                                                                           |                                                 
| ``activeBackgroundColor`` |      String      | ``"#E5F0FF"``                                                                                                   | Цвет фона дней внутри выбранного диапазона, также цвет фона при наведении                                                                                    |                                                          
| ``isAdaptiveSize``        |     Boolean      | ``true``, ``false``                                                                                             | Должен ли календарь растягиваться по ширине контейнера. Еслм значение - ``false``, календарь будет иметь дефолтные ширину и высоту                           | 
| ``isDouble``              |     Boolean      | ``true``, ``false``                                                                                             | Отображать ли "двойной" календарь (по умолчанию ``false``)                                                                                                   |
| ``locale``                |      String      | ``'en-US'``                                                                                                     | Заданная локаль влияет на язык, на котором будут отображаться названия дней недели и месяца                                                                  |
| ``localeOptions``         |      Object      |                                                                                                                 | Опции для форматирования даты (для передачи в ``toLocaleString()``), чтобы кастомизировать отображение даты и времени в инпуте                               |
| ``timePicker``            |      Object      |                                                                                                                 | Объект с параметрами для инпута с выбором времени                                                                                                            |
| ``timePicker.isAMPM``     |     Boolean      | ``true``, ``false``                                                                                             | Отображать время в 12-часовом или 24-часовом формате. Если значение - ``true``, время отображается в 12-часовом формате (добавляется селект с выбором AM/PM) | 
| ``timePicker.label``      |      String      | Любая строка                                                                                                    | Текст лейбла над селектом                                                                                                                                    |
| ``data``                  |      Object      |                                                                                                                 | Объект с данными (выбранные даты)                                                                                                                            |
| ``data.date_from``        |      String      | Дата или дата и время в формате ISO (``"2022-03-02T04:28:12.089Z"`` или ``"2022-03-02"``, если время не задано) | Начальная дата (если выбран диапазон) или выбранная                                                                                                          |
| ``data.date_to``          |      String      | Дата или дата и время в формате ISO                                                                             | Размер инпута                                                                    Конечная дата                                                               |
| ``inputData``             |      Object      |                                                                                                                 | Объект, передаваемый в инпут как проп :data, для настройки инпута                                                                                            |
| ``rightInputData``        |      Object      |                                                                                                                 | Объект, передаваемый во второй инпут (появляется если в календаре можно выбирать диапазон дат) как проп :data, для настройки инпута                          |
| ``showInput``             |     Boolean      | ``true``, ``false``                                                                                             | Определяет, отображать ли инпут для выбора даты и времени над календарем                                                                                     |
| ``isRangePicker``         |     Boolean      | ``true``, ``false``                                                                                             | Определяет, можно ли выбрать диапазон дат, вместо одной. Если ``isDouble = true``, по умолчанию всегда можно выбрать диапазон                                |

2. объект styleConfig: Набор стилей для кастомизация календаря.

### Пример styleConfig (в примере указаны дефолтные значения)
````javascript
styleConfig = {
  fontFamily: 'Open Sans',
  fontWeight: 'normal',
  activeColor: '#0066FF', // цвет выбранной даты
  activeBackgroundColor: '#E5F0FF', // цвет при наведении на дату в календаре
  fontSize: '14px'
}
````

### События
| Название               | Тип параметров | Описание                                                                                                                  |
|------------------------|:--------------:|---------------------------------------------------------------------------------------------------------------------------|
| ``update:dateValue``   |     String     | Возвращает массив выбранных дат и времени                                                                                 |
| ``onError:inputValue`` |     String     | Возвращает ошибку из инпута, если в него были переданы какие-либо валидаторы (через ``inputData`` или ``rightInputData``) |
| ``close``              |     String     | Срабатывает при закрытии календаря                                                                                        |
| ``open``               |     String     | Срабатывает при открытии календаря                                                                                        |


#### Пример использования
````vue
<template>
  <div :style="{ width: '700px' }">
    <Calendar
        :data="calendarData"
        :style-config="{
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: 'regular',
        activeColor: '#0066FF',
        activeBackgroundColor: '#E5F0FF',
      }"
        @update:dateValue="(v) => setDate(v)"
        @onError:inputValue="(errorMsg) => handleError(errorMsg)"
    ></Calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calendar from '@/components/calendar/Calendar.vue'

export default defineComponent({
  name: 'App',
  components: { Calendar },
  data() {
    return {
      calendarData: {
        isAdaptiveSize: false,
        isDouble: false,
        isRangePicker: false,
        showInput: true,
        localeOptions: {
          year: '2-digit',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
        locale: 'en-US',
        timePicker: {
          isAMPM: false,
          label: 'Choose time',
        },
        date: {
          date_from: "2022-03-02T04:28:12.089Z",
          date_to: "2022-03-05"
        },
        inputData: {
          showFilled: false,
          validators: [this.required],
        },
        rightInputData: {
          showFilled: false,
        },
        timeSelectData: {
          showFilled: false,
        },
      },
    }
  },
  methods: {
    required(value) {
      return !value ? 'Обязательное поле' : ''
    },
    handleError(error) {
      // ...
    },
    setDate() {
      // ...
    },
  },
})
</script>
````


# egal_widget: Charts


Содержит Круговые графики:

- DonatChart - круговая диаграмма с сегментами:

![toasts](src/assets/charts/img/doughnut_bar.png)

````javascript
const config =   {
  type: 'doughnut',
  title: 'doughnut',
  description: 'doughnut description',
  data: {
    labels: [],
    datasets: [
      {
        label: 'GitHu3',
        backgroundColor: '#f82279',
        data: [4],
      },
      {
        label: 'GiftHu3',
        backgroundColor: '#f87979',
        data: [5],
      },
    ],
  },
  options: {
    angle: 90,
    fontColor: '#2D3748',
    secondFontColor: '#A0AEC0',
    fontWeight: 'bold',
    secondFontWeight: 'normal',
    titleFontSize: '14px',
    labelsFontSize: '12px',
    chartSize: 150,
    thickness: 10,
    centerValue: 'donat',
    centerLabel: '',
    background: '#ffffff',
    emptyColor: '#e2e8f0',
    hasLegend: true,
    legendPlacement: 'bottom',
    total: 100,
  },
},
````
<br/>

- ProgressChart - круговой график для одного значения

![toasts](src/assets/charts/img/half_progress_bar.png)

````javascript
const config =   {
  type: 'half_progress_bar',
  title: 'half_progress_bar',
  description: 'half_progress_bar description',
  data: {
    labels: [],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [11],
      },
    ],
  },
  options: {
    half: true,
    fontColor: '#2D3748',
    secondFontColor: '#A0AEC0',
    fontWeight: 'bold',
    secondFontWeight: 'normal',
    titleFontSize: '14px',
    labelsFontSize: '12px',
    emptyColor: '#e2e8f0',
    line: 'round',
    lineColor: '#005ce4',
    chartSize: 150,
    thickness: 8,
    angle: '0',
  },
},
````
<br/>

![toasts](src/assets/charts/img/progress_bar.png)

````javascript
const config =   {
  type: 'progress_bar',
  title: 'progress_bar',
  description: 'progress_bar description',
  data: {
    labels: [],
    datasets: [
      {
        label: 'GitHu3',
        backgroundColor: '#f87979',
        data: [55],
      },
    ],
  },
  options: {
    half: false,
    fontColor: '#2D3748',
    secondFontColor: '#A0AEC0',
    fontWeight: 'bold',
    secondFontWeight: 'normal',
    titleFontSize: '14px',
    labelsFontSize: '12px',
    emptyColor: '#e2e8f0',
    line: 'round',
    lineColor: '#005ce4',
    chartSize: 150,
    thickness: 8,
    angle: '-90',
  },
},
````
<br/>

- MultiProgressBar - для двух и более значений

![toasts](src/assets/charts/img/multi_progress_bar.png)

````javascript
const config = {
    type: 'multi_progress_bar',
    title: 'multi_progress_bar',
    description: 'multi_progress_bar description',
    data: {
      labels: [],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f82229',
          data: [40],
        },
        {
          label: 'GitHu3',
          backgroundColor: '#f87979',
          data: [8],
        },
      ],
    },
    options: {
      gap: 3,
      angle: '-90',
      fontColor: '#2D3748',
      secondFontColor: '#A0AEC0',
      fontWeight: 'bold',
      secondFontWeight: 'normal',
      titleFontSize: '14px',
      labelsFontSize: '12px',
      emptyColor: '#e2e8f0',
      line: 'round',
      chartSize: 150,
      thickness: 6,
      hasLegend: true,
      centerValue: '',
      centerLabel: '',
    },
  },
````
<br/>

Линейные графики:
- VerticalBarChart - вертикальный график

![toasts](src/assets/charts/img/vertical_bar.png)

````javascript
const config =   {
  type: 'vertical_bar',
  meta: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    barWidth: 11,
  },

  title: 'vertical_bar',
  description: 'vertical_bar description',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#0066FF',
        data: [40, 20, 12, 39, 10, 40, 39, 40, 40, 20, 12, 11],
      },
      {
        label: 'GitHu3',
        backgroundColor: '#76ACFB',
        data: [40, 20, 10, 35, 14, 45, 39, 88, 40, 27, 22, 41],
      },
      {
        label: 'GitHкu3',
        backgroundColor: '#A0AEC0',
        data: [14, 12, 14, 13, 1, 4, 3, 8, 40, 2, 22, 41],
      },
    ],
  },
  options: {
    legend: true,
    width: 327,
    height: 243,
  },
},
````
<br/>

- StackedBarChart - вертикальный график со столбцами, расположенными "друг на друге"

![toasts](src/assets/charts/img/stacked_bar.png)

````javascript
const config =   {
  type: 'stacked_bar',
  meta: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    barWidth: 11,
  },
  title: 'stacked_bar',
  description: 'stacked_bar description',
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#0066FF',
        data: [40, 20, 12, 39, 10, 40, 39, 40, 40, 20, 12, 11],
      },
      {
        label: 'GitHu3',
        backgroundColor: '#76ACFB',
        data: [40, 20, 10, 35, 14, 45, 39, 88, 40, 27, 22, 41],
      },
      {
        label: 'GitHкu3',
        backgroundColor: '#A0AEC0',
        data: [14, 12, 14, 13, 1, 4, 3, 8, 40, 2, 22, 41],
      },
    ],
  },
  options: {
    legend: true,
    width: 327,
    height: 243,
  },
},
````
<br/>

- HorizontalBarChart - график с горизонтальными столбцами

![toasts](src/assets/charts/img/horizontal_bar.png)

````javascript
const config =   {
  type: 'horizontal_bar',
  title: 'horizontal_bar',
  description: 'horizontal_bar description',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#0066FF',
        data: [40],
      },
      {
        label: 'GitHu3',
        backgroundColor: '#76ACFB',
        data: [51],
      },
      {
        label: 'GitghHu3',
        backgroundColor: '#A0AEC0',
        data: [4],
      },
    ],
  },
  options: {
    emptyColor: '#e2e8f0',
    fontColor: '#2D3748',
    secondFontColor: '#A0AEC0',
    titleFontSize: '14px',
    labelsFontSize: '12px',
    fontWeight: 'bold',
    secondFontWeight: 'normal',
    thickness: 7,
    background: '#ffffff',
  },
},
````
<br/>

- Line Chart

![toasts](src/assets/charts/img/line_chart.png)

````javascript
const config =   {
  type: 'line_chart',
  title: 'line_chart',
  description: 'line_chart description',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Caffine Consumption',
        data: [65, 59, 40, 41, 56, 55, 40],
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        borderColor: '#005CE4',
        pointBackgroundColor: '#005CE4',
        pointBorderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  },
  options: {},
},
````
<br/>

- CurvesChart

![toasts](src/assets/charts/img/curves_chart.png)

````javascript
const config =   {
  type: 'curves_chart',
  title: 'curves_chart ',
  description: 'curves_chart description',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Caffine Consumption',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.5,

        borderColor: '#96C0FF',
        pointBackgroundColor: '#005CE4',
        pointBorderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: 'Productivity',
        data: [70, 25, 110, 90, 5, 60, 30],
        fill: false,
        tension: 0.5,

        borderColor: '#0066FF',
        pointBackgroundColor: '#005CE4',
        pointBorderWidth: 0,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  },
  options: {
    legend: true,
    fontFamily: 'MONOSPACE',
  },
},
````
<br/>

## Общее
### Использование

 <Chart :data="dataItem" />

[//]: # ( подстраивается под ширину контейнера )

`App.vue`:
````vue
<template>
  <div>
    <Chart :data="dataItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "@/components/Chart.vue";

export default defineComponent({
  name: "App",
  components: {
    Chart,
  },
});
</script>
````


## Пример вида dataItem
Пример передаваемых данных можно посмотреть в `data.json`


### Конфигурация dataItem

| Параметр      |  Тип   | Обязательный  |          По умолчанию           | Возможные значения                                                                                                                       | Описание                                                                                                                                                                                                                                   |
|---------------|:------:|:-------------:|:-------------------------------:|------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | String |      да       |        `'vertical_bar'`         | `'doughnut'`, `'half_progress_bar'`, `'progress_bar'`, `'multi_progress_bar'`, `'stacked_bar'`, `'vertical_bar'`, `'horizontal_bar'` | Тип графика.<br/> DonatChart (`'doughnut_bar'`). ProgressChart (`'progress_bar'`). MultiProgressBar (`'multi_progress_bar'`). StackedBarChart (`'stacked_bar'`). BarChart (`'vertical_bar'`). HorizontalBarChart (`'horizontal_bar'`)      |
| `meta`           |   Object    | не для всех графиков | | Объект с данными, необъходимыми для отрисовки и изменения вида кастомных графиков                                                        |
| `title`       | String |      нет      |              `''`               | Любая строка                                                                                                                             | Название графика                                                                                                                                                                                                                           |
| `description` | String |      нет      |              `''`               | Любая строка                                                                                                                             | Описание графика                                                                                                                                                                                                                           |
| `data`        | Object |      да       |              `{}`               |                                                                                                                                          | Объект с данными для отрисовки графиков. Описание необходимых свойств объекта в таблице ниже (Конфигурация data)                                                                                                                           |
| `options`     | Object |      нет      |              `{}`               |                                                                                                                                          | Объект с дополнительных стилей и свойств графика. Описание объекта в таблице ниже (Конфигурация options)                                                                                                                                   |

### Конфигурация data

| Параметр            |      Тип       | Возможные значения                                    | Описание                                                                                    |
|---------------------|:--------------:|-------------------------------------------------------|:--------------------------------------------------------------------------------------------|
| `labels`          |       Array        | `["January", "February", "March"]`                    | Массив лейблов (или пустой массив), которые будут отображаться на оси Х                     |
| `datasets`          |    Array     | Описание представлено ниже в таблице `Конфигурация datasets` | Массив объектов с данными для графика                                                   |    

### Конфигурация datasets

| Параметр            |  Тип   |    Возможные значения     | Описание                                                                                                              |
|---------------------|:------:|:-------------------------:|-----------------------------------------------------------------------------------------------------------------------|
| `label`          | String |     `Some label text`     | Название одного из значений графика (отображается в легенде)                                                          |
| `backgroundColor`          | String |         `#005CE4`         | Цвет значений на графике. Если в этом поле ничего не передано - для первых трех значений подставятся дефолтные цвета  |
| `data`          |   Array    | `[50, 20, 10]` или `[50]` | Массив числовых значений. Если график отрисовывается для одного (напрмер, rogressChart) - передается массив в одним числом |

Для LineChart и CurvesChart также можно передавать следующие параметры:

| Параметр            |   Тип   |                                                 Возможные значения                                                 | Описание                                                                                                                   |
|---------------------|:-------:|:------------------------------------------------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------|
| `borderColor`          | String  |                                                     `#005CE4`                                                      | Цвет линии кривой графика                                                                                                  |
| `pointBackgroundColor`          | String  |                                                     `#005CE4`                                                      | Цвет точки на линии                                                                                                        |
| `pointBorderWidth`          | Number  |                                                     `#005CE4`                                                      | Массив числовых значений. Если график отрисовывается для одного (напрмер, rogressChart) - передается массив в одним числом |
| `pointStyle`          | String  | `circle` (по умолчанию), `cross`, `crossRot`, `dash`, `line`, `rect`, `rectRounded`, `rectRot`, `star`, `triangle` | https://www.chartjs.org/docs/master/samples/line/point-styling.html                                                        |
| `pointRadius`          | Number  |                                                 `4` (по умолчанию)                                                 | Радиус точки на линии                                                                                                      |
| `pointHoverRadius`          | Number  |                                                `5`  (по умолчанию)                                                 | Радиус точки на линии при наведении                                                                                        |
| `fill`          | Boolean |                                                       `true`                                                       | Указывает, заливать ли область под графиком цветом (для заливки используется `backgroundColor`)                            |

### Конфигурация options
Объект options отличается для каждого вида графиков.

Для графиков stacked_bar и vertical_bar необхлодимо передавать опции из библиотеки Chart.js (https://www.chartjs.org/). Используется 3 версия библиотеки. Описание того, что можно передавать в опциях, можно найти здесь: https://github.com/chartjs/Chart.js/tree/master/docs

### Примеры данных
Пример данных в формате json - в файле `data.json`. Описание и коммментарии к объектам и их свойствам - в файле `data.ts`

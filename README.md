# egal_widget: Charts


Содержит Круговые графики:

- DonatChart - круговая диаграмма с сегментами
![toasts](src/assets/img/doughnut_bar.png)

- ProgressChart - круговой график для одного значения
![toasts](src/assets/img/half_progress_bar.png) 
![toasts](src/assets/img/progress_bar.png)

- MultiProgressBar - для двух и более значений
  ![toasts](src/assets/img/multi_progress_bar.png)

И линейные графики:
- VerticalBarChart - вертикальный график
  ![toasts](src/assets/img/vertical_bar.png)

- StackedBarChart - вертикальный график со столбцами, расположенными "друг на друге"
![toasts](src/assets/img/stacked_bar.png)

- HorizontalBarChart - график с горизонтальными столбцами
  ![toasts](src/assets/img/horizontal_bar.png)

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

````typescript
  {
    "type": "stacked_bar",
        "meta": {
        "borderSkipped": false,
            "enableBorderRadius": true,
            "borderWidth": 2,
            "borderRadius": 10,
            "borderColor": "#fff",
            "width": 11
    },
    "title": "stacked_bar",
        "description": "stacked_bar description",
        "data": {
        "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "datasets": [
            {
                "label": "GitHub Commits",
                "backgroundColor": "#0066FF",
                "data": [40, 20, 12, 39, 10, 40, 39, 40, 40, 20, 12, 11]
            },
            {
                "label": "GitHu3",
                "backgroundColor": "#76ACFB",
                "data": [40, 20, 10, 35, 14, 45, 39, 88, 40, 27, 22, 41]
            },
            {
                "label": "GitHкu3",
                "backgroundColor": "#A0AEC0",
                "data": [14, 12, 14, 13, 1, 4, 3, 8, 40, 2, 22, 41]
            }
        ]
    },
    "options": {
        "legend": true,
            "width": 327,
            "height": 243,
            "scales": {
            "x": {
                "stacked": true,
                    "display": true,
                    "grid": {
                    "display": false,
                        "drawBorder": false
                },
                "ticks": {
                    "font": {
                        "size": 12,
                            "family": "Open Sans"
                    },
                    "padding": 4,
                        "color": "#A0AEC0"
                }
            },
            "y": {
                "stacked": true,
                    "grid": {
                    "display": true,
                        "drawBorder": false,
                        "borderDash": [4, 3],
                        "zeroLineBorderDash": [4, 3],
                        "color": "#E4ECF7"
                },

                "ticks": {
                    "color": "#A0AEC0",
                        "font": {
                        "size": 12,
                            "family": "Open Sans",
                            "weight": "bold"
                    },

                    "maxTicksLimit": 6,
                        "minTicksLimit": 6,
                        "min": 0,
                        "max": 100,
                        "padding": 0
                }
            }
        }
    }
}
````



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

| Параметр            |  Тип   | Обязательный | Описание                                                                                                              |
|---------------------|:------:|:------------:|-----------------------------------------------------------------------------------------------------------------------|
| `label`          | String |      да      | Название одного из значений графика (отображается в легенде)                                                          |
| `backgroundColor`          | String |     нет      | Цвет значений на графике. Если в этом поле ничего не передано - для первых трех значений подставятся дефолтные цвета  |
| `data`          |   Array    |      да       | Массив числовых значений. Если график отрисовывается для одного (напрмер, rogressChart) - передается массив в одним числом |


### Конфигурация options
Объект options отличается для каждого вида графиков.

Для графиков stacked_bar и vertical_bar необхлодимо передавать опции из библиотеки Chart.js (https://www.chartjs.org/). Используется 3 версия библиотеки. Описание того, что можно передавать в опциях, можно найти здесь: https://github.com/chartjs/Chart.js/tree/master/docs 

### Примеры данных
Пример данных в формате json - в файле `data.json`. Описание и коммментарии к объектам и их свойствам - в файле `data.ts`
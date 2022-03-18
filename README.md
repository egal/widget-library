# Изменения
1. Добавлен слот для ссылок в сайдбаре. 
2. Стили теперь не передаются в объекте data, вынесены в отдельный проп :style-config
3. В объекте `data` можно передавать новый проп `verticalDash` (по дефолту - `true`), который определяет наличие вертикальной "черточки" у активной ссылки в сайдбаре 

## Конфигурация styleConfig
 
| Параметр             |       Тип       | По умолчанию  | Возможные значения                                                                         | Описание                                                         |
|----------------------|:---------------:|:-------------:|--------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| ``fontFamily``       |     String      | ``Open Sans`` |    Любая строка            | font-family                                                      |
| ``fontWeight``       |     String      |    ``700``    |   Любая строка                | font-weight                                                      
| ``chevronColor``     |     String      |  ``#a0aec0``  |    Любая строка                                                                            | Цвет стрелочки у раскрывающегося элемента списка                                                        
| ``active``           |     Object      |    ``{}``     |                                                                             | Объект со стилями для текущей активной ссылки
| ``active.textColor`` |     String      |    ``''``     |           Любая строка                                                                       | Цвет текста и иконки у активной ссылки
| ``active.backgroundColor``          |     String      |    ``''``     |          Любая строка                                                                       | Цвет фона активной ссылки
| ``hover``            |     Object      |    ``{}``     |                                                                           | Объект со стилями для ссылки при наведении                                          
| ``hover.textColor``      |     String      |    ``''``     |       Любая строка                                                                   | Цвет текста и иконки при наведении                
| ``hover.backgroundColor``       |     String      |    ``''``     |    `   Любая строка                                                                    |  Цвет фона при наведении
| ``listItemPadding``       |        String         | ``'10px 0'``  |    Любая строка                                                                  | Паддинг для элемента списка в сайдбаре                     
| ``ulGap``         |     String     |  ``'12px'``   |    Любая строка                                                                    | Дополнительное расстояние между элементами в списке сайдбара                                              
| ``borderRadius``       |      String      |     ``0``     |    Любая строка                                                              | border-radius элемента списка в сайдбаре

Пример:
````javascript
      styleConfig: {
        fontFamily: 'Raleway',
        fontWeight: '700',
        chevronColor: 'red',
        textColor: '#262525',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        listItemPadding: '12px 20px',
        ulGap: '5px',
        verticalDash: true,

        active: {
          textColor: '#fff',
          backgroundColor: '#5377bb',
        },
        hover: {
          textColor: '#215ab6',
          backgroundColor: '#b8cfff',
        },
      },
````

### Пример применения слота только для ссылки "Главная"
````javascript
 <ENavbarLeft :data="sidebarConfig" :style-config="styleConfig">
    <template v-slot:badge="{ linkName }">
      <span v-if="linkName === 'Главная'">icon</span>
    </template>
  </ENavbarLeft>
````
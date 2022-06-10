# Изменения
## Передаваемый объект :data
- helperText: ''
- shownBadgeKey: '' - ключ по которому отображать цифру для бейджа (нотификейшена) (например, если передается shownBadgeKey" 'amount', то в бейдже будут отрисованы значения из item.amount)
- showSuccess: false
- showFilled: false (изменено дефолтное значение)
- добавлен передаваемый объект inputConfig, в котором можно передать :data для инпутов в селекте
- '--label-font-weight': this.styleConfig?.labelFontWeight - дефолтное значение теперь **400**
- Добавлены свойства, которые можно передавать в объекте стилей `data.dropdownStyleConfig` (т.е. стили для дродауна):
    - '--option-press-background-color': this.styleConfig?.optionPressBackgroundColor || '#cbd5e0' - Цвет фона при нажатии на опцию
    - '--active-hover-background-color': this.styleConfig?.activeHoverBackgroundColor || '#3385ff' - Цвет фона при наведении на выбранную опцию
    - '--active-press-background-color': this.styleConfig?.activePressBackgroundColor || '#005ce4' - Цвет фона при нажатии на выбранную опцию

# Пример использования
````vue
````

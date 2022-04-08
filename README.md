## Изменения ECheckbox:
1. Из пропа `:data` **убрано** передаваемое свойство `labelStyle` и **перенесено** в проп `:style-config`. Пример передаваемого объекта `styleConfig`:
````javascript
styleConfig: {
    // стили для лейбла:
    labelStyle: {
      color: 'black',
      fontSize: '16px',
      hover: { color: 'green' },
      checked: {
        color: 'red',
      },
      disabled: {
        color: 'gray',
        fontSize: '14px',
      },
    },
    
    // стили для чекбокса:
    borderColor: 'black',
    hover: {
      borderColor: 'green',
    },
    checked: {
      backgroundColor: 'red',
      borderColor: 'red',
    },
  },
````

`labelStyle` должен содежать inline стили.

`hover`, `checked` и `disabled` устанавливают стили для соответсвтующих состояний
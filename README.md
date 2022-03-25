#ESelect: "Show More" button
Добавлено props в объект `data` компонента ESelect
1. `showMoreButtonDisplay` (type: Boolean, default: false) - нужно ли отображать кнопку "show more". Если этот параметр равен `false` - другие 2 параметра (`nonLocalOptionsTotalCount` и `showMoreButtonText`) ни на что не влияют
2. `nonLocalOptionsTotalCount` (type: Number, default: 0) - принимает общее количество всех опций (поле total_count из ответа getItems). На основе этого значения рассчитывает, нужно ли продложать отрисовывать кнпоку "show more" в конце списка или все опции уже отображены
3. `showMoreButtonText` (type: String, default: 'Show more...') - текст кнопки
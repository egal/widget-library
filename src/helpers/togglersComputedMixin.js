export default {
  computed: {
    /**
     * Проверяет наличие данных в дефолтном слоте.
     * Необходимо, чтобы добавить класс "e-checkbox__text--empty", который убирает
     * margin у чекбокса, если он используется без лэйбла
     * @returns {boolean}
     */
    hasSlotData() {
      return !this.$slots?.default
    },

    /**
     * Объединяет объект стилей для лэйбла с объектом CSS переменныx
     * для чекбокса и возвращет полученный результат
     * @returns {object}
     */
    mergedCustomStyles() {
      return Object.assign({}, this.labelStyle, this.inputStyleVariables)
    },

    /**
     * Возвращает объект с набором CSS переменных для кастомизации чекбокса
     * @returns {object}
     */
    inputStyleVariables() {
      return {
        '--input-border-color': this.inputStyle.borderColor || null,
        '--input-background-color': this.inputStyle.backgroundColor || null,
        '--input-border-color-hover': this.inputStyle.hover?.borderColor || null,
        '--input-background-color-hover': this.inputStyle.hover?.backgroundColor || null,
        '--input-border-color-active': this.inputStyle.active?.borderColor || null,
        '--input-background-color-active': this.inputStyle.active?.backgroundColor || null,
        '--input-border-color-checked': this.inputStyle.checked?.borderColor || null,
        '--input-background-color-checked': this.inputStyle.checked?.backgroundColor || null,
        '--input-border-color-disabled': this.inputStyle.disabled?.borderColor || null,
        '--input-background-color-disabled': this.inputStyle.disabled?.backgroundColor || null,
      }
    },
  },
}

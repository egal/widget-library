#Изменения 
- В объект `:data` добавлены новые параметры: 

[comment]: <> ( todo add table )
| loadingText: 'Loading...', // todo added
  tryAgainText: 'Try again',  // todo added
  loadErrorText: 'Loading error'  // todo removed
errorText: ''

- Изменены стили font-weight по дефолту

'--label-font-weight': this.styleConfig?.labelFontWeight || 400, // todo changed
   '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400, // todo changed
   '--uploader-labels-font-weight': this.styleConfig?.uploaderLabelsFontWeight || 400, // todo changed

[comment]: <> (todo add example ?)
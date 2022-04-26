export const defaultValidators = {
    email: (value: string): string => {
        if (
            value &&
            !/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(
                value,
            )
        ) {
            return 'Проверьте правильность введённых данных'
        }
        return ''
    },
    required: (value:any):string => {
        if (
            !value ||
            value.length === 0 ||
            (value instanceof Object && !Array.isArray(value) && !value.value)
        ) {
            return 'Поле обязательно для заполнения'
        }
        return ''
    },
    phone: (value:string):string => {
        if (
            value &&
            !/^[+]?[0-9]\s?[0-9]{3}?[- ]?([0-9]{3})[- ]?([0-9]{4})$/.test(value)
        ) {
            return 'Проверьте правильность введённых данных'
        }
        return ''
    },
    password: (value: string): string => {
        const hasSpecialCharsTemplate = /[!@#$%^&*()\-+={}\[\]\"':;?\/|.,<>~]/g
        const hasNumbersTemplate = /[0-9]/g
        const hasUppercaseLettersTemplate = /[A-Z]/g
        const hasLowercaseLettersTemplate = /[a-z]/g

        if (value && (value.length < 10 || value.length > 255)) {
            return 'The field must contain at least 10 and no more than 255 characters.'
        }
        if (
            value &&
            (!hasSpecialCharsTemplate.test(value) ||
                !hasNumbersTemplate.test(value) ||
                !hasUppercaseLettersTemplate.test(value) ||
                !hasLowercaseLettersTemplate.test(value))
        ) {
            return 'There must be 1 letter, 1 uppercase letter, 1 number and 1 special character'
        }

        return ''
    }
}

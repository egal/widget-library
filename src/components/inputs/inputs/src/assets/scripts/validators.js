/**
 * Calls the passed validators and writes the result
 * @param validators
 * @param value
 * @return {string}
 */
export const validate = (validators, value) => {
  if (validators.length) {
    let result
    for (const validator of validators) {
      if (validator === undefined) continue
      result = validator(value)
      if (result !== '') return result
    }
  }
  return ''
}

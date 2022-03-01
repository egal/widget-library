/**
 * Calls the passed validators and writes the result
 * @param validators
 * @param value
 * @return {string}
 */
export const validate = (validators: any, value: any) => {
  if (validators.length) {
    let result;
    for (const validator of validators) {
      if (validator === undefined) continue;
      result = validator(value);
      if (result !== "") return result;
    }
  }
  return "";
};

/**
 * @param str
 */
export const addLeadingZeros = (str: string): string => {
  if (str.length < 2) {
    return "0" + str;
  }
  return str;
};

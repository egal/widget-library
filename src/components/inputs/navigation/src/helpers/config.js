import variables from "@/assets/scss/variables.scss";

const fontList = {
  Raleway: variables.raleway,
  "Open Sans": variables.openSans,
  Inter: variables.inter,
  default: variables.raleway,
};

const weightList = {
  medium: variables.mediumFontWeight,
  regular: variables.regularFontWeight,
  bold: variables.boldFontWeight,
  default: variables.mediumFontWeight,
};

const getFont = (font) =>
  Object.keys(fontList).includes(font) ? fontList[font] : fontList.default;

const getFontWeight = (weight) =>
  Object.keys(weightList).includes(weight)
    ? weightList[weight]
    : weightList.default;

export { variables, fontList, weightList, getFont, getFontWeight };

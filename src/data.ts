/**
 *
 */
export default class data {
  /**
   * тип графика ( "doughnut_bar", "half_progress_bar",  "progress_bar", "multi_progress_bar", "stacked_bar", "vertical_bar", "horizontal_bar")
   */
  public type?: string;
  /**
   * Название графика
   */
  public title?: string;
  /**
   * Описание графика
   */
  public description?: string;
  /**
   * Данные для отрисовки на графике
   */
  public data?: Data;
  /**
   * Дополнительные опции для кастомизации графиков
   */
  public options?: Options;
  /**
   * Дополнительные опции для кастомизации столбцов vertical_bar и stacked_bar
   */
  public meta?: Meta;
  // /**
  //  * Ширина vertical_bar и stacked_bar (эти графики не растягиваются под контейнер)
  //  */
  // public width?: number;
  // /**
  //  * Высота vertical_bar и stacked_bar (эти графики не растягиваются под контейнер)
  //  */
  // public height?: number;
}

/**
 *
 */
export class Data {
  /**
   * Лейблы, отображаемые по оси X
   */
  public labels?: string[];
  /**
   * Данные для отрисовки графика
   */
  public datasets?: Datasets[];
}

export class Datasets {
  /**
   * Название значения (отображается в легенде, если значений несколько)
   */
  public label?: string;
  /**
   * Цвет значения на графике
   */
  public backgroundColor?: string;
  /**
   * Значения для отрисовки графика
   */
  public data?: number[];
}

// Опции для stacked_bar, vertical_bar - из библиотеки Charts.js
export class Options {
  /**
   * Старотовый угол (для круговых графиков)
   */
  public angle?: number;
  /**
   * Цвет основного текста (название и описание графика)
   */
  public fontColor?: string;
  /**
   * Цвет текста лейблов по осям, легенды
   */
  public secondFontColor?: string;
  /**
   * Жирность шрифта для названия графика и значения
   */
  public fontWeight?: string;
  /**
   * Жирность шрифта для описания графика и лейблов
   */
  public secondFontWeight?: string;
  /**
   * Размер шрифта для названия графика и описания
   */
  public titleFontSize?: string;
  /**
   * Размер шрифта для лейблов и легенды (по дефолнту - '14px')
   */
  public labelsFontSize?: string;
  /**
   * Размер круговых графиков (по дефолнту - '12px')
   */
  public chartSize?: number;
  /**
   * Толщина линии кругового графика.
   * По дефолту для doughnut_bar- 10, для progress_bar/half_progress_bar - 8,
   * для horizontal_bar - 7, multi_progress_bar - 6
   */
  public thickness?: number;
  /**
   * Значение, отображаемое в центре кругового графика
   */
  public centerValue?: string;
  /**
   * Лейбл в центре кругового графика
   */
  public centerLabel?: string;
  /**
   * Цвет фона
   */
  public background?: string;
  /**
   * Цвет пустой линии кругового графика
   */
  public emptyColor?: string;
  /**
   * Отображать легенду
   */
  public hasLegend?: boolean;
  /**
   * 'top', 'bottom', 'left', 'right
   */
  public legendPlacement?: string;
  /**
   * Максимальное значение для кругового графика (по дефолту - 100)
   */
  public total?: number;

  /**
   * Для progress_bar и half_progress_bar. Отображаьть половинчатый график, если half = true
   */
  public half?: boolean;

  /**
   * Расстояние между графиками (для multi_progress_bar)
   */
  public gap?: number;

  /**
   * Вид линии для круговых графиков, кроме doughnut_bar. По дефолнту - 'round'. Может принимать значения "round | square | butt"
   */
  public line?: boolean;
}

export class Meta {
  /**
   * Для vertical_bar, stacked_bar. По дефолту - 2
   * Ширина границы столбца
   */
  public borderWidth?: number;
  /**
   * Для vertical_bar, stacked_bar. По дефолту - 10
   * Радиус границы столбца
   */
  public borderRadius?: number;
  /**
   * Для vertical_bar, stacked_bar. По дефолту - "#fff"
   * Цвет границы столбца
   */
  public borderColor?: string;
  /**
   * Для vertical_bar, stacked_bar. По дефолту - 11
   * Ширина столбца
   */
  public barWidth?: number;
}

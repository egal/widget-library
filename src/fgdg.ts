export default class fgdg {
  public type?: string;
  public title?: string;
  public description?: string;
  public data?: Data;
  public options?: Options;
  public meta?: Meta;
}

export class Data {
  public datasets?: Datasets[];
}

export class Datasets {
  public label?: string;
  public backgroundColor?: string;
  public data?: number[];
}

export class Options {
  public angle?: number;
  public fontColor?: string;
  public secondFontColor?: string;
  public fontWeight?: string;
  public secondFontWeight?: string;
  public titleFontSize?: string;
  public labelsFontSize?: string;
  public chartSize?: number;
  public thickness?: number;
  public centerValue?: string;
  public centerLabel?: string;
  public background?: string;
  public emptyColor?: string;
  public hasLegend?: boolean;
  public legendPlacement?: string;
  public total?: number;
}

export class Meta {
  public borderWidth?: number;
  public borderRadius?: number;
  public borderColor?: string;
  public barWidth?: number;
}

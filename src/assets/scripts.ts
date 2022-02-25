// @ts-ignore
import { ChartTooltipModel } from "chart.js";

interface TooltipContextType {
  chart: object;
  tooltip: object;
  replay: any;
}

interface CustomStylesConfig {
  backgroundColor?: string;
  textColor?: string;
  opacity?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: string;
  lineHeight?: string;
  padding?: string;
  position?: string;

  title?: {
    display?: boolean;
    text?: string[];
  };
  body?: {
    display?: boolean;
    text?: string[];
  };
  pointMark?: {
    display?: boolean;
    borderRadius?: string;
  };
}

const setTooltipPosition = (
  context: TooltipContextType,
  tooltipModel: ChartTooltipModel,
  tooltipEl: HTMLDivElement,
  customStyles: CustomStylesConfig
) => {
  // @ts-ignore
  const position = context.chart.canvas.getBoundingClientRect();

  const tooltipMargin = 10;
  const positionTop = {
    left:
      position.left +
      window.pageXOffset +
      tooltipModel.caretX -
      tooltipEl.offsetWidth / 2 +
      "px",
    top:
      position.top +
      window.pageYOffset +
      tooltipModel.caretY -
      tooltipMargin -
      tooltipEl.offsetHeight +
      "px",
  };
  const positionBottom = {
    left:
      position.left +
      window.pageXOffset +
      tooltipModel.caretX -
      tooltipEl.offsetWidth / 2 +
      "px",
    top:
      position.top +
      window.pageYOffset +
      tooltipModel.caretY +
      tooltipMargin +
      "px",
  };
  const positionCornerLeft = {
    left: position.left + window.pageXOffset + tooltipModel.caretX + "px",
    top: position.top + window.pageYOffset + tooltipModel.caretY + "px",
  };

  if (customStyles?.position) {
    switch (customStyles?.position) {
      case "bottom":
        tooltipEl.style.left = positionBottom.left;
        tooltipEl.style.top = positionBottom.top;
        break;
      case "corner_left":
        tooltipEl.style.left = positionCornerLeft.left;
        tooltipEl.style.top = positionCornerLeft.top;
        break;
      case "top":
      default:
        tooltipEl.style.left = positionTop.left;
        tooltipEl.style.top = positionTop.top;
        break;
    }
  } else {
    tooltipEl.style.left = positionTop.left;
    tooltipEl.style.top = positionTop.top;
  }
};
const setTooltipStyles = (
  tooltipModel: ChartTooltipModel,
  tooltipEl: HTMLDivElement,
  customStyles: CustomStylesConfig
) => {
  tooltipEl.style.opacity = customStyles?.opacity || "1";
  tooltipEl.style.backgroundColor = customStyles?.backgroundColor || "#2D3748"; // gray 800
  tooltipEl.style.color = customStyles?.textColor || "white";
  tooltipEl.style.borderRadius = "4px";
  tooltipEl.style.fontFamily = customStyles?.fontFamily || "Open Sans";
  tooltipEl.style.fontWeight = `${customStyles?.fontWeight}` || "500";
  tooltipEl.style.fontSize = customStyles?.fontSize || "12px";
  tooltipEl.style.lineHeight = customStyles?.lineHeight || "120%";
  tooltipEl.style.padding = customStyles?.padding || "8px 12px";
  tooltipEl.style.pointerEvents = "none";
  tooltipEl.style.position = "absolute";
};

const renderTooltipText = (
  tooltipModel: ChartTooltipModel,
  tooltipEl: HTMLDivElement,
  customStyles: CustomStylesConfig
) => {
  if (tooltipModel.body) {
    let titleLines = [] as string[];

    if (!customStyles?.title || customStyles?.title?.display) {
      titleLines = customStyles?.title?.text || tooltipModel.title;
    }

    // @ts-ignore
    const bodyLines = tooltipModel.body.map((b) => b.lines);
    const tableHead = document.createElement(
      "thead"
    ) as HTMLTableSectionElement;

    titleLines.forEach((title: string) => {
      const tr = document.createElement("tr") as HTMLTableRowElement;
      tr.style.borderWidth = "0";

      const th = document.createElement("th") as HTMLTableHeaderCellElement;
      th.style.borderWidth = "0";
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement(
      "tbody"
    ) as HTMLTableSectionElement;

    if (!customStyles?.body || customStyles?.body?.display) {
      bodyLines.forEach((body: string, i: number) => {
        const colors = tooltipModel.labelColors[i];

        //todo span
        let span = null;
        if (!customStyles?.pointMark || customStyles?.pointMark?.display) {
          span = document.createElement("span");
          // @ts-ignore
          span.style.background = colors.borderColor;
          span.style.marginRight = "10px";
          span.style.height = "10px";
          span.style.width = "10px";
          span.style.borderRadius =
            customStyles?.pointMark?.borderRadius || "0";
          span.style.display = "inline-block";
        }

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = "0";

        const td = document.createElement("td");
        td.style.borderWidth = "0";

        const text = document.createTextNode(body);

        if (span) {
          td.appendChild(span);
        }
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });
    }

    let tableRoot = tooltipEl.querySelector("table") as HTMLTableElement;

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }
};

export const drawTooltip = (
  context: TooltipContextType,
  customStyles: CustomStylesConfig
) => {
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip") as HTMLDivElement;

  if (!tooltipEl) {
    tooltipEl = document.createElement("div") as HTMLDivElement;
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
  }

  const tooltipModel = context.tooltip as ChartTooltipModel;

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  // Styling
  renderTooltipText(tooltipModel, tooltipEl, customStyles);
  setTooltipStyles(tooltipModel, tooltipEl, customStyles);
  setTooltipPosition(context, tooltipModel, tooltipEl, customStyles);

  return this;
};

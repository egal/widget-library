// @ts-ignore
import { ChartTooltipModel, ChartOptions } from 'chart.js'

interface TooltipContextType {
  chart: object
  tooltip: object
  replay: any
}

const setTooltipPosition = (
  context: TooltipContextType,
  tooltipModel: ChartTooltipModel,
  tooltipEl: HTMLDivElement,
) => {
  // @ts-ignore
  const position = context.chart.canvas.getBoundingClientRect()

  const tooltipMargin = 10

  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.offsetWidth / 2 + 'px'
  tooltipEl.style.top =
    position.top +
    window.pageYOffset +
    tooltipModel.caretY -
    tooltipMargin -
    tooltipEl.offsetHeight +
    'px'
}
const setTooltipStyles = (
  tooltipModel: ChartTooltipModel,
  tooltipEl: HTMLDivElement,
  chartOptions: ChartOptions,
) => {
  tooltipEl.style.opacity = '1'
  tooltipEl.style.backgroundColor = '#2d3748'
  tooltipEl.style.color = 'white'
  tooltipEl.style.borderRadius = '4px'
  // @ts-ignore
  tooltipEl.style.fontFamily = chartOptions?.fontFamily || 'Open Sans'
  tooltipEl.style.fontWeight = '500'
  tooltipEl.style.fontSize = '12px'
  tooltipEl.style.lineHeight = '120%'
  tooltipEl.style.padding = '8px 12px'
  tooltipEl.style.pointerEvents = 'none'
  tooltipEl.style.position = 'absolute'
}

const renderTooltipText = (tooltipModel: ChartTooltipModel, tooltipEl: HTMLDivElement) => {
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || []

    // @ts-ignore
    const bodyLines = tooltipModel.body.map((b) => b.lines)
    const tableHead = document.createElement('thead') as HTMLTableSectionElement

    titleLines.forEach((title: string) => {
      const tr = document.createElement('tr') as HTMLTableRowElement
      tr.style.borderWidth = '0'

      const th = document.createElement('th') as HTMLTableHeaderCellElement
      th.style.borderWidth = '0'
      const text = document.createTextNode(title)

      th.appendChild(text)
      tr.appendChild(th)
      tableHead.appendChild(tr)
    })

    const tableBody = document.createElement('tbody') as HTMLTableSectionElement

    bodyLines.forEach((body: string, i: number) => {
      const colors = tooltipModel.labelColors[i]

      const span = document.createElement('span')
      // @ts-ignore
      span.style.background = colors.borderColor
      span.style.marginRight = '10px'
      span.style.height = '10px'
      span.style.width = '10px'
      span.style.borderRadius = '0'
      span.style.display = 'inline-block'

      const tr = document.createElement('tr')
      tr.style.backgroundColor = 'inherit'
      tr.style.borderWidth = '0'

      const td = document.createElement('td')
      td.style.borderWidth = '0'

      const text = document.createTextNode(body)

      td.appendChild(span)
      td.appendChild(text)
      tr.appendChild(td)
      tableBody.appendChild(tr)
    })

    let tableRoot = tooltipEl.querySelector('table') as HTMLTableElement

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    // Add new children
    tableRoot.appendChild(tableHead)
    tableRoot.appendChild(tableBody)
  }
}

export const drawTooltip = (context: TooltipContextType, chartOptions: ChartOptions) => {
  // Tooltip Element
  let tooltipEl = document.getElementById('chartjs-tooltip') as HTMLDivElement

  if (!tooltipEl) {
    tooltipEl = document.createElement('div') as HTMLDivElement
    tooltipEl.id = 'chartjs-tooltip'
    tooltipEl.innerHTML = '<table></table>'
    document.body.appendChild(tooltipEl)
  }

  const tooltipModel = context.tooltip as ChartTooltipModel

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = '0'
    return
  }

  // Styling
  renderTooltipText(tooltipModel, tooltipEl)
  setTooltipStyles(tooltipModel, tooltipEl, chartOptions)
  setTooltipPosition(context, tooltipModel, tooltipEl)

  return this
}

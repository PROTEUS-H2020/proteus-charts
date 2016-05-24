/**
 * This object is used as a default one for those charts that do not have any user configuration.
 * @type {Object}
 */
const _default = {
  Barchart: {
    style: {
      '.axis': {
        'font': '10px sans-serif'
      },
      '.axis path,.axis line': {
        'fill': 'none',
        'stroke': '#000',
        'shape-rendering': 'crispEdges'
      },
      '.x.axis path': {
        'display': 'none'
      },
      '.x.axis.label, .y.axis.label': {
        'font': '12px sans-serif'
      }
    },
    xaxis: {
      label: ''
    },
    yaxis: {
      label: 'Y'
    },
    // Set the color scale for the chart. You can use Proteus scales or any D3 scale
    colorScale: Colors.category7(),
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: '80%', // %, auto, or numeric 
    height: 350,
    ticks: 5, // ticks for y axis.
    tooltip(data) { // Allows HTML
      return '<b>Eje x</b>: ' + data.x + '<br/>' +
        '<b>Eje y</b>: ' + data.y;
    },
    tickLabel: '',
    selector: '#chart',
    events: {
      down() {
        d3.select(this).classed('hover', false);
      },
      over() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill-opacity', 0.4);
      },
      leave() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill-opacity', 1);
      },
      click(d, i) {
        console.log(d, i);
      }
    },
    transitionDuration: 300,
    maxNumberOfElements: 0, // used by keepDrawing to reduce the number of elements in the current chart
    sortData: {
      descending: false,
      prop: 'x'
    }
  },
  Linechart: {
    selector: '#chart',
    xaxis: {
      label: 'X'
    },
    yaxis: {
      label: 'Y'
    },
    colorScale: Colors.category7(),
    area: true,
    areaOpacity: 0.4,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: 600,
    height: 250,
    style: {
      '.line': {
        'stroke-width': 2,
        'fill': 'none'
      },
      '.axis': {
        'font': '10px sans-serif'
      },
      '.axis path,.axis line': {
        'fill': 'none',
        'stroke': '#000',
        'shape-rendering': 'crispEdge'
      },
      '.x.axis path': {
        'display': 'none'
      },
      '.x.axis.label, .y.axis.label': {
        'font': '12px sans-serif'
      }
    },
    ticks: 5, // ticks for y axis.
    markers: {
      shape: 'circle',
      size: 5,
      color: '#FFFCCA',
      outlineColor: '#537780',
      outlineWidth: 2
    },
    tooltip(data) {
      return JSON.stringify(data);
    },
    events: {
      down() {
        d3.select(this).classed('hover', false);
      },
      over() {
        d3.select(this)
          .transition()
          .duration(50)
          .attr('r', 7)
          ;
      },
      leave() {
        d3.select(this)
          .transition()
          .duration(50)
          .attr('r', 5)
          .style('stroke-width', 2);
      },
      click(d, i) {
        console.log(d, i);
      }
    },
    tickLabel: '',
    transitionDuration: 300,
    maxNumberOfElements: 10, // used by keepDrawing to reduce the number of elements in the current chart
    sortData: {
      descending: false,
      prop: 'x'
    }
  },
  Streamgraph: {
    selector: '#chart',
    xDateFormat: '%m/%d/%y',
    colorScale: Colors.category5(),
    xaxis: {
      label: ''
    },
    yaxis: {
      label: ''
    },
    style: {
      '.axis': {
        'font': '10px sans-serif'
      },
      '.axis path,.axis line': {
        'fill': 'none',
        'stroke': '#000',
        'shape-rendering': 'crispEdges'
      },
      '.x.axis path': {
        'display': 'none'
      },
      '.x.axis.label, .y.axis.label': {
        'font': '12px sans-serif'
      }
    },
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: 900,
    height: 300,
    ticks: 5, // ticks for y axis.
    tooltip(object) {
      return 'Info: ' + JSON.stringify(object);
    },
    tickLabel: '',
    events: {
      down() {
        d3.select(this).classed('hover', false);
      },
      over() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill-opacity', 0.4);
      },
      leave() {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('fill-opacity', 1);
      },
      click(d, i) {
        console.log(d, i);
      }
    },
    transitionDuration: 300,
    maxNumberOfElements: 0, // used by keepDrawing to reduce the number of elements in the current chart
    sortData: {
      descending: false,
      prop: 'x'
    }
  },
  Gauge: {
    selector: '#chart',
    colorScale: Colors.diverging_red_blue(),
    invertColorScale: true,
    minLevel: 0,
    maxLevel: 100,
    minAngle: -90,
    maxAngle: 90,
    ringWidth: 50,
    ringMargin: 20,
    labelInset: 10,
    needleNutRadius: 25,
    needleLenghtRatio: 0.8,
    xaxis: {
      label: 'X'
    },
    yaxis: {
      label: 'Y'
    },
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: '50%', // %, auto, or numeric
    height: 500,
    style: {
      '.labels': {
        'font': '18px sans-serif'
      }
    },
    ticks: 5, // ticks for y axis.
    markers: {
      shape: 'circle',
      size: 5,
      color: '#FFFCCA',
      outlineColor: '#537780',
      outlineWidth: 2
    },
    tooltip(data) {
      return JSON.stringify(data);
    },
    events: {
      down() {
        d3.select(this).classed('hover', false);
      },
      over() {
        d3.select(this)
          .transition()
          .duration(50)
          .attr('r', 7)
          ;
      },
      leave() {
        d3.select(this)
          .transition()
          .duration(50)
          .attr('r', 5)
          .style('stroke-width', 2);
      },
      click(d, i) {
        console.log(d, i);
      }
    },
    tickLabel: '',
    transitionDuration: 300,
    maxNumberOfElements: 5, // used by keepDrawing to reduce the number of elements in the current chart
    sortData: {
      descending: false,
      prop: 'x'
    }
  }
};
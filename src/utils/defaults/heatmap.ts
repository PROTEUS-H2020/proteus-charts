import * as Colors from '../colors';
import { stack as d3stack } from 'd3';
import {scaleLinear} from "d3-scale";

export const defaults: any = {
    selector: '#chart',
    colorScale: scaleLinear().range(['lightyellow', 'steelblue']),
    xStep: 1,
    yStep: 1,
    //Axes
    xAxisType: 'categorical',
    xAxisFormat: '',
    xAxisLabel: '',
    xAxisGrid: false,
    yAxisType: 'categorical',
    yAxisFormat: '',
    yAxisLabel: '',
    yAxisShow: true,
    yAxisGrid: false,
    //margins
    marginTop: 20,
    marginRight: 250,
    marginBottom: 130,
    marginLeft: 150,
    //width & height
    width: '100%',
    height: 350,
    legend: true,
    propertyX: 'x',
    propertyY: 'y',
    propertyZ: 'z',
    stack:  d3stack().value((d: any, k: any) => d.value[k]),

    //Events
    onDown(d: any) {
    },
    onHover(d: any) {
    },
    onLeave(d: any) {
    },
    onClick(d: any) {
    },
    onUp(d: any) {
    }
};
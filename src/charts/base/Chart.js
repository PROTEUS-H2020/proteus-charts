import {dispatch} from 'd3'
import {SvgStrategy, strategies} from '../../svg/SvgStrategy'
/**
 * Base class. This class is inherited in all charts implementations.
 * This is a non-instanciable chart.
 */
export default class Chart {

    constructor(d, config) {
        var clazz = this.constructor.name;
        if (clazz === 'Graph') {
            throw new Error(clazz + ' is non-instanciable');
        }
        //this.dispatcher = dispatch(); TODO: Re-implement reactor with d3-dispatcher

        this.events = {};

        if (!d && !config) {
            throw new Error('Missing constructor parameters');
        }

        let dataFormat = d.constructor.name;
        let nArguments = (d && config) ? 2 : 1;

        switch (dataFormat) {
            case 'WebsocketDatasource':
                this.datasource = d;
                this.data = [];
                this._configureDatasource();
                break;
            case 'Array':
                this.data = d;
                break;
            default:
                throw TypeError('Wrong data format');
        }
        //if only 1 parameter is specified, take default config. Else, take the second argument as config.
        this.config = (nArguments === 1) ? _default[this.constructor.name] : config;

        this._initializeSVGContext();
    }

    _parseData(data, xDataFormat, yDataFormat, config) {
        data.forEach((d) => {
            //parse x coordinate
            switch (xDataFormat) {
                case 'time':
                    d.x = d3.timeParse(config.x.format)(d.x);
                    break;
                case 'linear':
                    d.x = +d.x;
                    break;
            }
            //parse x coordinate
            switch (yDataFormat) {
                case 'time':
                    d.y = d3.timeFormat
                    break;
                case 'linear':
                    d.y = +d.y;
                    break;
            }
        });
        return data;
    }

    /**
     * Returns the chart context: data, configuration and chart type.
     */
    _getChartContext() {
        return {
            data: this.data,
            config: this.config,
            cType: this.constructor.name
        };
    }

    /**
     * Initialize the SVG context
     */
    _initializeSVGContext() {
        this._svg = new SvgStrategy(strategies[this.constructor.name](this._getChartContext()));
    }

    /**
     * Renders data on barchart. Only allowed when data is an array of static data.
     * @param  {Array} data Array of data
     */
    draw(data = this.data) {
        var config = this.config
            , sort = config.sort
            , xDataFormat = config.x ? config.x.type : null
            , yDataFormat = 'linear'
            , p = null
            , desc = null
            , parsedData = null;
        if(xDataFormat)
            parsedData = this._parseData(JSON.parse(JSON.stringify(data)), xDataFormat, yDataFormat, config); // We make a copy of data. We don't want to modify the original object.
        else
            parsedData = JSON.parse(JSON.stringify(data));
            
        if (sort) {
            p = config.sort.field;
            desc = config.sort.desc;
            parsedData.sort((e1, e2) => {
                var a = e1[p];
                var b = e2[p];
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            })
        }

        this._svg.draw(parsedData);
    }

    /**
     * Returns a PNG image of the current graph
     * @return {String} Image - in data-url format
     */
    toPNG(cb) {
        utils.svgAsDataUri(d3.select(this.config.selector + ' svg')._groups[0][0], {}, (uri, err) => {
            if (err) {
                throw Error('Error converting to image ' + err);
            }
            else {
                cb(uri);
            }
        });
    }

    /**
     * On method. Define custom events (click, over, down and up).
     */
    on(eventName, action) {
        throw Error('Not implemented');
        /**
        if (!eventName || typeof eventName !== 'string') {
            throw Error('eventName should be a string. Instead: ' + eventName);
        }
        if (!action || !utils.isFunction(action)) {
            throw Error('action should be a function. Instead: ' + eventName);
        }

        this.events[eventName] = action;
        this._svg.on(this.events);
        return this;
        **/
    }

    _configureDatasource() {
        throw Error('Not implemented');
        // this.datasource.configure(this.reactor);
        /*/
        this.reactor.registerEvent('onmessage');
        this.reactor.registerEvent('onerror');
        this.reactor.registerEvent('onopen');

        this.reactor.addEventListener('onmessage', (data) => {
            this.keepDrawing(data);
        });

        this.reactor.addEventListener('onopen', (e) => {
            console.debug('Connected to websocket endpoint.', e);
        });

        this.reactor.addEventListener('onerror', (error) => {
            console.error('An error has occured: ', error);
        });
        */
    }

    pause() {
        // if (!this.datasource) {
        //    throw ('You need a datasource to pause a streaming');
        // }
        //this.reactor.removeEventListener('onmessage');
    }

    resume() {
        //if (!this.datasource) {
        //   throw ('You need a datasource to resume a streaming');
        // }

        // this.reactor.addEventListener('onmessage', (data) => {
        //     this.keepDrawing(data);
        // });
    }

}
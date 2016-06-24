'use strict';
/**
 * Base class. This class is inherited in all charts implementations.
 * This is a non-instanciable chart.
 */
class Chart {

    constructor(d, config) {
        var clazz = this.constructor.name;
        if (clazz === 'Chart' || clazz === 'Basic' || clazz === 'Flow' || clazz === 'Temporal' || clazz === 'Hierarchical') {
            throw new Error(clazz + ' is non-instanciable');
        }

        this.events = {};
        this.reactor = new Reactor();

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
            case 'Object':
                this.data = d;
                break;
            default:
                throw TypeError('Wrong data format');
        }
        //if only 1 parameter is specified, take default config. Else, take the second argument as config.
        this.config = (nArguments === 1) ? _default[this.constructor.name]
            : config;

        this._initializeSVGContext();
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
        if (!utils.isArray(data)) {
            throw new TypeError('draw method is only allowed with static data.');
        }
        data = JSON.parse(JSON.stringify(data));
        this._svg.draw(data);
    }

    /**
     * Returns a PNG image of the current graph
     * @return {[String]} Image in data-url format
     */
    toPNG(cb) {
        utils.svgAsDataUri(d3.select(this.config.selector + ' svg')[0][0], {}, (uri, err) => {
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
        if (!eventName || typeof eventName !== 'string') {
            throw Error('eventName should be a string. Instead: ' + eventName);
        }
        if (!action || !utils.isFunction(action)) {
            throw Error('action should be a function. Instead: ' + eventName);
        }

        this.events[eventName] = action;
        this._svg.on(this.events);
        return this;
    }

    _configureDatasource() {
        this.datasource.configure(this.reactor);
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
    }

    pause() {
        if (!this.datasource) {
            throw ('You need a datasource to pause a streaming');
        }
        this.reactor.removeEventListener('onmessage');
    }

    resume() {
        if (!this.datasource) {
            throw ('You need a datasource to resume a streaming');
        }

        this.reactor.addEventListener('onmessage', (data) => {
            this.keepDrawing(data);
        });
    }

}
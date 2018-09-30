/**
 * Service for managing ajax. Use ajax as an object to exchange data between the client and the server.
 *
 * @service Ajax
 * @author Skyflow Team - Franck Diomandé <fkdiomande@gmail.com>
 * @version 1.0.0
 * @example ajax.example.js
 */
export default function Ajax() {

    let self = this, xhr = null, request = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    }

    let configs = {
            method: "get",
            data: {},
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            url: null,
            type: "text",
            state: {},
            status: {},
            success: null,
            error: null,
        },
        xhrMethod = {
            get() {

                let data = "";
                for(let key in configs.data){
                    data += "&" + key + "=" + encodeURIComponent(configs.data[key]);
                }
                data = data.slice(1);

                xhr.open("GET", configs.url + "?" + data, true);

                for(let key in configs.headers){
                    if (configs.headers.hasOwnProperty(key)){
                        xhr.setRequestHeader(key, configs.headers[key])
                    }
                }

                xhr.send(null);
            },
            post() {

                let data = "";
                for(let key in configs.data){
                    data += "&" + key + "=" + configs.data[key];
                }
                data = data.slice(1);

                xhr.open("POST", configs.url, true);

                for(let key in configs.headers){
                    if (configs.headers.hasOwnProperty(key)){
                        xhr.setRequestHeader(key, configs.headers[key])
                    }
                }

                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

                xhr.send(data);
            }
        },
        pipeMethod = {
            post(){
            }
        },
        xhrType = {
            text() {
                return xhr.responseText
            },
            xml() {
                return xhr.responseXML || xhr.responseText;
            },
            json() {
                return JSON.parse(xhr.responseText)
            }
        },
        pipeType = {
            json(){
            }
        };

    function getType(object) {
        if (object === null) {return null}
        if (object === undefined) {return undefined}
        let t = object.constructor.name;
        if (/^html[a-z]*element$/i.test(t)) {
            return 'Element'
        }
        return t;
    }

    function isCallback(object) {
        return getType(object) === "Function";
    }

    function isString(object) {
        return getType(object) === "String";
    }

    /**
     * Sends a request to the server.
     *
     * @method send
     * @param {string} [url]
     * @param {Function} [successCallback]
     * @param {Function} [errorCallback]
     * @returns {Ajax|boolean}
     * @example ajax.example.js
     */
    this.send = function (url, successCallback, errorCallback) {

        if(!xhr){return false}

        if(isString(url)){
            url = url.replace(/ +/g, " ").replace(/ = /g, "=");
            url = url.replace(/\$(\w+)/g, function (str, s) {
                if(xhrType.hasOwnProperty(s.toLowerCase())){
                    self.type(s)
                }
                if(xhrMethod.hasOwnProperty(s.toLowerCase())){
                    self.method(s)
                }
                return ""
            });

            self.url(url);
        }

        if(isCallback(successCallback)){
            configs.success = successCallback;
        }

        if(isCallback(errorCallback)){
            configs.error = errorCallback;
        }

        request = null;

        if(pipeMethod.hasOwnProperty(configs.method)){
            pipeMethod[configs.method]()
        }

        if(pipeType.hasOwnProperty(configs.type)){
            pipeType[configs.type]()
        }

        xhrMethod[configs.method]();

        xhr.onreadystatechange = function () {

            let callbackObject = {
                method: configs.method,
                data: configs.data,
                url: configs.url,
                type: configs.type,
                response: null,
                textResponse: xhr.responseText||null,
                xmlResponse: xhr.responseXML||null,
                state: xhr.readyState,
                status: xhr.status,
            };
            let headers = {}, responseHeaders = xhr.getAllResponseHeaders().split(/[\n\r]/);

            responseHeaders.forEach((responseHeader) => {
                responseHeader.replace(/([^:]+): ?(.+)/, function (str, s1, s2) {
                    headers[s1] = s2;
                });
            });

            headers['date'] = new Date(headers['date']);

            callbackObject.headers = headers;

            let status = configs.status[xhr.status];
            if (status) {status.apply(callbackObject, [callbackObject.response])}

            let state = configs.state[xhr.readyState];
            if (state) {state.apply(callbackObject, [callbackObject.response])}

            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    callbackObject.response = xhrType[callbackObject.type]();
                    let success = configs.success;
                    if (success) {
                        success.apply(callbackObject, [callbackObject.response])
                    }
                } else {
                    let error = configs.error;
                    if (error) {
                        error.apply(callbackObject, [callbackObject.status])
                    }
                }
            }

            request = callbackObject;

        };

        return self
    };

    /**
     * Gets or sets method.
     *
     * @method method
     * @param {string} [value]
     * @returns {Ajax|string}
     */
    this.method = function (value) {
        if (value === undefined) {
            return configs.method
        }
        value = (value + "").toLowerCase();
        if (xhrMethod.hasOwnProperty(value)) {
            configs.method = value;
        }

        return self;
    };

    /**
     * Gets or sets response type.
     *
     * @method type
     * @param {string} [value] Available value: text xml json
     * @returns {Ajax|string}
     */
    this.type = function (value) {
        if (value === undefined) {
            return configs.type
        }
        if (xhrType.hasOwnProperty(value)) {
            configs.type = value;
        }

        return self
    };

    /**
     * Gets or sets response type.
     *
     * @method type
     * @param {string} [value] Available value: text xml json
     * @returns {Ajax|string}
     */
    this.responseType = function (value) {
        return this.type(value);
    };

    /**
     * Gets or sets ajax url.
     *
     * @method url
     * @param {string} [value]
     * @returns {Ajax|string}
     */
    this.url = function (value) {

        if (value === undefined) { return configs.value }
        value = value.trim();
        if(value === ""){value = null}
        configs.url = value;

        return self
    };

    /**
     * Gets or sets data.
     *
     * @method data
     * @param {string|object} [name]
     * @param {*} [value]
     * @returns {Ajax|string|object}
     * @example ajax.data.example.js
     */
    this.data = function (name, value) {

        if (name === undefined) {
            return configs.data
        }

        let type = getType(name);

        if (type === 'String') {
            if(value === undefined){
                return configs.data[name] || null
            }else {
                configs.data[name] = value
            }
        }
        if (type === 'Object') {
            configs.data = name;
        }

        return self;
    };

    /**
     * Gets or sets request headers.
     *
     * @method headers
     * @param {string|object} [name]
     * @param {*} [value]
     * @returns {Ajax|string|object}
     * @example ajax.headers.example.js
     */
    this.headers = function (name, value) {

        if (name === undefined) {
            return configs.headers
        }

        let type = getType(name);

        if (type === "String" && value !== undefined) {
            configs.headers[name] = value + "";
            return self;
        }

        if (type === "String") {
            let h = request ? request.headers : configs.headers;
            return h[name] || null;
        }

        if (type === "Object") {
            configs.headers = name;
        }

        return self
    };

    /**
     * Gets or sets callback function for successful request.
     *
     * @method success
     * @param {Function|null} [callback]
     * @returns {Ajax|Function}
     */
    this.success = function (callback) {

        if (callback === undefined) {
            return request.success
        }

        if (isCallback(callback) || callback === null) {
            configs.success = callback
        }

        return self
    };

    /**
     * Gets or sets callback function for failed request.
     *
     * @method error
     * @param {Function|null} [callback]
     * @returns {Ajax|Function}
     * @example ajax.error.example.js
     */
    this.error = function (callback) {

        if (callback === undefined) {
            return request.error
        }

        if (isCallback(callback) || callback === null) {
            configs.error = callback
        }

        return self
    };

    /**
     * Gets the status code or sets a function to execute for a status code.
     *
     * @method status
     * @param {int} [code]
     * @param {Function|null} [callback] Set null value to remove defined value
     * @returns {Ajax|Function|object|null}
     * @example ajax.status.example.js
     * @see https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
     */
    this.status = function (code, callback) {

        if (code === undefined) {
            return configs.status
        }

        let type = getType(code);

        if(type === "Number" && callback === null){
            delete configs.status[code];
            return self
        }

        if(type === "Number" && callback === undefined){
            return configs.status[code] || null
        }

        if(type === "Number" && isCallback(callback)){
            configs.status[code] = callback
        }

        return self;
    };

    /**
     * Gets the status code or sets a function to execute for a status code.
     *
     * @method state
     * @param {int} [code] Available code: 0 = init, 1 = create (before send), 2 = send, 3 = after send (before done), 4 = done
     * @param {Function|null} [callback] Set null value to remove defined value
     * @returns {Ajax|Function|object|null}
     * @example ajax.state.example.js
     */
    this.state = function (code, callback) {

        if (code === undefined) {
            return configs.state
        }

        let type = getType(code);

        if(type === "Number" && callback === null){
            delete configs.state[code];
            return self
        }

        if(type === "Number" && callback === undefined){
            return configs.state[code] || null
        }

        if(type === "Number" && isCallback(callback)){
            configs.state[code] = callback
        }

        return self;
    };

}
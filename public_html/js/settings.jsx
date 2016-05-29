'use strict';
define(['jquery'],
    function ($) {
        var SETTINGS = {
            EVENT_VIEWMANAGER_SHOW: 'viewShow',

            USE_PRODUCTION: true,

            PRODUCTION_SERVER_SCHEMA: 'http',
            PRODUCTION_SERVER_HOST: 'localhost',
            PRODUCTION_SERVER_PORT: 9999,

            DEBUG_SERVER_SCHEMA: "http",
            DEBUG_SERVER_HOST: "",
            DEBUG_SERVER_PORT: 8080,

            _getUrl: function (schema, host, port) {
                if (typeof schema === "string" && typeof host === "string" && (!port ||  typeof port === "number")) {
                    return schema + "://" + host + (port ? ":" + port : "");
                }
                throw new TypeError("One of arguments is of incorrect type");
            },
            DEBUG_SERVER_URL: null,
            PRODUCTION_SERVER_URL: null,
            getActiveServerUrl: function () {
                return this.USE_PRODUCTION ? this.PRODUCTION_SERVER_URL : this.DEBUG_SERVER_URL;
            },

            init: function () {
                this.DEBUG_SERVER_URL = this._getUrl(this.DEBUG_SERVER_SCHEMA, this.DEBUG_SERVER_HOST, this.DEBUG_SERVER_PORT);
                this.PRODUCTION_SERVER_URL = this._getUrl(this.PRODUCTION_SERVER_SCHEMA, this.PRODUCTION_SERVER_HOST, this.PRODUCTION_SERVER_PORT);
            }

        };
        SETTINGS.init();
        return SETTINGS;
    });
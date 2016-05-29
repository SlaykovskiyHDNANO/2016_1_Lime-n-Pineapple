'use strict';
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        pixi: "lib/pixi",
        settings: "settings",
        lettering: 'lib/jquery.lettering.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'lettering': {
            deps: ['jquery'],
            exports: 'lettering'
        }
    }
});


define(['backbone', 'router'],
    // main function
    function (Backbone, router) {
        console.log("[!] Application started");
        Backbone.history.start();  // Запускаем HTML5 History push
    }
);


'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    './baseView',
    'tmpl/main_page'
], function( $, _, Backbone, Settings, BaseView, tmpl ){
    var Main = BaseView.extend({
        template: tmpl,

        subscriptions: [
            'loginSuccess'
        ],

        events: {
                'click #start': 'navigate',
                'click #scoreboard': 'navigate',
                'click #login': 'navigate'
        },

        initialize: function () {
            Backbone.on("changeLoginToLogout", function () {
                $("#login").text("Logout");
                $("#login").attr('href', "#logout");
            });
        },
        navigate: function (e) {
            Backbone.history.navigate($(e.target).attr("href"), true);
        }
    });
        return Main;
    }
);

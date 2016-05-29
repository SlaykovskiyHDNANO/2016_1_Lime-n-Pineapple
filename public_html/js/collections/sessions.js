"use strict";

define(['underscore', 'backbone', '../models/session', 'settings'], function (_, Backbone, Session, Settings) {

    return Backbone.Collection.extend({
        url: Settings.getActiveServerUrl() + "/api/session/",
        model: Session,

        login: function login(username, password) {
            var _this = this;

            return new Promise(function (then, error) {
                _this.create({ "username": username, "password": password });
                then();
            });
        }

    });
});

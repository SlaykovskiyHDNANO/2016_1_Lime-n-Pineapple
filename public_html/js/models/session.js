'use strict';

define(['underscore', 'jquery', 'backbone', './user', 'settings', '../collections/users'], function (_, $, Backbone, User, Settings, UsersCollection) {
    return Backbone.Model.extend({
        urlRoot: Settings.getActiveServerUrl() + '/api/v1/session',
        defaults: {
            user: null,
            user_id: 0
        },
        initialize: function initialize() {
            console.log("[Session::initialize()]: begin to create");
        },

        updateSessionUser: function updateSessionUser(userData) {
            //this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

        login: function login(opts) {
            this.fetch({ data: { opts: opts }, type: 'POST' });
        },

        logout: function logout() {
            var self = this;
            this.user.save({ login: this.user.login }, {
                success: function success(model, res) {
                    self.user.set({ logged_in: false, login: "" });
                    Backbone.history.history.back();
                    return true;
                },
                error: function error(model, res) {
                    Backbone.history.history.back();
                }
            });
        },

        signup: function signup(opts) {}

    });
});

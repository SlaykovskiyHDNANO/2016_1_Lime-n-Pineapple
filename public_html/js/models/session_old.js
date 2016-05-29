'use strict';

define(['underscore', 'jquery', 'backbone', './user', 'settings'], function (_, $, Backbone, UserModel, Settings) {
    var Session = Backbone.Model.extend({
        defaults: {
            linkedUsers: []
        },
        initialize: function initialize() {
            //_.bindAll(this);
            console.log("[Session::initialize()]: begin to create");
            this.fetch({
                success: function success(mod, res) {}

            }).complete(function () {
                console.log("[Session::initialize()] Login load is done");
            });
        },

        updateSessionUser: function updateSessionUser(userData) {
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },

        checkAuth: function checkAuth() {
            console.log("[Session::checkAuth()]: before start");
            var self = this;
            //this.fetch({
            //    success: function(mod, res){
            //        if(!res.error && res.user){
            //            self.updateSessionUser(res.user);
            //            self.set({ logged_in : true });
            //        } else {
            //            self.set({ logged_in : false });
            //            this.trigger("loginAction");
            //        }
            //    }, error:function(mod, res){
            //        self.set({ logged_in : false });
            //    }
            //}).complete( function(){
            //});
            if (!self.user.logged_in) {
                console.log("[Session::checkAuth()]: before start");
                this.trigger("#loginAction");
            }
        },

        login: function login(opts) {
            console.log("session login func" + this.user.url());
            this.user.save({ login: opts.login, password: opts.password, logged_in: true }, {
                success: function success(model, res) {
                    console.log("SUCCESS");
                    this.user.set({ logged_in: true, login: opts.login });
                    $("#login").text("Logout");
                    $("#login").attr('href', "#logout");
                    Backbone.history.history.back();
                },
                error: function error(model, res) {
                    console.log("NOTSUCCESS");
                    Backbone.history.history.back();
                }
            });
        },

        logout: function logout(opts) {
            this.user.save({ login: opts.login }, {
                success: function success(model, res) {
                    this.user.set({ logged_in: false, login: "" });
                    $("#login").text("Login");
                    $("#login").attr('href', "#login");
                    Backbone.history.history.back();
                },
                error: function error(model, res) {
                    Backbone.history.history.back();
                }
            });
        },

        signup: function signup(opts) {},

        removeAccount: function removeAccount(opts) {
            this.user.destroy({
                success: function success(model, res) {
                    console.log("destroy user");
                },
                error: function error(model, res) {
                    console.log("can not destroy user");
                }
            });
        }

    });
    return Session;
});

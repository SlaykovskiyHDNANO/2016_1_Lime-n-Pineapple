'use strict';
define([
    'underscore',
    'jquery',
    'backbone',
    './user',
    'settings',
    '../collections/users'
], function (_, $, Backbone, User, Settings, UsersCollection) {
    return Backbone.Model.extend( {
        urlRoot: Settings.getActiveServerUrl() + '/api/v1/session',
        defaults: {
            
        },
        initialize: function () {
            console.log("[Session::initialize()]: begin to create" );
        },

        updateSessionUser: function( userData ){
            //this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },


        login: function(opts){
            this.fetch({data: {opts} , type:'POST' });
        },

        logout: function(){
            var self = this;
            this.user.save({login: this.user.login}, {
                success: function(model, res){
                    self.user.set({logged_in: false, login: ""});
                    Backbone.history.history.back();
                    return true;
                },
                error: function(model, res){
                    Backbone.history.history.back();
                }
            });
        },

        signup: function(opts){
        }

    });
});
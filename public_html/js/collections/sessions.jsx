"use strict";
define([
    'underscore',
    'backbone',
    '../models/session',
    'settings'
], function(
    _,
    Backbone,
    Session,
    Settings
){

    return Backbone.Collection.extend({
        url :  Settings.getActiveServerUrl() + "/api/session/",
        model : Session,

        login: function(username, password) {
            return new Promise( (then, error) => {
                this.create({"username" : username, "password" : password});
                then();
            });
        },

        checkUser: function () {
            this.fetch({
                success : function (model, response) {
                    return true;
                },
                error(msg){
                    console.log("ERROR " + msg);
                    return false;
                }
            });
        }

    });

});

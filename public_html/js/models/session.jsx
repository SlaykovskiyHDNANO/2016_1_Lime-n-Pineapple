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
        urlRoot: '/session',
        defaults: {
            user: null,
            user_id: 0
        },
        initialize: function () {
            console.log("[Session::initialize()]: begin to create" );
        },

        updateSessionUser: function( userData ){
            //this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },


        login: function(opts){
            let model = Backbone.Model.extend({
                defaults: {
                    real_ref : '',
                    share : ''
                }
            });

            let collection = Backbone.Collection.extend({
                url: Settings.getActiveServerUrl() + '/api/v1/session',
                model: model
            });
            let mod = new model();
            let col = new collection();
            col.add(mod);
            mod.fetch({data : {username:opts.login, password:opts.password},type:'POST' });
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
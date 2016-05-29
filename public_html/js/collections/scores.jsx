define([
    'underscore',
    'backbone',
    '../models/user',
    'settings'
], function(
    _,
    Backbone,
    User,
    Settings
){

    return Backbone.Collection.extend({
        url :  Settings.getActiveServerUrl() + "/api/user/",
        model : User,
        comparator: function(val) {
            return -val.get("score");
        }

    });

});
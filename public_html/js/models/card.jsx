'use strict';

define(['backbone'], function (Backbone) {
    var Card = Backbone.Model.extend({
        defaults: {
            name: "",
            img: ""
        },
        initialize: function initialize(model) {
            console.log("Card initialized");
            this.img = model.img;
            this.name = model.name;
        }
    });
    return Card;
});

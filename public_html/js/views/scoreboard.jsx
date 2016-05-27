'use strict';
define([
    'jquery',
    'backbone',
    'settings',
    'collections/scores',
    './baseView',
    'tmpl/scoreboard'
], function(
    $,
    Backbone,
    Settings,
    Scores,
    BaseView,
    tmpl
){

    var Scoreboard = BaseView.extend({
        template: tmpl,
        defaults : {

        },
        events: {
            "initView": 'render',
            "show": 'show',
            "click .btn-lg-back": function () {
                Backbone.history.history.back();
            }
        },

        initialize: function () {
            this.collection = new Scores();
            var i;
            for (i = 0; i < 3; i+=1) {
                this.collection.add({name: "Тим", score: 55});
                this.collection.add({name: "Ида", score: 6});
                this.collection.add({name: "Роб", score: 545});
            }
            this.collection.sort();
            this.name = "scoreboard";
        },

        render: function () {
            console.log("[views::scoreboard::render()]: called");
            console.log(this.$el);
            console.log(this.collection);
            this.$el.html(this.template({person: this.collection.toJSON()}));

            return this;
        }

    });

    return Scoreboard;
});
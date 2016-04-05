define([
    'jquery',
    'underscore',
    'backbone',
    'tmpl/game'
], function(
    $,
    _,
    Backbone,
    tmpl
){
    var Game = Backbone.View.extend({
        template: tmpl,

        initialize: function () {
        },

        show: function () {
            if (!this.$el.html()){
                this.render();
            }
            this.trigger("showView");
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });
    return new Game();
});

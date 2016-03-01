define([
    'backbone',
    'tmpl/scoreboard',
    '../collections/scores'
], function(
    Backbone,
    tmpl,
    Scores
){

    var View = Backbone.View.extend({
        template: tmpl,
        el: ".view__scoreboard",
        events: {
            "initView": 'render',
            "show": 'show',
        },

        initialize: function () {
            this.bind("initView", function(){this.render();}, this);
        },

        show: function () {
            this.render();

        },
        hide: function () {
            this.$el.hide();
        },

        render: function () {

            console.log("[views::scoreboard::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template({}));
            return this;
        }

    });
    return View;
});
'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings'
], function($,  _, Backbone, Settings ){
    var BaseView = Backbone.View.extend({
        tagName: "mytag",

        constructor: function () {
            console.log("In constructor");
            Backbone.View.prototype.constructor.apply(this, arguments);
            this._invalidateView = true;
        },

        initialize: function () {

        },

        show: function () {
            console.log("[W] BaseView::show() called!");
            if(this._invalidateView) {
                this.render();
                this._invalidateView = false;
            }
            Backbone.trigger(Settings.EVENT_VIEWMANAGER_SHOW, this);
            this.$el.show();
        },

        invalidateView: function(forceRender) {
            this._invalidateView = true;
            if (forceRender === true) {
                this.render();
            }
        },

        hide: function () {
            this.$el.hide();
        },

        render: function () {
            console.log("BaseView render");
            this.$el.html(this.template({}));
            return this;
        }
    });
    return BaseView;
});

'use strict';

define([
    'underscore',
    'backbone',
    'settings'
], function(_, Backbone, Settings){

    return Backbone.View.extend({
        defaults : {
            "views" : null
        },
        initialize: function () {
            console.log("[ViewManager::initialize] Inside constructor!");
            this.views = new Map();
            Backbone.on(Settings.EVENT_VIEWMANAGER_SHOW, (view) => {
                console.log("[ViewManager::add::listenTo] Triggered!");
                this.hide(view);
                view.$el.show();
            });
            console.log("[ViewManager::add::initialize] Exited constructor!");
        },
        hide: function (exceptThisView) {
            console.log("[ViewManager::hide] executing...");
            console.log(exceptThisView);
            for (let view of this.views.values()) {
                if (view !== exceptThisView) {
                    view.hide();
                }
            }
        },

        getView: function (key) {
            return this.views.get(key);
        },

        addView: function (tagName, view) {
            this.views.set(view.name, view);
            this._setTagNameViewsEl(view, tagName);
        },
        _setTagNameViewsEl: function (view, wantTagName) {
            if (view !== undefined && (view.$el.tagName === undefined || (wantTagName && wantTagName.isString()))) {
                view.$el.appendTo($(wantTagName));
            }
        }
    });

});
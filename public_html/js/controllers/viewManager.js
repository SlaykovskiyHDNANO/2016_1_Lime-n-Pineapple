'use strict';

define(['underscore', 'backbone', 'settings'], function (_, Backbone, Settings) {

    return Backbone.View.extend({
        defaults: {
            "views": null
        },
        initialize: function initialize() {
            var _this = this;

            console.log("[ViewManager::initialize] Inside constructor!");
            this.views = new Map();
            Backbone.on(Settings.EVENT_VIEWMANAGER_SHOW, function (view) {
                console.log("[ViewManager::add::listenTo] Triggered!");
                _this.hide(view);
                view.$el.show();
            });
            console.log("[ViewManager::add::initialize] Exited constructor!");
        },
        hide: function hide(exceptThisView) {
            console.log("[ViewManager::hide] executing...");
            console.log(exceptThisView);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.views.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var view = _step.value;

                    if (view !== exceptThisView) {
                        view.hide();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },

        getView: function getView(key) {
            return this.views.get(key);
        },

        addView: function addView(tagName, view) {
            this.views.set(view.name, view);
            this._setTagNameViewsEl(view, tagName);
        },
        _setTagNameViewsEl: function _setTagNameViewsEl(view, wantTagName) {
            if (view !== undefined && (view.$el.tagName === undefined || wantTagName && wantTagName.isString())) {
                view.$el.appendTo($(wantTagName));
            }
        }
    });
});

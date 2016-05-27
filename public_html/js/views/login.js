'use strict';

define(['jquery', 'backbone', 'settings', 'models/session', './baseView', 'tmpl/login'], function ($, Backbone, Settings, Session, BaseView, tmpl) {
    var Login = BaseView.extend({
        template: tmpl,
        events: {

            'click .btn-lg-back': function clickBtnLgBack(e) {
                Backbone.history.navigate("/", true);
            },
            'submit': '_onSubmitEvent'
        },

        initialize: function initialize() {},

        _onSubmitEvent: function _onSubmitEvent(e) {
            e.preventDefault();
            console.log("[views::login::_onSubmitEvent()]: called");
            this.form = this.$('.js-form__login')[0];
            var login = this.form.elements['username'].value,
                password = this.form.elements['password'].value;

            //console.log("Sending request to: " + url + " ...");
            var reqObj = {
                "login": login,
                "password": password
            };
            JSON.stringify(reqObj);
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            if (new Session().login(reqObj)) {
                Backbone.trigger("loginSuccess");
            }
        }
    });
    return new Login();
});

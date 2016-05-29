'use strict';

define(['jquery', 'backbone', 'settings', 'collections/sessions', './baseView', 'tmpl/login'], function ($, Backbone, Settings, Sessions, BaseView, tmpl) {
    return BaseView.extend({
        template: tmpl,
        events: {

            'click .btn-lg-back': function clickBtnLgBack(e) {
                Backbone.history.navigate("/", true);
            },
            'submit': '_onSubmitEvent'
        },

        defaults: {
            "sessions": null
        },

        initialize: function initialize(sessions) {
            console.log("Inside Login View initialize()");
            this.sessions = sessions;
            console.log("Exiting login View initialize()");
            this.name = "login";
        },

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
            this.sessions.login(login, password).then(function (_) {
                console.log("LOGIN SUCCESS");
            });
        }
    });
});

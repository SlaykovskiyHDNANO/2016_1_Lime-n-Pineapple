"use strict";
define(['jquery', 'backbone', 'settings', 'models/session', './baseView', 'tmpl/login'], function ($, Backbone, Settings, Session, BaseView, tmpl) {
    var Login = BaseView.extend({
        template: tmpl,
        events: {

            'click .btn-lg-back': function clickBtnLgBack(e) {
                Backbone.history.navigate("/", true);
            },
            'submit ': function mu(e){
                e.preventDefault();
                e.preventDefault();
                console.log("[views::login::_onSubmitEvent()]: called");
                var form = this.$('.js-form__login')[0],
                    login = form.elements['username'].value,
                    password = form.elements['password'].value;

                var reqObj = {
                    "login": login,
                    "password": password
                };
                console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
                console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
                if (new Session().login(reqObj)) {
                    Backbone.trigger("loginSuccess");
                }

            }
        },

        initialize: function initialize() {},

        _onSubmitEvent: function(e) {
            e.preventDefault();
            console.log("[views::login::_onSubmitEvent()]: called");
            var $form = $(this),
                login = $form.find("input[name='username']").val(),
                password = $form.find("input[name='password']").val();

            //console.log("Sending request to: " + url + " ...");
            var reqObj = {
                "login": login,
                "password": password
            };
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            if (Session.login(reqObj)) {
                Backbone.trigger("loginSuccess");
            }
        }
    });
    return new Login();
});
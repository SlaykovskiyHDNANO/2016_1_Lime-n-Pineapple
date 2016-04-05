define([
    'backbone'
    ],
    function (Backbone) {
        var User = Backbone.Model.extend(
            {
                defaults: {
                    id: 0,
                    name: "",
                    login: "",
                    score: 0,
                    email:"",
                    logged_in: false
                },
                initialize: function () {
                    console.log("[ScoreModel::initialize]", "initalizing...");
                }
            }
        );
        return User;
    }
);
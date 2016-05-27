define(
    ['underscore', 'jquery', 'require', 'backbone', 'qunit', 'models/userScore'],
    function (_, $, require, Backbone, QUnit, ScoreModel) {
        QUnit.module("models/score");
        QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {
            var score = new ScoreModel();
            QUnit.ok(score instanceof Backbone.Model);
        });
        QUnit.test("ScoreModel - работает инкремент счёта.", function () {
            var score = new ScoreModel();
            score.trigger("increment", 10);
            score.trigger("increment", -20);
            QUnit.ok(score.get('score') === -10);
        });
    }
);

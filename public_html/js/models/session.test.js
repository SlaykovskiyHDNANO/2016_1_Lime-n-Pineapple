define(
    function (require) {
        QUnit.module("models/session");

        QUnit.test("При fetch вызывается метод sync", function () {
            var SessionModel = require('./session'), Backbone = require('backbone'),
                session = new SessionModel();
            sinon.spy(Backbone, 'sync');
            session.fetch();
            alert(Backbone.sync.calledOnce + "FSDKFJSDKJFNS:H:D");
            QUnit.ok(Backbone.sync.calledOnce);
        });
    });

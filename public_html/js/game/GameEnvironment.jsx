"use strict";
define([], function (){
        return class GameEnvironment {
            constructor() {
                this.serverAvailable = false;
                this.associatedWebsocket = null;
                this.firstPlayer = null;
                this.secondPlayer = null;
            }
        };
    }
);
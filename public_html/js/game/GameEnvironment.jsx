"use strict";
define([], function (){
        return class GameEnvironment {
            constructor() {
                this.serverAvailable = false;
                this.associatedWebsocket = null;
                this.firstPlayer = null;
                this.secondPlayer = null;
            }
            setSocket(socket){
                this.associatedWebsocket = socket;
                this.serverAvailable = true;
            }

            isServerAvailable(){
                return this.serverAvailable;
            }
        };
    }
);
define(["jquery", "knockout", "pubsub"], function(e, t, n) {
    "use strict";
    return {
    	//declare variables

    	beforeAppear: function() {
    		//before the html is loaded
        },

        onRender: function(){
        	//once the html is loaded
            console.log("am in render");
        },

        onLoad: function(t) {
        	//after the html is loaded
        }
    };
});
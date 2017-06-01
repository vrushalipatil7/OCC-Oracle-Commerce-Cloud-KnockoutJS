define(   // DEPENDENCIES   
	['jquery','knockout'], 
   // MODULE DEFINITION   
   	function ($,ko, CCConstants, CCRestClient, notifier) {    
    "use strict";     
    return {  
        blogResults: ko.observableArray([]),
        blogActive : ko.observable(""),
    	onLoad: function(widget) {  
    	    $.ajax({
    	       url : "https://public-api.wordpress.com/rest/v1.1/sites/cloudcoreblog.wordpress.com/posts/?number=2",
    	       
    	       success: function(data){
    	           console.log(data);
    	            ko.utils.arrayForEach(data.posts, function(post) {
    	                var datestring = new Date(post.date)
    	                post.dateString = datestring.toDateString();
                        widget.blogResults.push(post);
                    });
    	           console.log(widget.blogResults());
    	       }
    	    });
    	     widget.handleBlogClick = function(data) { 
      		    //console.log(data);
      		    widget.blogActive(data);
      		    $("#blogModel").modal();
      		};
    	}
    };
});
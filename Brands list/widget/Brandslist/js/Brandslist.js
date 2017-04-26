/*define(["jquery", "knockout", "pubsub"], function(e, t, n) {
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
*/
 define(   // DEPENDENCIES   
  ['jquery','knockout'], 
   // MODULE DEFINITION   
    function ($,ko) {    
    "use strict";     
    return {
        onLoad: function(page) {
            var widget = this;
            /*this.newArrivalProdResults.removeAll(); */ 
            var urlLocationHost = window.location.host;
            var urlHostDomain = urlLocationHost.split("-z");
            urlHostDomain = urlHostDomain[0];
            urlLocationHost = urlLocationHost+"/"+urlHostDomain;
            $.ajax({
                method: "POST",
                //url: "https://ccstore-z5sa.oracleoutsourcing.com/ccstore/v1/login",
                url: "https://"+urlLocationHost+"/v1/login",
                /*beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTQ4Nzc3NjEsInN1YiI6IjljMjAwZjM4LTdhNmUtNGI2NS05NzlhLWY0NzYwN2M2YWMzNyIsImlzcyI6ImFwcGxpY2F0aW9uQXV0aCIsImlhdCI6MTQ4MzM0MTc2MX0=.ezJItnhKY86SSfoRiv4tUNMo1OhJS08ECBUVgC9czpc=");
                },
                data: 'grant_type=client_credentials',*/
                data: 'grant_type=password&username=suhas.d%40echidnainc.com&password=Welcome@2',
                ContentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                success: function(data) {
                    //console.log("data from log ",data.access_token);
                    /*widget.authToken = data.access_token;*/
                    if($("#respnsiveBrandCarousel").hasClass("slick-initialized")){
                        widget.reinitbrandCarousel(widget);
                    }else{
                        widget.brandCarouselinit();
                    }
                },
                error: function(xhr) {
                    console.log("error === ",xhr);  
                }
            });
            
        },
        brandCarouselinit: function(widget) {
                console.log("brand window "+ $(window).width());
                console.log("before appear "+$("#respnsiveBrandCarousel").length);
                /*var parentObj = $("#respnsiveBrandCarousel").closest(".responsiveSlick");
                parentObj.css("css",parentObj.width());*/
                $(".brandResponsiveSlick").css("width",$(window).width()-60);
                console.log("brand"+ $(window).width());
               $("#respnsiveBrandCarousel").slick({
                    dots: false,
                  infinite: false,
                  speed: 300,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  adaptiveHeight: true,
                  responsive: [{
                          breakpoint: 1440,
                          settings: {
                              slidesToShow: 4,
                              slidesToScroll: 1,
                              infinite: true
                          }
                      }, {
                          breakpoint: 1020,
                          settings: {
                              slidesToShow: 3,
                              slidesToScroll: 1
                          }
                      }, {
                          breakpoint: 768,
                          settings: {
                              slidesToShow: 1,
                              slidesToScroll: 1
                          }
                      }]
                  });
        },
        reinitbrandCarousel: function(widget){
            $("#respnsiveBrandCarousel").slick('unslick');
            widget.brandCarouselinit();
        },
    
    };
});
           

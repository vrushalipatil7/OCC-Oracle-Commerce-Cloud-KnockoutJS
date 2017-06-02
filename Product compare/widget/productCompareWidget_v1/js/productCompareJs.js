define(   // DEPENDENCIES   
	['jquery','knockout', 'ccConstants', 'ccRestClient', 'notifier'], 
   // MODULE DEFINITION   
   	function ($,ko, CCConstants, CCRestClient, notifier) {    
    "use strict"; 
    return {       
    	MAX_COMPARE: 4,       
    	OFFSET: 0, 
    	
       	//compareTerm: ko.observable(""),      
        compareProductID: ko.observable(""),
       	compareResults: ko.observableArray([]),
       	localstorageData : [],
        
       	onLoad: function(widget) {
       	   $('body').on('click', '.addToCompare', function(event){
       	       widget.compareProductID(event.target.id);
       	        widget.addToCompare(widget, event);
       	    });
       	    widget.removeHandler = function(data) { 
      		    console.log(data);
      		    widget.compareResults.remove(data);
      		    localStorage.setItem("ech-compare",JSON.stringify(widget.compareResults()));
      		    
      		};
      		widget.compareProductQty = function(data){
      		    console.log("stock");
      		    /*console.log("data compare"+this);
      		    var qty;
      		    ko.utils.arrayForEach(data.childSKUs, function(item) {
                    if (isNaN(item.quantity)) {
                        qty = qty + item.quantity;
                        widget.compareResults.push(item);
                        console.log("quantity"+qty);
                    }
                });*/
      		}
      		console.log("localstorage data"+ko.utils.parseJson(localStorage.getItem("ech-compare")));
      		console.log("localstorage json"+JSON.parse(localStorage.getItem("ech-compare")));
      		widget.localstorageData = ko.utils.parseJson(localStorage.getItem("ech-compare"));
      		if(widget.localstorageData !== null){
          		ko.utils.arrayForEach(widget.localstorageData, function(item) {
                    if (isNaN(item)) {
                        widget.compareResults.push(item);
                        console.log("addind localstorage data"+widget.compareResults());
                    }
                });  
      		}
      		
      		
      		/*widget.storedCompareProduct = ko.utils.parseJson(localStorage.getItem("ech-compare"));
       	    widget.compareResults.push(widget.storedCompareProduct);
       	    widget.removeHandler = function(data) { 
      		    console.log(data);
      		    widget.compareResults.remove(data);
      		    
      		};*/
 
       	}, 
 
  		beforeAppear: function(page) {    
  			//this.searchTerm("");    widget 
  			this.compareProductIDs.removeAll(); 
            this.compareResults.removeAll(); 
       	    console.log("init compare"+ widget.compareProductID);
       	    
  		},
  		 addToCompare: function(widget, event) {
            //fetch object
            console.log(localStorage.getItem("ech-compare"));
            var prodToCompare = true;
            widget.localstorageData = ko.utils.parseJson(localStorage.getItem("ech-compare"));
  		    if(widget.localstorageData !== null){
  		        ko.utils.arrayForEach(widget.localstorageData, function(item) {
  		            var productId = item.id;
  		            console.log(productId);
                    if (productId == widget.compareProductID()) {
                        prodToCompare = false;
                        return;
                    }
                });
  		    }
            if(widget.compareResults().length < widget.MAX_COMPARE && prodToCompare){
               widget.compareHandler(widget, event);
               return true;
            }
	  		return false;       
  		},
  		
  		compareHandler: function(widget, event) {     
  			//widget.searchResults.removeAll();     
  			if (widget.compareProductID() && widget.compareProductID().length > 0) {       
  				var data = {}, pathParam= widget.compareProductID();       	      
  				CCRestClient.request(CCConstants.ENDPOINT_PRODUCTS_GET_PRODUCT, data,  widget.successCallback.bind(widget), 
  				widget.errorCallback.bind(widget),pathParam); 
  				//this.compareResults.push(localStorage.getItem("ech-compare"));
  			} 
  		}, 
  		successCallback: function(result) { 
  		    var res = result;
  		    this.compareResults.push(res);
            localStorage.setItem("ech-compare",JSON.stringify(this.compareResults()));
            console.log(JSON.parse(localStorage.getItem("ech-compare")));
            
	  		/*if((result.resultsList) && (result.resultsList.records)) {       
	  			var results = result.resultsList.records;       
	  			for(var i=0; i<results.length; i++ ) {         
	  				if(results[i].records && results[i].records[0] && results[i].records[0].attributes) { 
	  				    this.searchResults.push(results[i].records[0].attributes);           
	  				}         
	  			}       
	  		}*/     
  		},
  		errorCallback: function(data) {     
  			// Widget Type, Error Message, Scroll to Error     
  			notifier.sendWarning(this.typeId(), this.translate('CompareError'),       true);   
  		}
  		
  	};  
} );
 
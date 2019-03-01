export const individualpayments = new webix.DataCollection({
	url:"/api/central/payment/",
	scheme:{                                                                              
		$init:function(obj){
			url = url + obj.id                                                                          
			obj.date = webix.i18n.parseFormatDate(obj.date);
		}                                                                                  
	}
});

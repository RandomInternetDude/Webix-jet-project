export const individualpayments = new webix.DataCollection({
	url:"/api/central/payment/{id}",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.date = webix.i18n.parseFormatDate(obj.date);
		}                                                                                  
	}
});

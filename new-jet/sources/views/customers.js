import {JetView, plugins} from "webix-jet";
import UnionsView from "views/unions";

export default class CustomersView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"wide",
			cols:[
				{
					localId:"inner:layout", rows:[
						{
							view:"tabbar", localId:"tabbar",
							height:43,
							options:[
								{ id:"information", value:_("Information"), width:170 },
								{ id:"paymenthistory", value:_("Payment History"), width:170 }
								
							]
						},
						{ $subview:true }
					]
				},
				UnionsView
			]
		};
	}
	init(){
		this.use(plugins.Menu,this.$$("tabbar"));

		this.on(this.app,"union:select",union => this.setParam("user",union.id,true));
	}
}

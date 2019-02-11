import {JetView} from "webix-jet";
import PaymentHistoryView from "views/customers/paymenthistory";
import UnionsView from "views/unions";

export default class PayHistoryView extends JetView {
	config(){
		return {
			type:"wide", cols:[
				PaymentHistoryView,
				UnionsView
			]
		};
	}
	ready(){
		this.app.callEvent("payment:history:ready");
	}
}

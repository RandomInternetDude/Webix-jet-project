import {JetView} from "webix-jet";
import {getCprocessorsData} from "models/cardProcessors";

export default class CardProcessorsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			type:"clean",
			rows:[
				{
					template:_("Clients by occupation"), type:"header",
					css:"webix_header chart_header"
				},
				{
					view:"chart",
					type:"donut",
					localId:"chart",
					value:"#number#",
					lineColor:obj => obj.color,
					color:"#color#",
					innerRadius:60,
					padding:{ top:10, bottom:20, left:20 },
					legend:{
						width:170,
						align:"right",
						valign:"middle",
						marker:{
							type:"round", width:7, height:8
						},
						template:obj => _(obj.cprocessor)
					},
					shadow:false,
					tooltip:{ template:obj => `${_("Clients")}: ${obj.number}` }
				}
			]
		};
	}
	init(){
		this.$$("chart").parse(getCprocessorsData());
	}
}

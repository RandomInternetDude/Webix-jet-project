import {JetView} from "webix-jet";
import GeoView from "views/customers/geo";
import CprocessorsView from "views/customers/positions";

export default class StatisticsView extends JetView {
	config(){
		return {
			rows:[
				{
					height:10
				},
				{
					type:"wide",
					rows:[
						{
							gravity:2,
							type:"wide",
							cols:[
								GeoView,
								{
									type:"wide",
									minWidth:370,
									rows:[
										CprocessorsView
									]
								}
							]
						},
					]
				}
			]
		};
	}
}

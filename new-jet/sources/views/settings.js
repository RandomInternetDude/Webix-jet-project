import {JetView} from "webix-jet";


export default class SettingsView extends JetView {
	config(){
		const theme = this.app.config.theme;
		const combo_theme_value = theme ? "1" : "0";
		const list_length_slider_value = this.app.config.listLength;

		return {
			rows:[
				{ template:("Settings"), type:"header", css:`webix_header ${theme}` },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },
					rules:{
						$all:webix.rules.isNotEmpty
					},
					elements:[
						{ template:("Environment settings"), type:"section" },
						{
							cols:[
								{
									label:("Theme"), view:"richselect",
									name:"theme", minWidth:144, gravity:3,
									value:combo_theme_value,
									options:[
										{ id:"0", value:"Light" },
										{ id:"1", value:"Dark" }
									],
									on:{
										onChange:newtheme => {
											const th = this.app.config.theme = newtheme === "1" ? "webix_dark" : "";
											try{
												webix.storage.local.put("bank_app_theme",th);
											}
											catch(err){/* if cookies are blocked */}
										}
									}
								},
								{},
								{
									label:("Max list length"), view:"slider",
									name:"maxlist", minWidth:207,
									min:10, max:300, value:list_length_slider_value, step:10,
									title:"#value#", gravity:3,
									on:{
										onChange:newv => this.app.config.listLength = newv
									}
								},
								{ gravity:9 }
							]
						},
						{},
						{
							margin:10, cols:[
								{
									view:"button", value:("Default settings"),
									autowidth:true,
									click:function(){
										this.getFormView().setValues(this.$scope._defaults);
									}
								},
								{},
								{
									view:"button", value:("Save"),
									autowidth:true, type:"form",
									click:function(){
										// if (this.getFormView().validate())
											// this.$scope.app.getService("locale").setLang(this.$scope._lang);
									}
								}
							]
						}
					]
				}
			]
		};
	}
	init(){
		
		this._defaults = {
			lang:"en",
			dateformat:"%j %F, %H:%i",
			moneyformat:"1",
			theme:"0",
			maxlist:50
		};
	}
}

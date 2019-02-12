import {JetView} from "webix-jet";
import {getLangsList} from "models/langslist";

import "locales/webix/de.js";
import "locales/webix/es.js";
import "locales/webix/ko.js";
import "locales/webix/ru.js";
import "locales/webix/zh.js";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();
		const theme = this.app.config.theme;
		const combo_theme_value = theme ? "1" : "0";
		const date_combo_value = this.app.config.dateFormat;
		const list_length_slider_value = this.app.config.listLength;

		return {
			rows:[
				{ template:_("Settings"), type:"header", css:`webix_header ${theme}` },
				{
					view:"form", elementsConfig:{ labelPosition:"top" },
					rules:{
						$all:webix.rules.isNotEmpty
					},
					elements:[
						{ template:_("Environment settings"), type:"section" },
						{
							cols:[
								{
									label:_("Theme"), view:"richselect",
									name:"theme", minWidth:144, gravity:3,
									value:combo_theme_value,
									options:[
										{ id:"0", value:_("Light") },
										{ id:"1", value:_("Dark") }
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
									label:_("Max list length"), view:"slider",
									name:"maxlist", minWidth:207,
									min:10, max:50, value:list_length_slider_value, step:10,
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
									view:"button", value:_("Default settings"),
									autowidth:true,
									click:function(){
										this.getFormView().setValues(this.$scope._defaults);
									}
								},
								{},
								{
									view:"button", value:_("Save"),
									autowidth:true, type:"form",
									click:function(){
										if (this.getFormView().validate())
											this.$scope.app.getService("locale").setLang(this.$scope._lang);
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
		this._lang = this.app.getService("locale").getLang();

		this._defaults = {
			lang:"en",
			dateformat:"%j %F, %H:%i",
			moneyformat:"1",
			theme:"0",
			maxlist:50
		};
	}
}
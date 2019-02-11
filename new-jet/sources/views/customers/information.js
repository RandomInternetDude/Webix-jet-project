import {JetView} from "webix-jet";
import {getCities} from "models/cities";
import {getCprocessor} from "models/cardProcessors";
import "webix/tinymce/tinymce";

export default class InformationView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const screen = this.app.config.size;
		
		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"Uname",
					label:_("Union name"), labelPosition:"top",
					placeholder:_("Union name"),
					invalidMessage:_("Unions name is required")
				},
				{
					view:"text", name:"CRS",
					label:_("CRS"), labelPosition:"top",
					placeholder:_("CRS")
				},
				{
					view:"datepicker", name:"Lprovision",
					label:_("Last Provision"), labelPosition:"top",
					placeholder:_("Click to select"),
					format:webix.Date.dateToStr("%d %M %Y")
				}
			]
		};

		const Cprocessor = {
			view:"richselect", name:"Cprocessor",
			localId:"Cprocessor:combo",
			label:_("Card Processor"), labelPosition:"top",
			placeholder:_("Click to select"),
			options:[]
		};

		const notifications = {
			view:"radio", name:"notifications",
			label:_("Notifications"), labelPosition:"top",
			value:1,
			options:[
				{ id:1, value:_("Yes") },
				{ id:2, value:_("No") }
			]
		};

		const left_main = {
			gravity:3,
			minWidth:200,
			margin:10,
			rows:[
				main_info,
				Cprocessor,
				notifications
			]
		};

		const more_info = {
			gravity:3,
			minWidth:200,
			margin:10,
			rows:[
				{
					view:"richselect", name:"city",
					localId:"cities:combo",
					label:_("City, country"), labelPosition:"top",
					placeholder:_("Click to select"),
					options:[]
				},
				{
					view:"text", name:"address", label:_("Address"),
					labelPosition:"top", placeholder:_("Address")
				},
				{
					view:"text", name:"admin",
					label:_("Admin"), labelPosition:"top",
					placeholder:"User Admin"
				},
				{
					view:"text", name:"email",
					label:_("Admin Email"), labelPosition:"top",
					placeholder:"judetheawesome@obscure.com"
				}
		
			]
		};

		// const right_photo = {
		// 	gravity:3,
		// 	margin:10,
		// 	rows:[
		// 		{
		// 			view:"photo",
		// 			name:"photo",
		// 			css:"form_photo",
		// 			width:260,
		// 			height:260,
		// 			borderless:true
		// 		},
		// 		{
		// 			view:"multicombo", name:"tags",
		// 			localId:"tags:combo",
		// 			placeholder:_("Click to add tags"),
		// 			options:[]
		// 		}
		// 	]
		// };

		const upper_section = {
			cols:[
				left_main,
				{ gravity:1, minWidth:20 },
				more_info,
				{ gravity:2, minWidth:20 },
				// right_photo
			]
		};

		const upper_section_narrow = {
			cols:[
				{
					gravity:4,
					margin:10,
					rows:[
						main_info, more_info, Cprocessor
					]
				},
				{ gravity:1, minWidth:20 },
				{
					margin:10,
					rows:[
						// right_photo,
						notifications
					]
				}
			]
		};

		const notes = {
			view:"forminput",
			labelWidth:0,
			body:{
				rows:[
					{ view:"label", template:_("Notes"), css:"input_label" },
					{
						view:"tinymce-editor",
						borderless:true,
						name:"notes",
						localId:"notes",
						config:{
							menubar:false,
							plugins:"link",
							toolbar:"fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | link",
							content_style:"* { color:#475466; font-family:Roboto,sans-serif; font-size:15px; }"
						}
					}
				]
			}
		};

		const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button", value:_("Reset"), autowidth:true,
					click:() => {
						this.$$("notes").setValue("");  // !
						this.getRoot().clear();
					}
				},
				{
					view:"button", value:_("Save"), type:"form", autowidth:true,
					click:() => {
						if (this.getRoot().validate()){
							const newdata = this.getRoot().getValues();
							this.app.callEvent("customer:save",[newdata]);
						}
					}
				},
				{
					view:"button", value:_("Delete"), type:"form", autowidth:true,
					click:() => {
						console.log("should delete")
						if (this.getRoot().validate()){
							const data = this.getRoot.getValues();
							this.app.callEvent("customer:delete")
							this.$$("notes").setValue("");
							this.getRoot().clear()
						}
					}
				}
			]
		};

		return {
			view:"form",
			rows:[
				(screen !== "small") ? upper_section : upper_section_narrow,
				notes,
				buttons
			],
			rules:{
				"Uname":webix.rules.isNotEmpty
			}
		};
	}
	init(form){
		this.app.callEvent("form:update",[this.getParam("user",true)]);

		this.on(this.app,"customer:updatedata",union => form.setValues(union));

		this.on(this.app,"union:select",union => form.setValues(union));

		this.getLocalizedComboOptions();
	}
	getLocalizedComboOptions(){
		const _ = this.app.getService("locale")._;

		let cp_options = webix.copy(getCprocessor());
		cp_options.map(x => x.value = _(x.value));
		this.$$("Cprocessor:combo").getPopup().getList().parse(cp_options);

		let c_options = webix.copy(getCities());
		c_options.map(x => x.value = _(x.value));
		this.$$("cities:combo").getPopup().getList().parse(c_options);
	}
}

import { JetView } from "webix-jet";
import { unions } from "models/unions";





export default class UnionsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const screen = this.app.config.size;

		return {
			rows:[
				{
					view:"toolbar", css:theme,
					elements:[
						{ view:"label", label:_("Unions"), localId:"label" },
						{ width:4 },
						{
							view:"text", localId:"search", hidden:true,
							on:{
								onTimedKeyPress(){
									const input = this.getValue().toLowerCase();
									this.$scope.$$("list").filter(obj => {
										const name = obj.Uname;
										return name.toLowerCase().indexOf(input) !== -1;
									});
								}
							}
						},
						{
							view:"icon", icon:"mdi mdi-magnify",
							state:"closed", localId:"search_icon",
							click:function(){
								if (this.config.state === "closed"){
									this.$scope.$$("label").hide();
									this.$scope.$$("search").show();
									this.$scope.$$("search").focus();
									this.config.state = "open";
								}
								else if (this.config.state === "open"){
									this.$scope.$$("label").show();
									this.$scope.$$("search").hide();
									this.config.state = "closed";
								}
							}
						}
					]
				},
				{
					view:"list",
					localId:"list",
					css:"persons_list",
					width:(screen !== "small") ? 250 : 230,
					select:true,
					tooltip:{
						template:_("Click twice to see more goodies")
					},
					type:{
						template:obj => `
							<div class="text">
						  		<span class="username">${obj.Uname} </span>
						  		<span class="money">${obj.vendor_id}</span>
							</div>`,
						height:66
					},
					on:{
						onAfterSelect:id => {
							const union = unions.getItem(id);
							this.app.callEvent("union:select",[union]);
						},
						onItemDblClick:id => {
							if (this.getUrl()[0].page !== "customers")
								this.show("customers?user="+id+"/information");
							else this.show("information");
						}
					}
				}
			]
		};
	}
	init(){
		const _ = this.app.getService("locale")._;
		const list = this.$$("list");
		
		list.sync(unions);

		// this.modal = this.ui(NewUnionView);
		// this.win2 = this.ui(WindowsView);

		unions.waitData.then(() => {
			if (this.getUrl()[1].page !== "customers"){
				const cur_user = this.getParam("user",true);
				list.select(cur_user);
				list.showItem(cur_user);
			}
		});

		this.on(this.app, "customer:post" , (data)=>{
			const id = data.id || this.getParam("user",true);
			unions.add(id, data);
			webix.message(_("Success"))
		})

		this.on(this.app,"customer:save",(data) => {
			const id = data.id || this.getParam("user",true);
			unions.updateItem(id,data);
			webix.message(_("Saved"));
		});

		this.on(this.app, "customer:delete", (data)=>{
			const id = data.id || this.getParam("user",true);
			unions.remove(id,data);
			webix.message(_("Deleted"));
		})

		this.on(this.app,"form:update",(id) => {
			unions.waitData.then(() => {
				const user = list.getSelectedId();
				if (!user){
					list.select(id || 1);
					list.showItem(id || 1);
				}
				else {
					this.app.callEvent("customer:updatedata",[list.getItem(user)]);
				}
			});
		});

		this.on(this.app,"taction:select",record => {
			if (record) {
				const union = unions.find(obj => obj.company === record.id)[0];
				if (union){
					list.select(union.id);
					list.showItem(union.id);
				}
			}
			else
				list.unselect();
		});

		this.on(this.app,"payment:history:ready",() => unions.waitData.then(() => list.select(1)));
		
	}
}

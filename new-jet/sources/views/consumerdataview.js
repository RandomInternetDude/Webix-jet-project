import {JetView} from 'webix-jet';
import { unions } from "models/unions";
export default class ConsumerDataView extends JetView {
    config(){
	
		return {
			view:"datatable",
            select:true,
            localId:"list",
            scroll:"y",
			tooltip:true,
			columns:[
                // { id:"edit", header:"", width:35, template:"{common.editIcon()}" ,click:()=>{this.edit()}},
				{ id:"Uname", header:["Credit Union", {content:"textFilter"}], sort:"string",adjust:"header", fillspace:3 },
				{ id:"charter_num", header:["Charter Number", {content:"textFilter"}], sort:"int",adjust:"header",fillspace:3 },
                { id:"acct_manager", header:["Account Manager", {content:"textFilter"}], sort:"string",adjust:"header", fillspace:3},
                { id:"vendor_id", header:["Vendor ID", {content:"textFilter"}], sort:"string",adjust:"header", fillspace:3 },
                { id:"aws_acct_id", header:["Aws Account ID", {content:"textFilter"}], sort:"string",adjust:"header" ,fillspace:3},
                { id:"activation_btn", header:["Active", {content:"textFilter"}], sort:"int",adjust:"header" , template:this.checkbox },
                { id:"sftp_flag", header:["SFTP", {content:"textFilter"}], sort:"int",adjust:"header", template:this.checkbox},
                { id:"freeze_flag", header:["Freeze Flag", {content:"textFilter"}], sort:"int",adjust:"header", template:this.checkbox},
                // { id:"notes", header:["Notes", {content:"textFilter"}], sort:"",adjust:"header", fillspace:true },
            ],
            on:{
                onViewChange:(prev)=>{
                    const button = this.$$("add");
                    if(prev == "gridView"){
                        button.hide();
                    } else {
                        button.show();
                    }
                },
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
		};
	}
	init(){
		
        const _ = this.app.getService("locale")._;
        const list = this.$$("list")
            
        list.sync(unions);

        unions.waitData.then(() => {
            if (this.getUrl()[1].page !== "customers"){
                const cur_user = this.getParam("user",true);
                gridView.select(cur_user);
                gridView.showItem(cur_user);
            }
        });
            
        this.on(this.app,"customer:save",(data) => {
            const id = data.id || this.getParam("user",true);
            unions.updateItem(id,data);
            webix.message(_("Saved"));
        });


		this.on(this.app,"customer:select",unions => {
			unions.waitData.then(() => {
				view.filter(obj => {
					return obj.id%6 === unions.id%6;
				});
			});
		});
    }
    edit(){
        console.log('btn clicked')
    }
    checkbox(obj, common, value){
        if(value === 1){
            return "<div class='webix_table_checkbox checked'>Yes</div>"
        } else {
            return "<div class='webix_table_checkbox notchecked'>No</div>"
        }
    }
}




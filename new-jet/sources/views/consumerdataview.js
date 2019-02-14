import {JetView} from 'webix-jet';
import { unions } from "models/unions";
export default class ConsumerDataView extends JetView {
    config(){
	
		return {
			view:"datatable",
            select:true,
            scroll:"y",
			tooltip:true,
			columns:[
                { id:"edit", header:"", width:35, template:"{common.editIcon()}"},
				{ id:"Uname", header:["Credit Union", {content:"textFilter"}], sort:"string",adjust:"header", },
				{ id:"charter_num", header:["Charter Number", {content:"textFilter"}], sort:"int",adjust:"header" },
                { id:"activation_btn", header:["Active", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"acct_manager", header:["Account Manager", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"vendor_id", header:["Vendor ID", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"aws_acct_id", header:["Aws Account ID", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"sftp_flag", header:["SFTP", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"freeze_flag", header:["Freeze Flag", {content:"textFilter"}], sort:"string",adjust:"header" },
                { id:"notes", header:["Notes", {content:"textFilter"}], sort:"string",adjust:"header", fillspace:true },
            ],
            onClick:{
                "fa-pencil":(e,id)=>{
                    this.show("customers?id="+id.row)
                }
            }
		};
	}
	init(view){
		const cur_user = this.getParam("user",true);
		
		view.sync(unions,function(){
			if (cur_user) this.filter(obj => obj.id%6 === cur_user%6);
		});
		
		this.on(this.app,"customer:select",unions => {
			unions.waitData.then(() => {
				view.filter(obj => {
					return obj.id%6 === unions.id%6;
				});
			});
		});
	}
}



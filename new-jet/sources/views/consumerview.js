import {JetView} from 'webix-jet';
import { unions } from '../models/unions';
import ConsumerDataView from './consumerdataview';
import ConsumerForm from './forms/consumerform';

export default class ConsumerView extends JetView {
    config(){
        return {
            rows:[
                {
                    view:"toolbar", css:"subbar", padding:5,
                    elements:[
                        {
                            height:50, css:"title", borderless:true,
                            template:`<h3 class='header'>Credit Unions Provisioning Data</h3>`
                        },
                        {
                            view:"button", id:"add", type:"form",
                            label:"+ Add New", width:140,
                            click:()=>{
                                this.$$("multi").setValue("formView");
                            }
                        }
                    ]
                },
                {
                    animate:false,
                    fitbiggest:true,
                    localId:"multi",
                    cells:[
                        {id:"gridView", $subview:ConsumerDataView},
                        {id:"formView", $subview:ConsumerForm}
                    ]
                }
            ],
            // on:{
            //     onViewChange:(prev)=>{
            //         const button = this.$$("add");
            //         if(prev == "gridView"){
            //             button.hide();
            //         } else {
            //             button.show();
            //         }
            //     },
            //     onAfterSelect:id => {
            //         const union = unions.getItem(id);
            //         this.app.callEvent("union:select",[union]);
            //     },
            //     onItemDblClick:id => {
            //         if (this.getUrl()[0].page !== "customers")
            //             this.show("customers?user="+id+"/consumerview");
            //         else this.show("consumerview");
            //     }
            // }
        }
    }
    init(){
    // const _ = this.app.getService("locale")._;
    // const list = this.$$("list")
		
	// 	list.sync(unions);

	// 	unions.waitData.then(() => {
	// 		if (this.getUrl()[1].page !== "customers"){
	// 			const cur_user = this.getParam("user",true);
	// 			gridView.select(cur_user);
	// 			gridView.showItem(cur_user);
	// 		}
	// 	});
    }
    urlChange(){
        const id = this.getParam("id");
        if(id){
            this.$$("multi").setValue("formView")
        } else {
            this.$$("multi").setValue("gridView")
        }
    }
}
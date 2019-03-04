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
                                this.app.callEvent("customer:new");
                                this.$$("multi").setValue("formView");
                            }
                        }
                    ]
                },
                {
                    view:"multiview",
                    animate:true,
                    fitbiggest:true,
                    localId:"multi",
                    multiview:true,
                    cells:[
                        {id:"gridView", $subview:ConsumerDataView},
                        {id:"formView", $subview:ConsumerForm}
                    ],
                    keepViews:true
                }
            ]
        }
    }

    urlChange(){
        const id = this.getParam(id);
        if(id){
            this.$$("multi").setValue("formView")
        } else {
            this.$$("multi").setValue("gridView")
        }
    }
}
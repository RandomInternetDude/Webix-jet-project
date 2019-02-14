import {JetView} from 'webix-jet';
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
                            template:`<h3 class='header'>Credit Unions Provisioning Data</h3>
                                      <div class='details>(info & editing)</div>`
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
                    animate:true,
                    fitbiggest:true,
                    localId:"multi",
                    cells:[
                        {id:"gridView", $subview:ConsumerDataView},
                        {id:"formView", $subview:ConsumerForm}
                    ]
                }
            ],
            on:{
                onViewChange:(prev)=>{
                    const button = this.$$("add");
                    if(prev == "gridView"){
                        button.hide();
                    } else {
                        button.show();
                    }
                }
            }
        }
    }
    urlChange(){
        const id = this.getParam("id");
        if(id){
            this.$$("multi").setValue("formView")
        }
    }
}
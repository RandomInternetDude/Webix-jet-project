import {unions} from "models/unions";

export function getCprocessor(){ 
	return processors;
}

export function getCprocessorsData(){ 
	let data = [];
	return unions.waitData.then(() => {
		positions.map(pos => {
			if (pos.id !== "$empty"){
				let who = unions.find(pers => pers.position === pos.id);
				data.push({ position:pos.value, number:who.length, color:pos.color });
			}
		});
		return data;
	});
}

const processors = [
	{ id:"$empty", value:"-- Not selected --", $empty:true },
	{ id:"1", value:"Strip", color:"#8664C6" },
	{ id:"2", value:"Paypal", color:"#1CA1C1" },
	{ id:"3", value:"Other", color:"#F8643F" }
];

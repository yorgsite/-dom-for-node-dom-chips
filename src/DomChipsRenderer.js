
// const {Core} = require('./Core.js');
const {ErrorPile}=require('../../tools/src/core/ErrorPile');

class DomChipsRenderConfig{
	constructor(){

	}
	init(params){
		let err=new ErrorPile('_dom("dom-chips",params)');
		this.CellRenderer=params.render?params.render:null;
		let proto=this.CellRenderer?this.CellRenderer.prototype:null;
		if(!proto){
			err.trow('params.render is not a constructor',{params});
		}
		let keys=Object.getOwnPropertyNames(this.CellRenderer.prototype);
		let missings=[
			'getDom',
			'fromData',
			'toData'
		].filter(rk=>!keys.includes(rk));
		
		if(missings.length){
			err.trow('params.render prototype is missing the following methods : ['+
			missings.join(',')+']',{params});
		}
	}
};
class DomChipsRenderer{
	constructor(conf){
		this.conf=conf;
	}
};

module.exports={
	DomChipsRenderer,
	DomChipsRenderConfig
};
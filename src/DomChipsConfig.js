
const {Core} = require('./Core.js');
const {DomChipsRenderConfig} = require('./DomChipsRenderer.js');

class DomChipsConfig{
	constructor(){
	}
	init(params){
		this.root=params.root instanceof HTMLElement?params.root:null;
		this.renderConf=new DomChipsRenderConfig();
		this.renderConf.init(params);
		this.CellRenderer=this.renderConf.CellRenderer;
	}
};

module.exports={DomChipsConfig};
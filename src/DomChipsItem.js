
const {Core} = require('./Core.js');
const {DragDrop}=require('../../tools/src/core/DragDrop');
const {ErrorPile}=require('../../tools/src/core/ErrorPile');

const dragDrop=DragDrop.familly('dom-data-item');
let _idc=1;
let _err=new ErrorPile('dom-chips.Item');
class DomChipsItem{
	constructor(model){
		this.id=_idc++;
		this._model=model;
		this.renderIO=new RenderAPI(this);
		this.outIO=new DomChipsOutIO(this);
		
		this.CellRenderer=model._conf.CellRenderer;
		this._element=new this.CellRenderer(this.renderIO);
		if(typeof(this._element.getErrors)!=='function'){
			this._element.getErrors=(d)=>false;
		}
		this._drag=null;
		this._drop=null;
		this._changedOut=false;
		this._changedIn=false;
		this._changedDom=false;
		this._dom=null;
		this._dom_ls={};
		// this._dom_ls.
	}
	get dom(){
		if(!this._dom||this._changedDom){
			let old=this._dom;
			this._dom=this._element.getDom();
			
			if(old&&old.parentNode){
				if(this._dom!==old){
					old.parentNode.insertBefore(this._dom,old);
					old.parentNode.removeChild(old);
				}
			}
			if(this._dom!==old){}
		}
		return this._dom;
	}
	get data(){
		return this._element?this._element.toData():null;
	}
	set data(data){
		if(this._element){
			
			let errs=this._element.getErrors(data);
			if(errs.length){
				_err.callSub('data').throw(errs,{data});
			}
			let old=this._element.toData();
			this._element.fromData(data);
			
			this._model._listener.flush('change',{
				old,
				data,
				itm:this
			});
		}
	}
	// setDom(type,key){}
	get root(){
		return this._model.dom;
	}
	get drag(){
		return this._drag;
	}
	set drag(v){
		if((v instanceof HTMLElement)&&v!==this._drag){
			if(this._drag)dragDrop.unregisterDrag(this._drag);
			dragDrop.registerDrag(v,evt=>this);
			this._drag=v;
		}else if(!v){
			if(this._drag)dragDrop.unregisterDrag(this._drag);
			this._drag=null;
		}
	}
	get drop(){
		return this._drop;
	}
	set drop(v){
		if((v instanceof HTMLElement)&&v!==this._drop){
			if(this._drop)dragDrop.unregisterDrop(this._drop);
			dragDrop.registerDrop(v,(itm,evt)=>{
				this._model.insert(itm,this.index);
			});
			this._drop=v;
		}else if(!v){
			if(this._drop)dragDrop.unregisterDrop(this._drop);
			this._drop=null;
		}
	}
	get index(){
		return this._model?this._model._list.findIndex(itm=>itm.id===this.id):-1;
	}
	remove(){
		if(this._model){
			this._model.remove(this);
		}
	}
};
// 'getDom',
// 'fromData',
// 'toData'
// old.parentNode.insertBefore(this.__element,old);
// old.parentNode.removeChild(old);

class DomChipsItemIO{
	constructor(chipItem){
		this._priv=chipItem;
	}
	get data(){
		return this._priv.data;
	}
	set data(v){
		this._priv.data=v;
	}
};
class RenderAPI{
	constructor(chipItem){
		this._priv=chipItem;
	}
	get root(){
		return this._priv.root;
	}
	get data(){
		return this._priv.data;
	}
	set data(v){
		this._priv.data=v;
	}
	get drop(){return this._priv.drop;}
	set drop(v){this._priv.drop=v;}
	get drag(){return this._priv.drag;}
	set drag(v){this._priv.drag=v;}
};
class DomChipsOutIO{
	constructor(chipItem){
		this._priv=chipItem;
	}
	get data(){
		return this._priv.data;
	}
	set data(v){
		this._priv.data=v;
	}
};

module.exports={DomChipsItem};
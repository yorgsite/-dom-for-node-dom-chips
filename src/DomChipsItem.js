
const {Core} = require('./Core.js');
const {DragDrop}=require('../../tools/src/core/DragDrop');
const {ErrorPile}=require('../../tools/src/core/ErrorPile');

let _idc=1;
const dragDrop=DragDrop.familly('dom-data-item');
const _err=new ErrorPile('dom-chips.Item');
const rendeRef={
	getErrors:(d)=>false,
	setSelected:(b)=>{},
	setFocused:(b)=>{},
};

class DomChipsItem{
	constructor(model){
		this.id=_idc++;
		this._model=model;
		this.renderIO=new RenderAPI(this);
		// this.outIO=new DomChipsOutIO(this);
		
		this.CellRenderer=model._conf.CellRenderer;
		this._element=new this.CellRenderer(this.renderIO);
		for(let k in rendeRef){
			if(typeof(this._element[k])!=='function'){
				this._element[k]=rendeRef[k];
			}
		}
		this._drag=null;
		this._drop=null;
		this._selector=null;
		this._changedOut=false;
		this._changedIn=false;
		this._changedDom=false;
		this._selected=false;
		this._focused=false;
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
				if(itm.familly===this.familly){
					this._model.insert(itm,this.index);
				}
			});
			this._drop=v;
		}else if(!v){
			if(this._drop)dragDrop.unregisterDrop(this._drop);
			this._drop=null;
		}
	}
	get selector(){
		return this._selector?this._selector.dom:null;
	}
	set selector(v){
		if((v instanceof HTMLElement)&&(!this._selector||v!==this._selector.dom)){
			this.selector=null;
			this._selector={dom};
			this._selector.cb=()=>{
				this.select();
			};
			this._selector.dom.addEventListener('mousedown',this._selector.cb)
		}else if(this._selector){
			this._selector.dom.removeEventListener('mousedown',this._selector.cb);
			this._selector=null;
		}
	}
	get index(){
		return this._model?this._model._list.findIndex(itm=>itm.id===this.id):-1;
	}
	get familly(){
		return this._model._conf.familly;
	}
	get selected(){return this._selected;}
	remove(){
		if(this._model){
			this._model.remove(this);
		}
	}
	setSelected(selected){
		selected=!!selected;
		if(this._selected!==selected){
			this._selected=selected;
			let type=this._selected?'select':'unselect';
			this._element.setSelected(this._selected);
			this._model._listener.flush(type,{
				type,
				itm:this
			});
		}
	}
	setFocused(focused){
		focused=!!focused;
		if(this._focused!==focused){
			this._focused=focused;
			let type=this._focused?'focus':'blur';
			this._element.setFocused(this._focused);
			this._model._listener.flush(type,{
				type,
				itm:this
			});
		}
	}
	focus(){
		if(!this._focused){
			this._model.focusIndex(this.index);
		}
	}
	select(){
		if(!this._selected){
			this._model.selectIndexes(this._model.selectedIndexes.concat([this.index]));
		}
	}
};
// old.parentNode.insertBefore(this.__element,old);
// old.parentNode.removeChild(old);

// class DomChipsItemIO{
// 	constructor(chipItem){
// 		this._priv=chipItem;
// 	}
// 	get data(){
// 		return this._priv.data;
// 	}
// 	set data(v){
// 		this._priv.data=v;
// 	}
// };
class RenderAPI{
	constructor(chipItem){
		this._priv=chipItem;
	}
	get index(){
		return this._priv.index;
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
	get selector(){return this._priv.drag;}
	set selector(v){this._priv.drag=v;}
	get selected(){return this._priv._selected;}
	focus(){
		this._priv.focus();
	}
	select(){
		this._priv.select();
	}
	//this._selected=false;
};
// class DomChipsOutIO{
// 	constructor(chipItem){
// 		this._priv=chipItem;
// 	}
// 	get data(){
// 		return this._priv.data;
// 	}
// 	set data(v){
// 		this._priv.data=v;
// 	}
// };

module.exports={DomChipsItem};
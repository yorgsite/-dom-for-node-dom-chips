
const {DomChipsConfig} = require('./DomChipsConfig.js');
const {DomChipsRenderer} = require('./DomChipsRenderer.js');
const {DomChipsItem} = require('./DomChipsItem.js');
// const {Listener}=require('@dom-for-node/tools/src/core/Listener');
const {Listener}=require('../../tools/src/core/Listener');

// console.log('Listener',Listener);


module.exports=function(_dom){
	"use strict";

	class DomChipsModelPriv{
		constructor(scope,doms){
			console.log('new DomChipsModelPriv');
			this.tagName='dom-chips';
			this.scope=scope;
			this.doms=doms;
			this._listener=new Listener();
			this._list=[];
			this._conf=new DomChipsConfig();
		}
		init(params){
			console.log('DomChipsModelPriv.init',params);
			this.params	= params;
			
			
			// evts:{
			// 	'select':[],
			// 	'add':[],
			// 	'remove':[],
			// 	'change':[],
			// 	'focus':[],
			// 	'blur':[],
			// 	'move':[]
			// }
			this._conf.init(this.params);

			this.CellRenderer	= this._conf.CellRenderer;

			let doms=this.doms;
			this.root=doms.root=this._conf.root||_dom('div');
			this.root.classList.add('dom-chips');

			this.initIO();
			return this;
		}
		initDom(){
			let doms=this.doms;
			this.root=doms.root=(this.root instanceof HTMLElement)?this.root:_dom('div');
			//this.root _dom('div',{className:"dom-chips"},[]);
		}		
		initIO(){
			console.log('initIO',this.doms.root);
			Object.defineProperty(this.doms.root,'doms',{get:()=>this.doms});			
			[	'on',
				'clear',
				'add'
			].forEach(k=>{
				this.doms.root[k]=(...args)=>this[k](...args);
			});
			Object.defineProperty(this.doms.root,'datas',{
				get:()=>this.datas,
				// set:v=>this.datas=v
			});
		}
	
		// ---------- PUBLIC --------
		get dom(){
			return this.root;
		}
		get length(){
			return this._list.length;
		}
		get datas(){
			return this._list.map(itm=>itm.data);
		}
		set datas(list){
			this.clear();
			if(list)list.map(d=>this.add(d));
		}
		on(type,callback){
			return this._listener.add(type,callback);
		}
		off(type,callback){
			return this._listener.remove(type,callback);
		}
		clear(){
			while(this._list.length)this.remove(this._list[0]);
		}
		insert(data,id=0){
			let itm,lid=-1,sameroot=0;
			if(data instanceof DomChipsItem){
				lid=data.index;
				if(this.root!==data.dom.parentNode){
					data.remove();
					data=data.data;
					itm=new DomChipsItem(this);
					itm.data=data;
				}else{
					this.moveAt(data,id);
					sameroot=1;
				}
			}else{
				itm=new DomChipsItem(this);
				itm.data=data;
			}
			id=Math.max(0,id);
			if(!sameroot){
				if(id<this._list.length){
					this._list.splice(id,0,itm);
					this.root.insertBefore(itm.dom,this.root.childNodes[id]);
				}else{
					id=this._list.length;
					this._list.push(itm);
					this.root.appendChild(itm.dom);
				}
				this._listener.flush('insert',{
					index:id,
					itm
				});
			}
			return itm;
		}
		moveAt(itm,to){
			let from=itm.index;
			to=Math.max(0,to);
			if(from!==to){
				let ti=to+(to<from?0:1);
				if(ti<this._list.length)to=this._list.length-1;
				this._list.splice(from,1);
				this.root.removeChild(itm.dom);
				if(ti<this._list.length){
					this._list.splice(ti,0,itm);
					this.root.insertBefore(itm.dom,this.root.childNodes[ti]);
				}else{
					this._list.push(itm);
					this.root.appendChild(itm.dom);
				}
				this._listener.flush('move',{
					from,
					to,
					itm
				});
			}
		}
		add(data){
			return this.insert(data,this._list.length);
		}
		remove(data){
			let id=this.getIndex(data);
			if(id>-1){
				let itm=this._list.splice(id,1)[0];
				let lid=itm.index;
				itm._model=null;
				itm.dom.parentNode.removeChild(itm.dom);
				this._listener.flush('remove',{
					id,lid,
					itm
				});
			};
			return null;
		}
		getIndex(data){
			if(data instanceof DomChipsItem)return this._list.findIndex(itm=>itm.id=data.id);
			if(typeof(data)==='number')return this._list.findIndex(itm=>itm.id=data);
			return this._list.findIndex(itm=>itm.data=data);
		}
	};
	return {DomChipsModelPriv};
};
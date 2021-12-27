module.exports=function(_dom){
	"use strict";
	if(_dom.has('dom-chips'))return;
	const {DomChipsModelPriv} = require('./src/DomChipsModelPriv.js')(_dom);
	console.log('exports dom-chips');
	/**
	Component 'dom-chips'.
	'dom-chips' is a templatable list 
	Shares model handler public attr & methods. See DomChipsModel.
	@param {object} params : configuration object as 
	<code>
	_dom('dom-chips',{
		render:AbtractCell(RenderAPI) constructor implementing AbtractCell
		[root]:HTMLElement root element to use instead of the default root element
		[familly]:string restrictive chip familly
		[multi]:boolean multiple selection
	})
	</code>
	*/
	_dom.model('dom-chips',function(tagName,params){
		let doms={};
		let handler=new DomChipsModel(this,doms,params);
		return doms.root;
		
	},{
		'.dom-chips':{

		}
	},false);

	/**
	Component 'dom-chips' model handler.

	@constructor
	*/
	class DomChipsModel{
		/**
		 * 
		 * @param {*} scope 
		 * @param {*} doms 
		 * @param {*} params 
		 */
		constructor(scope,doms,params){
			this._priv=new DomChipsModelPriv(scope,doms);
			this._priv.init(params);
		}
		/** @attr {number} readOnly data list length*/
		get length(){
			return this._priv.length;
		}
		/** @attr {any[]} set/get the data list */
		get datas(){
			return this._priv.datas;
		}
		set datas(list){
			this._priv.datas=list;
		}
		/**
		 * add dom-chips event listener
		 * @param {'insert'|'move'|'remove'|'change'|'select'|'unselect'|'focus'|'blur'} type : event type 
		 * @param {function} callback : fired on event
		 */
		on(type,callback){
			return this._priv.on(type,callback);
		}
		/**
		 * removes dom-chips event listener
		 * @param {string} type  
		 * @param {function} callback 
		 */
		off(type,callback){
			return this._priv.off(type,callback);
		}
		/**
		 * Clear the data list
		 * @returns {object[]}
		 */
		clear(){
			return this._priv.clear();
		}
		/**
		 * adds an element
		 * @param {*} data 
		 * @returns 
		 */
		add(data){
			return this._priv.add(data);
		}
		/**
		 * removes an element
		 * @param {*} data 
		 * @returns 
		 */
		remove(data){
			return this._priv.remove(data);
		}

	};

	/**
	'dom-chips' render API.
	Passed as first argument when instaciating params.render

	@constructor
	*/
	class RenderAPI{
		constructor(){}
		/** @attr {HTMLElement} readOnly the dom-chip element see DomChipsModel*/
		get root(){}
		/** @attr {object} the object holding the data */
		get data(){}
		set data(v){}
		/** @attr {HTMLElement||null} set/unset drop target */
		get drop(){}
		set drop(v){}
		/** @attr {object} set/unset drag source */
		get drag(){}
		set drag(v){}
	};

	/**
	'dom-chips' cell renderer model.
	The params.render attribute must follow this constructor pattern when calling _dom('dom-chips',params,root);.
	@param {RenderAPI} renderAPI 
	@constructor
	*/
	class AbtractCell{
		constructor(renderAPI){}
		/**
		 * returns the cell dom element
		 * @returns {HTMLElement} the cell dom element
		*/
		getDom(){}
		/**
		 * sets the data
		 * @param {*} data 
		*/
		fromData(data){}
		/**
		 * returns the cell data
		 * @returns {*} the cell data
		*/
		toData(){}
		/**
		 * [optional] checks data validity
		 * @param {*} data 
		*/
		getErrors(data){}
		/**
		 * [optional] handle cell selection state
		 * @param {boolean} selected 
		*/
		setSelected(selected){}
		/**
		 * [optional] handle cell focus state
		 * @param {boolean} selected
		*/
		setFocused(focused){}
	}
};
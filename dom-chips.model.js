module.exports=function(_dom){
	"use strict";
	if(_dom.has('dom-chips'))return;
	const {DomChipsModelPriv} = require('./src/DomChipsModelPriv.js')(_dom);
	console.log('exports dom-chips');
	/**
	Component 'dom-chips'.
	Shares model handler public attr & methods. See DomChipsModel.
	@param {object} params : configuration object as 
	<code>
	_dom('dom-chips',{
		render:AbtractCell(RenderAPI) constructor implementing AbtractCell
		[root]:HTMLElement root element to use instead of the default root element
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
			console.log('- new DomChipsModel');
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
		 * @param {'insert'|'move'|'remove'|'change'} type : event type
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
	Passed as first argument when calling the CellRenderer.

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
	@constructor
	*/
	class AbtractCell{
		constructor(){}
		/**
		 * sets the data
		 * @param {*} data 
		 */
		fromData(data){}
		/**
		 * @returns {*} the cell data
		 */
		toData(){}
		/**
		 * @returns {HTMLElement} the cell visual element
		*/
		getDom(){}
		/**
		 * [optional] checks data validity
		 * @param {*} data 
		 */
		getErrors(data){}
	}
};
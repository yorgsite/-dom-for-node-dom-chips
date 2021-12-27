# dom-chips
 
Component 'dom-chips'.
	'dom-chips' is a templatable list 
	Shares model handler public attr & methods. See DomChipsModel.
 
<hr/>
 
## <a name='main_menu'></a> Menu
+ [dom-chips](#dom-chips)
+ [DomChipsModel](#DomChipsModel)
	+ [domChipsModel.constructor( **scope** , **doms** , **params** )](#constructor)
	+ [domChipsModel.length](#length)
	+ [domChipsModel.datas](#datas)
	+ [domChipsModel.on( **type** , **callback** )](#on)
	+ [domChipsModel.off( **type** , **callback** )](#off)
	+ [domChipsModel.clear()](#clear)
	+ [domChipsModel.add( **data** )](#add)
	+ [domChipsModel.remove( **data** )](#remove)
+ [RenderAPI](#RenderAPI)
	+ [renderAPI.root](#root)
	+ [renderAPI.data](#data)
	+ [renderAPI.drop](#drop)
	+ [renderAPI.drag](#drag)
+ [AbtractCell](#AbtractCell)
	+ [abtractCell.getDom()](#getDom)
	+ [abtractCell.fromData( **data** )](#fromData)
	+ [abtractCell.toData()](#toData)
	+ [abtractCell.getErrors( **data** )](#getErrors)
	+ [abtractCell.setSelected( **selected** )](#setSelected)
	+ [abtractCell.setFocused( **selected** )](#setFocused)
 
<hr/>
 
<hr/>
 
## <a name="dom-chips"></a> model **dom-chips**
 
Component 'dom-chips'.
	'dom-chips' is a templatable list 
	Shares model handler public attr & methods. See DomChipsModel.
 
**use** : _dom( **'dom-chips'** , **params** )
 
 + **param** : params `object`

configuration object as 
	```javascript


	_dom('dom-chips',{
		render:AbtractCell(RenderAPI) constructor implementing AbtractCell
		[root]:HTMLElement root element to use instead of the default root element
		[familly]:string restrictive chip familly
	})
	

	```
 
 
 
[▲](#main_menu)
<hr/>
 
<hr/>
 
## <a name="DomChipsModel"></a> class **DomChipsModel**
 
Component 'dom-chips' model handler.
 
**use** : new DomChipsModel()
 
<hr/>
 


+ ### <a name="constructor"></a> method **constructor**



&emsp;&emsp; **use** : domChipsModel.constructor( **scope** , **doms** , **params** )

&emsp;&emsp; &emsp; + **param** : scope `*`

*

&emsp;&emsp; &emsp; + **param** : doms `*`

*

&emsp;&emsp; &emsp; + **param** : params `*`
<hr/>
 


+ ### <a name="length"></a> attr **length**

&emsp;&emsp; **readOnly**


&emsp;&emsp; data list length

&emsp;&emsp; **use** : domChipsModel.length `number`
<hr/>
 


+ ### <a name="datas"></a> attr **datas**

&emsp;&emsp; set/get the data list

&emsp;&emsp; **use** : domChipsModel.datas `any[]`
<hr/>
 


+ ### <a name="on"></a> method **on**

&emsp;&emsp; add dom-chips event listener

&emsp;&emsp; **use** : domChipsModel.on( **type** , **callback** )

&emsp;&emsp; &emsp; + **param** : type `'insert'|'move'|'remove'|'change'`

event type 
		 *

&emsp;&emsp; &emsp; + **param** : callback `function`

fired on event
<hr/>
 


+ ### <a name="off"></a> method **off**

&emsp;&emsp; removes dom-chips event listener

&emsp;&emsp; **use** : domChipsModel.off( **type** , **callback** )

&emsp;&emsp; &emsp; + **param** : type `string`

*

&emsp;&emsp; &emsp; + **param** : callback `function`
<hr/>
 


+ ### <a name="clear"></a> method **clear**

&emsp;&emsp; Clear the data list

&emsp;&emsp; **use** : domChipsModel.clear()
<hr/>
 


+ ### <a name="add"></a> method **add**

&emsp;&emsp; adds an element

&emsp;&emsp; **use** : domChipsModel.add( **data** )

&emsp;&emsp; &emsp; + **param** : data `*`

*
<hr/>
 


+ ### <a name="remove"></a> method **remove**

&emsp;&emsp; removes an element

&emsp;&emsp; **use** : domChipsModel.remove( **data** )

&emsp;&emsp; &emsp; + **param** : data `*`

*
 
[▲](#main_menu)
<hr/>
 
<hr/>
 
## <a name="RenderAPI"></a> class **RenderAPI**
 
'dom-chips' render API.
	Passed as first argument when calling the CellRenderer.
 
**use** : new RenderAPI()
 
<hr/>
 


+ ### <a name="root"></a> attr **root**

&emsp;&emsp; **readOnly**


&emsp;&emsp; the dom-chip element see DomChipsModel

&emsp;&emsp; **use** : renderAPI.root `HTMLElement`
<hr/>
 


+ ### <a name="data"></a> attr **data**

&emsp;&emsp; the object holding the data

&emsp;&emsp; **use** : renderAPI.data `object`
<hr/>
 


+ ### <a name="drop"></a> attr **drop**

&emsp;&emsp; set/unset drop target

&emsp;&emsp; **use** : renderAPI.drop `HTMLElement||null`
<hr/>
 


+ ### <a name="drag"></a> attr **drag**

&emsp;&emsp; set/unset drag source

&emsp;&emsp; **use** : renderAPI.drag `object`
 
[▲](#main_menu)
<hr/>
 
<hr/>
 
## <a name="AbtractCell"></a> class **AbtractCell**
 
'dom-chips' cell renderer model.
	The params.render attribute must follow this constructor pattern when calling _dom('dom-chips',params,root);.
 
**use** : new AbtractCell()
 
<hr/>
 


+ ### <a name="getDom"></a> method **getDom**

&emsp;&emsp; returns the cell dom element

&emsp;&emsp; **use** : abtractCell.getDom()
<hr/>
 


+ ### <a name="fromData"></a> method **fromData**

&emsp;&emsp; sets the data

&emsp;&emsp; **use** : abtractCell.fromData( **data** )

&emsp;&emsp; &emsp; + **param** : data `*`
<hr/>
 


+ ### <a name="toData"></a> method **toData**

&emsp;&emsp; returns the cell data

&emsp;&emsp; **use** : abtractCell.toData()
<hr/>
 


+ ### <a name="getErrors"></a> method **getErrors**

&emsp;&emsp; [optional] checks data validity

&emsp;&emsp; **use** : abtractCell.getErrors( **data** )

&emsp;&emsp; &emsp; + **param** : data `*`
<hr/>
 


+ ### <a name="setSelected"></a> method **setSelected**

&emsp;&emsp; [optional] handle cell selection state

&emsp;&emsp; **use** : abtractCell.setSelected( **selected** )

&emsp;&emsp; &emsp; + **param** : selected `boolean`
<hr/>
 


+ ### <a name="setFocused"></a> method **setFocused**

&emsp;&emsp; [optional] handle cell focus state

&emsp;&emsp; **use** : abtractCell.setFocused( **selected** )

&emsp;&emsp; &emsp; + **param** : selected `boolean`
 
[▲](#main_menu)
<hr/>
 
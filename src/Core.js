
class Core{
	constructor(){
	}
	static errMsg(errLines,psp=1){
		let lines=[
			'',
			'_dom("dom-chips",params) Error :'
		].concat(
			(errLines instanceof Array?errLines:[errLines])
			.map(l=>' '.repeat(psp)+l)
		);
		return lines.join('\n');
	}
	static errPrefix(sample,sampleName='value'){
		console.error('------- dom-chips'+(sufx?'.'+sufx:'')+' Error -------');
		console.log(sampleName+'=',sample);
	}
	static _throw(errLines,sample=null,sampleName='value',psp=1){
		if(arguments.length>2){
			this.errPrefix(sample,sampleName||'value');
		}
		throw(this.errMsg(errLines,psp));
	}
	static implementMiss(klass,required){
		let keys=Object.getOwnPropertyNames(klass.prototype);
		return required.filter(rk=>!keys.includes(rk));
	}
};
module.exports={Core};
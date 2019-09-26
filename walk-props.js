"use module"

import Prototypes from "./prototypes.js"

export function walkDescriptors( o, opts){
	this.protoIter= new Prototypes( o, { ...opts, includeObject: true})[ Symbol.iterator]()
	this.currentProto= {
		done: true
	}
	this.properties= opts&& opts.properties!== undefined? !!opts.properties: true
	this.symbols= opts&& opts.symbols!== undefined? !!opts.symbols: false
}
export default walkDescriptors

walkDescriptors.prototype.next= function(){
	while( this.currentProto.done){
		this.currentProto= this.protoIter.next()
		if( this.currentProto.done){
			return {
				done: true,
				value: undefined
			}
		}
	}
	const proto= this.currentProto.value
	if( this.properties){
		for( let name in Object.getOwnPropertyNames( proto)){
			const desc= Object.getOwnPropertyDescriptor( proto, name)
			desc.name= name
			desc.proto= proto
			return desc
		}
	}
	if( this.symbols){
		for( let symbol in Object.getOwnPropertySymbols( proto)){
			const desc= Object.getOwnPropertyDescriptor( proto, symbol)
			desc.symbol= symbol
			desc.proto= proto
			return desc
		}
	}
}

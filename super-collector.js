"use module"

export function *SuperCollector( self, prop){
	// recursively iterate all parents first
	const proto= Object.getPrototypeOf( self)
	if( proto!== Object.prototype){
		yield* SuperCollector( proto, prop)
	}

	// guard: only yield our own properties
	if( !Object.getOwnPropertyDescriptor( self, prop)){
		return
	}

	// yield values
	const values= self[ prop]
	if( values=== undefined){
		return
	}else if( Object.getPrototypeOf( values)=== String){
		yield values
	}else if( values[ Symbol.iterator]){
		yield *values
	}else{
		yield values
	}
}

export function *StaticSuperCollector( self, prop){
	const proto= Object.getPrototypeOf( self)
	if( proto!== Object.prototype){
		yield* StaticSuperCollector( proto, prop)
	}

	if( !Object.getOwnPropertyDescriptor( self.constructor, prop)){
		return
	}
	if( self.constructor=== proto.constructor){
		return
	}

	const values= self.constructor[ prop]
	if( values=== undefined){
		return
	}else if( Object.getPrototypeOf( values)=== String){
		yield values
	}else if( values[ Symbol.iterator]){
		yield *values
	}else{
		yield values
	}
}

export {
	SuperCollector as default,
	SuperCollector as superCollector,
	StaticSuperCollector as staticSuperCollector
}

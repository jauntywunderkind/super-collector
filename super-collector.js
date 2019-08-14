"use module"

export function *SuperCollector( self, prop){
	// recursively iterate all parents first
	const proto= Object.getPrototypeOf( self)
	if( proto!== Object.prototype){
		yield* SuperCollector( proto, prop)
	}

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
	// recursively iterate all parents first
	const proto= Object.getPrototypeOf( self)
	if( proto!== Function.prototype){
		yield* StaticSuperCollector( proto, prop)
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

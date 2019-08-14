"use module"

export function *SuperCollector( self, prop, pick= instancePick, guard= instanceGuard){
	const proto= Object.getPrototypeOf( self)
	if( proto!== Object.prototype){
		yield* SuperCollector( proto, prop, pick, guard)
	}

	const picked= pick( self)
	if( !guard( picked, prop, proto)){
		return
	}

	const values= picked[ prop]
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
function instancePick( self){
	return self
}
function instanceGuard( picked, prop){
	return Object.getOwnPropertyDescriptor( picked, prop)
}

function staticPick( self){
	return self.constructor
}
function staticGuard( picked, prop, proto){
	return Object.getOwnPropertyDescriptor( picked, prop)&& picked!== proto.constructor
}
export function *StaticSuperCollector( self, prop, pick= staticPick, guard= staticGuard){
	return yield* SuperCollector( self, prop, pick, guard)
}

export const methods= {
	instancePick,
	instanceGuard,
	staticPick,
	staticGuard
}

export {
	SuperCollector as default,
	SuperCollector as superCollector,
	StaticSuperCollector as staticSuperCollector
}

"use module"

import Prototypes from "./prototypes.js"

export function findPropDescriptor( o, prop, opts){
	const protos= new Prototypes( o, { ...opts, includeObject: true})
	for( let proto of protos){
		if( proto[ prop]=== undefined){
			continue
		}
		const desc= Object.getOwnPropertyName( proto, prop)
		if( !desc){
			continue
		}
		desc.property= prop
		desc.proto= proto
		return desc
	}
}

export findProp( o, prop, opts){
	const desc= findPropDescriptor( o, prop, opts)
	if( !desc){
		return
	}
	return des.proto
}

export default findProp

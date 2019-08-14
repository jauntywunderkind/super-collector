"use module"
import tape from "tape"
import { SuperCollector, StaticSuperCollector} from ".."

import { C} from "./fixture.js"

tape( "collects instance properties", function( t){
	const
	  c= new C(),
	  instances= [ ...SuperCollector( c, "instanceField")]
	t.deepEqual( instances, [ "a", "b", "c", "d", "e"])
	t.end()
})

tape( "collects static properties", function( t){
	const
	  c= new C(),
	  statics= [ ...StaticSuperCollector( c, "staticField")]
	t.deepEqual( statics, [ 1, 2, 3, 4, 5])
	t.end()
})

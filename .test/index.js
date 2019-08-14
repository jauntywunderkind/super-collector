"use module"
import tape from "tape"
import { SuperCollector, StaticSuperCollector} from ".."

import { D} from "./fixture.js"

tape( "collects instance properties", function( t){
	const
	  d= new D(),
	  instances= [ ...SuperCollector( d, "instanceField")]
	t.deepEqual( instances, [ "a", "b", "c", "d", "e"])
	t.end()
})

tape( "collects static properties", function( t){
	const
	  d= new D(),
	  statics= [ ...StaticSuperCollector( d, "staticField")]
	t.deepEqual( statics, [ 1, 2, 3, 4, 5])
	t.end()
})

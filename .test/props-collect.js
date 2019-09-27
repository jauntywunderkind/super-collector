"use module"
import tape from "tape"
import { SuperCollector, StaticSuperCollector} from "../props-collect.js"

import { D} from "./fixture.js"

tape( "collects instance properties", function( t){
	const
	  d= new D(),
	  instanceFields= [ ...SuperCollector( d, "instanceField")]
	t.deepEqual( instanceFields, [ "a", "b", "c", "d", "e"])
	t.end()
})

tape( "collects static properties", function( t){
	const
	  d= new D(),
	  staticFields= [ ...StaticSuperCollector( d, "staticField")]
	t.deepEqual( staticFields, [ 1, 2, 3, 4, 5])
	t.end()
})

tape( "collects constructor properties", function( t){
	const staticFields= [ ...SuperCollector( D, "staticField")]
	t.deepEqual( staticFields, [ 1, 2, 3, 4, 5])
	t.end()
})

tape( "collects static bool property", function( t){
	const bools= [ ...SuperCollector( D, "bool")]
	t.deepEqual( bools, [ false, true ])
	t.end()
})

tape( "returns nothing when there is nothing to find", function( t){
	const
	  d= new D(),
	  nullSet= [ ...SuperCollector( D, "nopeNothing")]
	t.deepEqual( nullSet, [])
	t.end()

})

"use module"
import tape from "tape"
import prototypes from "../prototypes.js"
import { A, B, C, D} from "./fixture.js"

tape( "can iterate through prototypes", function( t){
	const
	  expect= [ D, C, B, A],
	  o= new D()
	for( const proto of new prototypes( o)){
		t.equal( proto.constructor, expect.shift(), "got prototype")
	}
	t.equal( expect.length, 0, "all prototypes seen")
	t.end()
})

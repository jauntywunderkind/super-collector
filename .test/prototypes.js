"use module"
import tape from "tape"
import prototypes from "../prototypes.js"
import { A, B, C, D} from "./fixture.js"

tape( "can iterate through prototypes", function( t){
	//t.plan( 5)
	t.plan( 5)
	const
	  expect= [ D.prototype, C.prototype, B.prototype, A.prototype],
	  o= new D()
	for( const proto of new prototypes( o)){
		t.equal( proto, expect.shift(), "got prototype")
	}
	t.equal( expect.length, 0, "all prototypes seen")
	t.end()
})

tape( "can iterate through prototypes and original object", function( t){
	t.plan( 6)
	const
	  o= new D(),
	  expect= [ o, D.prototype, C.prototype, B.prototype, A.prototype]
	for( const proto of new prototypes( o, { includeObject: true})){
		t.equal( proto, expect.shift(), "got prototype")
	}
	t.equal( expect.length, 0, "all prototypes seen")
	t.end()
})

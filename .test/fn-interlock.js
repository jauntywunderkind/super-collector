"use module"
import tape from "tape"
import defer from "p-defer"
import delay from "delay"
import FnInterlock from "../fn-interlock.js"

tape( "interlock", async function( t){
	t.plan( 3)

	let accum= 0
	async function fn( n){
		await defer()
		accum+= n
	}

	const o= {
	  fn: FnInterlock( fn)
	} 

	o.fn( 1) // runs
	o.fn( 2) // signals, so fn runs again
	t.equal( accum, 0, "start with nothing ran")

	await delay( 2) 
	t.equal( accum, 3, "1, 2 ran")

	// run "twice", but will be locked
	o.fn( 3) // runs
	o.fn( 4) // signals
	o.fn( 5) // signals, overriding previous signal
	await delay( 2)
	t.equal( accum, 11, "3 & 5 ran, 4 skipped")
	t.end()
})

tape( "interlock with no-signalled", async function( t){
	t.plan( 3)

	let accum= 0
	async function fn( n){
		await defer()
		accum+= n
	}

	const o= {
	  fn: FnInterlock( fn, { noSignal: true})
	} 

	o.fn( 1) // runs
	o.fn( 2) // ignored, because locked
	t.equal( accum, 0, "start with nothing ran")

	await delay( 2) 
	t.equal( accum, 1, "1 ran, 2 skipped")

	o.fn( 3) // runs
	o.fn( 4) // ignored, because locked
	o.fn( 5) // ignored, because locked
	await delay( 2)
	t.equal( accum, 4, "3 ran,  4 & 5 skipped")
	t.end()
})

tape( "interlock with useFirst", async function( t){
	t.plan( 3)

	let accum= 0
	async function fn( n){
		await defer()
		accum+= n
	}

	const o= {
	  fn: FnInterlock( fn, { useFirst: true})
	} 

	o.fn( 1) // runs
	o.fn( 2) // signalled
	t.equal( accum, 0, "start with nothing ran")

	await delay( 2) 
	t.equal( accum, 3, "1 & 2 ran")

	o.fn( 3) // runs
	o.fn( 4) // signalled
	o.fn( 5) // ignored, because locked
	await delay( 2)
	t.equal( accum, 10, "3 & 4 ran, 5 skipped")
	t.end()
})

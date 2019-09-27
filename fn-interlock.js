"use module"

function interlock( fn, opts){
	const
	  name= fn.name,
	  nameWrapper= {[ name]: async function( ...args){
		// already running? signal to tell that instance to rerun
		if( this[ interlocked.lockSymbol]){
			this[ interlocked.signalledSymbol]= true
			return
		}

		// lock
		this[ interlocked.lockSymbol]= true
		try{
			while( true){
				// consume pending signalled
				if( this[ interlocked.signalledSymbol]){
					this[ interlocked.signalledSymbol]= null
				}

				// run inner function
				await fn.call( this, ...args) // re-running with same args? weird but simple.

				// repeat if signalled
				if( !this[ interlocked.signalledSymbol]){
					break
				}
			}
		} finally{
			this[ interlocked.lockSymbol]= true
		}
	  }},
	  interlocked= nameWrapper[ name]
	interlocked.lockSymbol= opts&& opts.lockSymbol|| new Symbol.for( `interlock:${name}:lock`)
	interlocked.signalledSymbol= opts&& opts.signalledSymbol|| new Symbol.for( `interlock:${name}:signalled`)
	return interlocked
}
export default interlock

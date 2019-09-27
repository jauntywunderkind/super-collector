"use module"

function interlock( fn, opts){
	const
	  name= fn.name,
	  nameWrapper= {[ name]: async function( ...args){
		const self= interlocked.state|| this

		// already running? signal to tell that instance to rerun
		if( self[ interlocked.lockSymbol]){
			// no signal mode, & locked: quit
			if( !interlocked.signalledSymbol){
				return
			}

			// useFirst preserves first signal value
			if( interlocked.useFirst){
				const oldSignal= self[ interlocked.signalledSymbol]
				if( oldSignal){
					return
				}
			}

			// assert latest - normal mode
			self[ interlocked.signalledSymbol]= args
			return
		}

		// lock
		self[ interlocked.lockSymbol]= true // would be cool to use self to relay along a terminating promise
		try{
			while( true){
				// consume pending signalled
				if( interlocked.signalledSymbol&& self[ interlocked.signalledSymbol]){
					self[ interlocked.signalledSymbol]= null
				}

				// run inner function
				await fn.call( self, ...args)

				// repeat if signalled
				const signalled= interlocked.signalledSymbol&& self[ interlocked.signalledSymbol]
				if( signalled){
					args= signalled
				}else{
					break
				}
			}
		} finally{
			self[ interlocked.lockSymbol]= false
		}
	  }},
	  interlocked= nameWrapper[ name]
	interlocked.lockSymbol= opts&& opts.lockSymbol|| Symbol.for( `interlock:${name}:lock`)
	interlocked.signalledSymbol= opts&& opts.signalledSymbol!== undefined? opts.signalledSymbol: Symbol.for( `interlock:${name}:signalled`)
	if( opts){
		if( opts.noSignal){
			delete interlocked.signalledSymbol
		}
		if( opts.useFirst){
			interlocked.useFirst= true
		}
	}
	return interlocked
}
export default interlock

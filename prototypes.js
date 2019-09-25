"use module"

export function PrototypeIterator( start, opts){

	// this is something we hope to make generic, but the impl of the generic
	// will depend on this, so we have to DIY
	if( opts){
		if( opts.advance){
			this.advance= opts.advance
		}
		if( opts.doneCheck){
			this.doneCheck= opts.doneCheck
		}
		if( opts.terminators){
			this.terminators= opts.terminators
		}
	}
	this.value= start

	// is this too complicated yet? (yes)
	if( opts&& opts.start!== undefined){
		this.value= opts.start? opts.start( start): start
	}else if( opts&& opts.includeObject){
		this.value= start
	}else{
		this.value= this.advance( start)
	}

	//this.done= this.doneCheck()
	this.done= !this.value
}

PrototypeIterator.prototype.next= function(){
	// get old value
	const
	  value= this.value,
	  done= this.done
	// advance, check if done
	this.value= this.advance()
	this.done= this.doneCheck()
	return {
		value,
		done
	}
}
PrototypeIterator.prototype[ Symbol.iterator]= function(){
	return this
}
PrototypeIterator.prototype.advance= function(){
	return Object.getPrototypeOf( this.value)
}
Object.defineProperty( PrototypeIterator.prototype, "terminators", {
	value: [ Object.prototype],
	configurable: true,
	writable: true
})
PrototypeIterator.prototype.doneCheck= function(){
	return this.terminators.indexOf( this.value)!== -1
}

export default PrototypeIterator

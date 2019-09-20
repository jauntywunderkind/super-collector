"use module"

import processizedGenerator from "processification/generator.js"

function next(){
	this.value= Object.getPrototypeOf( this.self)
	this.done= this.value=== Object.prototype
	return {
		value: this.value,
		done: this.done
	}
}

export function prototypes( self){
	const context= {
		value: self,
		done: false,
		next(){
			this.value= Object.getPrototypeOf( this.self)
			this.done= context.value=== Object.prototype)
			return this
		}
	}
}
export default prototypes

"use module"

export class A{
	static get staticField(){
		return [ 1, 2]
	}
	get instanceField(){
		return [ "a", "b"]
	}
	static bool= false
}

export class B extends A{
	static get staticField(){
		return 3
	}
	get instanceField(){
		return "c"
	}
}

export class C extends B{
	static bool= true
}

export class D extends C{
	static get staticField(){
		return [ 4, 5]
	}
	get instanceField(){
		return [ "d", "e"]
	}
}

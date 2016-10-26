console.log ('javascript is connected');
function sayName (name) {
	// console.log ('hello my name is '+ name)
	return 'hello my name is ' +name

};

function minimum (a,b){
	// 3 cases
	// a is equal to b
	if (a == b) {
		return a 
	} else if ( a < b ) {
		return a 
	} else {
		return b
	}
	// a is less than b
	// a is grater than b


}
var introduction = sayName ('adrian')

// for loop: logs the numbers 0 to 10 
for (var i = 0; i<=10;  i++ ) {
	// console.log(i)
}

var myArray = ['this', 'is', 'array' ]
for (var i=0; i < myArray.length; i++ ) {
	var el = myArray[i]
	// console.log(el);
}

var number = 0;
while ( number < 10) {
	// console.log (number);
	number++; 
}

// function: inputs an array of numbers, return the minimum
function minimumList (numArray) {
// introduce variable minimum so far
	var minSoFar = numArray[0]
// go through the list
	for (var i = 0; i < myArray.length; i++) {
		var currentNum = numArray [i]
	// compare each element
		if (currentNum < minSoFar) {
			minSoFar = currentNum;
	
		}
		

	};

	return minSoFar

// return the minimum
}

var numbersList = [3, 1, 6, 4, 14, 3]





//Primatives: numbers, strings, booleans
// (undefined, null, not a number (NAN))

// everything else is an object (arrays, hashest, etc)


	





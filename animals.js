var Animal = function(animalSound) {
 this.sound = animalSound;
};

Animal.prototype.sayHello = function() {
  console.log(this.sound);
};

var cow = new Animal('moo');
var dog = new Animal('woof');
var cat = new Animal('meow');

/*
*
* 'moo' is logged to the console as expected because 'this' is evaluated right when sayHello gets invoked.
* The interpreter then looks to the left of the dot and see's the cow object and assigns it to the 'this' keyword
* Then it knows that when it reads line 6 of the sayHello function body, 'this' refers to cow, hence this.sound = 'moo'
*
*/
cow.sayHello();

/*
*
* Call #1
* In this setTimeout call, we are invoking sayHello() before the interpreter has even finished reading the parameters to setTimeout.
* Therefore, cat.sayHello() gets called before setTimeout is even called. So 'meow' is logged right away.
* The call to cat.sayHello() returns undefined and so this call to setTimeout waits 3 seconds to invoke an undefined function
*
*/
setTimeout(cat.sayHello(), 3000);

/*
* Call #2
*
* This call console logs undefined after 3 seconds.
* This is because passing in cat.sayHello is the same as passing in an anonymous function that looks like this:
* function() {
*    console.log(this.sound);
* }
* Because it hasn't been invoked yet, the 'this' keyword has not been evaluated.
* This anonymous function is put on the call stack after 3 seconds and when it is time to call it (as free function invocation),
* the interpreter reads the function body and evaluated 'this' to be the global object ('window in browsers')
*
*/
setTimeout(cat.sayHello, 3000);

/*
* Call #3
*
* This is the exact same result is Call #1. The call method does bind "this" to its first argument, however in this case,
* passing in 'cat' as its context is redundant. Also call, invokes the function is is being called on right away which
* is why 'meow' will get logged to the console before 3 seconds is passed.
*
*/
setTimeout(cat.sayHello.call(cat), 3000);

/*
* Call #4
*
* In this call, nothing will get be logged to the console because bind returns a new function that is bound to the context
* that is passed in as its first argument. It does not actually invoke the function that it is being called on.
*
*/
setTimeout(function() {
  cat.sayHello.bind(cat);
}, 3000);

/*
* Call #5
*
* This call will console log 'meow' after 3 seconds as intended.
* Because we are wrapping the invocation of cat.sayHello in an anonymous function, the entire anonymous function gets put
* on the call stack to be called and treated as a free function invocation.
* While the 'this' keyword for the anonymous function is evaluated to be the global object, cat.sayHello is also put on
* call stack and when it is being called, the interpreter sees it as method invocation so it knows to bind "this" to
* cat (the object to the left of the '.')
*
*/
setTimeout(function() {
  cat.sayHello();
}, 3000);

/*
* Call #6
*
* This call also logs meow to the console after 3 seconds as intended.
* This is because bind returns a new function (and does not invoked it) with the context bound to whatever object is passed in
* as its first argument.
*
*/
setTimeout(cat.sayHello.bind(cat), 3000);
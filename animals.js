var Animal = function(animalSound) {
 this.sound = animalSound;
};

Animal.prototype.sayHello = function() {
  console.log(this.sound);
};

var cow = new Animal('moo');
var dog = new Animal('woof');
var cat = new Animal('meow');

cow.sayHello();

// Which of the following function calls behave like you would expect?
setTimeout(cat.sayHello(), 3000);
  // I would expect the console to log 'meow' immediately, because when we are passing cat.sayHello() into setTimeout, we are not passing in a function reference, but we are invoking the function immedieatley. In 3 seconds the setTimeout will try and invoke the given callback, but the given callback is undefined. Therfore nothing will be returned.

setTimeout(cat.sayHello, 3000);
  // this time we are passing a function reference into setTimeout, so after 3 seconds the functino will be invoked. When it is invoked this is bound to the global object therfore it will console.log undefined
  // what is really happening looks like this for clarification
    // setTimeout(function() {
    //   console.log(this.sound);
    // }, 3000);

setTimeout(cat.sayHello.call(cat), 3000);
  // we are again invoking the callback in setTimeout therefore nothing will be console logged after three seconds. The function passed into setTimeout will be invoked right away and the this variable will be bound to the cat object therfore it will console.log 'meow'

setTimeout(function() {
  cat.sayHello.bind(cat);
}, 3000);
  // we are passing an anonymous function into setTimeout therefore it will not be invoked immediatley, and instead will be invoked after 3 seconds. When it is ran, it won't do anything, because we don't actually invoke anything inside the function, rather we only bind the this variable cat to cat.SayHello()

setTimeout(function() {
  cat.sayHello();
}, 3000);
  // we are again passing an anonymous function into setTimeout, therfore it will not be immediatley invoked. When it is invoked in three seconds it will run cat.sayHello and the this variable will be bound to the object left of the dot. Therefore when console.log(this.sound) is ran, it will console log 'meow'

setTimeout(cat.sayHello.bind(cat), 3000);
  // we are passing a function that is not being invoked into setTimeout therefore it will be scheduled to run in three seconds. when it is ran, the this variable is bound to 'cat' because of .bind, therefore it will console.log 'meow'

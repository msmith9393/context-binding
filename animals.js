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
setTimeout(cat.sayHello, 3000);
setTimeout(cat.sayHello.call(cat), 3000);
setTimeout(function() {
  cat.sayHello.bind(cat);
}, 3000);
setTimeout(function() {
  cat.sayHello();
}, 3000);
setTimeout(cat.sayHello.bind(cat), 3000);
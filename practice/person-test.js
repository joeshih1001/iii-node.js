const obj = require('./person');
const {Person, f3} = require('./person')

const p2 = new obj.Person('Miles',31);
const p3 = new Person('Peter', 24);


console.log(p2);
console.log(p3);
console.log(f3(3));
console.log(obj.Person === Person)
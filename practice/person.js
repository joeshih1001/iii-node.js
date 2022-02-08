class Person {
    constructor(name = 'noname', age = '0') {
        this.name = name;
        this.age = age;
    }

    toJSON(){
        return{
            name: this.name,
            age: this.age,
        };  
    }

    sayHi() {
        return `'Hello'${this.name}`;
    }
}

const f3 = a => a*a*a;

module.exports = {Person, f3};

const p1 = new Person('Miles', '31');

console.log(p1.sayHi());
console.log(JSON.stringify(p1));

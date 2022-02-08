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

export {f3};

export default Person;


import Person, {f3} from "./person.mjs";
//引入多個方法 ,若非export default ,需要加上{}

const p4 = new Person('Miles',31);


console.log(f3(10));
console.log(p4);

//當package.json 內有type : module ,專案將變成mjs , 需要使用ES6的export import 屬性引入

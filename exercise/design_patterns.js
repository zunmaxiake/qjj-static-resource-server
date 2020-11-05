//工程模式 缺点区分不出对象类型
// var createPerson = function(name,age,job){
//   var o = new Object();
//   o.name = name;
//   o.age=age;
//   o.job=job;
//   o.sayName = function(){
//     return this.name;
//   }
//   return o;
// }

// var person1=createPerson("宇文成都",29,"大将");
// var person2=createPerson("曹操",40,"丞相");
// console.log("person1.sayName():",person1.sayName());
// console.log("person2.sayName():",person2.sayName());
// console.log("person1.constructor:",person1.constructor===Object)

//构造函数模式  缺点每实例化一个对象都需要生命创建一个function，导致sayName不相等
//person1.sayName()===person2.sayName()是false
// var Person = function(name,age,job){ //5430
//   this.name=name;
//   this.age=age;
//   this.job=job;
//   // this.sayName=function(){   //不同地作用域链和标识符
//   //   alert(this.name)
//   // }
//   // this.sayName = new Function("alert("+this.name+")")
//   this.sayName=sayName;
// }
// var sayName = function() {
//   alert(this.name)
// }

// var person1 = new Person("宇文成都",29,"大将");
// var person2 = new Person("曹操",40,"丞相");
// console.log("person1.sayName():",person1.sayName());
// console.log("person2.sayName():",person2.sayName());
// console.log("person1.constructor:",person1.constructor===Person);
// Person("宇文成都1",29,"大将")
// console.log("sayName():",global.sayName())
// var o = new Object();
// Person.call(o,"曹植",29,"司马");
// console.log("o.sayName():",o.sayName())
//原型模式
// function Person() {
//   // this.name= "Nicolas1";
//   // this.sayName= function () {
//   //   return this.name;
//   // }
// }
// Person.prototype.name = "Nicolas";
// Person.prototype.age = 12;
// Person.prototype.sayName = function () {
//   return this.name;
// }


// var person1 = new Person();
// var person2 = new Person();
// console.log("person1.sayName():", person1.sayName())
// console.log("person1.sayName===person2.sayName:", person1.sayName === person2.sayName)
// console.log("Person.prototype.constructor===Person:", Person.prototype.constructor === Person)
// console.log("Person.prototype.isPrototypeOf(person1):",Person.prototype.isPrototypeOf(person1))
// var person = new Person();
// Person.prototype = {
//   constructor:Person,
//   name: "Nicolas",
//   age: 12,
//   sayName: function () {
//     return this.name;
//   }
// }
// var Person = function (name, age, job) {
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.friends = ["Nicolas","matin"]
// }
// Person.prototype = {
//   constructor: Person,
//   sayName: function () {
//     return this.name;
//   }
// }
// var person1=new Person();
// var person2=new Person();
// person1.friends.push("wudi");
// console.log("person1.friends:",person1.friends)
// console.log("person2.friends:",person2.friends)

// var Person = function (name, age, job) {
//   this.name = name;
//   this.age = age;
//   if (typeof this.sayName != "function") {
//     Person.prototype.sayName = function () {
//       return this.name;
//     }
//   }
// }
// var person1 = new Person("Nicolas", 23)
// var person2 = new Person("wudi", 23)
// console.log("person1.sayName():", person1.sayName())
// console.log("person2.sayName():", person2.sayName())
// console.log("person1.sayName===person2.sayName:",person1.sayName===person2.sayName)
// function SuperType() {
//   this.property = true
// }
// SuperType.prototype.getSuperValue = function () {
//   return this.property;
// }
// function SubType() {
//   this.subProperty = false;
// }
// SubType.prototype = new SuperType();//继承
// SubType.prototype.getSubValue = function () {
//   return this.subProperty;
// }
// //重写超类型中的方法
// SubType.prototype.getSuperValue = function () {
//   return false;
// }
// var instance = new SubType();
// var superInstance = new SuperType();
// console.log("instance.getSuperValue():", instance.getSuperValue())
// console.log("superInstance.getSuperValue():"functionnstance.getSuperValue())
// function SuperType(name){
//   this.name=name;
// }
// function SubType(){
//   SuperType.call(this,"Nicolas")
// }
// var instance = new SubType();
// console.log("instance.name:",instance.name)
// function SuperType(name){
//   this.name=name;
//   this.color=["red","yellow","blue"]
// }
// SuperType.prototype.getSuperValue=function(){
//   return this.name;
// }
// function SubType(name,age){
//   SuperType.call(this,name);
//   this.age=age;
// }
// SubType.prototype = new SuperType()
// var instance = new SubType("Nicolas",19);
// var instance1 = new SubType("Nicolas1",191);
// instance.color.push("black")
// console.log("instance.name:",instance.name)
// console.log("instance.age:",instance.age)
// console.log("instance.getSuperValue():",instance.getSuperValue())
// console.log("instance1.name:",instance1.name)
// console.log("instance1.age:",instance1.age)
// console.log("instance1.getSuperValue():",instance1.getSuperValue())
// console.log("instance.getSuperValue===instance1.getSuperValue:",instance.getSuperValue===instance1.getSuperValue)
// console.log("instance.color:",instance.color)
// console.log("instance1.color:",instance1.color)
// function object(o) {
//   function F() { }
//   F.prototype = o;
//   return new F()
// }
// var person = {
//   name: "Nicolas",
//   friends: ["Dodo", "Sasa"]
// }
// var onePerson = object(person);
// onePerson.friends.push("adu")
// var anotherPerson = object(person);
// anotherPerson.friends.push("lixiaolong")
// console.log("onePerson.name:", onePerson.name)
// console.log("onePerson.friends:", onePerson.friends)
// console.log("anotherPerson.name:", anotherPerson.name)
// console.log("anotherPerson.friends:", anotherPerson.friends)
// var onePerson = Object.create(person);
// onePerson.name="Doglas";
// onePerson.friends.push("wudi");
// var anotherPerson = Object.create(person);
// anotherPerson.name="zhaoi";
// onePerson.friends.push("kaimken");
// console.log("onePerson.name:",onePerson.name)
// console.log("onePerson.friends:",onePerson.friends)
// console.log("anotherPerson.name:",anotherPerson.name)
// console.log("anotherPerson.friends:",anotherPerson.friends)
function object(o) {
  function F() { }
  F.prototype = o.prototype;
  return new F();
}
function inheritProperty(SubType, SuperType) {
  var prototype = object(SuperType);
  prototype.intructor = SubType;
  SubType.prototype = prototype;
}
function SuperType(name) {
  this.name = name;
  this.friends = ["Nicolas", "superman"];
}
SuperType.prototype.getSuperValue = function () {
  return this.name;
}
function SubType(age) {
  this.age = age;
  SuperType.call(this, "wudi");
}
SubType.prototype.getAge = function () {
  return this.age;
}
inheritProperty(SubType, SuperType);
var instance = new SubType(23);
var instance1 = new SubType(24);
instance.friends.push("black")
instance1.friends.push("pink")
console.log("instance.getSuperValue():", instance.getSuperValue())
console.log("instance.age:", instance.age)
console.log("instance1.age:", instance1.age)
console.log("instance.getSuperValue===instance1.getSuperValue:", instance.getSuperValue === instance1.getSuperValue)
console.log("instance.friends:", instance.friends)
console.log("instance1.friends:", instance1.friends)
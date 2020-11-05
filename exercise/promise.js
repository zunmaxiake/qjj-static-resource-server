// const EventEmitter = require("events").EventEmitter;
// const event = new EventEmitter();
// event.on("test",function(){
//   console.log("test output!")
// })
// setTimeout(function(){
//   event.emit("test")
// },5000)
const util = require("util");
const EventEmitter = require("events").EventEmitter;
const Promise = function (executor) {
  EventEmitter.call(this);
  this._resolveFromExecutor(executor);
}
util.inherits(Promise, EventEmitter);
Promise.prototype.then = function (fulfiledHandler, errorHandler, progressHandler) {
  if (typeof fulfiledHandler === "function") {
    this.once("fulfiled", fulfiledHandler);
  }
  if (typeof errorHandler === "function") {
    this.once("error", errorHandler);
  }
  if (typeof progressHandler === "function") {
    this.on("progress", progressHandler);
  }
  return this;
}
const Deferred = function () {
  this.state = "unfulfiled";
  this.promise = new Promise();
}
Deferred.prototype.resolve = function (data) {
  this.state = "fulfiled";
  this.promise.emit("fulfiled", data);
}
Deferred.prototype.reject = function (err) {
  this.state = "error";
  this.promise.emit("error", err);
}
Deferred.prototype.progress = function () {
  this.promise.emit("progress")
}

const deferred = new Deferred()
deferred.resolve(data);
deferred.promise.then(function(params) {
  
}).then()
// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(1, 2));

// exports
const calc2 = require('./test-module-2');
console.log(calc2.add(2, 5));
console.log(calc2.multiply(2, 5));
console.log(calc2.divide(2, 5));
// alternative - using destructuring
const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
// output
// Hello from the module
// Log this beautiful text!
// Log this beautiful text!
// Log this beautiful text!

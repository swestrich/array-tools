var test = require('tape')
var a = require('../')

test('a.removeFields(array.<Object>, fields)', function (t) {
  var object = [{a:'1',b:'2',c:'3'},{a:1},{c:3}];
  
  var result = a.removeFields(object, ['b','c']);
  console.log(result);
  t.deepEqual(result, [{a:'1'},{a:1},{}]);
  t.end()
})
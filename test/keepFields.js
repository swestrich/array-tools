var test = require('tape')
var a = require('../')

test('a.keepFields(array.<Object>, fields)', function (t) {
  var object = [{a:'1',b:'2',c:'3'},{a:1},{c:3}];
  
  var result = a.keepFields(object, ['b','c']);
  console.log(result);
  t.deepEqual(result, [{b:'2',c:'3'},{},{c:3}]);
  t.end()
})
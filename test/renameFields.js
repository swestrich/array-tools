var test = require('tape')
var a = require('../')

test('a.renameFields(array.<Object>, fieldDictionary)', function (t) {
  var object = [{a:'1',b:'2',c:'3'},{a:1},{c:3}];
  
  var result = a.renameFields(object, {'b':'d'});
  console.log(result);
  t.deepEqual(result, [{a:'1'},{a:1},{}]);
  t.end()
})
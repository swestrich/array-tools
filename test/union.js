var test = require('tape')
var a = require('../')

var x = [ 1, 2, 'yay', 3, 4, 5 ];
var y = [ 4,5,'kitty','yay'];
var r = [ 1, 2, 'yay', 3, 4, 5,'kitty'];
test('.union', function (t) {
  var result = a.union(x,y);
  t.deepEqual(r, result)
  t.end()
})

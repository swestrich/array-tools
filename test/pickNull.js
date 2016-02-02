var test = require('tape')
var a = require('../')

var f = {
  recordset: [
    { one: 'un', two: 'deux', three: 'trois' },
    { two: 'two', one: 'one' },
    { four: 'quattro' },
    { two: 'zwei' }
  ],
  deep: [
    { one: { one: 1, two: 2 }},
    { one: { one: 1, two: 2 }},
    { one: { one: 1 }}
  ]
}

test('.pickNull(recordset, property)', function (t) {
  t.deepEqual(a.pickNull(f.recordset, 'one'), [
    { one: 'un' },
    { one: 'one' },
    { one: null},
    { one: null},
  ])
  t.end()
})

test('.pickNull(recordset, [ properties ])', function (t) {
  t.deepEqual(a.pickNull(f.recordset, [ 'one', 'two' ]), [
    { one: 'un', two: 'deux' },
    { two: 'two', one: 'one' },
    { one: null, two: null},
    { one: null, two: 'zwei' },
  ])
  t.end()
})

test('.pickNull(recordset, property.property)', function (t) {
  t.deepEqual(a.pickNull(f.deep, 'one.two'), [
    { two: 2 },
    { two: 2 },
    { two: null }
  ])
  t.end()
})

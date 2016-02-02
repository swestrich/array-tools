var test = require('tape')
var a = require('../')

test('a.groupFields(array.<Object>, fieldDictionary)', function (t) {
  var object = [{id:'1',name:'kangaroo',does_id:'1',does_name:'hops',eats_id:'1',eats_name:'grass'},
  {id:'1',name:'kangaroo',does_id:'1',does_name:'hops',eats_id:'2',eats_name:'bread'},
  {id:'1',name:'kangaroo',does_id:'2',does_name:'eats',eats_id:'1',eats_name:'grass'},
  {id:'1',name:'kangaroo',does_id:'2',does_name:'eats',eats_id:'2',eats_name:'bread'},
  {id:'2',name:'monkey',does_id:'3',does_name:'swings',eats_id:'3',eats_name:'banana'},
  {id:'2',name:'monkey',does_id:'3',does_name:'swings',eats_id:'2',eats_name:'bread'},
  {id:'2',name:'monkey',does_id:'2',does_name:'eats',eats_id:'3',eats_name:'banana'},
  {id:'2',name:'monkey',does_id:'2',does_name:'eats',eats_id:'2',eats_name:'bread'}];

  var result = a.groupFields(object,{does:{fields:['does_name','does_id'],primary:'does_id',name:'does'},eats:{fields:['eats_name','eats_id','eats_isVegetarian'],primary:'eats_id',name:'eats'}},'id');
  console.log(result);
  t.deepEqual(result, [{id:'1',name:'kangaroo',does:[{id:'1',name:'hops'},{id:'2',name:'eats'}],eats:[{id:'1',name:'grass'},{id:'2',name:'bread'}]},
  {id:'2',name:'monkey',does:[{id:'3',name:'swings'},{id:'2',name:'eats'}],eats:[{id:'3',name:'banana'},{id:'2',name:'bread'}]}]);
  t.end()
})
[![view on npm](http://img.shields.io/npm/v/array-tools.svg)](https://www.npmjs.org/package/array-tools)
[![npm module downloads per month](http://img.shields.io/npm/dm/array-tools.svg)](https://www.npmjs.org/package/array-tools)
[![Build Status](https://travis-ci.org/75lb/array-tools.svg?branch=master)](https://travis-ci.org/75lb/array-tools)
[![Dependency Status](https://david-dm.org/75lb/array-tools.svg)](https://david-dm.org/75lb/array-tools)
[![Coverage Status](https://coveralls.io/repos/75lb/array-tools/badge.svg?branch=master)](https://coveralls.io/r/75lb/array-tools?branch=master)

***this documentation is for the pre-release version***

# array-tools
Lightweight, use-anywhere toolkit for working with array data.

There are four ways to use it.

1) As a command-line tool. E.g. array-tools downloads last month:
```sh
$ curl -s https://api.npmjs.org/downloads/range/last-month/array-tools \
| object-tools get downloads \
| array-tools pluck downloads \
| array-tools join "," \
| spark
▂▅▃▅▅▁▁▃▄▃▆▂▂▁▁▂▄▃▃▁▁▂█▆▆▄▁▃▅▃
```

2) As a standard library, passing the input array on each method invocation:

```js
> var a = require("array-tools");

> var remainder = a.without([ 1, 2, 3, 4, 5 ], 1)
> a.exists(remainder, 1)
false
```

3) As a chainable method, passing the input array once then chaining from there:

```js
> a([ 1, 2, 3, 4, 5 ]).without(1).exists(1);
false
```

4) As a base class.
```js
var util = require("util");
var ArrayTools = require("array-tools");

// this class will inherit all array-tools methods
function CarCollection(cars){
  ArrayTools.call(this, cars);
}
util.inherits(CarCollection, ArrayTools);

var cars = new CarCollection([ 
  { owner: "Me", model: "Citreon Xsara" }, 
  { owner: "Floyd", model: "Bugatti Veyron" } 
]);

cars.findWhere({ owner: "Floyd" });
// returns { owner: "Floyd", model: "Bugatti Veyron" }
```

#### More on chaining
* Each method returning an `Array` (e.g. `where`, `without`) can be chained.
* Methods not returning an array (`exists`, `contains`) cannot be chained.
* All methods from `Array.prototype` (e.g. `.join`, `.forEach` etc.) are also available in the chain. The same rules, regarding what can and cannot be chained, apply as above.
* If the final operation in your chain is "chainable" (returns an array), append `.val()` to terminate the chain and retrieve the output.

```js
> a([ 1, 2, 2, 3 ]).exists(1)
true
> a([ 1, 2, 2, 3 ]).without(1).exists(1)
false
> a([ 1, 2, 2, 3 ]).without(1).unique().val()
[ 2, 3 ]
> a([ 1, 2, 2, 3 ]).without(1).unique().join("-")
'2-3'
```

## Compatibility
This library is tested in node versions 0.10, 0.11, 0.12, iojs and the following browsers:

[![Sauce Test Status](https://saucelabs.com/browser-matrix/arr-tools.svg)](https://saucelabs.com/u/arr-tools)

## Install
As a library:

```
$ npm install array-tools --save
```

As a command-line tool:
```
$ npm install -g array-tools
```

Using bower:
```
$ bower install array-tools --save
```

## API Reference

* [array-tools](#module_array-tools)
  * _chainable_
    * [.arrayify(any)](#module_array-tools.arrayify) ⇒ <code>Array</code>
    * [.where(array, query)](#module_array-tools.where) ⇒ <code>Array</code>
    * [.without(array, toRemove)](#module_array-tools.without) ⇒ <code>Array</code>
    * [.pluck(recordset, property)](#module_array-tools.pluck) ⇒ <code>Array</code>
    * [.pick(recordset, property)](#module_array-tools.pick) ⇒ <code>Array.&lt;object&gt;</code>
    * [.unique(array)](#module_array-tools.unique) ⇒ <code>Array</code>
    * [.spliceWhile(array, index, test, ...elementN)](#module_array-tools.spliceWhile) ⇒ <code>Array</code>
    * [.extract(array, query)](#module_array-tools.extract) ⇒ <code>Array</code>
    * [.flatten(array)](#module_array-tools.flatten) ⇒ <code>Array</code>
    * [.sortBy(recordset, columns, customOrder)](#module_array-tools.sortBy) ⇒ <code>Array</code>
  * _not chainable_
    * [.exists(array, query)](#module_array-tools.exists) ⇒ <code>boolean</code>
    * [.findWhere(recordset, query)](#module_array-tools.findWhere) ⇒ <code>object</code>
    * [.last(arr)](#module_array-tools.last) ⇒ <code>\*</code>
    * [.remove(arr, toRemove)](#module_array-tools.remove) ⇒ <code>\*</code>
    * [.contains(array, value)](#module_array-tools.contains) ⇒

<a name="module_array-tools.arrayify"></a>
### a.arrayify(any) ⇒ <code>Array</code>
Takes any input and guarantees an array back.

- converts array-like objects (e.g. `arguments`) to a real array
- converts `undefined` to an empty array
- converts any another other, singular value (including `null`) into an array containing that value
- ignores input which is already an array

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| any | <code>\*</code> | the input value to convert to an array |

**Example**  
```js
> a.arrayify(undefined)
[]

> a.arrayify(null)
[ null ]

> a.arrayify(0)
[ 0 ]

> a.arrayify([ 1, 2 ])
[ 1, 2 ]

> function f(){ return a.arrayify(arguments); }
> f(1,2,3)
[ 1, 2, 3 ]
```
<a name="module_array-tools.where"></a>
### a.where(array, query) ⇒ <code>Array</code>
Deep query an array.

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;object&gt;</code> | the array to query |
| query | <code>any</code> &#124; <code>Array.&lt;any&gt;</code> | one or more queries |

**Example**  
Say you have a recordset:
```js
> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]
```

You can return records with properties matching an exact value:
```js
> a.where(data, { age: 10 })
[ { name: 'Zhana', age: 10 } ]
```

or where NOT the value (prefix the property name with `!`)
```js
> a.where(data, { "!age": 10 })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
```

match using a function:
```js
> function over10(age){ return age > 10; }
> a.where(data, { age: over10 })
[ { name: 'Dana', age: 30 }, { name: 'Yana', age: 20 } ]
```

match using a regular expression
```js
> a.where(data, { name: /ana/ })
[ { name: 'Dana', age: 30 },
  { name: 'Yana', age: 20 },
  { name: 'Zhana', age: 10 } ]
```

You can query to any arbitrary depth. So with deeper data, like this:
```js
> deepData = [
    { name: "Dana", favourite: { colour: "light red" } },
    { name: "Yana", favourite: { colour: "dark red" } },
    { name: "Zhana", favourite: { colour: [ "white", "red" ] } }
]
```

get records with `favourite.colour` values matching `/red/`
```js
> a.where(deepData, { favourite: { colour: /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } } ]
```
 
if the value you're looking for _maybe_ part of an array, prefix the property name with `+`. Now Zhana is included:
```js
> a.where(deepData, { favourite: { "+colour": /red/ } })
[ { name: 'Dana', favourite: { colour: 'light red' } },
  { name: 'Yana', favourite: { colour: 'dark red' } },
  { name: 'Zhana', favourite: { colour: [ "white", "red" ] } } ]
```

you can combine any of the above by supplying an array of queries. Records will be returned if _any_ of the queries match:
```js
> var nameBeginsWithY = { name: /^Y/ };
> var faveColourIncludesWhite = { favourite: { "+colour": "white" } };

> a.where(deepData, [ nameBeginsWithY, faveColourIncludesWhite ])
[ { name: 'Yana', favourite: { colour: 'dark red' } },
  { name: 'Zhana', favourite: { colour: [ "white", "red" ] } } ]
```
<a name="module_array-tools.without"></a>
### a.without(array, toRemove) ⇒ <code>Array</code>
Returns a new array with the same content as the input minus the specified values. It accepts the same query syntax as [where](#module_array-tools.where).

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the input array |
| toRemove | <code>any</code> &#124; <code>Array.&lt;any&gt;</code> | one, or more queries |

**Example**  
```js
> a.without([ 1, 2, 3 ], 2)
[ 1, 3 ]

> a.without([ 1, 2, 3 ], [ 2, 3 ])
[ 1 ]

> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]
> a.without(data, { name: /ana/ })
[]
```
<a name="module_array-tools.pluck"></a>
### a.pluck(recordset, property) ⇒ <code>Array</code>
Returns an array containing each value plucked from the specified property of each object in the input array.

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| recordset | <code>Array.&lt;object&gt;</code> | The input recordset |
| property | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Property name, or an array of property names. If an array is supplied, the first existing property will be returned. |

**Example**  
with this data.. 
```js
> var data = [
    { name: "Pavel", nick: "Pasha" },
    { name: "Richard", nick: "Dick" },
    { name: "Trevor" },
]
```

pluck all the nicknames
```js
> a.pluck(data, "nick")
[ 'Pasha', 'Dick' ]
```

in the case no nickname exists, take the name instead:
```js
> a.pluck(data, [ "nick", "name" ])
[ 'Pasha', 'Dick', 'Trevor' ]
```

the values being plucked can be at any depth:
```js
> var data = [
    { leeds: { leeds: { leeds: "we" } } },
    { leeds: { leeds: { leeds: "are" } } },
    { leeds: { leeds: { leeds: "Leeds" } } }
];

> a.pluck(data, "leeds.leeds.leeds")
[ 'we', 'are', 'Leeds' ]
```
<a name="module_array-tools.pick"></a>
### a.pick(recordset, property) ⇒ <code>Array.&lt;object&gt;</code>
return a copy of the input `recordset` containing objects having only the cherry-picked properties

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| recordset | <code>Array.&lt;object&gt;</code> | the input |
| property | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | the properties to include in the result |

**Example**  
with this data..
```js
> data = [
    { name: "Dana", age: 30 },
    { name: "Yana", age: 20 },
    { name: "Zhana", age: 10 }
]
```

return only the `"name"` field..
```js
> a.pick(data, "name")
[ { name: 'Dana' }, { name: 'Yana' }, { name: 'Zhana' } ]
```

return both the `"name"` and `"age"` fields
```js
> a.pick(data, [ "name", "age" ])
[ { name: 'Dana', age: 30 },
  { name: 'Yana', age: 20 },
  { name: 'Zhana', age: 10 } ]
```

cherry-picks fields at any depth:
```js
> data = [
    { person: { name: "Dana", age: 30 }},
    { person: { name: "Yana", age: 20 }},
    { person: { name: "Zhana", age: 10 }}
]

> a.pick(data, "person.name")
[ { name: 'Dana' }, { name: 'Yana' }, { name: 'Zhana' } ]

> a.pick(data, "person.age")
[ { age: 30 }, { age: 20 }, { age: 10 } ]
```
<a name="module_array-tools.unique"></a>
### a.unique(array) ⇒ <code>Array</code>
returns an array of unique values

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | input array |

**Example**  
```js
> n = [1,6,6,7,1]
[ 1, 6, 6, 7, 1 ]

> a.unique(n)
[ 1, 6, 7 ]
```
<a name="module_array-tools.spliceWhile"></a>
### a.spliceWhile(array, index, test, ...elementN) ⇒ <code>Array</code>
splice from `index` until `test` fails

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the input array |
| index | <code>number</code> | the position to begin splicing from |
| test | <code>RegExp</code> | the test to continue splicing while true |
| ...elementN | <code>\*</code> | the elements to add to the array |

**Example**  
```js
> letters = ["a", "a", "b"]
[ 'a', 'a', 'b' ]

> a.spliceWhile(letters, 0, /a/, "x")
[ 'a', 'a' ]

> letters
[ 'x', 'b' ]
```
<a name="module_array-tools.extract"></a>
### a.extract(array, query) ⇒ <code>Array</code>
Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted.

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Returns**: <code>Array</code> - the extracted items.  
**Category**: chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the input array, modified directly |
| query | <code>function</code> &#124; <code>object</code> | Per item in the array, if either the function returns truthy or the exists query is satisfied, the item is extracted |

<a name="module_array-tools.flatten"></a>
### a.flatten(array) ⇒ <code>Array</code>
flatten an array of arrays into a single array

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  
**Since**: 1.4.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the input array |

**Example**  
```js
> numbers = [ 1, 2, [ 3, 4 ], 5 ]
> a.flatten(numbers)
[ 1, 2, 3, 4, 5 ]
```
<a name="module_array-tools.sortBy"></a>
### a.sortBy(recordset, columns, customOrder) ⇒ <code>Array</code>
Sort an array of objects by one or more fields

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: chainable  
**Since**: 1.5.0  

| Param | Type | Description |
| --- | --- | --- |
| recordset | <code>Array.&lt;object&gt;</code> | input array |
| columns | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | column name(s) to sort by |
| customOrder | <code>object</code> | specific sort orders, per columns |

**Example**  
```js
>  var fixture = [
    { a: 4, b: 1, c: 1},
    { a: 4, b: 3, c: 1},
    { a: 2, b: 2, c: 3},
    { a: 2, b: 2, c: 2},
    { a: 1, b: 3, c: 4},
    { a: 1, b: 1, c: 4},
    { a: 1, b: 2, c: 4},
    { a: 3, b: 3, c: 3},
    { a: 4, b: 3, c: 1}
];
> a.sortBy(fixture, ["a", "b", "c"])
[ { a: 1, b: 1, c: 4 },
  { a: 1, b: 2, c: 4 },
  { a: 1, b: 3, c: 4 },
  { a: 2, b: 2, c: 2 },
  { a: 2, b: 2, c: 3 },
  { a: 3, b: 3, c: 3 },
  { a: 4, b: 1, c: 1 },
  { a: 4, b: 3, c: 1 },
  { a: 4, b: 3, c: 1 } ]
```
<a name="module_array-tools.exists"></a>
### a.exists(array, query) ⇒ <code>boolean</code>
returns true if a value, or nested object value exists in an array.. If value is a plain object, it is considered to be a query. If `value` is a plain object and you want to search for it by reference, use `.contains`.

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: not chainable  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the array to search |
| query | <code>\*</code> | the value to search for |

**Example**  
```js
> a.exists([ 1, 2, 3 ], 2)
true

> a.exists([ 1, 2, 3 ], [ 2, 3 ])
true

> a.exists([ { result: false }, { result: false } ], { result: true })
false

> a.exists([ { result: true }, { result: false } ], { result: true })

> a.exists([ { n: 1 }, { n: 2 }, { n: 3 } ], [ { n: 1 }, { n: 3 } ])
true
```
<a name="module_array-tools.findWhere"></a>
### a.findWhere(recordset, query) ⇒ <code>object</code>
returns the first item from `recordset` where key/value pairs
from `query` are matched identically

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: not chainable  

| Param | Type | Description |
| --- | --- | --- |
| recordset | <code>Array.&lt;object&gt;</code> | the array to search |
| query | <code>object</code> | an object containing the key/value pairs you want to match |

**Example**  
```js
> dudes = [{ name: "Jim", age: 8}, { name: "Clive", age: 8}, { name: "Hater", age: 9}]
[ { name: 'Jim', age: 8 },
  { name: 'Clive', age: 8 },
  { name: 'Hater', age: 9 } ]

> a.findWhere(dudes, { age: 8})
{ name: 'Jim', age: 8 }
```
<a name="module_array-tools.last"></a>
### a.last(arr) ⇒ <code>\*</code>
Return the last item in an array.

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: not chainable  
**Since**: 1.7.0  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | the input array |

<a name="module_array-tools.remove"></a>
### a.remove(arr, toRemove) ⇒ <code>\*</code>
**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Category**: not chainable  
**Since**: 1.8.0  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | the input array |
| toRemove | <code>\*</code> | the item to remove |

<a name="module_array-tools.contains"></a>
### a.contains(array, value) ⇒
Searches the array for the exact value supplied (strict equality). To query for value existance using an expression or function, use [exists](#module_array-tools.exists). If you pass an array of values, contains will return true if they _all_ exist. (note: `exists` returns true if _some_ of them exist).

**Kind**: static method of <code>[array-tools](#module_array-tools)</code>  
**Returns**: boolean  
**Category**: not chainable  
**Since**: 1.8.0  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the input array |
| value | <code>\*</code> | the value to look for |


* * * 

&copy; 2015 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).

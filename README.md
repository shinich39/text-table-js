## text-table-js

Create text table in javascript.

## Usage

```js
import table from 'text-table-js';
```

```js
const data = [
  ["Name", "Age", "Sex"],
  ["Mike", "13", "Male"],
  ["John", "99", "Female"]
];

const maxWidth = 2;

const result = table.create(data, maxWidth);

// +--+--+--+
// |Na|Ag|Se|
// |me|e |x |
// +--+--+--+
// |Mi|13|Ma|
// |ke|  |le|
// +--+--+--+
// |Jo|99|Fe|
// |hn|  |ma|
// |  |  |le|
// +--+--+--+
```
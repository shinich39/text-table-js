import table from './index.js';

const data = [
  ["Name", "Age", "Sex"],
  ["Mike", "13", "Male"],
  ["John", "99", "Female"]
];

console.log(
  table.create(data, 3)
);
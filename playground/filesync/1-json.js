const fs = require('fs');

fs.writeFileSync('1-json.json', '{"name":"Thomas","planet":"Earth","age":17}');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

console.log(user);

user.name = 'Andrew';
user.age = 27;

console.log(user);

const userJSON = JSON.stringify(user);
fs.writeFileSync('1-json.json', userJSON);
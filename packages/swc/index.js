const swc = require("@swc/core");
const code = `
const a = '王富贵';
console.log('名称 ==>', a);    
`;
const results = swc.parseSync(code);
console.log(results);

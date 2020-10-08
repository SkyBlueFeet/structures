const { Stack }=require('../dist/js-structures.cjs.min');


// 10进制转换成2-9进制
function mulBase(num, base) {
  const stack = new Stack();

  do {
    stack.push(num % base);
    num=Math.floor(num/=base)
  } while (num > 0)
  
  let converted = ''
  while (stack.length()>0) {
    converted += stack.pop();
  }
  return converted
}

console.log(mulBase(125,8))
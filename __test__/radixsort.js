const { Queue } = require('../dist/js-structures.cjs.min');

function distribute(nums, queues, n, digit=1) {
  for (let i = 0; i < n; ++i){
    if (digit === 1) {
      queues[nums[i]%10].enqueue(nums[i])
    } else {
      queues[Math.floor(nums[i]/10)].enqueue(nums[i])
    }
  }
}

function collect(queues, nums) {
  let i = 0;
  for (let digit = 0; digit < 10; ++digit){
    while (!queues[digit].empty()) {
      nums[i++]=queues[digit].dequeue()
    }
  }
}

function dispArray(arr) {
  for (let i = 0; i < arr.length; ++i){
    console.log(arr[i])
  }
}

const queues = []

for (let i = 0; i < 10; ++i) {
  queues[i] = new Queue();

}

const nums = [];

for (let i = 0; i < 10; ++i){
  nums[i]=Math.floor(Math.floor(Math.random()*101))
}

console.log("before radix sort:")
dispArray(nums)
distribute(nums, queues, 10, 1)
collect(queues, nums)
distribute(nums, queues, 10, 10)
collect(queues, nums)
console.log('\n After radix sort: ')
dispArray(nums)
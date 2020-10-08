/*
 * @author: SkyBlue
 * @LastEditors: SkyBlue
 * @Date: 2020-10-08 13:44:21
 * @LastEditTime: 2020-10-08 14:55:23
 * @Gitee: https://gitee.com/skybluefeet
 * @Github: https://github.com/SkyBlueFeet
 */
const {List} =require('../dist/js-structures.cjs.min');

const tList = new List()

tList.append(Array.from('new structures'))

for (tList.front(); tList.hasNext(); tList.next()){
  console.log(tList.getElement())
}

for (tList.end(); tList.hasPrev(); tList.prev()){
  console.log(tList.getElement())
}
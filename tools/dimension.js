/**
 * @Author: len.lee【Liyao】 
 * @Date: 2018-06-14 16:09:20 
 * @Last Modified by: 李耀
 * @Last Modified time: 2018-07-14 17:34:43
 */

 /**
  * geo二维表
  * 当超出范围后会去向底部或顶部
  */

let map=[
    ['b','c','f','g','u','v','y','z'],
    ['8','9','d','e','s','t','w','x'],
    ['2','3','6','7','k','m','q','r'],
    ['0','1','4','5','h','j','n','p']
]
/**
 * 索引
 */
let index = new Map();
index.set('0',[3,0]);
index.set('1',[3,1]);
index.set('2',[2,0]);
index.set('3',[2,1]);
index.set('4',[3,2]);   
index.set('5',[3,3]);
index.set('6',[2,2]);
index.set('7',[2,3]);
index.set('8',[1,0]);
index.set('9',[1,1]);
index.set('b',[0,0]);
index.set('c',[0,1]);
index.set('d',[1,2]);
index.set('e',[1,3]);
index.set('f',[0,2]);
index.set('g',[0,3]);
index.set('h',[3,4]);
index.set('j',[3,5]);
index.set('m',[2,5]);
index.set('k',[2,4]);
index.set('n',[3,6]);
index.set('p',[3,7]);
index.set('q',[2,6]);
index.set('r',[2,7]);
index.set('s',[1,4]);
index.set('t',[1,5]);
index.set('u',[0,4]);
index.set('v',[0,5]);
index.set('w',[1,6]);
index.set('x',[1,7]);
index.set('y',[0,6]);
index.set('z',[0,7]);

module.exports = {
    map,
    index,
}
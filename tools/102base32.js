/**
 * 10进制转base32
 */
const map = new Map();
function ten2base32(){
    map.set(0,0);
    map.set(1,1);
    map.set(2,2);
    map.set(3,3);
    map.set(4,4);
    map.set(5,5);
    map.set(6,6);
    map.set(7,7);
    map.set(8,8);
    map.set(9,9);
    map.set(10,'b');
    map.set(11,'c');
    map.set(12,'d');
    map.set(13,'e');
    map.set(14,'f');
    map.set(15,'g');
    map.set(16,'h');
    map.set(17,'j');
    map.set(18,'k');
    map.set(19,'m');
    map.set(20,'n');
    map.set(21,'p');
    map.set(22,'q');
    map.set(23,'r');
    map.set(24,'s');
    map.set(25,'t');
    map.set(26,'u');
    map.set(27,'v');
    map.set(28,'w');
    map.set(29,'x');
    map.set(30,'y');
    map.set(31,'z');
    return map;
}

module.exports = ten2base32();
function flat(arr,  depth = 1) {
  var newArr = [];
  if(depth > 0) {
      for(var i = 1; i< arr.length; i++){
         if (Array.isArray(arr)) {
             newArr.concat(flat(arr[i], depth - 1));
         }else{
             newArr.concat(arr[i])
         }
      } 
  }
  return newArr;     
}
let res = flat([1, [2], [3, [4]]], 1);
console.log(res);
function firstBadVersion(isBad) {
  return (version) => {
    let left = 0
    let right = version // 10

    while (left <= right) { // 0 <= 10  0 <= 4  0 <= 1
       const middle = Math.floor((left + right) / 2) // 0 
       if (isBad(middle)) { 
         right = middle - 1 // 4  1  -1
       } else {
         left = middle + 1
       }
    }
    
    
    return isBad(left) ? left : -1
  }
}
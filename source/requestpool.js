const https = require('https')

function requestPool(size) {
  debugger
  let pool = [], resolved = []
  let pop = arr => {
    if (!arr.length) return
    let cur = arr.pop()
    pop(arr)
    return cur
  }
  let checker = url => {
    pool.push(new Promise(fetch(url)))
    if (resolved.length === 0 || resolved.length === size) {
      resolved = []
      return pool.shift()
    }
  }
  let fetch = url => {
    return function(resolve, reject) {
      https.get(url, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => {
          debugger
          console.log('succeed')
          resolve && resolve(chunk);
          resolved.push(chunk);
          checker(url)
        });
        res.on('error', e => {
          debugger
          reject && reject(e);
          resolved.push(e);
          checker(url)
        });
      })
    };
  }
  return url => checker(url)
}


let request = requestPool(2);
request('https://api.apiopen.top/getJoke?page=1&count=1&type=video').then(res => console.log('1', res))
request('https://api.apiopen.top/getJoke?page=2&count=1&type=video').then(res => console.log('2', res))
request('https://api.apiopen.top/getJoke?page=3&count=1&type=video').then(res => console.log('3', res))
request('https://api.apiopen.top/getJoke?page=4&count=1&type=video').then(res => console.log('4', res))
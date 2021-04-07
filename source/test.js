function fn() {
  let a = 1
  setTimeout(() => {
    let b = 2
    new Promise((resolve, reject) => {
      let c = 3
      resolve(c)
    }).then(val => {
      console.log(val)
    })
    console.log(b)
  })
  new Promise((resolve, reject) => {
    let d = 4
    resolve(d)
  }).then(val => {
    console.log(val)
  })
  console.log(a)
}

fn()
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([1,,4,8])
        reject('things went wrong')
    }, 2000)
})

doWorkPromise
.then((result) => {
    console.log('succes: ', result)
})
.catch((error) => {
    console.log('error: ', error)
})
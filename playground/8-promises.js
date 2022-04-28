// const doworkpromise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//          resolve([7,4,1]) 
//        // reject('things went wrong')
//     },2000)
// })

const { resolve } = require("path")

// doworkpromise.then((result)=>{
//     console.log('success!'+result)
// }).catch((error)=>{
//     console.log('error'+ error)
// })

//
//                               fulfilled
//                             /
//promise       -- pending -->  
//                             \
//                               rejected
//

const add = (a,b) =>{
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
        resolve(a + b)
       },2000)
    })
}


//// Normal bulky way to do chaining
add(1,2).then((sum)=>{
    console.log(sum)
    add(sum,5).then((sum2)=>{
        console.log(sum2)
    }).catch((e2)=>{
        console.log(ew)
    })
}).catch((e)=>{
    console.log(e)
})

////// clean and effective Chainin in promise
add(1,2).then((sum)=>{
    console.log(sum)
    return add(sum,5)
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})





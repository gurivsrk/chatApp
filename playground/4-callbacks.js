// setTimeout(() => {
//     console.log('Two seconds are up')
// }, 2000)

// const names = ['Andrew', 'Jen', 'Jess']
// const shortNames = names.filter((name) => {
//     return name.length <= 4
// })

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }

//         callback(data)
//     }, 2000)
// }

// geocode('Philadelphia', (data) => {
//     console.log(data)
// })

// const add = (a, b, callback) => {
//     setTimeout(() => {
//         callback(a + b)
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })
const doworkcallback = (callback) =>{
    setTimeout(()=>{
        // callback('this is my errror', undefined) //errorr
        callback(undefined, [1,4,7]) // result
    },2000)
}
doworkcallback((error,result)=>{
    if(error){
        return console.log(error)
    }
    console.log('result: '+result)
})
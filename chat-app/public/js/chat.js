const chatForm = document.querySelector('form')
const formButton = document.querySelector('form button')
const formInput = document.querySelector('form input')
const $messages = document.querySelector('#msg-form')
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const socket = io()

socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        text:message.text,
        createdAt:moment(message.createdAt).format('h:mm:s a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage', (loc)=>{
    console.log(loc)
    const html = Mustache.render(locationTemplate,{
        url:loc.url,
        createdAt: moment(loc.createdAt).format('h:mm:s a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    formButton.setAttribute('disabled','disabled')
    const data =  Object.fromEntries(new FormData(e.target).entries())  //// e.target.elements.chat.value  /// to access form element here e.target is for this, elements.chat: means targeting chat name element in for
    formInput.focus()           
    socket.emit('message',data, (error)=>{
        formButton.removeAttribute('disabled','disabled')

        if(error){
            return console.log(error)
        }
        console.log('the message is delivered !')
        
    })

    chatForm.reset()
})

document.querySelector('#sendLocation').addEventListener('click',(e)=>{
    if(! navigator.geolocation) { return alert('Browser doesn\'t support Geolocaltion ') }

    e.target.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
       let coordinates =  {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
       }
        socket.emit('sendLocation', coordinates, (status)=>{
            e.target.removeAttribute('disabled','disabled')
            console.log(status);
        }) 
    })

})
// navigator.geolocation.getCurrentPosition((position) => {
//     //console.log(position);
    
//   });
// navigator.geolocation.watchPosition((d)=>{
//     console.log(d)
// })
// socket.on('updateCount', (count) => {
//     console.log('the count has been updates',count)
// })

// document.querySelector('#increment').addEventListener('click', ()=>{
//     console.log('click')
//     socket.emit(('increment'))
// })

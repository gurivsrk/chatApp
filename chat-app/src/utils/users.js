const users = []
// addUser, removeUser, getUser, getUserInRoom

const addUser = ({id,username,room})=>{
    /// clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    /// Validate Data
    if(!username || !room){
        return {
            erorr: 'Username or room are required!'
        }
    }

    /// Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    /// validate user
    if(existingUser){
        return {
            erorr: 'Username already exists'
        }
    }

    const user = { id, username, room }
    users.push(user)
    return {user}
}

const removeUser = (id) =>{
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}


const getUser = (id)=>{
    const user = users.find((user) => user.id === id)
      if(!user){
        return {
            erorr: 'user not found'
        }
      } 
    return user  
}

const getUserInRoom = (room)=>{
    const userInRoom = users.filter( (user) => user.room === room )
        if(userInRoom.length <= 0){
            return{
                error: 'users not found'
            }
        }
    return userInRoom    
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}






// addUser({
//     id:22,
//     username: 'Guri',
//     room:'delhi'
// })
// addUser({
//     id:32,
//     username: 'Guri',
//     room:'haryana'
// })
// addUser({
//     id:20,
//     username: 'mike',
//     room:'delhi'
// })

// console.log(getUserInRoom('delhi'))
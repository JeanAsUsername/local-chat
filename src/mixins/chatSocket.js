
// io client
import io from 'socket.io-client'
// api
import api from '../services/api'
//firebase
import firebase from '../services/firebase'

const firebaseDB = firebase.database(),
    firebaseAuth = firebase.auth()

// ----------- export ---------------

export default {

    created() {

        firebaseAuth.onAuthStateChanged(user => {

            if (user && this.myUser) {

                if (this.$store.state.login) {
                    // connect to the chatRoom
                    this.io.emit('joinChat', 'chatRoom')
                    firebaseDB
                    .ref('/users')
                    .child(user.uid)
                    .set({
                        username: this.myUser['username'], 
                        color: this.myUser['color']
                    })
                } 
                
                // firebase listeners -------
                this.io.on('updateUser', () => {

                    if (!this.$store.state.login) return
                    firebaseDB
                    .ref('/users')
                    .child(user.uid)
                    .set({
                        username: this.myUser['username'], 
                        color: this.myUser['color']
                    })
                })
                // -------------------------------
            }

        })

        //get messages
        api
            .getMessages()
            .then(res => {
                res.data.forEach((obj) => {
                    this.messages.push({
                        id: obj._id,
                        username: obj.userId.username,
                        content: obj.content,
                        color: obj.userId.color
                    })
                })
            })

        this.io = io('https://salty-sierra-26198.herokuapp.com/chat')

        firebaseDB
        .ref('/users')
        .on('value', (snapshot) => {

            const users = new Array()

            for (var i in snapshot.val()) {
                users.push({
                    id: i,
                    username: snapshot.val()[i].username,
                    color: snapshot.val()[i].color
                })
            }
            this.users = users
        })

        // listeners

        this.io.on('message', (commingData) => {
            this.messages.push(commingData)
        })
    },

    beforeDestroy() {
        this.io.disconnect()
    }

}
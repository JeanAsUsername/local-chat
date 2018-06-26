
// io client
import io from 'socket.io-client'
// api
import api from '../services/api'

export default {

    created() {

        this.myUser = JSON.parse(localStorage['user'])
        
        // set the color to render
        this.color = this.myUser.color

        // websockets

        this.io = io('https://salty-sierra-26198.herokuapp.com/profile')

        this.io.emit('joinRoom', this.myUser.id)

        // listeners 

        this.io.on('userUpdated', (newUser) => {

            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(newUser))

        })

        this.io.on('userDeleted', () => {
            // then delete the session
            api
            .logout()
            .then(res => {
                this.$store.commit('setStatus', res.data.login)
                localStorage.removeItem('username')
                localStorage.removeItem('email')
                this.$router.push('/signup')
            })
        })

    }

}
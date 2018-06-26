
<template>
    <header>
        <div class="header__options">
            <div class="options__open" @click="open">
                <i class="fas fa-bars"></i>
            </div>
        </div>
        <nav class="header__nav">
            <ul class="nav__list">

                <router-link to="/" class="nav__link">
                    <li class="nav__item">Home</li>
                </router-link>

                <router-link to="/chat" class="nav__link">
                    <li class="nav__item">Chat</li>
                </router-link>
                
                <router-link to="/profile" class="nav__link">
                    <li class="nav__item">Profile</li>
                </router-link>

                <router-link to="/signin" class="nav__link" v-if="!login">
                    <li class="nav__item">Sign In</li>
                </router-link>

                <li @click="logout" class="nav__item" v-else>Logout</li>

                <router-link to="/signup" class="nav__link" v-if="!login">
                    <li class="nav__item">Sign up</li>
                </router-link>

            </ul>
        </nav>
    </header>
</template>

<script>
// api
import api from  '../../services/api'
// firebase
import firebase from '../../services/firebase'

const firebaseAuth = firebase.auth()

export default {

    data() {
        return {
            login: this.$store.state.login
        }
    },

    methods: {
        open() {
            const nav = document.querySelector('.header__nav')
            nav.classList.toggle('open')
        },

        logout() {
            
            firebaseAuth.signOut()
            .then(() => {
                api
                .logout()
                .then(res => {
                    this.$store.commit('setStatus', res.data.login)
                    localStorage.removeItem('user')
                    this.$router.push('/signin')
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

// import stylesheets
@import '../css/main';

// z-index
header {
    position: relative;
    z-index: 50;

    height: 10vh;
    min-height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    background-color: $normal-black;
}

//margin
.nav__link {
     margin-right: 10px;

    text-decoration: none;

    &:last-child {
        margin-right: 0;
    }
}

.header__options, .header__nav {
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;

}

.header__options {
    height: 100%;
}


// padding
.header__options, .nav__list {
    padding: 10px;
}
// z-index
.header__options {
    z-index: 100;
    display: none;
    justify-content: flex-end;
}

.nav__list {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    list-style: none;
}
// z-index
.options__open {

    color: $normal-black;
    font-size: 20px;
    cursor: pointer;

    & i {
        transition: all 300ms;
    }

    & i:hover {
        color: rgb(100, 100, 100)
    }
}

.nav__item {
    
    position: relative;
    overflow: hidden;
    color: $normal-white;
    font-family: $roboto;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        right: 100%;
        height: 100%;
        width: 100%;
        transition: all 300ms;
        border-bottom: 1px solid $normal-white;
    }

    &:hover::before {
        right: 0;
    }
}

//medias queries

@media screen and (max-width: 800px) {

    header {
        position: fixed;
        height: 50px;
    }

    .header__options {

        display: flex;

        background-color: $normal-white;
    }

    .header__nav {
        top: -220%;
        justify-content: center;
        transition: all 500ms;

        background-color: rgba(25, 25, 25, 0.8);
        box-shadow: 2px 2px 10px rgb(15, 15, 15);
    }

    .header__nav.open {
        top: 100%;
    }

    .nav__list {

        flex-direction: column;
        align-items: center;
    }
//margin 
    .nav__link {
       
        margin-right: 0;
        margin-bottom: 5px;

        text-align: center;

        &:last-child {
            margin-bottom: 0;
        }

    }


}

</style>
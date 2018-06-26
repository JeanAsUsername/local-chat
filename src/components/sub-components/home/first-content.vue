
<template>
    <section>
        <div class="first__texts">

            <h1 class="texts__main">Local chat</h1>

            <div>

                <p class="texts__pa1">This project consist in a real time chat system using WebSockets.</p>
                <p class="texts__pa2">The technologies used in this project are:</p>

                <ul class="texts__list">
                    <li>HTML</li>
                    <li>CSS (Sass)</li>
                    <li>JavaScript (Vue.js)</li>
                    <li>Webpack</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>Firebase</li>
                    <li>And WebSockets</li>
                </ul>

            </div>

            
        </div>
        <div class="first__images">
            <div class="image"></div>
        </div>
    </section>
</template>

<script>
export default {

    data() {
        return {

        }
    }

}
</script>

<style lang="scss" scoped>

// import stylesheets
@import '../../css/main';
// padding
.content__first {

    display: grid;
    height: min-content;
    grid-template-areas:
    "texts"
    "images";

    background-color: $normal-black;

}

.first__texts {

    grid-area: texts;
    display: flex;
    height: min-content;
    min-height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
// padding 
.first__texts div {
    padding: 10px;
}

.texts__main, 
.texts__pa1, 
.texts__pa2, 
.texts__list li {
    color: $normal-white;
    font-family: $ubuntu;
}

.texts__main {
    font-size: 30px;
}
//margin 
.texts__pa1{
    margin-bottom: 5px;
} 
.texts__pa2 {
    margin-bottom: 10px;
}


.texts__list li {

    margin-bottom: 2px;

    list-style-position: inside;
}

.first__images {

    height: min-content;
    min-height: 30vh;
}

@media screen and (max-width: 800px) {

    .content__first {
        min-height: 90vh;
        padding-top: 50px;
    }
    
}




</style>

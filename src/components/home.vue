

<template>
    <main>
        <vue-header class="main__header"></vue-header>
        <section class="main__content">
            <first-content class="content__first"></first-content>
        </section>
        <vue-footer class="main__footer"></vue-footer>
    </main>
</template>

<script>
// components
import vueHeader from './sub-components/header.vue'
import vueFooter from './sub-components/footer.vue'
import firstContent from './sub-components/home/first-content.vue'

export default {

    data() {
        return {

        }
    },

    components: {
        vueHeader,
        vueFooter,
        firstContent
    }

}
</script>

<style lang="scss">

//import styles
@import './css/main';

main {

    display: grid;
    grid-template-areas: 
    "header"
    "content"
    "footer";
}

.main__header {

    grid-area: header;
}

.main__content {

    display: grid;
    grid-area: content;
    grid-template-areas:
    "first-content";
}

.content__first {

    grid-area: first-content;
}

.main__footer {

    grid-area: footer;
}


</style>


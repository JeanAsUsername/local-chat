
<template>
    <footer>
        <p class="footer__copyright">@2018 Lorem Ipsum</p>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

//import stylesheets
@import '../css/main';

//padding
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: min-content;
    min-height: 10vh;
    padding: 15px;

    background-color: $normal-white;
    box-shadow: 0px -5px 10px black;

}

.footer__copyright {
    color: $normal-black;
    font-family: $ubuntu;
    text-align: center;
}



</style>
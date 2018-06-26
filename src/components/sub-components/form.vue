
<template>

    <section>
        <form action="" class="first__form" @submit.prevent="submit">

            <fieldset class="form__fieldset">

                <legend class="fieldset__legend">{{operation}}</legend>
                <div class="fieldset__error" v-if="credentialsErr">
                    <p>Invalid credentials</p>
                    <p>Try again</p>
                </div>
                <div class="fieldset__serverError" v-else-if="serverErr">
                    <p>Internal Error</p>
                    <p>Try again later</p>
                </div>
                <div class="fieldset__container">
                    
                    <div class="form__field" v-for="field in fields" :key="field.name">
                        <label
                        class="field__label" 
                        :for="field.model.name">
                        {{field.label}}<span :data-err="field.model.name"></span> 
                        </label>
                        <input v-model="data[field.model.name]" :type="field.type" :name="field.model.name" :id="field.model.name" :autocomplete="field.autocomplete">
                    </div>

                    <div class="container__options">
                        <input v-model="data.color" type="color" name="color" v-if="colorField" class="options__color">
                        <slot name="options">

                        </slot>
                        <input type="submit" :value="operation" class="form__submit"> 
                    </div>
                    

                </div>
            </fieldset>
        </form>
    </section>
    
</template>

<script>
export default {

    data() {
        return {
            
        }
    },
    
    created() {
        this.data = {}
        this.fields.forEach((field) => {
            this.data[field.model.name] = field.model.value
        })
        if (!this.colorField) return

        this.data.color = this.colorField
    },

    props: {
        fields: {
            type: Array,
            required: true
        },
        operation: {
            type: String,
            required: true
        },
        colorField: {
            type: String
        },
        credentialsErr: {
            type: Boolean,
            default: false
        },
        serverErr: {
            type: Boolean,
            default: false
        }
    },
    
    methods: {

        submit() {
           this.$emit('submit', this.data)
        }
    }

}
</script>

<style lang="scss" scoped>

//import stylesheets
@import '../css/main';
//padding 
.content__first {
    display: flex;
    height: min-content;
    min-height: 80vh;
    padding: 20px;
    justify-content: center;
    align-items: center;

    background-color: $normal-black;
}

.fieldset__container, .form__field {
    display: flex;
    flex-direction: column;
}
// padding && margin
.fieldset__legend {
    color: $normal-white;
    font-family: $roboto;
    margin: auto;
    padding: 0 10px;
}

.fieldset__legend + .fieldset__container {
    padding-top: 30px;
}

//padding
.fieldset__container {
    padding: 30px;
    padding-top: 0;
    align-items: flex-start;
    

}
//margin
.form__field {
    margin-bottom: 20px;

    &:hover > label::before {
        right: 0;
    }
}

.form__field > label,
.form__submit {

    font-family: $roboto;
    font-size: 14px;

}

.form__field > label {
    position: relative;
    width: fit-content;
    margin-bottom: 4px;
    overflow: hidden;

    color: $normal-white;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        right: 100%;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid $normal-white;
        transition: all 300ms;
    }
    
}
// input -- padding
.form__field > input {
    padding: 5px;

    font-family: $roboto;
}

.container__options {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & > .options__color,
        .form__submit {
        width: 80%;
        margin-bottom: 20px;
        cursor: pointer;
    }

    & input:last-child {
        width: fit-content;
        margin-bottom: 0;
    }
}

// input -- padding 
.form__submit {
    padding: 4px 8px;
    transition: all 300ms;
    border: none;

    color: $normal-black;
    background-color: $normal-white;
    font-weight: 600;

    &:hover {
        background-color: rgb(180, 180, 180)
    }

    &:focus {
        outline: none;
    }

}

.fieldset__error,
.fieldset__serverError {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;

    color: rgba(255, 0, 0, 0.8);
    font-family: $roboto;
    font-size: 15px;
}


@media screen and (max-width: 800px) {

    .content__first {
        min-height: 90vh;
        padding-top: 50px;
    }
    
}


</style>


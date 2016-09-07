<template >
    <div class="imageupload">
    <div v-show="!image">
        <label class="glyph-icon flaticon-picture">
            <input type="file" @change="onFileChange">
        </label>
    </div>
    <div v-show="image">
        <img v-bind:src="image" />
        <button @click="removeImage" class="removeImage">Remove image</button>
    </div>
    </div>
</template>

<script type="text/babel">
    import img from '../directives/img'
    import Config from "config";


    export default {

        props: ['image'],

        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            },
            saveImage() {
                this.$http.post(Config.API_URL + 'images/upload', {image: this.image}, results => {
                    console.log(results.result)
                }).error( err => {
                    throw (err);
                })
            }
        }
    }
</script>

<style lang="sass">
    @import "../styles/globals.scss";


    .imageupload img{
        width: 50%;
        margin: 40px auto;
        display: block;
    }

    .glyph {
        text-align: center;
        display: inline-block;
        width: 9em;
        margin: 1em;
        text-align: center;
        vertical-align: top;
        background: #FFF;
    }


    .glyph-icon {
        margin: 20px auto;
        text-align: center;
        padding: 10px;
        display: block;
        font-family: "Flaticon";
        font-size: 64px;
        line-height: 1;
        color: $salomon;
    }

     input[type="file"] {
         height: 0;
          display: none;
         visibility: hidden;
     }

     label {
         opacity: 0.9;
     }


    label:hover {
        opacity: 1;
        cursor: pointer;
    }

    .removeImage {
        font-size: 12px;
        border: none;
        margin: 0 auto;
    }

</style>



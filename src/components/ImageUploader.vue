<template >
    <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange">
    </div>
    <div v-else>
        <img v-bind:src="image" />
        <button @click="removeImage">Remove image</button>
        <button @click="saveImage">Save image</button>
    </div>
</template>

<script type="text/babel">
    import img from '../directives/img'
    import Config from "config";


    export default {


        data () {
            return {
                image: ''
            }
        },
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
    #app {
        text-align: center;
    }
    img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
    button {

    }
</style>



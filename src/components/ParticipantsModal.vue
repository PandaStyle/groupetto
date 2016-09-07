<template>
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
        <div class="modal-container" @click.stop>
            <div class="modal-header">
                <h3>Select who you would like to ride with</h3>
                <img v-bind:src="item.profile_medium" alt="" v-for="item in selectedathletes">
            </div>

            <div class="modal-body">
               <div class="menu">
                   <span @click="setSelectedTab('following')" >Following</span>
                   <span @click="setSelectedTab('search')">Search for athletes</span>
               </div>
               <div class="routes">
                   <div v-show="selectedTab == 'following'">
                       <input type="text" v-model="searchName">
                       <athlete-item
                                     @click="addAthlete(item)"
                                     v-for="item in filteredItems"
                                     :item="item">
                       </athlete-item>
                   </div>

                   
                   <div v-show="selectedTab == 'search'">
                       Search for athletes
                       <input type="text">
                   </div>

               </div>

            </div>


        </div>
    </div>
</template>

<script type="text/babel">
    import Config from "config";
    import AthleteItem from "./AthleteItem.vue";

    export default {
        props: ['show', 'selectedathletes'],
        components: {
            AthleteItem
        },
        data () {
            return {
                selectedTab: null,
                followingAthletes: null,
                title: '',
                body: '',
                searchName: ''
            }
        },
        computed: {
            filteredItems: function () {
                return this.$options.filters.filterBy(this.followingAthletes, this.searchName);
            }
        },
        methods: {
            setSelectedTab (t) {
                console.log(t)
                this.selectedTab = t;
            },
            setSelectedRoute(item) {
               this.selectedRouteId = item.id;
            },
            addAthlete(a){
                this.selectedathletes.push(a)
            },
            close: function () {
                this.show = false;
                this.title = '';
                this.body = '';
            },
            savePost: function () {
                // Insert AJAX call here...
                this.close();
            }
        },

        ready: function () {
            var followingURL = "strava/following";

            this.$http.get(Config.API_URL + followingURL, results => {
                console.log(results.result)
               this.followingAthletes = results;
            }).error( err => {
                throw (err);
            })


            document.addEventListener("keydown", (e) => {
                if (this.show && e.keyCode == 27) {
                    this.close();
                }
            });
        }
    }
</script>


<style>
    .add {
        font-size: 14px;
        padding: 10px 15px;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }

    .modal-container {
        width: 800px;
        max-height: 80vh;
        overflow: auto;
        margin: 40px auto 0;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .text-right {
        text-align: right;
    }

    .form-label {
        display: block;
        margin-bottom: 1em;
    }

    .form-label > .form-control {
        margin-top: 0.5em;
    }

    .form-control {
        display: block;
        width: 100%;
        padding: 0.5em 1em;
        line-height: 1.5;
        border: 1px solid #ddd;
    }

    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
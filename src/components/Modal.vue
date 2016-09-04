<template>
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
        <div class="modal-container" @click.stop>
            <div class="modal-header">
                <h3>Select you route</h3>
            </div>

            <div class="modal-body">
               <div class="menu">
                   <span @click="setSelectedTab('myroutes')" class="myroutes">My Routes</span>
                   <span @click="setSelectedTab('myactivities')" class="myactivities">My Activities</span>
               </div>
               <div class="routes">
                   <map-item v-show="selectedTab == 'myroutes'"
                             v-bind:class="{'selected' : selectedRouteId == item.id }"
                             @click="setSelectedRoute(item)"
                             class="mapitem"
                             v-for="item in myrouteitems"
                             :item="item">
                   </map-item>
                   <map-item v-show="selectedTab == 'myactivities'"
                             v-bind:class="{'selected' : selectedRouteId == item.id }"
                             @click="setSelectedRoute(item)"
                             class="mapitem"
                             v-for="item in myactivityitems"
                             :item="item">
                   </map-item>
               </div>

            </div>

            <div class="modal-footer text-right">
                <button class="modal-default-button" @click="savePost()">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Config from "config";
    import MapItem from "./MapItem.vue";

    export default {
        props: ['show'],
        components: {
            MapItem
        },
        data () {
            return {
                selectedTab: null,
                myrouteitems: null,
                myactivityitems: null,
                selectedRouteId: null,
                title: '',
                body: ''
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
            this.myrouteURL = "strava/myroutes";
            this.myactivityURL = "strava/myactivities";

            this.$http.get(Config.API_URL + this.myrouteURL, results => {
                console.log(results.result)
               this.myrouteitems = results;
            }).error( err => {
                throw (err);
            })

            this.$http.get(Config.API_URL + this.myactivityURL, results => {
                console.log(results.result)
                this.myactivityitems = results;
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
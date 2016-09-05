<template >
    <div class="event-list">


   <h1>List Events</h1>
  <event-item
            class="even"
            v-for="item in items"
            :item="item">
    </event-item>
      </div>
</template>


<script type="text/babel">
    import Config from "config";
    import EventItem from "./EventItem.vue";
    import myDatepicker from 'vue-datepicker'
    import places from 'places.js'
    import Modal from './Modal.vue'
    import ParticipantsModal from './ParticipantsModal.vue'


   export default {
        name: 'Events',

        components: {
            EventItem,
            'date-picker': myDatepicker,
            Modal,
            ParticipantsModal
        },

        data () {
            return {
                items: null
            }
        },

        route: {
            data (transition) {
                this.apiURL = Config.API_URL + "events";

                this.$http.get(this.apiURL, function (results, status, request) {

                    console.log(results)
                    transition.next({items: results});

                }).error(function (data, status, request) {
                    throw (data);
                })
            }
        },

       ready () {



       },

        methods: {
            loadMore () {
                console.log("loadmore");
            },

            saveEvent () {
                var event = {
                    creatorId: '1234',
                    title: this.title,
                    date: this.testTime,

                    type: this.type,
                    routeId: String,

                    participants: [],
                    private: Boolean,

                    description: String
                }


            }
        }
    }
</script>

<style>
    .event-list {
        margin-left: 100px;
    }
</style>

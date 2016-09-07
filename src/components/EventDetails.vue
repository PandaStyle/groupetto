<template>
   <div class="container details">

      <img class="eventimage" v-bind:src="event.imageUrl" alt="">
      <h2>{{event.title}}</h2>


      <span class="icon flaticon-user-1"></span><span class="text">{{event.creatorId}}</span>

      <div class="row">
         <span class="icon flaticon-compass"></span><span class="text">{{event.route.name}}</span>
         <span class="icon flaticon-calendar"></span><span class="text">{{humanizedDate}}</span>
         <span class="icon flaticon-pin"></span><span class="text">{{event.meetingPoint}}</span>
         <span v-if="item.type" class="icon flaticon-bicycle-1"></span><span class="text">{{event.type}}</span>
      </div>

      <div class="desc">{{event.description}}</div>

      <div class="separator"></div>

      <div class="text-title">ROUTE</div>

      <map-item v-if="event.route"
                class="mapitem"
                :item="event.route">
      </map-item>

      <div class="separator"></div>

      <div class="text-title">PEOPLE JOINED</div>
      <div style="width: 600px; margin: 20px auto">
         <div style="float: left;"  v-for="p in event.participants">
            <div class="profile" v-bind:style="{ backgroundImage: 'url(' + p.profile_medium + ')' }"></div>
         </div>
      </div>

      <div class="cta" style="width: 100%; float: left;" >
         <button>JOIN</button>
         <a class="back" href="/#/">or go back</a>
      </div>

   </div>
</template>


<script type="text/babel">
    import Config from "config";
    import EventItem from "./EventItem.vue";
    import myDatepicker from 'vue-datepicker'
    import places from 'places.js'
    import Modal from './Modal.vue'
    import ParticipantsModal from './ParticipantsModal.vue'
    import MapItem from "./MapItem.vue";
    import vSelect from "vue-select"
    import Multiselect from 'vue-multiselect'
    import moment from "moment";


   export default {

      name: 'EventDetails',

        components: {
            MapItem
        },

      data () {
         return {
            event: null,
            humanizedDate: moment(event.date).format('MMM D, h:mm a'),
         }
      },



       route: {
           data (transition) {
               this.apiURL = Config.API_URL + "events/" + this.$route.params.id;

               this.$http.get(this.apiURL, function (results, status, request) {

                   console.log(results)
                   transition.next({event: results});

               }).error(function (data, status, request) {
                   throw (data);
               })
           }
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
                    description: this.description,
                    meetingPoint: this.meetingpoint,
                    type: this.type,
                    participants: this.participants,
                    private: this.isPrivate,
                    route: this.selectedRoute
                }

                this.$http.post(Config.API_URL + 'events', event, results => {
                    console.log(results.result)
                }).error( err => {
                    throw (err);
                })
            }
        }
    }
</script>

<style lang="sass">
    @import '../styles/form.scss';
    @import '../styles/deatils.scss';



    .staticmap {
        float: right !important;
    }



</style>

<template >
    <div class="event-list">


   <h1>Events</h1>
 <!--   <event-item
            class="even"
            v-for="item in items"
            :item="item">
    </event-item>-->
        <div class="title">
            Title:
            <input type="text"/>
        </div>
        <div class="card">
            <div class="row">
                <span>Start time：</span>
                <date-picker :time.sync="testTime" :option="timeoption"></date-picker>
            </div>
        </div>
        <div class="tyoe">
            Type:
            <select>
                <option value="leasue">leasue</option>
                <option value="groupride">groupride</option>
                <option value="training">training</option>
            </select>
        </div>
        <div class="route">
            Select route:
            <modal :show.sync="showModal"></modal>
            <button id="show-modal" @click="showModal = true">Select Route</button>
        </div>
        <div class="route">
            Invite poeple to join:
            <participants-modal :show.sync="showAthleteModal"></participants-modal>
            <button  @click="showAthleteModal = true">Select People</button>
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
                items: null,
                showModal: false,
                showAthleteModal: false,
                dataPropWithPlaceString: "",
                starttime: '',
                endtime: '2016-01-19',
                testTime: '',
                multiTime: '',
                option: {
                    type: 'day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-MM-DD',
                    placeholder: 'when?',
                    inputStyle: {
                        'display': 'inline-block',
                        'padding': '6px',
                        'line-height': '22px',
                        'font-size': '16px',
                        'border': '2px solid #fff',
                        'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                        'border-radius': '2px',
                        'color': '#5F5F5F'
                    },
                    color: {
                        header: '#ccc',
                        headerText: '#f00'
                    },
                    buttons: {
                        ok: 'Ok',
                        cancel: 'Cancel'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                },
                timeoption: {
                    type: 'min',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format: 'YYYY-MM-DD HH:mm'
                },
                multiOption: {
                    type: 'multi-day',
                    week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    format:"YYYY-MM-DD HH:mm"
                },
                limit: [{
                    type: 'weekday',
                    available: [1, 2, 3, 4, 5]
                },
                    {
                        type: 'fromto',
                        from: '2016-02-01',
                        to: '2016-02-20'
                    }]
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
            }
        }
    }
</script>

<style>
    .event-list {
        margin-left: 100px;
    }
</style>

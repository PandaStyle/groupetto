<template>
   <h1>Create Event</h1>
    <form action="" v-on:submit.prevent>
    <div class="formelem">
        <fieldset class="form-fieldset ui-input __first">
            <input type="text" v-model="title" id="name"  tabindex="0" required/>
            <label for="name">
                <span data-text="Name">Name</span>
            </label>
        </fieldset>
    </div>

    <div class="formelem">
        <div class="datepicker-holder">
        <fieldset class="form-fieldset ui-input __first">
            <input type="text" v-model="testTime" id="starttime"  tabindex="0" />

            <label for="starttime">
                <span data-text="Start time">Start time</span>
            </label>
        </fieldset>
        <date-picker id="starttime" :time.sync="testTime" :option="timeoption"></date-picker>
        </div>
    </div>

    <div class="formelem">
        <fieldset class="form-fieldset ui-input __first">
            <input type="text" v-model="meetingpoint" id="meetingpoint"  tabindex="0" />
            <label for="name">
                <span data-text="Meeting point">Meeting Point</span>
            </label>
        </fieldset>
    </div>

    <div class="formelem">
        <fieldset class="form-fieldset ui-input __first">
            <input type="text" v-model="description" id="desc"  />
            <label for="desc">
                <span data-text="description">description</span>
            </label>
        </fieldset>
    </div>

    <div class="formelem">
        <div class="route">
            <span class="halfgrey">ROUTE</span>
            <map-item v-if="selectedRoute"
                      class="mapitem"
                      :item="selectedRoute">
            </map-item>
            <modal :selectedroute.sync="selectedRoute" :show.sync="showModal"></modal>
            <button id="show-modal" @click="showModal = true">Select Route</button>
        </div>
    </div>

    <div class="formelem">
        <div class="type" >
            Type:
            <select v-model="type">
                <option value="leasue">leasue</option>
                <option value="groupride">groupride</option>
                <option value="training">training</option>
            </select>
        </div>
    </div>


    <div class="formelem">
        <div class="invite">
            Invite poeple to join:
            <div class="participant" v-for="p in participants"><span>{{p.firstname}}</span></div>
            <participants-modal  :selectedathletes.sync="participants" :show.sync="showAthleteModal"></participants-modal>
            <button  @click="showAthleteModal = true">Select People</button>
        </div>
    </div>

    <div class="formelem">
        <span>Private</span>
        <input type="checkbox" v-model="isPrivate">
    </div>

    <div class="submit-row">
        <button @click="saveEvent" type="submit">Submit</button>
    </div>
    </form>
</template>


<script type="text/babel">
    import Config from "config";
    import EventItem from "./EventItem.vue";
    import myDatepicker from 'vue-datepicker'
    import places from 'places.js'
    import Modal from './Modal.vue'
    import ParticipantsModal from './ParticipantsModal.vue'
    import MapItem from "./MapItem.vue";


   export default {
        name: 'CreateEvent',

        components: {
            EventItem,
            'date-picker': myDatepicker,
            Modal,
            ParticipantsModal,
            MapItem
        },

        data () {
            return {
                title: null,
                type: null,
                description: null,
                isPrivate: null,
                meetingpoint: null,
                participants: [],
                selectedRoute: null,

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

<style>
    @import '../styles/form.scss';
    .event-list {
        margin-left: 100px;
    }

.cov-vue-date {
    position: absolute;
    top:0;
    width: 100%;
}

.cov-datepicker {
    height: 54px;
    width: 100%;
    z-index: 10;
    border: none;
    font-size: 24px;
    color: black;
}
    
    .datepicker-holder {
        position: relative;


    }

    .halfgrey {
        position: relative;
        color: rgba(0, 0, 0, 0.5);
        transition: color 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .formelem {
        margin-bottom: 20px;
    }

</style>

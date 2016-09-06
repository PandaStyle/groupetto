<template>
   <h1>Event details</h1>
   {{event.description}}
   {{event}}
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


   export default {
        name: 'CreateEvent',

        components: {
            EventItem,
            'date-picker': myDatepicker,
            Modal,
            ParticipantsModal,
            MapItem,
            vSelect,
            Multiselect
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

        data () {
            return {
                event: null,
                title: null,
                type: null,
                description: null,
                isPrivate: null,
                meetingpoint: null,
                participants: [],
                selectedRoute: null,
                selectedType: null,
                typeOptions: ['training','groupride','tempo', 'intervals', 'coffee ride',  'leasure', 'hammer', 'drop', 'no-drop'],
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

<style lang="sass">
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
        font-size: 14px;
        position: relative;
        color: rgba(0, 0, 0, 0.5);
        transition: color 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .formelem {
        float: left;
        width: 100%;
        margin-bottom: 20px;
        padding: 10px;
    }

    .staticmap {
        float: right !important;
    }



</style>

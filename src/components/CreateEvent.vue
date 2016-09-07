<template>
   <h1>Create Event</h1>
    <form action="" v-on:submit.prevent>
    <div class="formelem">
        <fieldset class="form-fieldset ui-input __first">
            <input type="text" v-model="title" id="name"  tabindex="0"/>
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

        <div class="separator"></div>

    <div class="formelem type">
        <div class="title halfgrey">TYPE</div>
        <multiselect multiple :options="typeOptions" :selected="selectedType"></multiselect>
    </div>

    <div class="formelem">
        <div class="route">
            <div class="title halfgrey">ROUTE</div>
            <map-item v-if="selectedRoute"
                      class="mapitem"
                      :item="selectedRoute">
            </map-item>
            <div>
                <modal :selectedroute.sync="selectedRoute" :show.sync="showModal"></modal>
                <button id="show-modal" @click="showModal = true">Select Route</button>
            </div>
        </div>
    </div>

        <div class="formelem">
            <div class="title halfgrey">Select an image</div>
            <div class="imageupload">
               <image-uploader :image.sync="image"></image-uploader>
            </div>
        </div>


    <div class="formelem invite">

            <div class="title halfgrey">INVITE FRIENDS</div>
            <div class="participant" v-for="p in participants"><span>{{p.firstname}}</span></div>
            <participants-modal  :selectedathletes.sync="participants" :show.sync="showAthleteModal"></participants-modal>
                <label class="glyph-icon flaticon-user" @click="showAthleteModal = true">

                </label>


    </div>

    <div class="formelem">
        <span>Private</span>
        <input type="checkbox" v-model="isPrivate">
    </div>

    <div class="submit-row">
        <button @click="saveEvent" type="submit">Create Ride</button>
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
    import vSelect from "vue-select"
    import Multiselect from 'vue-multiselect'
    import ImageUploader from './ImageUploader.vue'


   export default {
        name: 'CreateEvent',

        components: {
            EventItem,
            'date-picker': myDatepicker,
            Modal,
            ParticipantsModal,
            MapItem,
            vSelect,
            Multiselect,
            ImageUploader
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
                selectedType: null,
                typeOptions: ['training','groupride', 'tempo', 'intervals', 'coffee ride', 'leasure', 'skill', 'hammer', 'tour', 'drop', 'no-drop'],
                showModal: false,
                showAthleteModal: false,
                image: null,


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
                    route: this.selectedRoute,
                    image: this.image
                }

                this.$http.post(Config.API_URL + 'events', event, results => {
                    console.log(results.result)
                    this.$router.go('/')
                }).error( err => {
                    throw (err);
                })
            }
        }
    }
</script>

<style lang="sass">
    @import '../styles/form.scss';


</style>

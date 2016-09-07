<template >
    <div class="newsitem list">

        <div class="tile-image"><img v-bind:src="item.imageUrl" alt=""/></div>
        <header>
            <a class="title" href="{{item.title}}" target="_blank">{{item.title}}</a>
            <div class="subtitle">by <a class="creatorlink" href="https://www.strava.com/athletes/{{item.creator.id}}" target="_blank">{{item.creator.name}}</a></div>
            <div class="info">
                <span class="icon flaticon-compass"></span><span class="text">{{item.route.name}}</span>
                <span class="icon flaticon-calendar"></span><span class="text">{{humanizedDate}}</span>
                <span class="icon flaticon-pin"></span><span class="text">{{item.meetingPoint}}</span>
                <span v-if="item.type" class="icon flaticon-bicycle-1"></span><span class="text">{{item.type}}</span>
            </div>
            <div class="summary">{{{item.description}}}</div>
            <div class=meta>
                <span class="share general" v-bind:class="[isShareActive ? 'icon-cross' : 'icon-share-alternitive']" @click="toggleShare(item.title)"></span>
                <a @click="shareItemClick(item.title, 'twitter')" target="_blank" href="https://twitter.com/intent/tweet?original_referer=http://velopedia.co&text={{item.title}}&tw_p=tweetbutton&url={{item.link}}&via=velopedia.co" class="share twitter icon-twitter" v-show="isShareActive"></a>
                <a @click="shareItemClick(item.title, 'facebook')" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{item.link}}&t={{item.title}}" class="popup share facebook icon-facebook" v-show="isShareActive"></a>
                <a @click="shareItemClick(item.title, 'pocket')" target="_blank" href="https://getpocket.com/save?url={{item.link}}" class="share pocket icon-get-pocket" v-show="isShareActive"></a>
                <a @click="shareItemClick(item.title, 'mail')" target="_blank" href="mailto:?Subject=From Velopedia: {{item.title}}&Body=Check%20this%20out%20 {{item.link}}" class="share linkedin icon-paper-plane" v-show="isShareActive"></a>
            </div>

            <span class="already" v-if="isOrganizer">You organized</span>

            <span class="already" v-if="hasJoined">You are going!</span>

            <button class="join"  @click="join" data-id="{{item._id}}" v-if="!hasJoined && !isOrganizer">Join Ride</button>

            <button class="viewmore" @click="detailClick">details</button>
        </header>
    </div>
</template>

<script type="text/babel">
    import Config from "config";
    import img from '../directives/img'
    import MapItem from "./MapItem.vue";
    import moment from "moment";
    import _ from "lodash";

    export default {
        name: 'EventItem',

        components: {
            MapItem
        },

        props: {
            item: Object,
            userid: Number
        },

        data () {
            return {
                humanizedDate: moment(this.item.date).format('MMM D, h:mm a'),
                isShareActive: false,
                hasJoined: _.find(this.item.participants, {id: this.userid}),
                isOrganizer: this.item.creator.id === this.userid
            }
        },

        ready () {

        },

        methods: {

            toggleShare (title) {


                this.isShareActive = !this.isShareActive;
            },

            detailClick () {
                this.$router.go('/' + this.item._id)
            },

            join () {
                this.$http.post(Config.API_URL + 'join', {eventId: this.item._id}, results => {
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
    @import "../styles/newsitem.scss";
</style>



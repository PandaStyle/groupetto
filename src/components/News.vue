<template>
    <news-item
            class="list"
            v-for="item in items"
            :item="item">
    </news-item>
</template>


<script type="text/babel">
    import NProgress from 'nprogress';
    import _ from "lodash";

    import Config from "config";
    import NewsItem from "./NewsItem.vue";

    import Feeds from "../const/feeds";

    export default {
        name: 'News',

        components: {
           NewsItem
        },

        data () {
            return {
                items: null
            }
        },

        route: {
            data (transition) {
                this.fetchItems(transition);
            }
        },

        ready () {
            mixpanel.track("News page load");

            localStorage.setItem("velopedia_current_tab", '/news');
        },

        events: {
            'reload-news': function()  {
                this.fetchItems();
            }
        },

        methods: {
            loadMore () {
                console.log("loadmore");
            },

            fetchItems (transition) {
                NProgress.start();

                if(!localStorage.getItem("feeds"))
                    localStorage.setItem("feeds", JSON.stringify(Feeds));

                let apiURL = Config.API_URL + "news";

                let exludedFeeds = _.difference(Feeds, JSON.parse(localStorage.getItem('feeds')));

                this.$http.post(apiURL, {excluded: JSON.stringify(exludedFeeds) }, function (results, status, request) {

                    if(transition)
                        transition.next({items: results.feed})

                    this.items = results.feed;

                }).error(function (data, status, request) {
                    throw (data);
                })
            }
        }
    }
</script>


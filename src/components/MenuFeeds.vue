<template>
    <div class="menusettings">
        <span class="title">Select news feeds</span>
        <ul>
            <li>
                <input class="sw" type="checkbox" id="bikeradar" value="bikeradar" v-model="checkedNames">
                <label for="bikeradar"></label>
                <span class="link bikeradar" @click="toggle">Bikeradar  <a target="_blank" href="http://www.bikeradar.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="cyclingindustry" value="cyclingindustry" v-model="checkedNames">
                <label for="cyclingindustry"></label>
                <span class="link cyclingindustry" @click="toggle">Cycling Industry  <a target="_blank" href="http://www.cyclingindustry.news" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="cyclingnews" value="cyclingnews" v-model="checkedNames">
                <label for="cyclingnews"></label>
                <span class="link cyclingnews" @click="toggle">Cyclingnews  <a target="_blank" href="http://www.cyclingnews.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="cyclingtips" value="cyclingtips" v-model="checkedNames">
                <label for="cyclingtips"></label>
                <span class="link cyclingtips" @click="toggle">Cyclingtips  <a target="_blank"  href="http://www.cyclingtips.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="cyclingweekly" value="cyclingweekly" v-model="checkedNames">
                <label for="cyclingweekly"></label>
                <span class="link cyclingweekly" @click="toggle">Cyclingweekly  <a target="_blank" href="http://www.cyclingweekly.co.uk" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="pelotonmagazine" value="pelotonmagazine" v-model="checkedNames">
                <label for="pelotonmagazine"></label>
                <span class="link pelotonmagazine" @click="toggle">Peloton Magazine  <a target="_blank" href="http://www.pelotonmagazine.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="pezcycling" value="pezcycling" v-model="checkedNames">
                <label for="pezcycling"></label>
                <span class="link pezcycling" @click="toggle">Pezcycling  <a target="_blank" hhref="http://www.pezcyclingnews.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="roadcc" value="roadcc" v-model="checkedNames">
                <label for="roadcc"></label>
                <span class="link roadcc" @click="toggle">Road.cc  <a target="_blank" href="http://www.road.cc" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="roadbikeaction" value="roadbikeaction" v-model="checkedNames">
                <label for="roadbikeaction"></label>
                <span class="link roadbikeaction" @click="toggle">Roadbikeaction  <a target="_blank"  href="http://www.roadbikeaction.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="theinnerring" value="theinnerring" v-model="checkedNames">
                <label for="theinnerring"></label>
                <span class="link theinnerring" @click="toggle">The Inner Ring  <a target="_blank"  href="http://inrng.com" class="iconlink icon-link"></a></span>
            </li>
            <li>
                <input class="sw" type="checkbox" id="velonews" value="velonews" v-model="checkedNames">
                <label for="velonews"></label>
                <span class="link velonews" @click="toggle">Velonews  <a target="_blank" href="http://velonews.competitor.com" class="iconlink icon-link"></a></span>
            </li>
        </ul>
        <div class="contact">
            <div class="title">Contact</div>
            <a href="http://www.velopedia.co/#!/about" target="_blank">About</a>
            <a href="http://www.velopedia.co/#!/contact?qs=feedback" target="_blank">Feedback</a>
            <a href="http://www.velopedia.co/#!/contact?qs=suggest" target="_blank">Suggest feed</a>
        </div>
        <div class="get-ext">
            <button class="button" @click="redirectToLanding"><i class="iconchrome icon-chrome"></i>Get Chrome Extension</button>
        </div>

    </div>
</template>

<script type="text/babel">
    import jQuery from 'jquery'
    import FEEDS from '../const/feeds'

    function fetchArray(key){
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        }
        saveArray("feeds", FEEDS);

        return FEEDS;
    }

    function saveArray(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    export default {
        name: 'MenuFeeds',

        data () {
            return {
                checkedNames: fetchArray("feeds")
            }
        },

        ready () {
            this.colorFeeds()
        },

        watch: {
            'checkedNames': function (val) {
                console.log(val);

                this.colorFeeds();
                saveArray("feeds", val);

                this.$parent.$parent.$parent.$broadcast('reload-news');
            }
        },

        methods: {
            colorFeeds() {
                var val = this.checkedNames;
                jQuery('.link').css('color', 'grey');
                val.forEach( i => {
                    var a = jQuery('.' + i);
                    a.css('color', 'white');
                });
            },

            toggle (a, b) {
                if(a.currentTarget.parentNode.querySelector('input').checked) {
                    this.checkedNames.$remove(a.currentTarget.parentNode.querySelector('input').id)
                } else {
                    this.checkedNames.push(a.currentTarget.parentNode.querySelector('input').id)
                }
            },

            redirectToLanding() {
                window.open('http://www.velopedia.co', '_blank');
            }
        }

    }
</script>



<style scoped lang="sass">
    @import "../styles/globals.scss";
    @import "../styles/toggleButton.scss";

    .menusettings {
        margin: 20px;

        .title {
            font-size: 24px;
            color: white;
            font-family: "Futura", sans-serif;
        }

        ul {
            padding: 0;
            margin-top: 10px;
            margin-bottom: 30px;
        }

        li {
            list-style: none;
            margin: 0;
            padding: 0;
            line-height: 30px;

            .link {
                text-decoration: none;
                color: #f7f7f7;
                font-family: 'Varela', sans-serif;
                font-size: 16px;
                margin-left: 10px;
            }
        }

        label:hover {
            cursor: pointer;
        }

        h2 {
            font-size: 2rem;
            color: $menu-item-white;
        }

        .contact {
            .title {
                margin-bottom: 5px;
            }

            a {
                display: block;
                font-size: 16px;
                font-family: 'Varela', sans-serif;
                color: #fff;
                line-height: 25px;
            }
        }

        .iconlink {
            color: darkgray;
            text-decoration: none;
            font-size: 14px;
            margin-left: 10px;
            display: none;

            &:hover {
                 color: #fff;
             }
        }

        .link:hover {
            cursor: pointer;

            .iconlink{
                display: inline;
            }
        }

        .iconchrome {
            padding-right: 10px;
        }

        .get-ext {
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }


</style>

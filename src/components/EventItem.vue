<template >
    <div>
        <div class="desc">
            <div class="creator">{{item.creatorId}}</div>
            <div class="title">{{item.title}}</div>
            <map-item v-if="item.route.map"
                    class="mapitem"
                      :item="item.route">
            </map-item>
        </div>
    </div>
</template>

<script type="text/babel">
    import img from '../directives/img'
    import MapItem from "./MapItem.vue";

    export default {
        name: 'EventItem',

        components: {
            MapItem
        },

        props: {
            item: Object
        }
    }
</script>

<style lang="sass">
    @import "../styles/stravaitem.scss";
</style>



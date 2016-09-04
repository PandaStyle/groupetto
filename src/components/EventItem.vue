<template >
    <div>
        <div class="desc">
            <div class="creator">{{item.creatorId}}</div>
            <div class="title">{{item.title}}</div>
        </div>
    </div>
</template>

<script type="text/babel">
    import img from '../directives/img'

    export default {
        name: 'EventItem',

        props: {
            item: Object
        }
    }
</script>

<style lang="sass">
    @import "../styles/stravaitem.scss";
</style>



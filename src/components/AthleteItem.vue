<template >
    <div class="athleteItem">

        <img class="profile-img" v-bind:src="item.profile_medium"/>
        <div class="name">
            {{item.firstname}} {{item.lastname}}
        </div>
        <button class="add"> Add </button>
    </div>
</template>

<script type="text/babel">
    import img from '../directives/img'

    export default {
        name: 'AthleteItem',

        props: {
            item: Object
        }

    }
</script>

<style lang="sass" scoped>

    .athleteItem {
        width:100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .profile-img {
        width: 50px;
        float: left;
        margin-right: 20px;
    }

    .name {
        font-size: 16px;
        display: inline-block;
    }

    button.add {

        display: inline-block;
        margin: 10px;
    }

</style>


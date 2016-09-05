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
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .profile-img {
        float: left;
        margin-right: 10px;
    }

    .name {
        display: inline-block;
    }

    button.add {
        display: inline-block;
        margin: 10px;
    }

</style>


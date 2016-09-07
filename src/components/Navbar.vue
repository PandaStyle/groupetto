<template>
    <div class="sidebar" v-bind:class="{'open': isMenuOpen, 'hidden': $route.path == '/login',  'wide': isMenuWide }">

        <div class="logo-wrapper" v-bind:class="{'active' : isMenuOpen }">
           <logo></logo>
            <img class="g-text" style="    position: absolute;
    width: 120px;
    top: 21px;
    left: 65px;" src="../img/groupettp-name.png" alt="">
        </div>
        <div class="item content">
            <div class="menu" v-show="!isMenuOpen">
                <a  class="menu-item news" v-link="{ path: '/' }">
                    <div class="menu-icon flaticon-order fi"></div>
                    <span class="menu-title">All rides</span>
                </a>
                <a  class="menu-item insp" v-link="{ path: '/create' }">
                  <span class="menu-icon flaticon-add-place  fi"></span>
                    <span class="menu-title">Create new</span>
                </a>
                <a s class="menu-item instagram" v-link="{ path: '/myrides' }">
                    <span class="menu-icon flaticon-user-1 fi"></span>
                    <span class="menu-title">My rides</span>
                </a>
            </div>

            <div class="menu" v-show="isMenuOpen" transition="expand">
                <menu-container v-bind:active="isMenuOpen"></menu-container>
            </div>
        </div>
    </div>
    <div class="blackLayer"></div>
</template>

<script type="text/babel">
    import store from '../store';
    import MenuContainer from './MenuContainer.vue';
    import Logo from './Logo.vue';


    export default {
        name: 'Navbar',

        components: {
            MenuContainer,
            Logo
        },

        ready () {
            console.log(this.$route.path)
        },

        computed: {
            isMenuOpen () {
                return store.state.isMenuOpen
            },

            isMenuWide () {
                return store.state.isMenuWide
            }
        },

        methods: {
            toggleMenu () {
                store.dispatch('TOGGLE_MENU')
            },

        }
    }
</script>

<style lang="sass">
@import "../styles/sidebar.scss";

    .hidden {
        display: none;
    }
</style>

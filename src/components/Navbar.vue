<template>
    <div class="sidebar" v-bind:class="{'open': isMenuOpen, 'wide': isMenuWide }">

        <div class="logo-wrapper" v-bind:class="{'active' : isMenuOpen }">
           <logo></logo>
        </div>
        <div class="item content">
            <div class="menu" v-show="!isMenuOpen">
                <a @click="trackMenuclick('News')" class="menu-item news" v-link="{ path: '/news' }">
                    <div class="menu-icon flaticon-rss fi"></div>
                    <span class="menu-title">News</span>
                </a>
                <a @click="trackMenuclick('Inspiration')" class="menu-item insp" v-link="{ path: '/inspiration' }">
                  <span class="menu-icon flaticon-tumblr tumblr-1 fi"></span>
                    <span class="menu-title">Tumblr</span>
                </a>
                <a @click="trackMenuclick('Instagram')" class="menu-item instagram" v-link="{ path: '/instagram' }">
                    <span class="menu-icon flaticon-social fi"></span>
                    <span class="menu-title">Instagram</span>
                </a>
            </div>

            <div class="menu" v-show="isMenuOpen" transition="expand">
                <menu-container v-bind:active="isMenuOpen"></menu-container>
            </div>
        </div>
        <div class="burger" v-bind:class="{'active' : isMenuOpen }" @click="toggleMenu">
            <div class="col">
                <div class="con">
                    <div class="bar arrow-top-r"></div>
                    <div class="bar arrow-middle-r"></div>
                    <div class="bar arrow-bottom-r"></div>
                </div>
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

            trackMenuclick(menuitem) {
                mixpanel.track( menuitem + "Menu Click");
            }
        }
    }
</script>

<style lang="sass">
@import "../styles/sidebar.scss";
</style>

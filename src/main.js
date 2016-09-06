import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import $ from 'jquery';
import NProgress from '../node_modules/nprogress/nprogress.js';
import imagesLoaded from '../node_modules/imagesloaded/imagesloaded.js';


import App from './components/App.vue'

import StravaLogin from './components/StravaLogin.vue'
import StravaMain from './components/StravaMain.vue'
import StravaItem from './components/StravaItem.vue'
import MapItem from './components/MapItem.vue'

import Events from './components/Events.vue'
import CreateEvent from './components/CreateEvent.vue'
import EventDetails from './components/EventDetails.vue'
import EventItem from './components/EventItem.vue'

Vue.use(Router);
Vue.use(VueResource);
Vue.config.debug = true



// routing
var router = new Router({
  transitionOnLoad: true,
  hashbang: false
});

router.map({
  '/login': {
    component: StravaLogin
  },
  '/': {
    component: Events
  },
  '/events/create': {
    component: CreateEvent
  },
  '/events/:id': {
    component: EventDetails
  }
});

router.beforeEach((transition) => {
  if (transition.to.path != '/login' && document.cookie.indexOf("strava_access_token") < 0 ) {
      transition.redirect('/login')
  } else {
    transition.next()
  }
})

router.start(App, '#app', function () {

});


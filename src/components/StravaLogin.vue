<template >
   <h1>Log in with strava!</h1>
   <a href="https://www.strava.com/oauth/authorize?client_id=1016&response_type=code&redirect_uri=http://ridegruppetto.com/strava/tokenexchange&scope=write" class="connect"> </a>
</template>


<style>
   .connect {
      background-image: url('../img/ConnectWithStrava@2x.png');
      display: block;
      width: 342px;
      height: 63px;
   }
</style>
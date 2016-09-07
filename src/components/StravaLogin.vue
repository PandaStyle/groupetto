<template >
   <div class="loginpage">
      <div class="right">
         <img class="g-logo" src="../img/gruppetto-logo.png" alt="">
         <h1 class="login-h1">Never ride alone again.</h1>
         <a  href="https://www.strava.com/oauth/authorize?client_id=1016&response_type=code&redirect_uri=http://www.ridegruppetto.com/strava/tokenexchange&scope=write" class="connect"> </a>
      </div>

      <img class="bg" src="../img/bg.png" alt="">
   </div>
</template>


<style>

   .loginpage {
      margin-top:145px;
   }
   .g-logo {
      margin: 0 auto;
      margin-bottom: 87px;
      width: 160px;
   }
   .right {
      text-align: center;
      width: 300px;
      display: inline-block;
      vertical-align: top;

   }
.connect  {
   display: block;
   float: right;
}
   .login-h1{
      display: inline-block;
      float: right;

   }
   .bg {
      float: right;
      width: 600px;
      display: inline-block;
   }
   .connect {
      background-image: url('../img/ConnectWithStrava@2x.png');
      display: block;
      width: 200px;
      height: 100px;
      background-size: contain;
      background-repeat: no-repeat ;
      display: block;
      float: left;
      margin-left: 53px;
      margin-top: 30px;
   }
</style>
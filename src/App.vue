
<template>
  <v-app>
    <NavBar/>

    <v-main>
      <!-- Your main content here -->

      <router-view></router-view>
    </v-main>

    <Footer/>

  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'; // Import your NavBar component here
import Footer from './components/Footer.vue'; // Import your Footer component here

</script>


<style scoped>


</style>


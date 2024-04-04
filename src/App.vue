
<template>
  <v-app>
    <NavBar/>

    <v-main>

      <router-view></router-view>
    </v-main>

    <Footer/>

  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'; // Import your NavBar component here
import Footer from './components/Footer.vue'; // Import your Footer component here


import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>


<style scoped>



</style>


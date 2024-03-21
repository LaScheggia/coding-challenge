<template>
  <v-app-bar app color="deep-purple-lighten-4">
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text color="white" @click="navigateTo('/')">Home</v-btn>
    <v-btn text @click="navigateTo('/register')">Register</v-btn>
    <v-btn text @click="navigateTo('/about')">About</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}
</script>


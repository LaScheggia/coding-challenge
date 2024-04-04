<template>
  <v-app-bar app color="deep-purple-lighten-4">
    <v-toolbar-title>App Name</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text color="white" @click="navigateTo('/')">Home</v-btn>
    <v-btn text @click="navigateTo('/formUser')">Add new customer</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(route) {
  router.push(route);
}
</script>


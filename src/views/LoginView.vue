<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="rounded-lg py-4 px-8" elevation="8">
          <v-card-title class="headline">Accedi con le tue credenziali</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field required v-model="email" label="Email" type="email" variant="underlined" color="deep-purple-lighten-1"> </v-text-field>
              <v-text-field required v-model="password" label="Password" type="password" variant="underlined" color="deep-purple-lighten-1"></v-text-field>
              <v-btn type="submit" color="pink-lighten-4">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');

  const login = () => {
    // Implement your login logic here
    console.log('Logging in...');
  };
</script>

<style lang="scss" scoped>

</style>
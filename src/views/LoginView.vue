<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="rounded-lg py-4 px-8" elevation="8">
          <v-card-title class="headline">Accedi con le tue credenziali</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit" v-slot="{ isSubmitting }">
              <v-text-field required v-model="email" label="Email" type="email" variant="underlined" color="deep-purple-lighten-1"> </v-text-field>
              <v-text-field required v-model="password" label="Password" type="password" variant="underlined" color="deep-purple-lighten-1"></v-text-field>
              <div>
                <v-btn type="submit" :disabled="isSubmitting" color="pink-lighten-4"><span v-show="isSubmitting"></span>Login</v-btn>
                <router-link to="register">Register</router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores';

const email = ref('');
const password = ref('');
const error = ref(null);



async function onSubmit(values) {
  try {
    const authStore = useAuthStore();
    await authStore.login(email.value, password.value);
  } catch (error) {
    console.error("An error occurred during login:", error);

  }
}

</script>

<style lang="scss" scoped>

</style>

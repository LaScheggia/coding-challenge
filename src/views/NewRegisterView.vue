<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="rounded-lg py-4 px-8" elevation="8">
          <v-card-title class="headline">Registrati</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit" v-slot="{ isSubmitting }" >
              <v-text-field required v-model="name" label="Name" type="text" variant="underlined" color="deep-purple-lighten-1"></v-text-field>
              <v-text-field required v-model="lastName" label="Last Name" type="text" variant="underlined" color="deep-purple-lighten-1"></v-text-field>
              <v-text-field required v-model="email" label="Email" type="email" variant="underlined" color="deep-purple-lighten-1"> </v-text-field>
              <v-text-field required v-model="password" label="Password" type="password" variant="underlined" color="deep-purple-lighten-1"></v-text-field>
              <div>
                <v-btn type="submit" :disabled="isSubmitting" color="pink-lighten-4"><span v-show="isSubmitting"></span>Register</v-btn>
                <router-link to="/login">Cancel</router-link>
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
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const error = ref(null)


async function onSubmit(values) {
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();
  
  try {
    const values = {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    };

    await usersStore.register(values);
    await router.push('/login');
    alertStore.success('Registration successful');

  } catch (error) { 
    alertStore.error(error);
    console.error("Error occurred during registration:", error);
  }
}

</script>
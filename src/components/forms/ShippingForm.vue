<template>
  <v-container>
    <v-card class="rounded-lg py-4 px-8" elevation="8">
      <form @submit.prevent="handleSubmit">
        <v-row>
          <!-- fare che tipo sia precompilato e non modificabile -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.firstName"
              :error-messages="v$.firstName.$errors.map((e) => e.$message)"
              label="Nome"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.firstName.$touch"
              @input="v$.firstName.$touch"
            ></v-text-field>
          </v-col>

          <!-- fare che tipo sia precompilato e non modificabile -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.lastName"
              :error-messages="v$.lastName.$errors.map((e) => e.$message)"
              label="Cognome"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.lastName.$touch"
              @input="v$.lastName.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.region"
              :items="regions"
              :error-messages="v$.region.$errors.map((e) => e.$message)"
              label="Regione"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.region.$touch"
              @input="v$.region.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.province"
              :items="provinces"
              :error-messages="v$.province.$errors.map((e) => e.$message)"
              label="Provincia"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.province.$touch"
              @input="v$.province.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.city"
              :items="cities"
              :error-messages="v$.city.$errors.map((e) => e.$message)"
              label="Città"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.city.$touch"
              @input="v$.city.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.houseNumber"
              :error-messages="v$.houseNumber.$errors.map((e) => e.$message)"
              label="Civico"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.houseNumber.$touch"
              @input="v$.houseNumber.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              label="E-mail"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.phoneNumber"
              :error-messages="v$.phoneNumber.$errors.map((e) => e.$message)"
              label="Telefono"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.phoneNumber.$touch"
              @input="v$.phoneNumber.$touch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn style="display: none;" :disabled="formIncomplete"/>
      </form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import {
  email,
  required,
  numeric,
  minLength,
  maxLength,
} from "@vuelidate/validators";

const props = defineProps(['step']);
const emit = defineEmits(['onUpdate']);

const state = ref({
  firstName: "",
  lastName: "",
  region: "",
  province: "",
  city: "",
  houseNumber: "",
  email: "",
  phoneNumber: "",
});

const regions = ["Emilia", "Lombardia", "Calabria", "Piemonte"];

const provinces = ["piacenza", "Milano", "Cosenza", "Torino"];

const cities = ["Caorso", "Assago", "Lamezia", "Settimo Torinese"];

const rules = {
  firstName: { required },
  lastName: { required },
  region: { required },
  province: { required },
  city: { required },
  houseNumber: { required, numeric },
  email: { required, email },
  phoneNumber: {
    required,
    numeric,
    minLength: minLength(9),
    maxLength: maxLength(12),
  },
};

const v$ = useVuelidate(rules, state);

const formIncomplete = computed(() => {
  emit('onUpdate', {
    completed: !v$.value.$invalid,
    step: props?.step,
    data: !v$.value.$invalid ? { ...state.value } : null,
  });

  const isComplete =  Object.values(state.value).every(value => value);
  if (isComplete && !v$.value.$invalid) {
    v$.value.$touch();
  }
  return !isComplete;
});

</script>

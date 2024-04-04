<template>
  <v-container>
    <v-card class="rounded-lg py-4 px-8" elevation="8">
      <form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.street"
              :error-messages="v$.street.$errors.map((e) => e.$message)"
              label="Street"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.street.$touch"
              @input="v$.street.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.houseNumber"
              :error-messages="v$.houseNumber.$errors.map((e) => e.$message)"
              label="House Number"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.houseNumber.$touch"
              @input="v$.houseNumber.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.city"
              :items="cities"
              :error-messages="v$.city.$errors.map((e) => e.$message)"
              label="City"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.city.$touch"
              @input="v$.city.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.province"
              :items="provinces"
              :error-messages="v$.province.$errors.map((e) => e.$message)"
              label="Province"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.province.$touch"
              @input="v$.province.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.cap"
              :items="cap"
              :error-messages="v$.cap.$errors.map((e) => e.$message)"
              label="ZIP Code"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.cap.$touch"
              @input="v$.cap.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="state.region"
              :items="regions"
              :error-messages="v$.region.$errors.map((e) => e.$message)"
              label="Region"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.region.$touch"
              @input="v$.region.$touch"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              label="Email"
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
              label="Phone Number"
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
  street: "",
  city: "",
  province: "",
  region: "",
  houseNumber: "",
  email: "",
  phoneNumber: "",
});

const regions = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto"
];

const provinces = [
  "Piacenza",
  "Milano",
  "Cosenza",
  "Torino",
  "Roma",
  "Napoli",
  "Firenze",
  "Bari",
  "Palermo",
  "Bologna",
  "Genova",
  "Venezia",
  "Verona",
  "Cagliari",
  "Catania",
  "Brescia",
  "Reggio Emilia",
  "Perugia",
  "Padova",
  "Trieste"
];

const cities = [
  "Portofino",
  "Castelluccio",
  "Manarola",
  "Polignano a Mare",
  "Pitigliano",
  "Monte Isola",
  "Castelsardo",
  "Montefalco",
  "Cinque Terre",
  "Atrani",
  "Procida",
  "Castelmezzano",
  "Montefioralle",
  "Marzamemi",
  "Castell'Arquato",
  "Santa Maria del Molise",
  "Matera",
  "San Gimignano",
  "Civita di Bagnoregio",
  "Monteriggioni"
];

const cap = [
  "23900", "29010", "20900", "60900",
  "20121", "00118", "47890", "40121",
  "96100", "16121", "00185", "37121",
  "98122", "06123", "10121", "47121",
  "84100", "90121", "34100", "50121"
];

const rules = {
  cap: { required },
  street: { required },
  region: { required },
  province: { required },
  city: { required },
  houseNumber: { required, numeric, maxLength: maxLength(3) },
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

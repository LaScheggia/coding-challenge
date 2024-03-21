<template>
  <v-stepper color="deep-purple-darken-1" :items="['Dati Anagrafici', 'Indirizzo di spedizione', 'Riepilogo']" class="my-5">
    <template v-slot:item.1>
      <v-card>
        <PersonalDataForm/>
      </v-card>
    </template>

    <template v-slot:item.2>
      <v-card>
        <ShippingForm/>
      </v-card>
    </template>

    <template v-slot:item.3>
      <v-card>
        <Recap @completed="submitData"/>
      </v-card>
    </template>
  </v-stepper>
</template>

<script setup>
import { ref } from 'vue';

// FORM IMPORTS
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import ShippingForm from '@/components/forms/ShippingForm.vue';
import Recap from '../components/Recap.vue';

const personalDataForm = ref(null);
const shippingForm = ref(null);

const submitData = () => {
  const personalData = personalDataForm.value.getData();
  const shippingData = shippingForm.value.getData();
  
  console.log('Personal Data:', personalData);
  console.log('Shipping Data:', shippingData);
};

</script>

<style lang="scss">

</style>
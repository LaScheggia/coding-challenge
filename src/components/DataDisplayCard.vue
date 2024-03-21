<template>
  <v-card>
    <v-card-title>Data Display</v-card-title>
    <v-card-text>
      <div>
        <strong>Personal Data:</strong>
        <div>First Name: {{ personalData.firstName }}</div>
        <div>Last Name: {{ personalData.lastName }}</div>
        <!-- Add other personal data fields here -->
      </div>
      <div>
        <strong>Shipping Data:</strong>
        <div>Address: {{ shippingData.address }}</div>
        <!-- Add other shipping data fields here -->
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props to receive combined form data
const props = defineProps({
  personalData: Object,
  shippingData: Object
});
</script>
<template>
  <v-stepper
    ref="stepper"
    v-model="step"
    :items="items"
    hide-actions
    color="deep-purple-darken-1"
  >
    <template v-slot:item.1>
      <PersonalDataForm step="1" @on-update="onStepUpdate" />
    </template>

    <template v-slot:item.2>
      <ShippingForm step="2" @on-update="onStepUpdate" />
    </template>

    <template v-slot:item.3>
      <Recap/>
    </template>

    <v-stepper-actions :disabled="actionDisabled" @click:next="onNext" @click:prev="onPrev" />
  </v-stepper>
</template>

<script setup>
import { ref, computed } from 'vue';
import PersonalDataForm from '@/components/forms/PersonalDataForm.vue';
import ShippingForm from '@/components/forms/ShippingForm.vue';
import Recap from '../components/Recap.vue';

const stepper = ref(null);
const step = ref(1);
const actionDisabled = ref(true);
const items = [
  'Personal Info',
  'Shipping',
  'Submit',
];
const stepState = {
  '1': {},
  '2': {},
  '3': {},
}

const onStepUpdate = (event) => {
  switch (event.step) {
    case '1': 
      stepState[event.step] = event
      actionDisabled.value = getActionDisabled(false, event.completed)
      break;
    case '2':
      stepState[event.step] = event
      actionDisabled.value = getActionDisabled(true, event.completed)
      break
    case '3':
      stepState[event.step] = event
      actionDisabled.value = getActionDisabled(true, event.completed)
      break
    default:
      actionDisabled.value = getActionDisabled(false, false)
      break;
  }
}

const getActionDisabled = (prev, next) => {
  if (prev && next) {
    return false
  } else if (!prev && !next ) {
    return true
  } else if (!prev && next) {
    return 'prev'
  } else {
    return 'next'
  }
}

const onNext = () => {
  stepper.value.next()
  console.log('next', step.value, stepState[step.value].completed)
  actionDisabled.value = getActionDisabled(true, stepState[step.value].completed)
}
const onPrev = () => {
  stepper.value.prev()
  console.log('prev', step.value, stepState[step.value].completed)
  if (step.value == 1) {
    actionDisabled.value = getActionDisabled(false, stepState['1'].completed)
  } else {
    actionDisabled.value = getActionDisabled(true, stepState[step.value].completed)
  }
}
</script>


<style lang="scss">

</style>

<!-- 
  const submitData = () => {
  const personalData = personalDataForm.value.getData();
  const shippingData = shippingForm.value.getData();
  
  console.log('Personal Data:', personalData);
  console.log('Shipping Data:', shippingData);
};
 -->
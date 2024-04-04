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
      <Recap :data="stepState" />
    </template>

    <v-stepper-actions :disabled="actionDisabled" @click:next="onNext" @click:prev="onPrev" :next-text="getNextText" />
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

const emit = defineEmits(['onSubmit']);

const items = [
  'Personal Info',
  'Shipping',
  'Submit',
];
const stepState = {
  '1': {},
  '2': {},
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
    default:
      break;
  }
}

const getActionDisabled = (prev, next) => {
  if (prev && next) {
    return false
  } else if (!prev && !next) {
    return true
  } else if (!prev && next) {
    return 'prev'
  } else {
    return 'next'
  }
}

const getNextText = computed(() => {
  if (step.value == items.length) {
    return 'Submit'
  } else {
    return 'Next'
  }
})

const onNext = () => {
  if (step.value == items.length) {
    // submit here
    return
  }

  stepper.value.next()
  if (step.value < items.length - 1) {
    actionDisabled.value = getActionDisabled(true, stepState[step.value].completed)
  } else {
    actionDisabled.value = getActionDisabled(true, true)
  }
}
const onPrev = () => {
  stepper.value.prev()
  if (step.value == 1) {
    actionDisabled.value = getActionDisabled(false, stepState['1'].completed)
  } else if (step.value < items.length - 1) {
    actionDisabled.value = getActionDisabled(true, stepState[step.value].completed)
  }
}
</script>


<style lang="scss">

</style>

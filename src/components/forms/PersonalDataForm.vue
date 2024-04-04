<template>
  <v-container>
    <v-card class="rounded-lg py-4 px-8" elevation="8">
      <form @submit.prevent="handleSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.firstName"
              :error-messages="v$.firstName.$errors.map((e) => e.$message)"
              label="First Name"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.firstName.$touch"
              @input="v$.firstName.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.lastName"
              :error-messages="v$.lastName.$errors.map((e) => e.$message)"
              label="Last Name"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.lastName.$touch"
              @input="v$.lastName.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.birthDate"
              :error-messages="v$.birthDate.$errors.map((e) => e.$message)"
              type="date"
              label="Birth Date"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.birthDate.$touch"
              @input="v$.birthDate.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.birthPlace"
              :error-messages="v$.birthPlace.$errors.map((e) => e.$message)"
              label="Birth Place"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.birthPlace.$touch"
              @input="v$.birthPlace.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="state.fiscalCode"
              :error-messages="v$.fiscalCode.$errors.map((e) => e.$message)"
              label="Fiscal Code"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.fiscalCode.$touch"
              @input="v$.fiscalCode.$touch"
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
  required,
  minLength,
  maxLength,
} from "@vuelidate/validators";

const props = defineProps(['step']);
const emit = defineEmits(['onUpdate']);

const state = ref({
  firstName: "",
  lastName: "",
  birthDate: "",
  birthPlace: "",
  fiscalCode: "",
});

const rules = {
  firstName: { required, minLength: minLength(3) },
  lastName: { required, minLength: minLength(3) },
  birthDate: { required },
  birthPlace: { required },
  fiscalCode: { required, minLength: minLength(16), maxLength: maxLength(16), },
};

const v$ = useVuelidate(rules, state.value);

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
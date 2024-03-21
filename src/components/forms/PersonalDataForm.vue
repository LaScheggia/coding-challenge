<template>
  <v-container>
    <v-card class="rounded-lg py-4 px-8" elevation="8">
      <form @submit.prevent="handleSubmit">
        <v-row>
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
            <v-text-field
              v-model="state.birthDate"
              :error-messages="v$.birthDate.$errors.map((e) => e.$message)"
              type="date"
              label="Data di Nascita"
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
              label="Città di Nascita"
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
              label="Codice Fiscale"
              required
              variant="underlined"
              color="deep-purple-lighten-1"
              @blur="v$.fiscalCode.$touch"
              @input="v$.fiscalCode.$touch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="me-4" @click="handleSubmit"> submit </v-btn>

        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const initialState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  birthPlace: "",
  fiscalCode: "",
};

const state = reactive({
  ...initialState,
});

// const validCode = helpers.regex(/^YOUR_VALID_CODE_REGEX_HERE$/i);

const rules = {
  firstName: { required },
  lastName: { required },
  birthDate: { required },
  birthPlace: { required },
  fiscalCode: { required },
};

const v$ = useVuelidate(rules, state);

const getData = computed(() => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    birthDate: state.birthDate,
    birthPlace: state.birthPlace,
    fiscalCode: state.fiscalCode,
  };
});

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

function handleSubmit() {
  v$.value.$touch(); // Touch all fields to show validation errors

  if (!v$.value.$invalid) {
    // Form is valid, proceed with submitting data
    const formData = getData.value;
    console.log("Submitting form data:", formData);

    // Emit the form data to the parent component
    emit("formData", formData);
  } else {
    // Form is invalid, do something (e.g., show error message)
    console.log("Form has validation errors, cannot submit.");
  }
}
</script>

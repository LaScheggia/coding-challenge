<template>
  <v-card
    class="mx-auto py-8"
    max-width="900"
    hover
  >
    <v-card-item>
      <v-card-title>
        Eccoci alla fine, <span color="deep-purple-darken-1">placeholdernome</span>
      </v-card-title>
      <v-card-subtitle>
        Qua di seguito troverai tutte le informazioni. verifica che siano corrette.
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row>
        <v-col>
          Nome: 
        </v-col>
        <v-col>
          {{ props?.data['1'].data.firstName }}
        </v-col>
        <v-col>
          Cognome: 
        </v-col>
        <v-col>
          {{ props?.data['1'].data.lastName }} 
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          DOB: 
        </v-col>
        <v-col>
          {{ props?.data['1'].data.birthDate }}
        </v-col>
        <v-col>
          CF: 
        </v-col>
        <v-col>
          {{ props?.data['1'].data.fiscalCode }} 
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          Tel: 
        </v-col>
        <v-col>
          {{ props?.data['2'].data.phoneNumber }}  
        </v-col>
        <v-col>
          Mail: 
        </v-col>
        <v-col>
          {{ props?.data['2'].data.email }}  
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Indirizzo: 
        </v-col>
        <v-col>
          {{ props?.data['2'].data.street }},
          {{ props?.data['2'].data.houseNumber }}
          {{ props?.data['2'].data.city }}
          {{ props?.data['2'].data.province }}
          {{ props?.data['2'].data.cap }}
          {{ props?.data['2'].data.region }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-subtitle>
      Se i dati sono corretti non dovrai fare altro che finalizzare 
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
const props = defineProps(['data']);
</script>
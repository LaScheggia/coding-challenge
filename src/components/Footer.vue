<template>
  <v-footer app color="deep-purple-lighten-4">
    <v-row justify="center" no-gutters>
      <v-btn v-for="(item, index) in links" :key="index" class="mx-2" color="black" rounded="xl" variant="text" @click="navigateTo(item.route)">{{ item.text }}</v-btn>

      <div class=" text-center py-4 px-16">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. 
        Praesent ut risus eget metus luctus accumsan id ultrices nunc. 
        Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. 
        Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. 
      </div>

      <v-divider></v-divider>

      <v-col class="text-center mt-2" cols="12">
        {{ new Date().getFullYear() }} — <strong>Made with &#x2764;</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const links = [
  { text: 'Link 1', route: '/link1' },
  { text: 'Link 2', route: '/link2' },
  { text: 'Link 3', route: '/link3' },
  { text: 'Link 4', route: '/link4' },
  { text: 'Link 5', route: '/link5' },
  { text: 'Link 6', route: '/link6' }
];

function navigateTo(route) {
  router.push(route);
}
</script>

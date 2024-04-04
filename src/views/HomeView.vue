<template>
  <div class="container">
    <div v-if="user">
      <div class="card">
        <h1 class="title">Hello, smooth operator!</h1>
        <h3>Welcome back to your management area.</h3>

        <div class="boxes flex-wrap">
          <v-btn to="/users" color="deep-purple-lighten-4 flex-1-0 ma-2 pa-2">
            Customers
          </v-btn>
        </div>
      </div>
      
    </div>
  </div>

</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<style lang="scss" scoped>
.container {
  font: 1em/1.618 Inter, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 229px);
  margin: 0;
  color: #224;
  background-image: radial-gradient(circle, #ede7f6, #e8e0f3, #e3daf1, #ddd3ee, #d8cdec, #d3c7ea, #cec0e8, #c9bae6, #c3b3e3, #beabe1, #b8a4de, #b39ddb);
}

.card {
  max-width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 3500px;
  max-width: 500px;
  height: 300px;
  padding: 35px;

  border: 1px solid rgba(255, 255, 255, .25);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.055);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.39);

  backdrop-filter: blur(25px);
}

.boxes {
  display: flex;
  padding: 15px;

  .customers, .managers {
    margin: auto;
    width: 45%;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.219);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.39);
  }
}

.card-footer {
  font-size: 0.65em;
  color: #446;
}

</style>

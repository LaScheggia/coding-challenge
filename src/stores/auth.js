import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: false,
    user: null,
    error: null,
  }),
  actions: {
    async login(email, password) {
      // Mock login for demonstration purposes
      // Replace this with your actual authentication logic
      if (email === 'user@example.com' && password === 'password') {
        this.isLoggedIn = true;
        this.user = { email };
        this.error = null;
      } else {
        throw new Error('Invalid email or password');
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
});
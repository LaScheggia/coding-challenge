export default function ({ store, redirect }) {
  // If user is not authenticated, redirect to login page
  if (!store.getters['auth/isLoggedIn']) {
    return redirect('/login');
  }
}
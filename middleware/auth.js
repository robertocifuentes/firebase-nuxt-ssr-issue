export default function ({ store, route, redirect }) {
  if (route.path === '/login') return true
  if (store.getters.isLoggedIn) return true
  redirect('/login?redirect=' + route.path)
}

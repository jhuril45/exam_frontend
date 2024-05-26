export default function ({ store, redirect, route }) {

    const path = route.path
    if (!store?.state.user && !path.includes('login')) {
    console.log('path', path);
    return redirect('/login')
  }
}

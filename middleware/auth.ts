export default defineNuxtRouteMiddleware(async (to,from)=>{
    const cookie = await useCookie('goz_mekmar_auth_token');
    if(cookie.value == null || cookie.value == undefined || cookie.value == '' || cookie.value == ' '){
        return navigateTo('/auth');
    }
});
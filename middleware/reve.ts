export default defineNuxtRouteMiddleware(to => {
  const voieLyonnaiseRegex = /reve-(1[0-4]|[1-9])\b/;
  const isVoieLyonnaiseValid = voieLyonnaiseRegex.test(to.fullPath);
  if (!isVoieLyonnaiseValid) {
    return navigateTo('/404');
  }
});

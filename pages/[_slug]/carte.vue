<template>
  <ClientOnly>
    <Map :features="voie.features" :options="mapOptions" class="h-full w-full" />
  </ClientOnly>
</template>

<script setup>
const { path } = useRoute();
const { getVoieCyclableRegex } = useUrl();
const { getRevName } = useConfig();

const regex = getVoieCyclableRegex();
const line = path.match(regex)[1];

// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'fullscreen',
  middleware: 'reve'
});

const mapOptions = {
  shrink: true,
  onShrinkControlClick: () => {
    const route = useRoute();
    return navigateTo({ path: `/${route.params._slug}` });
  }
};

const { data: voie } = await useAsyncData(() => {
  return queryContent('reve')
    .where({ _type: 'json', _path: `/reve/ligne-${line}` })
    .findOne();
});

<<<<<<< HEAD
const description = `Carte de la ligne ${line} du ReVE Bordelais. Découvrez les tronçons prévus, déjà réalisés, en travaux.`;
useHead({
  title: `Carte de la ligne ${line} du ReVE Bordelais`,
=======
const description = `Carte de la ${getRevName('singular')} ${line}. Découvrez les tronçons prévus, déjà réalisés, en travaux et ceux reportés.`;
useHead({
  title: `Carte de la ${getRevName('singular')} ${line}`,
>>>>>>> benoitdemaegdt-main
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description }
  ]
});
</script>

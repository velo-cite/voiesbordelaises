<template>
  <ClientOnly>
    <Map :features="features" class="h-full w-full" />
  </ClientOnly>
</template>

<script setup>
// https://github.com/nuxt/framework/issues/3587
definePageMeta({
  pageTransition: false,
  layout: 'embed'
});

const { data: voies } = await useAsyncData(() => {
  return queryContent('reve').where({ _type: 'json' }).find();
});

const features = voies.value.map(voie => voie.features).flat();

const description = 'Découvrez le plan officiel du ReVE Bordelais, le futur réseau vélo bordelais de 275km.';
const COVER_IMAGE_URL = 'https://velo-cite.org/wp-content/uploads/2023/10/cropped-VELO-CITE-2023_couleur-horizontal-1.png';
useHead({
  title: 'Carte à jour des Voies Lyonnaises',
  meta: [
    // description
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'twitter:description', name: 'twitter:description', content: description },
    // cover image
    { hid: 'og:image', property: 'og:image', content: COVER_IMAGE_URL },
    { hid: 'twitter:image', name: 'twitter:image', content: COVER_IMAGE_URL }
  ]
});
</script>

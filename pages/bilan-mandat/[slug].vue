<template>
<!--  <ContentFrame-->
<!--    v-if="article"-->
<!--    header="Article"-->
<!--    :title="article.title"-->
<!--  >-->
<!--    <ContentRenderer :value="article" />-->
<!--  </ContentFrame>-->
  <MapStat :features="article" options="" />
</template>

<script setup>
import MapStat from '~/components/chart/MapStat.vue';

const { path } = useRoute();
const { withoutTrailingSlash } = useUrl();

const { data: article } = await useAsyncData(`article-${path}`, () => {
  return queryContent()
    .where({ _path: withoutTrailingSlash(path) })
    .findOne();
});

if (!article.value) {
  const router = useRouter();
  router.push({ path: '/404' });
}

useHead({
  meta: [
    // description
    { hid: 'description', name: 'description', content: article.value.description },
    { hid: 'og:description', property: 'og:description', content: article.value.description },
    { hid: 'twitter:description', name: 'twitter:description', content: article.value.description },
    // cover image
    { hid: 'og:image', property: 'og:image', content: article.value.imageUrl },
    { hid: 'twitter:image', name: 'twitter:image', content: article.value.imageUrl }
  ]
});

</script>

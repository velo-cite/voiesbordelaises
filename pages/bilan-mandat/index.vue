<template>
  <div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Bilan du mandat des villes de la métropole bordelaise
        </h2>
        <p class="mt-3 text-xl text-gray-500 sm:mt-4">
<!--          Visualisation des données produites par la métropole et par {{ getAssoName() }}.-->
          Visualisation des données produites par la métropole et par Vélo-cité Bordeaux Métropole.
        </p>
      </div>
      <div class="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-4">
        <!--        <div v-for="article in articles" :key="article.title" class="p-4 rounded-lg hover:bg-gray-50">-->
        <!--          <div>-->
        <!--            <div class="inline-block">-->
        <!--              <span class="bg-lvv-blue-200 text-lvv-blue-600 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">-->
        <!--                article-->
        <!--              </span>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <NuxtLink :to="article._path" class="block mt-4">-->
        <!--            <p class="text-xl font-semibold text-gray-900">-->
        <!--              {{ article.title }}-->
        <!--            </p>-->
        <!--            <p class="mt-3 text-base text-gray-500">-->
        <!--              {{ article.description }}-->
        <!--              {{ article.body }}-->
        <!--            </p>-->
        <!--          </NuxtLink>-->
        <!--        </div>-->
<!--        <MapStat v-if="articles" :features="articles"/>-->
        <ClientOnly>
          <Map v-if="citiesNotes" :features="citiesNotes" :options="mapOptions" class="h-full w-full" />
        </ClientOnly>
      </div>
      <div class="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-4">
        <div v-for="city in cities" :key="city.title" class="p-4 rounded-lg hover:bg-gray-50">
          <div>
            <div class="inline-block">
              <span class="bg-lvv-blue-200 text-lvv-blue-600 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
                city
              </span>
            </div>
          </div>
          <NuxtLink :to="city._path" class="block mt-4">
            <p class="text-xl font-semibold text-gray-900">
              {{ city.title }}
            </p>
            <p class="mt-3 text-base text-gray-500">
              {{ city.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';
// import MapStat from '~/components/chart/MapStat.vue';
// import { CITY_LIST, EVAL_LIST, type CityEvalFeature } from '@/types/mapStat';
import { type CityEvalFeature } from '@/types/mapStat';

const { getAssoName } = useConfig();

const mapOptions = {
  shrink: false
};
// const parseCityEval = (data: ParsedContent, citiesDatas: []): CityEvalFeature[] => {
//   return data.body
//     .filter(item => CITY_LIST.includes(item.Ville) && EVAL_LIST.includes(item.Note)) // Vérification
//     .map(item => ({
//       city: item.Ville as CityEvalFeature['properties']['city'],
//       eval: item.Note as CityEvalFeature['properties']['eval'],
//       features: citiesDatas.find((elem: any) => item.Ville === elem.properties.nom)
//     }));
// };
//
// const { data: articles } = await useAsyncData(async() => {
//   const citiesData = await queryContent('bilan-mandat')
//     .where({ _path: /^\/bilan-mandat\/cities[^/]*$/, _type: 'json' })
//     .findOne();
//   const rawData = await queryContent('bilan-mandat')
//     .where({ _path: /^\/bilan-mandat\/bilan-global[^/]*$/, _type: 'csv' })
//     .findOne();
//
//   return parseCityEval(rawData, citiesData.features);
// });

const parseCityEval = (data: ParsedContent, citiesDatas: any): CityEvalFeature[] => {
  return citiesDatas.features
    .map(item => ({
      ...item,
      // features: citiesDatas.find((elem: any) => item.Ville === elem.properties.nom),
      properties: {
        ...item.properties,
        // eval: data.body.find((dataCSV: any) => dataCSV.Ville === item.properties.nom).Note,
        eval: 'A',
        city: item.properties.nom
      }
    }));
};

const { data: citiesNotes } = await useAsyncData(async() => {
  const citiesData = await queryContent('bilan-mandat')
    .where({ _path: /^\/bilan-mandat\/cities[^/]*$/, _type: 'json' })
    .findOne();
  const rawData = await queryContent('bilan-mandat')
    .where({ _path: /^\/bilan-mandat\/bilan-global[^/]*$/, _type: 'csv' })
    .findOne();

  const res = parseCityEval(rawData, citiesData);

  console.log(res);
  return res;
});

console.log(citiesNotes);

const { data: cities } = await useAsyncData(() => {
  return queryContent('bilan-mandat/cities')
    .where({ _path: /^\/bilan-mandat\/cities\/[^/]*$/ })
    .find();
});

</script>

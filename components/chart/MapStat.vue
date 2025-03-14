<template>
  <div class="relative w-[1200px] h-[600px]">
    <div id="map" class="rounded-lg h-full w-full" />
    <!--    v-if="options.logo"-->
    <img
      class="my-0 absolute bottom-0 right-0 z-10"
      src="/logo-VC-carte.png"
      width="75"
      height="75"
      :alt="`logo ${config.assoName}`"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { Map, AttributionControl, NavigationControl, type StyleSpecification, type LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import style from '@/assets/style.json';

import { type CityEvalFeature } from '~/types/mapStat';
import config from '~/config.json';

const props = defineProps<{
  features: CityEvalFeature[];
  // options: Partial<typeof defaultOptions>;
}>();

const features = computed(() => {
  return (props.features ?? []).filter(feature => {
    return true;
    // return cities.value.includes(feature.properties.status);
  });
});

// const options = { ...defaultOptions, ...props.options };

const {
  fitBounds
} = useMap();

function plotStatsFeatures({ map, features }: { map: Map; features: CityEvalFeature[] }) {
  map.addSource('cityNotes', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features }
  });

  // Définir les couleurs en fonction de `eval`
  const colorExpression = [
    'match',
    ['get', 'eval'],
    'A', '#2ECC71',
    'B', '#27AE60',
    'C', '#F1C40F',
    'D', '#E67E22',
    'E', '#D35400',
    'F', '#C0392B',
    'G', '#8E44AD',
    '#000000' // Couleur par défaut
  ];

  // Ajouter la couche des contours
  map.addLayer({
    id: 'city-borders',
    type: 'line',
    source: 'cityNotes',
    paint: {
      'line-color': '#2ECC71',
      'line-width': 3
    }
  });
}

onMounted(() => {
  const map = new Map({
    container: 'map',
    style: style as StyleSpecification,
    center: config.center as LngLatLike,
    zoom: config.zoom,
    attributionControl: false
  });
  map.addControl(new NavigationControl({ showCompass: false }), 'top-left');
  map.addControl(new AttributionControl({ compact: false }), 'bottom-left');

  map.on('load', () => {
    // plotStatsFeatures({ map, features: features.value });
    const tailwindMdBreakpoint = 768;
    if (window.innerWidth > tailwindMdBreakpoint) {
      // fitBounds({ map, features: features.value });
    }
  });

  watch(
    () => props.features,
    newFeatures => {
      plotStatsFeatures({ map, features: newFeatures });
    }
  );
});

</script>

<style>
.maplibregl-popup-content {
  @apply p-0 rounded-lg overflow-hidden;
}

.maplibregl-info {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url('~/maplibre/info.svg');
  background-size: 85%;
}

.maplibregl-popup-anchor-top .maplibregl-popup-tip,
.maplibregl-popup-anchor-top-left .maplibregl-popup-tip,
.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
  border-bottom-color: transparent;
}

.maplibregl-popup-anchor-bottom .maplibregl-popup-tip,
.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip,
.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
  border-top-color: transparent;
}

.maplibregl-popup-anchor-left .maplibregl-popup-tip {
  border-right-color: transparent;
}

.maplibregl-popup-anchor-right .maplibregl-popup-tip {
  border-left-color: transparent;
}
</style>

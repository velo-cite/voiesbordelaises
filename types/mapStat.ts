export const CITY_LIST = [
  'Ambarès-et-Lagrave', 'Ambès', 'Artigues-près-Bordeaux', 'Bassens', 'Bègles',
  'Blanquefort', 'Bordeaux', 'Bouliac', 'Bruges', 'Carbon-Blanc', 'Cenon', 'Eysines',
  'Floirac', 'Gradignan', 'Le Bouscat', 'Le Haillan', 'Le Taillan-Médoc', 'Lormont',
  'Martignas-sur-Jalle', 'Mérignac', 'Parempuyre', 'Pessac', 'Saint-Aubin de Médoc',
  'Saint-Louis-de-Montferrand', 'Saint-Médard-en-Jalles', 'Saint-Vincent-de-Paul',
  'Talence', "Villenave-d'Ornon"
] as const;

export type CityList = typeof CITY_LIST[number]; // Extrait les valeurs de CITY_LIST

export const EVAL_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type Eval = typeof EVAL_LIST[number];

export type CityEvalFeature = {
  type: 'Feature';
  properties: {
    city: CityList;
    eval: Eval;
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][];
  };
};
/**
 * type helpers
 */
// export function isLineStringFeature(feature: Feature): feature is LineStringFeature {
//   return feature.geometry.type === 'LineString';
// }

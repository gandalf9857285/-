import MainLayout from 'apps/layouts/MainLayout.vue'
import { ROUTE_NAMES } from 'shared/constants'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? '/'),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: MainLayout,
      redirect: { name: ROUTE_NAMES.main },
      children: [
        {
          path: '/main',
          name: ROUTE_NAMES.main,
          component: () => import('pages/PMainPage'),
          meta: { showHeader: true },
        },
        {
          path: '/character/:id',
          name: ROUTE_NAMES.character,
          component: () => import('pages/PCharacterDetail'),
          meta: { showHeader: true },
          props: true,
        },
        {
          path: '/episodes',
          name: ROUTE_NAMES.episodes,
          component: () => import('pages/PEpisodesPage'),
          meta: { showHeader: true },
        },
        {
          path: '/episode/:id',
          name: ROUTE_NAMES.episode,
          component: () => import('pages/PEpisodeDetailPage'),
          meta: { showHeader: true },
          props: true,
        },
        {
          path: '/locations',
          name: ROUTE_NAMES.locations,
          component: () => import('pages/PLocationsPage'),
          meta: { showHeader: true },
        },
        {
          path: '/location/:id',
          name: ROUTE_NAMES.location,
          component: () => import('pages/PLocationDetailPage'),
          meta: { showHeader: true },
          props: true,
        },
      ],
    },
  ],
})

export default router

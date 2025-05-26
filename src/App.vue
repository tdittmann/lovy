<template>
  <ion-app>
    <pwa-install></pwa-install>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import '@khmyznikov/pwa-install';
</script>

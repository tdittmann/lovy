<script setup lang="ts">
import Countdown from "@/components/Countdown.vue";
import {IonAccordion, IonItem, IonLabel} from '@ionic/vue';
import {computed} from "vue";

export type Props = {
  description: string,
  date: Date
};
const props = defineProps<Props>();

const dateString = computed<string>(() => {
  if(!props.date) {
    return "";
  }
  return props.date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: '2-digit'});
});

</script>

<template>
  <IonAccordion>
    <IonItem slot="header">
      <IonLabel>{{ props.description }}</IonLabel>
      <IonLabel slot="end">{{ dateString }}</IonLabel>
    </IonItem>
    <div slot="content">
      <Countdown :dateInMillis="props.date?.getTime()"></Countdown>
    </div>
  </IonAccordion>
</template>

<style scoped>

</style>
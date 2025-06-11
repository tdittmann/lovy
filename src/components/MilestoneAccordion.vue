<script setup lang="ts">
import Countdown from "@/components/Countdown.vue";
import {IonAccordion, IonItem, IonLabel} from '@ionic/vue';
import {computed} from "vue";
import {DateUtils} from "@/utils/DateUtils";

export type Props = {
  description: string,
  date: Date
};
const props = defineProps<Props>();

const dateString = computed<string>(() => DateUtils.longDate(props.date));
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
<script setup lang="ts">
import {ref, watch} from "vue";
import {IonCol, IonGrid, IonRow} from '@ionic/vue';

export type Props = {
  date: Date
};
const props = defineProps<Props>();

const days = ref<number>(0);
const hours = ref<number>(0);
const minutes = ref<number>(0);
const seconds = ref<number>(0);

const calculateCountdown = (targetDate: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
  const absDiff = Math.abs(diffInSeconds);

  days.value = Math.floor(absDiff / 86400);
  hours.value = Math.floor((absDiff % 86400) / 3600);
  minutes.value = Math.floor((absDiff % 3600) / 60);
  seconds.value = absDiff % 60;
};

watch(
    () => [props.date],
    () => {
      setInterval(() => {
        calculateCountdown(props.date);
      }, 1000);
    },
    {deep: true, immediate: true}
)
</script>

<template>
  <div class="container" v-if="props.date">
    <IonGrid class="grid ion-text-center">
      <IonRow>
        <IonCol>
          <span class="val">{{ days }}</span> <br/>
          TAGEN
        </IonCol>
        <IonCol>
          <span class="val">{{ hours }}</span> <br/>
          STD
        </IonCol>
        <IonCol>
          <span class="val">{{ minutes }}</span> <br/>
          MIN
        </IonCol>
        <IonCol>
          <span class="val">{{ seconds }}</span> <br/>
          SEK
        </IonCol>
      </IonRow>
    </IonGrid>
  </div>

</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
}

.grid {
  color: #000000;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgb(112, 112, 112);
}

.val {
  font-size: 2em;
  margin: 0;
}

.type-time {
  text-transform: uppercase;
  margin: 0;
}
</style>
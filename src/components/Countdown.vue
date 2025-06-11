<script setup lang="ts">
import {ref, watch} from "vue";
import {IonGrid, IonRow, IonCol} from '@ionic/vue';

export type Props = {
  dateInMillis: number
};
const props = defineProps<Props>();

const days = ref<number>(0);
const hours = ref<number>(0);
const minutes = ref<number>(0);
const seconds = ref<number>(0);

// TODO: Handle dates in the future
const calculateCountdown = (inputSeconds: number) => {
  const numSeconds = parseInt(inputSeconds.toString(), 10);
  days.value = Math.floor(numSeconds / 86400);
  hours.value = Math.floor((numSeconds - (days.value * 86400)) / 3600);
  minutes.value = Math.floor((numSeconds - (hours.value * 3600) - (days.value * 86400)) / 60);
  seconds.value = numSeconds - (days.value * 86400) - (hours.value * 3600) - (minutes.value * 60);
};

watch(
    () => [props.dateInMillis],
    () => {
      setInterval(() => {
        const dateInSeconds = Math.floor(props.dateInMillis / 1000);
        const actualDateInSeconds = Math.floor(Date.now() / 1000);

        if (props.dateInMillis > 0) {
          calculateCountdown(actualDateInSeconds - dateInSeconds);
        }
      }, 1000);
    },
    {deep: true, immediate: true}
)
</script>

<template>
  <div class="container" v-if="dateInMillis > 0">
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
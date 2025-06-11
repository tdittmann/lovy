<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonToolbar,
  modalController
} from "@ionic/vue";
import {computed, ref} from "vue";
import {Milestone} from "@/services/relationship.service";

const intermediateMilestone = ref<Milestone>({
  date: new Date(),
  description: "",
});

const isValid = computed<boolean>(() => {
  return intermediateMilestone.value.description !== "" && intermediateMilestone.value.date !== undefined;
});

const cancel = () => modalController.dismiss(null, 'cancel');

const confirm = () => modalController.dismiss(intermediateMilestone.value, 'confirm');

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Abbrechen</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true" color="primary" :disabled="!isValid">Hinzufügen
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonItem>
      <IonInput label-placement="stacked"
                label="Beschreibung"
                v-model="intermediateMilestone.description"
                placeholder="💑 Jahrestag"/>
    </IonItem>
    <p></p>
    <IonItem>
      <IonDatetime :showDefaultTitle="true"
                   @ionChange="intermediateMilestone.date = new Date($event.detail.value)">
        <span slot="title">Zeitpunkt</span>
      </IonDatetime>
    </IonItem>
  </IonContent>
</template>

<style scoped>

</style>
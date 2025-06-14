<script lang="ts" setup>
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import {Milestone, Relationship, RelationshipService} from "@/services/relationship.service";
import {ref, watch} from "vue";
import {add, trashBinOutline} from "ionicons/icons";
import {DateUtils} from "../utils/DateUtils";
import NewMilestoneComponent from "@/components/NewMilestoneComponent.vue";

export type Props = {
  relationship: Relationship
};
const props = defineProps<Props>();

// TODO: Image should be updateable as well
const intermediateRelationship = ref<Relationship>({
  code: "",
  name1: "",
  name2: "",
  image: "",
  milestones: [],
});

const cancel = () => modalController.dismiss(null, 'cancel');

const confirm = () => modalController.dismiss(intermediateRelationship.value, 'confirm');

const removeMilestone = (milestone: Milestone) => {
  const index = intermediateRelationship.value.milestones.findIndex(value => value === milestone);
  if (index >= 0) {
    intermediateRelationship.value.milestones = intermediateRelationship.value.milestones.splice(index + 1);
  }
};

const openModal = async () => {
  const modal = await modalController.create({
    component: NewMilestoneComponent,
  });
  modal.present();

  const {data, role} = await modal.onWillDismiss();

  if (role === 'confirm') {
    intermediateRelationship.value.milestones.push(data);
    intermediateRelationship.value.milestones.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
};

const getBackgroundImage = (image: string) => {
  if (!image) {
    return null;
  }
  return 'data:image/gif;base64,' + image;
};

watch(
    () => [props.relationship],
    () => {
      intermediateRelationship.value = RelationshipService.cloneRelationship(props.relationship);
    },
    {deep: true, immediate: true,}
)
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Abbrechen</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true" color="primary">Speichern</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonAvatar class="image">
      <img :src="getBackgroundImage(intermediateRelationship.image)"/>
    </IonAvatar>
    <IonItem>
      <IonInput label-placement="stacked"
                label="Name 1"
                v-model="intermediateRelationship.name1"
                placeholder="Lisa"/>
    </IonItem>
    <IonItem>
      <IonInput label-placement="stacked"
                label="Name 2"
                v-model="intermediateRelationship.name2"
                placeholder="Thomas"/>
    </IonItem>

    <h4>Meilensteine</h4>
    <IonList>
      <IonItem v-for="milestone in intermediateRelationship.milestones"
               :key="milestone.description">
        <IonLabel>
          {{ milestone.description }}
          <p>{{ DateUtils.longDate(milestone.date) }}</p>
        </IonLabel>
        <IonButton slot="end" fill="clear" @click="removeMilestone(milestone)">
          <IonIcon slot="icon-only" :icon="trashBinOutline"></IonIcon>
        </IonButton>
      </IonItem>
    </IonList>

    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton>
        <IonIcon :icon="add" @click="openModal"></IonIcon>
      </IonFabButton>
    </IonFab>

  </IonContent>
</template>

<style scoped>
.image {
  margin: auto;
}
</style>
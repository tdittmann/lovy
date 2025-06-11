<script setup lang="ts">
import MilestoneAccordion from "@/components/MilestoneAccordion.vue";
import {
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  modalController
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {Relationship, RelationshipService} from "@/services/relationship.service";
import {settingsOutline} from "ionicons/icons";
import SettingsComponent from "@/components/SettingsComponent.vue";

export type Props = {
  relationship: Relationship | undefined
};
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "updateRelationship", relationship: Relationship): void;
}>();

const getBackgroundImage = (image: string) => {
  if (!image) {
    return null;
  }
  return 'url("data:image/gif;base64,' + image + '")';
};

const openModal = async () => {
  const modal = await modalController.create({
    component: SettingsComponent,
    componentProps: {
      relationship: props.relationship,
    },
  });
  modal.present();

  const {data, role} = await modal.onWillDismiss();

  if (role === 'confirm') {
    RelationshipService.updateRelationship(data).then(() => {
      emit("updateRelationship", data);
    });
  }
};

const heartBeat = ref<boolean>(false);
const beatHeart = () => {
  setInterval(() => {
    heartBeat.value = !heartBeat.value;
  }, 2000)
};
onMounted(() => {
  beatHeart();
});
</script>

<template>
  <IonContent class="content"
              v-if="props.relationship"
              :style="{ 'background-image': getBackgroundImage(props.relationship?.image) }">

    <IonIcon class="settings-icon"
             size="large"
             :icon="settingsOutline"
             @click="openModal"/>

    <div class="details ion-text-center">
      <IonCard>
        <IonCardContent class="card-content">
          <IonGrid>
            <IonRow class="name-row">
              <IonCol>
                <div class="name ion-text-right">{{ props.relationship?.name1 }}</div>
              </IonCol>
              <IonCol><span class="heart"
                            :class="{bigHeart: heartBeat, smallHeart: !heartBeat}">♥️</span>
              </IonCol>
              <IonCol>
                <div class="name ion-text-left">{{ props.relationship?.name2 }}</div>
              </IonCol>
            </IonRow>
          </IonGrid>

          <!-- TODO: Add max height when many items are added! -->
          <IonAccordionGroup>
            <MilestoneAccordion v-for="milestone in props.relationship.milestones"
                                :key="milestone.description"
                                :description="milestone.description"
                                :date="milestone.date"/>
          </IonAccordionGroup>
        </IonCardContent>
      </IonCard>
    </div>
  </IonContent>
</template>

<style scoped>
.content {
  --background: transparent;
  background-position: center;
  background-size: cover;
}

.settings-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #fff;
}

.card-content {
  padding: 0 !important;
}

.details {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.name-row {
  height: 130px;
  align-items: center;
}

.heart {
  transition-duration: 2s;
}

.bigHeart {
  font-size: 80px;
}

.smallHeart {
  font-size: 30px;
}

.name {
  font-size: 1.5em;
  font-weight: bolder;
}
</style>
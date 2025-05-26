<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  toastController
} from '@ionic/vue';
import {Relationship, RelationshipService} from "@/services/relationship.service";
import {ref} from "vue";

const emit = defineEmits<{
  (e: "loginSucceeded", relationship: Relationship): void;
}>();

const enteredCode = ref<string>("");

const checkCode = async () => {
  if (enteredCode.value) {
    RelationshipService.loadRelationship(enteredCode.value)
        .then(response => {
          if (!response) {
            showRelationshipNotFoundToast();
            return;
          }

          emit("loginSucceeded", response);
        });
  }
};

const showRelationshipNotFoundToast = async () => {
  const toast = await toastController.create({
    message: 'Code nicht gefunden, bitte versuche es erneut',
    duration: 2000,
  });
  await toast.present();
}
</script>

<template>
  <IonContent>
    <div class="content">
      <IonCard class="login-card">
        <IonCardHeader>
          <IonCardTitle>Code eingeben...</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>... um einen Überlick über Eure Meilensteine zu haben.</p>
          <IonItem>
            <IonInput v-model="enteredCode"/>
          </IonItem>
          <IonButton class="login-button" @click="checkCode">Anmelden</IonButton>
        </IonCardContent>
      </IonCard>
    </div>
  </IonContent>
</template>

<style scoped>
.content {
  background-color: #2e2745;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  max-width: 500px;
}

.login-button {
  margin-top: 16px;
}
</style>
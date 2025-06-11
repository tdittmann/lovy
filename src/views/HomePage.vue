<script setup lang="ts">
import {IonPage} from '@ionic/vue';
import {onMounted, ref} from "vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RelationshipComponent from "@/components/RelationshipComponent.vue";
import {Relationship, RelationshipService} from "@/services/relationship.service";

const showLogin = ref<boolean>(false);
const relationship = ref<Relationship | undefined>(undefined);

const setRelationship = (r: Relationship) => {
  localStorage.setItem("code", r.code);
  relationship.value = r;
  showLogin.value = false;
};

const updateRelationship = (r: Relationship) => {
  relationship.value = r;
};

onMounted(() => {
  const existingCode = localStorage.getItem("code");
  if (!existingCode) {
    showLogin.value = true;
  }

  RelationshipService.loadRelationship(<string>existingCode)
      .then((value) => {
        if (!value) {
          showLogin.value = true;
        }
        relationship.value = value;
      });
})
</script>

<template>
  <IonPage>
    <LoginComponent v-if="showLogin"
                    @loginSucceeded="setRelationship"/>

    <RelationshipComponent v-if="!showLogin"
                           :relationship="relationship"
                           @updateRelationship="updateRelationship"/>
  </IonPage>
</template>

<style scoped>

</style>

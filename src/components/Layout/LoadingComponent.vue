<template>
  <v-overlay :value="isLoading">
    <v-progress-circular
      indeterminate
      :size="70"
      :width="7"
      color="primary"
      class="mb-0"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  data: () => ({
    isLoading: false
  })
};
</script>

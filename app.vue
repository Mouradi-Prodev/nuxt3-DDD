<script lang="ts" setup>


const users = ref<User[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    users.value = await $fetch("api/users");
    error.value = null;
  } catch (err) {
    console.error("Error fetching users:", err);
    error.value = "Failed to load users";
  }
});
</script>
<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-else-if="users.length > 0">
      <li v-for="(user, index) in users" :key="index">{{ user.name }}</li>
    </ul>
    <div v-else>Loading users...</div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-bottom: 10px;
}
</style>

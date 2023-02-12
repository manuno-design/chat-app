<template>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      loading...
    </template>
  </suspense>
</template>

<script lang="ts" setup>
  //
</script>

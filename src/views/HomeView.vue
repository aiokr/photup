<script setup lang="ts">

let url = "https://flex.tripper.press/flex/flow";
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
console.log(url)
</script>

<template>
  <div>
  </div>
</template>

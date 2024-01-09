<script setup lang="ts"></script>

<template>
  <Suspense>
    <Locale />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav {
  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>

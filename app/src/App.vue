<script setup lang="ts">
type Locale = {
  [key: string]: string
}

const imageModules = import.meta.glob('/src/assets/images/*jpg', { eager: true })
const images: string[] = []

for (const img in imageModules) {
  if (Object.prototype.hasOwnProperty.call(imageModules, img)) {
    images.push((imageModules as Record<string, { default: string }>)[img].default)
  }
}

const locale: Locale[] = [
  { KR: '대한민국' },
  { CHE: '스위스' },
  { CHN: '중국' },
  { CZE: '체코' },
  { DE: '독일' },
  { ES: '스페인' },
  { HI: '하와이' },
  { HK: '홍콩' },
  { JP: '일본' },
  { MDV: '몰디브' },
  { RUS: '러시아' },
  { SIN: '싱가포르' },
  { TUR: '튀르키예' },
  { TW: '대만' },
  { UK: '영국' },
]

const matchedLocales = images
  .map((path: string) => {
    const match = path.match(/bg_(\w+)\.jpg$/)
    const key = match ? match[1] : null
    const localeEntry = locale.find((entry) => key && entry[key])

    return {
      img: path,
      name: key && localeEntry ? localeEntry[key] : null,
    }
  })
  .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
</script>

<template>
  <main class="container locale">
    <ul>
      <li class="locale--card" v-for="item of matchedLocales" :key="item.img">
        <strong class="locale--title">{{ item.name }}</strong>
        <img class="locale--img" :src="item.img" alt="" />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
}

.locale {
  &--card {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(180deg, rgba(51, 51, 51, 1) 0%, rgba(0, 164, 255, 0.2) 100%);
    }
  }
  &--title {
    position: absolute;
    z-index: 10;
    top: 15px;
    left: 15px;
    font-size: 30px;
    color: #fff;
  }
  &--img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
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

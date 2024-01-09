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
  { seoul: '대한민국', code: 'KWR' },
  { bern: '스위스', code: 'EUR' },
  { beijing: '중국', code: 'CNY' },
  { prague: '체코', code: 'EUR' },
  { berlin: '독일', code: 'EUR' },
  { barcelona: '스페인', code: 'EUR' },
  { hawaii: '하와이', code: 'USD' },
  { hongkong: '홍콩', code: 'HKD' },
  { tokyo: '일본', code: 'JPY' },
  { maldives: '몰디브', code: 'USD' },
  { moscow: '러시아', code: 'RUB' },
  { singapore: '싱가포르', code: 'SGD' },
  { ankara: '튀르키예', code: 'TRY' },
  { taipei: '대만', code: 'TWD' },
  { london: '영국', code: 'EUR' },
]

const matchedLocales = images
  .map((path: string) => {
    const match = path.match(/bg_(\w+)\.jpg/)
    const key = match ? match[1] : null
    const localeEntry = locale.find((entry) => key && entry[key])

    return {
      img: path,
      name: key && localeEntry ? localeEntry[key] : null,
      code: key && localeEntry ? localeEntry.code : null,
    }
  })
  .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
</script>

<template>
  <div class="container locale">
    <ul>
      <li class="locale--card" v-for="item of matchedLocales" :key="item.img">
        <strong class="locale--title">{{ item.name }}</strong>
        <span class="locale--money"></span>
        <img class="locale--img" :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  max-width: 800px;
}

.locale {
  &--card {
    position: relative;
    width: 100%;
    height: 200px;
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
</style>

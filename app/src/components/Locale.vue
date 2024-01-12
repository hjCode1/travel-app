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
  { seoul: '대한민국', code: 'KRW' },
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

const matchedLocales = computed(() => {
  return images
    .map((path: string) => {
      const match = path.match(/bg_(\w+)\.jpg/)
      const key = match ? match[1] : null
      const localeEntry = locale.find((entry) => key && entry[key])

      return {
        img: path,
        name: key && localeEntry ? localeEntry[key] : null,
        code: key && localeEntry ? localeEntry.code : null,
        detail: ref(false),
      }
    })
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
})

const url = `http://data.fixer.io/api/latest?access_key=${import.meta.env.VITE_FIXER_KEY}`

const {
  isLoading,
  data: rates,
  error,
} = useQuery({
  queryKey: ['locale'],
  queryFn: async () => {
    const { data } = await useFetch(url)
    const exchangeRates = useExchangeRates(JSON.parse(data.value).rates, 'KRW', 1000)
    const toFixedExchangeRates = Object.fromEntries(
      Object.entries(exchangeRates).map(([key, value]) => [key, parseFloat(value.toFixed(2))])
    )
    return toFixedExchangeRates
  },
  staleTime: Infinity,
  // enabled: fetchEnable
})

function showDetail(item) {
  item.detail.value = true
}
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-if="!isLoading" class="container locale">
    <ul>
      <li
        :class="['locale--card', item.detail.value ? 'detail' : '']"
        v-for="item of matchedLocales"
        :key="item.img"
        @click="showDetail(item)"
      >
        <strong class="locale--title">{{ item.name }}</strong>
        <button v-show="item.detail.value" @click.stop.prevent="item.detail.value = false" class="locale--close-btn">
          X
        </button>
        <span class="locale--money">{{ rates[item.code] }}</span>
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
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;

    &:after {
      content: '';
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgb(70 144 120) 0%, rgba(0, 164, 255, 0.2) 100%);
      opacity: 0.7;
    }
    &.detail {
      position: fixed;
      top: 50%;
      z-index: 20;
      transform: translateY(-50%);
      height: 70%;
      box-shadow: 0 0 15px rgba(0, 0, 0, 1);
    }
  }
  &--title {
    position: absolute;
    z-index: 10;
    top: 15px;
    left: 15px;
    font-size: 30px;
    color: #fff;
    font-weight: 100;
  }
  &--close-btn {
    font-size: 30px;
    color: #fff;
    position: absolute;
    right: 15px;
    top: 15px;
    background: transparent;
    border: 0;
    box-shadow: 0;
    z-index: 30;
    cursor: pointer;
  }
  &--img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &--money {
    font-size: 25px;
    color: #fff;
    position: absolute;
    left: 15px;
    bottom: 15px;
    z-index: 10;
  }
}
</style>

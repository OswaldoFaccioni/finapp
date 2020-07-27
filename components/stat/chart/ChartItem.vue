<script>
import dayjs from 'dayjs'

export default {
  props: {
    period: {
      type: Object,
      required: true
    },
    maxAmountValue: {
      type: Number,
      required: true
    },
    parentClassName: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeChartLeftOffset: null,
      hoverChart: null
    }
  },

  computed: {
    className () {
      const filterDate = this.$store.state.filter.date
      const filterPeriod = this.$store.state.filter.period
      const currentPeriodDate = this.period.date
      const hasTrns = this.period.expenses > 0 || this.period.incomes > 0

      return {
        _active: dayjs(parseInt(currentPeriodDate)).isSame(filterDate, filterPeriod),
        [`_${filterPeriod}`]: true,
        _grouped: this.$store.state.chart.periods[filterPeriod].grouped,
        _empty: !hasTrns && this.$store.state.chart.periods[filterPeriod].hideEmpty
      }
    },
    formatedPeriodName () {
      const dateValueOf = parseInt(this.period.date)
      const filterPeriod = this.$store.state.filter.period
      let formatedDate

      switch (filterPeriod) {
        case 'day':
          formatedDate = dayjs(dateValueOf).format('D')
          if (!this.$store.state.chart.periods[filterPeriod].grouped) {
            dayjs().isSame(dateValueOf, 'year')
              ? formatedDate = dayjs(dateValueOf).format('D.MM')
              : formatedDate = dayjs(dateValueOf).format('D.MM.YY')
          }
          return formatedDate

        case 'week':
          return dayjs(parseInt(dateValueOf)).week()

        case 'month':
          formatedDate = dayjs(dateValueOf).format('MMM')
          if (!this.$store.state.chart.periods[filterPeriod].grouped) {
            dayjs().isSame(dateValueOf, 'year')
              ? formatedDate = dayjs(dateValueOf).format('MMM')
              : formatedDate = dayjs(dateValueOf).format('MMM YY')
          }
          return formatedDate

        case 'year':
          return dayjs(dateValueOf).format('YYYY')
      }
    },
    periods () {
      return this.$store.state.chart.periods
    }
  },

  methods: {
    getStyle (amount) {
      return {
        height: `${Math.abs(amount) / Math.abs(this.maxAmountValue) * 100}%`
      }
    },
    handlePerioSelect () {
      this.$store.dispatch('filter/setDate', parseInt(this.period.date))
    },
    onMouseEnterChartItem (event) {
      const filterPeriod = this.$store.state.filter.period
      const isPeriodGrouped = this.$store.state.chart.periods[filterPeriod].grouped
      const values = this.period
      const parent = document.querySelector(this.parentClassName)
      const parentScrollLeft = parent.scrollLeft
      const targetOffset = event.target.offsetLeft
      const targetWidth = event.target.clientWidth
      const parentOffset = event.target.parentNode.parentNode.offsetLeft
      let offset
      isPeriodGrouped
        ? offset = `${targetOffset + (targetWidth / 2) + parentOffset - parentScrollLeft}px`
        : offset = `${targetOffset + (targetWidth / 2) - parentScrollLeft}px`
      this.$store.commit('chart/setHoveredPeriodValues', { values, offset })
    }
  }
}
</script>

<template lang="pug">
.chartItem(
  :class="className"
  @click="handlePerioSelect"
  @mouseenter="onMouseEnterChartItem"
  @mouseleave="$store.commit('chart/clearHoveredPeriodValues')")
  .chartItem__graph
    .chartItem__graph-box(v-if="period.expenses <= 0 && period.incomes <= 0")
      .chartItem__graph-line._empty
    .chartItem__graph-box(v-if="period.incomes > 0")
      .chartItem__graph-line._incomes(:style="getStyle(period.incomes)")
    .chartItem__graph-box(v-if="period.expenses > 0")
      .chartItem__graph-line._expenses(:style="getStyle(period.expenses)")
  .chartItem__name {{ formatedPeriodName }}
</template>

<style lang="stylus" scoped>
@import "~assets/stylus/variables/margins"
@import "~assets/stylus/variables/fonts"
@import "~assets/stylus/variables/media"
@import "~assets/stylus/variables/scroll"

.chartItem
  cursor pointer
  padding $m5 $m5
  flex-grow 0
  max-width 80px
  border-left 1px solid transparent
  border-right 1px solid transparent

  @media $media-laptop
    padding 12px $m5

  &._empty
    display none

  &._week
    min-width 50px
    padding-left $m5
    padding-right $m5

  &._month
    padding-left 10px
    padding-right 10px
    @media $media-laptop
      min-width 20px

  &._year
    padding-left $m8
    padding-right $m8

  &._grouped
    border-color transparent
    min-width 0

  &._grouped._day
    padding-left 2px
    padding-right 2px

  &._grouped._week
  &._grouped._month
    padding-left 2px
    padding-right 2px

    @media $media-laptop
      padding-left 4px
      padding-right 4px

  &:hover
    background var(--c-bg-1)
    border-color transparent

  &._active
    color var(--c-font-2)
    background var(--c-bg-4)
    border-left 1px solid var(--c-bg-1)
    border-right 1px solid var(--c-bg-1)

   &._active._grouped
    border-right 1px solid var(--c-bg-1)

  &__name
    text-align center
    typo-small-upper(10px)
    padding-top 4px
    white-space nowrap

    @media $media-laptop
      padding-top $m5
      typo-small-upper(12px)

  &__graph
    display flex
    justify-content center

    &-box
      display flex
      flex-flow column
      justify-content flex-end
      height 90px

      @media $media-laptop
        height 90px

      ^[0]._grouped &
        height calc(62px + 28px)
        padding-top 28px

        @media $media-laptop
          height calc(79px + 42px)
          padding-top 42px

    &-line
      width 6px
      margin 0 1px
      min-height 1px
      border-radius 6px

      &._expenses
        background var(--c-expenses-1)

      &._incomes
        background var(--c-incomes-1)

      &._empty
        width 2px
        background grey
</style>
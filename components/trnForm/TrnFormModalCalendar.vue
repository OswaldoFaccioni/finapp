<script>
import Datepicker from 'vuejs-datepicker'

const calendarOptions = {
  'use-utc': true,
  disabledDates: {
    from: new Date()
  }
}

export default {
  components: {
    Datepicker
  },

  computed: {
    date () {
      return this.$store.state.trnForm.values.date
    }
  },

  created () {
    this.calendarOptions = calendarOptions
  },

  methods: {
    handleSelectDate (date) {
      this.$store.commit('trnForm/setTrnFormValues', {
        date: this.$day(date).valueOf()
      })
      this.$store.commit('trnForm/toogleTrnFormModal', 'calendar')
    },
    handleSelectDateDaysAgo (daysAgo) {
      this.$store.commit('trnForm/setTrnFormValues', {
        date: this.$day().subtract(daysAgo, 'day').valueOf()
      })
      this.$store.commit('trnForm/toogleTrnFormModal', 'calendar')
    }
  }
}
</script>

<template lang="pug">
TrnFormModal(
  v-if="$store.state.trnForm.modal.calendar"
  :show="$store.state.trnForm.modal.calendar"
  title="Date"
  :position="$store.state.ui.mobile ? 'bottom' : null"
  @onClose="$store.commit('trnForm/toogleTrnFormModal', 'calendar')"
)
  Datepicker(
    :inline="true"
    :value="date"
    :monday-first="true"
    wrapper-class="inlineCalendar"
    calendar-class="inlineCalendar__in"
    :disabledDates="calendarOptions.disabledDates"
    @selected="handleSelectDate"
  )
  .modalLinks
    ModalButton(
      name="2 days ago"
      icon="mdi mdi-calendar-clock"
      @onClick="() => handleSelectDateDaysAgo(2)"
    )
    ModalButton(
      name="Yesterday"
      icon="mdi mdi-weather-night"
      @onClick="() => handleSelectDateDaysAgo(1)"
    )
    ModalButton(
      name="Today"
      icon="mdi mdi-weather-sunset-up"
      @onClick="() => handleSelectDateDaysAgo(0)"
    )
</template>

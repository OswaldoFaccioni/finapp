<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },

    position: {
      type: Object,
      default: () => ({
        left: true,
        bottom: true
      })
    }
  },

  data () {
    return {
      visibleCustomizeMenu: false
    }
  },

  computed: {
    positionStyles () {
      const styles = { ...this.position }
      return styles
    }
  }
}
</script>

<template lang="pug">
div
  ContextMenu(
    :position="position"
    :visible="visibleCustomizeMenu"
    @onClickOpener="visibleCustomizeMenu = !visibleCustomizeMenu"
  )
    template(slot="opener")
      template(v-if="icon")
        Button._border._square(:icon="icon")
      template(v-else)
        Dropdown._inline(
          :active="visibleCustomizeMenu"
          :title="$t('settings.customize')"
        )

  BaseModal(
    :show="visibleCustomizeMenu"
    :title="$t('settings.customize')"
    @onClose="visibleCustomizeMenu = !visibleCustomizeMenu"
  )
    ContextMenuItem(
      icon="mdi mdi-credit-card-multiple"
      title="Wallets"
      :showCheckbox="true"
      :checkboxValue="$store.state.ui.stat.walletsVisibility === 'visible'"
      @onClick="$store.dispatch('ui/toogleStatWalletsVisibility')"
    )

    ContextMenuItem(
      :checkboxValue="$store.state.ui.statGraphsVisibility === 'visible'"
      :showCheckbox="true"
      :title="$t('stat.customize.showPeriodsChart')"
      icon="mdi mdi-chart-bar-stacked"
      @onClick="$store.dispatch('ui/toogleShowStatGraphs')"
    )

    ContextMenuItem(
      :checkboxValue="$store.state.ui.catsChart === 'visible'"
      :showCheckbox="true"
      icon="mdi mdi-folder-star"
      title="Stat categories chart"
      @onClick="$store.dispatch('ui/toogleVisibleCatsChart')"
    )

    ContextMenuItem(
      :checkboxValue="$store.state.ui.statItems === 'visible'"
      :showCheckbox="true"
      icon="mdi mdi-history"
      title="Stat categories list"
      @onClick="$store.dispatch('ui/toogleVisibilityStatItems')"
    )

    .context-menu-sep

    ContextMenuItem(
      :title="$t('theme.change')"
      icon="mdi mdi-palette"
      @onClick="$store.dispatch('ui/changeTheme')"
    )
</template>

<script>
export default {
  data () {
    return {
      visibleSettingsMenu: false
    }
  },

  computed: {
    activeTab () {
      return this.$store.state.ui.activeTab
    }
  },

  methods: {
    handleShowWalletModal (id) {
      this.$store.commit('wallets/showWalletModal')
      this.$store.commit('wallets/setWalletModalId', id)
    }
  }
}
</script>

<template lang="pug" scoped>
.sidebar
  .sidebar__top
    .sidebar__menu
      ContextMenu(
        :position="{ left: true, top: true }"
        :visible="visibleSettingsMenu"
        @onClickOpener="visibleSettingsMenu = !visibleSettingsMenu")
        template(slot="opener")
          .link(:class="{ _active: visibleSettingsMenu }"): .mdi.mdi-tune

        template(slot="content")
          ContextMenuItem(
            :title="$t('theme.change')"
            icon="mdi mdi-palette"
            @onClick="$store.dispatch('ui/changeTheme')"
          )
          ContextMenuItem(
            icon="mdi mdi-cog-outline"
            :title="$t('settings.open')"
            @onClick="$store.dispatch('ui/setActiveTab', 'settings')"
            @onClose="visibleSettingsMenu = !visibleSettingsMenu")
          .context-menu-sep
          ContextMenuItem(
            :title="$t('userLogout')"
            icon="mdi mdi-logout"
            @onClick="$store.dispatch('user/signOut')"
            @onClose="visibleSettingsMenu = !visibleSettingsMenu"
          )

      .sidebar__menu__item(
        :class="{ _active: activeTab === 'wallets'}"
        @click="$store.dispatch('ui/setActiveTab', 'wallets')"
      ): .mdi.mdi-credit-card-multiple

      .sidebar__menu__item(
        :class="{ _active: activeTab === 'categories'}"
        @click="$store.dispatch('ui/setActiveTab', 'categories')"
      ): .mdi.mdi-folder-star

      .sidebar__menu__item(
        :class="{ _active: activeTab === 'stat'}"
        @click="$store.dispatch('ui/setActiveTab', 'stat')"
      ): .mdi.mdi-poll

  Menu

  .sidebar__content
    WalletsTotal

    WalletsList(
      :showToogle="true"
      :limit="6"
      @onClick="(id) => handleShowWalletModal(id)")
</template>

<style lang="stylus" scoped>
@import "~assets/stylus/variables"

.sidebar
  display grid
  grid-template-columns 1fr
  grid-template-rows minmax(auto, auto) minmax(auto, auto) 1fr
  height 100vh
  background var(--c-bg-4)
  border-right 1px solid var(--c-bg-2)

  &__menu
    display flex
    justify-content space-between
    padding 0 $m7
    background var(--c-bg-3)
    border-bottom 1px solid var(--c-bg-2)

    &__item
      position relative
      display inline-flex
      align-items center
      justify-content center
      padding $m7 $m8
      font-header-1()
      color var(--c-font-4)
      font-size 18px

      +media-laptop()
        padding 10px 20px

      &:hover
        @media $media-laptop
          background var(--c-bg-6)

      &._active
        color var(--c-font-2)

  &__content
    scrollbar()
    overflow hidden
    overflow-y auto
    height 100%

.link
  z-index 1
  padding $m7 $m8
  font-header-1()
  color var(--c-font-4)
  font-size 18px

  &:hover:not(._active)
    @media $media-laptop
      background var(--c-bg-6)
</style>

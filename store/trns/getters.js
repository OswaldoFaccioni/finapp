import dayjs from 'dayjs'

export default {
  hasTrns (state, getters, rootState) {
    if (rootState.trns.items) {
      if (Object.keys(rootState.trns.items).length > 0) {
        return true
      }
    }
    return false
  },

  /**
    * Return total amounts of trnsIds
    *
    * @param {Array} trnsIds
    * @return {Object} return
    * @return {String} return.expenses
    * @return {String} return.incomes
    * @return {String} return.total
  */
  getTotalOfTrnsIds: (state, getters, rootState, rootGetters) => (trnsIds, inculdeTrnasfers = false) => {
    const trns = rootState.trns.items
    const currencies = rootState.currencies.rates
    const wallets = rootState.wallets.items
    const baseCurrency = rootState.currencies.base
    const transferCategoryId = rootGetters['categories/transferCategoryId']

    let expenses = 0
    let incomes = 0

    for (const key of trnsIds) {
      const trn = trns[key]
      if (trn && (inculdeTrnasfers || trn.categoryId !== transferCategoryId || trn.type !== 2)) {
        // transfer
        if (trn.type === 2) {
          const fromWallet = wallets[trn.fromWalletId]
          const toWallet = wallets[trn.toWalletId]

          if (fromWallet && toWallet && currencies) {
            let transferFromAmount = 0
            let transferToAmount = 0

            if (fromWallet.currency !== baseCurrency) {
              transferFromAmount = Math.abs(trn.fromAmount / currencies[fromWallet.currency])
            }
            else {
              transferFromAmount = trn.fromAmount
            }

            if (transferToAmount.currency !== baseCurrency) {
              transferToAmount = Math.abs(trn.toAmount / currencies[toWallet.currency])
            }
            else {
              transferToAmount = trn.toAmount
            }

            expenses = expenses + transferFromAmount
            incomes = incomes + transferToAmount
          }
        }

        // simple transaction
        else {
          const wallet = wallets[trn.walletId]
          if (wallet && currencies) {
            let amount = 0

            if (wallet.currency !== baseCurrency) { amount = Math.abs(trn.amount / currencies[wallet.currency]) }
            else { amount = trn.amount }

            if (trn.type === 1) { incomes = incomes + amount }
            else { expenses = expenses + amount }
          }
        }
      }
    }

    return {
      expenses: Math.abs(+expenses.toFixed(0)),
      incomes: Math.abs(+incomes.toFixed(0)),
      total: parseInt(incomes - expenses)
    }
  },

  // getTrnsIdsInWallet
  getTrnsIdsInWallet: (state, getters, rootState) => (walletId) => {
    const trns = rootState.trns.items
    const trnsIds = []
    for (const trnId in trns) {
      if (trns[trnId]) {
        if (trns[trnId].walletId === walletId || trns[trnId].fromWalletId === walletId || trns[trnId].toWalletId === walletId) {
          trnsIds.push(trnId)
        }
      }
    }
    return trnsIds
  },

  lastCreatedTrnId (state, getters, rootState, rootGetters) {
    if (getters.hasTrns) {
      const trnsIds = getters.sortedTrnsIds
      const trns = rootState.trns.items
      const transferCategoryId = rootGetters['categories/transferCategoryId']

      if (trnsIds.length) {
        for (const trnId of trnsIds) {
          if (trns[trnId].categoryId !== transferCategoryId && trns[trnId].type !== 2) {
            return trnId
          }
        }
      }
    }
  },

  firstCreatedTrnId (state, getters) {
    if (getters.hasTrns) {
      const trnsIds = [...getters.sortedTrnsIds].reverse()
      return trnsIds[0]
    }
  },

  firstCreatedTrnIdFromSelectedTrns (state, getters, rootState, rootGetters) {
    const trnsIds = [...getters.selectedTrnsIds].reverse()
    const trns = rootState.trns.items
    const transferCategoryId = rootGetters['categories/transferCategoryId']

    if (trnsIds.length) {
      for (const trnId of trnsIds) {
        if (trns[trnId].categoryId !== transferCategoryId && trns[trnId].type !== 2) {
          return trnId
        }
      }
    }
  },

  // selectedTrnsIds
  selectedTrnsIds (state, getters, rootState) {
    if (!getters.hasTrns) { return [] }

    const categories = rootState.categories.items
    const categoriesIds = Object.keys(categories)
    const filterCategoryId = rootState.filter.categoryId
    const filterWalletId = rootState.filter.walletId
    const trns = rootState.trns.items
    let trnsIds = Object.keys(trns)

    // filter wallet
    if (filterWalletId) {
      trnsIds = trnsIds.filter(trnId => trns[trnId].walletId === filterWalletId)
    }

    // filter category
    if (filterCategoryId) {
      const childCategoriesIds = categoriesIds.filter(id => categories[id].parentId === filterCategoryId)
      if (childCategoriesIds.length) {
        trnsIds = trnsIds.filter((trnId) => {
          const trnCategoryId = trns[trnId].categoryId
          for (const categoryId of childCategoriesIds) {
            if (trnCategoryId === categoryId) { return true }
          }
        })
      }
      else {
        trnsIds = trnsIds.filter(trnId => trns[trnId].categoryId === filterCategoryId)
      }
    }

    trnsIds = trnsIds
      .sort((a, b) => {
        if (trns[a].date > trns[b].date) { return -1 }
        if (trns[a].date < trns[b].date) { return 1 }
        return 0
      })

    return trnsIds
  },

  selectedTrnsIdsWithDate (state, getters, rootState) {
    if (!getters.hasTrns) { return [] }

    const trns = rootState.trns.items
    const filterDate = dayjs(rootState.filter.date)
    const filterPeriod = rootState.filter.period
    const startDateValue = filterDate.startOf(filterPeriod).valueOf()
    const endDateValue = filterDate.endOf(filterPeriod).valueOf()
    let trnsIds = getters.selectedTrnsIds

    // filter date
    if (filterPeriod !== 'all') {
      trnsIds = trnsIds.filter(trnId =>
        trns[trnId].date >= startDateValue &&
        trns[trnId].date <= endDateValue
      )
    }

    trnsIds = trnsIds
      .sort((a, b) => {
        if (trns[a].date > trns[b].date) { return -1 }
        if (trns[a].date < trns[b].date) { return 1 }
        return 0
      })

    return trnsIds
  },

  // sortedTrnsIds
  sortedTrnsIds (state, getters, rootState, rootGetters) {
    if (!getters.hasTrns) { return [] }

    const trns = state.items
    const trnsIds = Object.keys(trns)

    return trnsIds.sort((a, b) => {
      if (trns[a].date > trns[b].date) { return -1 }
      if (trns[a].date < trns[b].date) { return 1 }
      return 0
    })
  },

  getTrnsIdsByFilter: (state, getters, rootState) => ({ categoryId, type }) => {
    const trns = rootState.trns.items
    let trnsIds = getters.sortedTrnsIds
    if (categoryId) { trnsIds = trnsIds.filter(id => trns[id].categoryId === categoryId) }
    if (type) { trnsIds = trnsIds.filter(id => trns[id].type === type) }

    return trnsIds
  },

  getTrns: (state, getters, rootState) => (props) => {
    if (!getters.hasTrns) { return [] }

    const { date, periodName, description, categoryId } = props
    const categories = rootState.categories.items
    const categoriesIds = Object.keys(categories)
    const filterCategoryId = rootState.filter.categoryId || categoryId
    const filterWalletId = rootState.filter.walletId

    const trns = rootState.trns.items
    let trnsIds = Object.keys(trns)

    const filterDate = dayjs(date)
    const filterPeriod = periodName || rootState.filter.period
    const startDateValue = filterDate.startOf(filterPeriod).valueOf()
    const endDateValue = filterDate.endOf(filterPeriod).valueOf()

    // filter date
    if (date && filterPeriod !== 'all') {
      trnsIds = trnsIds.filter(trnId =>
        trns[trnId].date >= startDateValue &&
        trns[trnId].date <= endDateValue
      )
    }

    // filter wallet
    if (filterWalletId) {
      trnsIds = trnsIds.filter(trnId => trns[trnId].walletId === filterWalletId)
    }

    // filter category
    if (filterCategoryId) {
      const childCategoriesIds = categoriesIds.filter(id => categories[id].parentId === filterCategoryId)
      if (childCategoriesIds.length) {
        trnsIds = trnsIds.filter((trnId) => {
          const trnCategoryId = trns[trnId].categoryId
          for (const categoryId of childCategoriesIds) {
            if (trnCategoryId === categoryId) { return true }
          }
        })
      }
      else {
        trnsIds = trnsIds.filter(trnId => trns[trnId].categoryId === filterCategoryId)
      }
    }

    // description
    if (description) {
      trnsIds = trnsIds
        .filter(trnId =>
          trns[trnId].description &&
          trns[trnId].description.includes(description))
    }

    trnsIds = trnsIds
      .sort((a, b) => {
        if (trns[a].date > trns[b].date) { return -1 }
        if (trns[a].date < trns[b].date) { return 1 }
        return 0
      })

    return trnsIds
  },

  getTrnsIds: (state, getters, rootState) => (props) => {
    if (!getters.hasTrns) { return [] }

    const categories = rootState.categories.items
    const categoriesIds = Object.keys(categories)
    const filterCategoryId = props.categoryId
    const filterWalletId = props.walletId

    const trns = rootState.trns.items
    let trnsIds = Object.keys(trns)

    // filter wallet
    if (filterWalletId) {
      trnsIds = trnsIds.filter(trnId => trns[trnId].walletId === filterWalletId)
    }

    // filter category
    if (filterCategoryId) {
      const childCategoriesIds = categoriesIds.filter(id => categories[id].parentId === filterCategoryId)
      if (childCategoriesIds.length) {
        trnsIds = trnsIds.filter((trnId) => {
          const trnCategoryId = trns[trnId].categoryId
          for (const categoryId of childCategoriesIds) {
            if (trnCategoryId === categoryId) { return true }
          }
        })
      }
      else {
        trnsIds = trnsIds.filter(trnId => trns[trnId].categoryId === filterCategoryId)
      }
    }

    trnsIds = trnsIds
      .sort((a, b) => {
        if (trns[a].date > trns[b].date) { return -1 }
        if (trns[a].date < trns[b].date) { return 1 }
        return 0
      })

    return trnsIds || []
  }
}

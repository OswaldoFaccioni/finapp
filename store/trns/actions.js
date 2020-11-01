import localforage from 'localforage'
import dayjs from 'dayjs'

import {
  removeTrnToAddLaterLocal,
  saveTrnToAddLaterLocal,
  saveTrnToDeleteLaterLocal,
  removeTrnToDeleteLaterLocal
} from './helpers'
import { db } from '~/services/firebaseConfig'

export default {
  // Create new trn and save it to offline
  addTrn ({ commit, rootState }, { id, values }) {
    const uid = rootState.user.user.uid
    const trns = rootState.trns.items
    const trnType = Number(values.amountType) || 0

    let isTrnSavedOnline = false
    let formatedTrnValues = {}

    // Incomes || expenses
    if (trnType !== 2) {
      formatedTrnValues = {
        amount: Number(String(values.amount).replace(/\s+/g, '')),
        categoryId: values.categoryId,
        date: dayjs(values.date).valueOf(),
        description: values.description || null,
        edited: dayjs().valueOf(),
        groups: values.groups || null,
        type: trnType,
        walletId: values.walletId
      }
    }

    // trnasfer
    else {
      const amount = Number(String(values.amount).replace(/\s+/g, ''))
      formatedTrnValues = {
        date: dayjs(values.date).valueOf(),
        description: values.description || null,
        edited: dayjs().valueOf(),
        fromAmount: amount,
        fromWalletId: values.fromWalletId,
        toAmount: amount,
        toWalletId: values.toWalletId,
        type: trnType
      }
    }

    localforage.setItem('next.trns', { ...trns, [id]: formatedTrnValues })
    commit('setTrns', Object.freeze({ ...trns, [id]: formatedTrnValues }))

    db.ref(`users/${uid}/trns/${id}`)
      .set(formatedTrnValues)
      .then(() => {
        isTrnSavedOnline = true
        removeTrnToAddLaterLocal(id)
      })

    setTimeout(() => {
      if (!isTrnSavedOnline) { saveTrnToAddLaterLocal({ id, values }) }
    }, 100)

    // Incomes || expenses
    if (trnType !== 2) {
      commit('trnForm/setTrnFormValues', {
        trnId: null,
        amount: '0',
        amountEvaluation: null,
        description: null
      }, { root: true })
    }
    // Trnasfer
    else {
      commit('trnForm/setTrnFormValues', {
        trnId: null,
        amount: '0',
        amountEvaluation: null,
        description: null
      }, { root: true })
    }
  },

  // delete
  deleteTrn ({ commit, rootState }, id) {
    const uid = rootState.user.user.uid
    const trns = { ...rootState.trns.items }

    delete trns[id]
    commit('setTrns', Object.freeze(trns))
    localforage.setItem('next.trns', trns)
    saveTrnToDeleteLaterLocal(id)

    db.ref(`users/${uid}/trns/${id}`)
      .remove()
      .then(() => removeTrnToDeleteLaterLocal(id))
  },

  async deleteTrnsByIds ({ rootState }, trnsIds) {
    const uid = rootState.user.user.uid
    const trnsForDelete = {}
    for (const trnId of trnsIds) {
      trnsForDelete[trnId] = null
    }

    await db.ref(`users/${uid}/trns`)
      .update(trnsForDelete)
      .then(() => console.log('trns deleted'))
  },

  // init
  async initTrns ({ rootState, dispatch, commit }) {
    const uid = rootState.user.user.uid

    await db.ref(`users/${uid}/trns`).on('value', (snapshot) => {
      const items = Object.freeze(snapshot.val())
      if (items) {
        for (const trnId of Object.keys(items)) {
          if (items[trnId].type !== 2 && (!items[trnId].walletId || items[trnId].accountId)) {
            commit('app/setAppStatus', 'loading', { root: true })
            const trn = items[trnId]
            console.log('trn', trn)
            db.ref(`users/${uid}/trns/${trnId}`)
              .set({
                amount: trn.amount,
                categoryId: trn.categoryId,
                date: Number(trn.date),
                description: trn.description || null,
                edited: dayjs().valueOf(),
                groups: trn.groups || null,
                budgets: trn.budgets || null,
                type: Number(trn.type),
                walletId: trn.accountId || trn.walletId
              })
          }
        }
      }
      dispatch('setTrns', items)
    }, e => console.error(e))
  },

  setTrns ({ commit }, items) {
    commit('setTrns', items)
    localforage.setItem('next.trns', items)
  },

  unsubcribeTrns ({ rootState }) {
    const uid = rootState.user.user.uid
    db.ref(`users/${uid}/trns`).off()
  },

  initOfflineTrns ({ dispatch }) {
    db.ref('.info/connected').on('value', async (snap) => {
      const isConnected = snap.val()
      if (isConnected) {
        // add
        const trnsOfflineUpdate = await localforage.getItem('next.trns.offline.update') || {}
        for (const trnId in trnsOfflineUpdate) {
          if (trnsOfflineUpdate[trnId] && trnsOfflineUpdate[trnId].amount) {
            dispatch('addTrn', {
              id: trnId,
              values: trnsOfflineUpdate[trnId]
            })
          }
        }
        // delete
        const trnsOfflineDelete = await localforage.getItem('next.trns.offline.delete') || []
        for (const trnId of trnsOfflineDelete) {
          dispatch('deleteTrn', trnId)
        }
      }
    })
  }
}

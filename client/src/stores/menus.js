import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

const API_URL = "http://localhost:3001"

export const useMenuStore = defineStore('menu', {
  state() {
    return {
      menus: [],
      transactions: [],
      menu: []
    }
  },
  actions: {

    async registerCustomer(payload) {
      try {
        const { data } = await axios({
          method: "POST",
          url: API_URL + '/customers/register',
          data: payload
        })
        console.log(data);
        this.showSuccessToast('success register')
        router.push('/login')
      } catch (error) {
        console.log(error);
        this.showErrorToast(error.message)
      }
    },
    async loginCustomer(payload) {
      try {
        const { data } = await axios({
          method: "POST",
          url: API_URL + '/customers/login',
          data: payload
        })
        console.log(data);
        localStorage.setItem("access_token", data.access_token)
        this.showSuccessToast('login success')

        router.push('/')
      } catch (error) {
        console.log(error,'<<<');
        this.showErrorToast(error.message)
      }
    },
    async googleLogin(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: API_URL + '/customers/google-sign-in',
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("role", data.role)
        localStorage.setItem("id", data.id)
        this.showSuccessToast('login success')

        router.push('/')
      } catch (error) {
        console.log(error);
        this.showErrorToast(error.message)
      }
    },
    async fetchMenus() {
      try {
        const { data } = await axios({
          method: "GET",
          url: API_URL + '/customers/menus',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        this.menus = data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTransactions() {
      try {
        const { data } = await axios({
          method: "GET",
          url: API_URL + '/customers/transactions',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.transactions = data
      } catch (error) {
        console.log(error);
      }
    },

    async addTransaction(id) {
      try {
        const { data } = await axios({
          method: "POST",
          url: API_URL + `/customers/transactions/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchTransactions()
        router.push('/transaction')
      } catch (error) {
        console.log(error);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<');
        this.showErrorToast(error.message)

      }
    },

    async changePaymentStatus(transactionId) {
      try {
        const { data } = await axios({
          url: API_URL + `/customers/transactions/${transactionId}`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.showSuccessToast('payment success')
        this.fetchTransactions()
      } catch (error) {
        console.log(error);
        this.showErrorToast(error.message)

      }
    },

    async payTransaction(transactionId) {

      try {
        const { data } = await axios({
          url: API_URL + `/customers/midtrans-token/${transactionId}`,
          method: "POST",
          headers: {
            access_token: localStorage.access_token
          }
        })
        const success = this.changePaymentStatus
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            success(transactionId)
          },
          // onPending: function (result) {
          //   /* You may add your own implementation here */
          //   alert("wating your payment!"); console.log(result);
          // },
          // onError: function (result) {
          //   /* You may add your own implementation here */
          //   alert("payment failed!"); console.log(result);
          // },
          // onClose: function () {
          //   /* You may add your own implementation here */
          //   alert('you closed the popup without finishing the payment');
          // }
        })
      } catch (error) {
        console.log(error);
        this.showErrorToast(error.message)

      }

    },
    async fetchMenuById(menuId) {
      try {
        const { data } = await axios({
          method: "GET",
          url: API_URL + `/customers/menus/${menuId}`,
          headers: {
            access_token: localStorage.access_token
          },
          params: {

          }
        })
        console.log(data);
        this.menu = data
      } catch (error) {
        console.log(error);
      }
    },

    async cancelTransaction(transactionId){
      try {
        const {data} = await axios({
          method: "DELETE",
          url: API_URL + `/customers/transactions/${transactionId}`,
          headers:{
            access_token: localStorage.access_token
          }
        })
        console.log(data);
        this.fetchTransactions()
        this.showSuccessToast('success cancel transaction')
      } catch (error) {
        console.log(error);
      }
    },

    showSuccessToast(message) {
      this.$toast.success(message, {
        position: "top",
        duration: 3000,
        dismissible: true
      })
    },
    showErrorToast(message) {
      this.$toast.error(message, {
        position: "top",
        duration: 3000,
        dismissible: true
      })
    },
  }
})

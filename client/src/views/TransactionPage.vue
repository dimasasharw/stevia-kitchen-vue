<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useMenuStore } from '../stores/menus';


export default {
    data() {
        return {}
    },
    components: { RouterLink },
    methods: {
        ...mapActions(useMenuStore, ['fetchTransactions', 'payTransaction', 'cancelTransaction']),
        pay(id) {
            this.payTransaction(id)
        },
        cancel(id){
            this.cancelTransaction(id)
        }
    },
    created() {
        this.fetchTransactions()
    },
    computed: {
        ...mapState(useMenuStore, ['transactions'])
    }
}
</script>

<template>
    <section class="col-md-9 mt-5 col-lg-10 px-md-4" id="lodging-section">
        <div v-if="transactions.length > 0" class="transaction-list">
            <h1 class="section-title">Your Transactions</h1>
            <RouterLink class="btn btn-outline-primary rounded-pill" to="/"><span class="icon material-symbols-outlined">+</span>New
                Order</RouterLink>
            <table class="table table-light table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Menu</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ transaction.Menu.name }}</td>
                        <td>
                            <img :src="transaction.Menu.imageUrl" alt="Menu Image" class="menu-image">
                        </td>
                        <td>{{ transaction.Menu.price }}</td>
                        <td>{{ transaction.status }}</td>
                        <td>
                            <div v-if="transaction.status === 'Unpaid'" class="button-actions">
                                <button class="btn btn-primary btn-pay" @click.prevent="pay(transaction.id)">Pay</button>
                                <button class="btn btn-outline-danger btn-cancel" @click.prevent="cancel(transaction.id)">Cancel</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="empty-transaction">
            <div class="jumbotron">
                <h1>Hello!</h1>
                <p>It seems like you haven't made any purchases yet. Feel free to explore our menu and place an order. You
                    can always come back here to check your transaction history.</p>
                <RouterLink class="btn btn-primary btn-lg" to="/">Order Now</RouterLink>
            </div>
        </div>
    </section>
</template>
  
<style scoped>
/* Warna-warna yang diterapkan */
:root {
    --primary-color: #FF5722;
    --secondary-color: #FFC107;
    --background-color: #FAFAFA;
    --text-color: #333333;
}

.section-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.transaction-list {
    padding: 20px;
    background-color: var(--background-color);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
}

.menu-image {
    max-width: 100px;
    max-height: 80px;
    object-fit: cover;
}

.btn-pay {
    padding: 5px 10px;
    font-size: 14px;
    margin-right: 8px;
}

.empty-transaction {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.jumbotron {
    background-color: var(--secondary-color);
    color: #0f0e0e;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
  
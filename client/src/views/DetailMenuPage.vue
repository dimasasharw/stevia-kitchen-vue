<script>
import { RouterLink } from 'vue-router';
import { useMenuStore } from '../stores/menus';
import { mapActions, mapState, mapWritableState } from 'pinia';

export default {
    data() {
        return {
            access_token: localStorage.access_token
        }
    },
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useMenuStore, ['fetchMenuById'])

    },
    created() {
        this.fetchMenuById(this.$route.params.id)
    },
    computed: {
        ...mapState(useMenuStore, ['menu'])
    }
}
</script>

<template>
    <div style="margin-top: 64px;">
        <div>
            <img :src="menu.imageUrl" alt="" style="height: 270px; width: 270px;">
        </div>
        <h2>{{ menu.name }}</h2>
        <p>sides: {{ menu.sides }}</p>
        <p>price: {{ menu.price }}</p>
        <RouterLink class="btn btn-primary" to="/">
            Back to Menu
        </RouterLink>
    </div>
</template>
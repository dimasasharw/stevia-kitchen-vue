<script>
import { RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue'

export default {
    data() {
        return {}
    },
    components: {
        RouterView,
        Navbar
    }
}
</script>

<template>
    <Navbar></Navbar>
    <RouterView></RouterView>
</template>
<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Stevia Kitchen</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <marquee class="running-text" behavior="scroll" direction="left">{{ runningText }}</marquee>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink v-if="access_token ? 'style:display-none' : ''" class="nav-link" to="/transaction">My
                            Transaction</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink v-if="!access_token ? 'style:display-none' : ''" class="nav-link" to="/login">Sign in
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="access_token ? 'style:display-none' : ''">
                        <a class="nav-link" href="" id="nav-logout" style="color: black;" @click.prevent="handleLogout()">
                            <span class="icon material-symbols-outlined me-2" style="color: black;">&#x27a4;</span>Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useMenuStore } from '../stores/menus';

export default {
    data() {
        return {
            access_token: localStorage.access_token,
            runningText: "Welcome to Stevia Kitchen! Order your favorite dishes now."
        };
    },
    components: {
        RouterLink
    },
    methods: {
        ...mapActions(useMenuStore, ['showSuccessToast']),
        handleLogout() {
            localStorage.clear();
            this.showSuccessToast('Success Logout');
            this.$router.push("/login");
        }
    }
};
</script>
  
<style scoped>
.navbar-custom {
    background-color: #F0E68C;
    /* Warna cream */
    color: #333333;
    /* Warna teks */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-custom a {
    color: #333333;
    transition: color 0.3s;
}

.navbar-custom a:hover {
    color: #82B1FF;
    /* Warna soft blue saat dihover */
}

.running-text {
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    width: 68%;
}

/* Gunakan font Lato */
.navbar-custom {
    font-family: 'Lato', sans-serif;
}

/* Atur efek hover pada tombol Sign Out */
#nav-logout:hover {
    color: #FFC0CB;
    /* Warna soft pink saat tombol dihover */

}
</style>
  
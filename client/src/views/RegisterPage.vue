<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useMenuStore } from '../stores/menus';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: ''
        }
    },
    components:{
        RouterLink
    },
    methods:{
        ...mapActions(useMenuStore, ["registerCustomer"]),
        onSubmit(){
            this.registerCustomer({
                username: this.username,
                email: this.email,
                password: this.password,
                phoneNumber: this.phoneNumber,
                address: this.address
            })
        }

    }
}
</script>

<template>
    <div class="register-form">
        <form id="register-form" @submit.prevent="onSubmit()">
            <div style="margin-bottom: 20px;">
                <h1 class="h3 mb-3 display-1">Sign up and enjoy</h1>

            </div>
            <div class="mb-3">
                <label for="registerUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="username-register" placeholder="Enter your username..."
                    v-model="username" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="registerEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" v-model="email"
                    placeholder="Enter email address..." autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="registerPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="password-register" placeholder="Enter your password..."
                    v-model="password" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="registerPhoneNumber" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="phone-number-register" placeholder="Enter phone number..."
                    v-model="phoneNumber" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="registerAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="address-register" placeholder="Enter your address..."
                    v-model="address" autocomplete="off">
            </div>

            <button type="submit" class="btn btn-primary">Sign Up</button> <br>
            <span>
                Already have an account?
                <RouterLink to="/login">Login</RouterLink>
                now!
            </span>
        </form>
    </div>
</template>
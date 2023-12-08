<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useMenuStore } from '../stores/menus';
import { GoogleLogin } from 'vue3-google-login'


export default {
    components: {
        RouterLink,
        GoogleLogin
    },
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(useMenuStore, ["loginCustomer", "googleLogin"]),
        handLogin() {
            this.loginCustomer({
                email: this.email,
                password: this.password
            })
        },
        handleGoogleLogin(response) {
            this.googleLogin(response)
        }
    }
}
</script>

<template>
    <div class="login-form">
      <div class="login-header">
        <h1 class="login-title">Welcome to Stevia Kitchen</h1>
        <p class="login-subtitle">Delicious Food Awaits You</p>
      </div>
      <form id="login-form" @submit.prevent="handLogin" class="login-content">
        <div class="input-group">
          <label for="email-login" class="form-label">Email</label>
          <input type="email" class="form-control" id="email-login" v-model="email" placeholder="Enter your email..." autocomplete="off">
        </div>
        <div class="input-group">
          <label for="password-login" class="form-label">Password</label>
          <input type="password" class="form-control" id="password-login" v-model="password" placeholder="Enter your password..." autocomplete="off">
        </div>
  
        <button type="submit" class="btn btn-primary btn-login">Log In</button>
        <div class="login-divider">
          <span>Or sign in with</span>
        </div>
        <div class="social-login">
          <GoogleLogin :callback="handleGoogleLogin" promt auto-login />
        </div>
        <div class="register-link">
          <span>Don't have an account? <RouterLink to="/register">Register now!</RouterLink></span>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .login-subtitle {
    font-size: 16px;
    color: #666;
  }
  
  .login-content {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    font-weight: bold;
    color: #333;
  }
  
  .form-control {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
  
  .btn-login {
    display: block;
    width: 100%;
    margin-top: 20px;
    background-color: #007bff;
    border: none;
    color: #fff;
    font-weight: bold;
  }
  
  .login-divider {
    text-align: center;
    margin: 20px 0;
    color: #666;
  }
  
  .social-login {
    text-align: center;
  }
  
  .register-link {
    text-align: center;
    margin-top: 15px;
    color: #333;
  }
  
  .register-link a {
    color: #007bff;
    text-decoration: none;
  }
  </style>
  
<template>
  <div class="home-page">
    <h1 class="page-title">Discover Our Delicious Menus</h1>
    <div class="menu-section">
      <div class="menu-card" v-for="menu in menus" :key="menu.id">
        <div class="menu-image">
          <img :src="menu.imageUrl" alt="Menu Image">
        </div>
        <div class="menu-details">
          <h5 class="menu-title">{{ menu.name }}</h5>
          <p class="menu-description">{{ menu.description }}</p>
          <p class="menu-price">{{ menu.price }}</p>
          <div class="menu-buttons">
            <button class="btn btn-primary" @click.prevent="createTransaction(menu.id)">Order Now</button>
            <button class="btn btn-secondary" @click.prevent="moveToDetail(menu.id)">More Details</button>
          </div>
        </div>
      </div>
    </div>
    <a class="floating-whatsapp" href="https://wa.me/6282258610776" target="_blank">
      <i class="fab fa-whatsapp">Chat Me</i>
    </a>
  </div>
</template>

<script>
import { useMenuStore } from '../stores/menus';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'HomePage',
  methods: {
    ...mapActions(useMenuStore, ['fetchMenus', 'addTransaction']),
    createTransaction(id) {
      this.addTransaction(id);
    },
    moveToDetail(id) {
      this.$router.push(`/detailMenu/${id}`);
    }
  },
  created() {
    this.fetchMenus();
  },
  computed: {
    ...mapState(useMenuStore, ['menus'])
  }
};
</script>



<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.menu-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 20px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  width: 100%;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-image img {
  max-width: 100%;
  max-height: 180px;
  object-fit: cover;
  width: 200px;
  height: 200px;
}

.menu-title {
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 5px;
}

.menu-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.menu-price {
  font-size: 1rem;
  color: #888;
}

.menu-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  color: #fff;
}


.floating-whatsapp {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #25d366;
  padding: 10px;
  border-radius: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.floating-whatsapp i {
  font-size: 20px;
  color: white;
}
</style>


<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="#">Sihotel</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/hotel">Hotel</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/auditorium">Auditorium</router-link>
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav v-if="!user" class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">
                Login
              </router-link>
            </li>
          </b-navbar-nav>
          <b-navbar-nav v-else class="ml-auto">
            <li class="nav-item dropdown">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  {{ user_nama }}
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item to="/transaksi">Transaksi</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                Cart
                <b-icon-bag></b-icon-bag>
                <span
                  class="badge badge-success ml-2"
                >{{ updateCart ? updateCart.length : jumlah_cart.length }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      jumlah_cart: [],
      user: this.$cookie.get('user_id'),
      user_nama: this.$cookie.get('user_nama')
    };
  },
  props: ["updateCart"],
  methods: {
    setJumlah(data) {
      this.jumlah_cart = data;
    },
    logout() {
      this.$cookie.delete('user_id');
      this.$cookie.delete('user_nama');
      this.$toast.success("Berhasil Logout", {
        type: "success",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      window.location.href = '/';
      // this.$router.push({ path: "/", redirect: '/'})
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => this.setJumlah(response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>

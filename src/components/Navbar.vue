<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <b-navbar-brand href="#">MyHotel</b-navbar-brand>

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
              <router-link class="btn btn-success rounded-pill shadow-sm px-4 " to="/register">
              Register
              </router-link>
            </li>
            <li class="nav-item ml-2">
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
                <b-dropdown-item to="/akun">Akun</b-dropdown-item>
                <b-dropdown-item @click="$bvModal.show('bv-modal-example')">Sign Out</b-dropdown-item>
                <b-modal id="bv-modal-example" hide-footer>
                  <template #modal-title>
                    Hehehe
                  </template>
                  <div class="d-block text-center">
                    <h3>Yakin mau keluar?</h3>
                  </div>
                  <v-row>
                    <v-col class="col-6">
                  <b-button class="mt-1 " block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
                  <b-button class="mt-1 btn-danger" block @click="logout">Logout</b-button>

                    </v-col>
                  </v-row>
                </b-modal>
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
      .get("http://localhost/BE_Myhotel/index.php/be_myhotel/api/cart?user_id="+ this.user)
      .then((response) => this.setJumlah(response.data.result))
      .catch((error) => console.log(error));
  },
};
</script>

<style></style>

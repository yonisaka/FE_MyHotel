<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Hero />

      <div class="row mt-4">
        <div class="col">
          <h2>
            Best
            <strong>Hotels</strong>
          </h2>
        </div>
        <div class="col">
          <router-link to="/hotel" class="btn btn-success float-right">
            <b-icon-eye></b-icon-eye> Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="objek in objeks" :key="objek.objek_id">
          <CardProduct :objek="objek"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    CardProduct,
  },
  data() {
    return {
      objeks: [],
    };
  },
  methods: {
    setObjeks(data) {
      this.objeks = data;
    },
  },
  mounted() {
    // console.log(this.$cookie.get('user'));
    axios
      .get("http://localhost/be_myhotel/api/objek")
      .then((response) => this.setObjeks(response.data.result))
      .catch((error) => console.log(error))
  },
};
</script>

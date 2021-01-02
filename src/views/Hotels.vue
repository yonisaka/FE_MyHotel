<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Hotel</strong>
          </h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Hotel Favorit Anda .."
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchFood"
            />

            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <b-icon-search></b-icon-search>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4 mt-4" v-for="objek in objeks" :key="objek.objek_id">
          <CardProduct :objek="objek" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "Hotels",
  components: {
    Navbar,
    CardProduct,
  },
  data() {
    return {
      objeks: [],
      search: '',
    };
  },
  methods: {
    setObjeks(data) {
      this.objeks = data;
    },
    searchFood() {
      axios
      .get("http://localhost:3000/objek?q="+this.search)
      .then((response) => this.setObjeks(response.data))
      .catch((error) => console.log(error));
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/objek")
      .then((response) => this.setObjeks(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
<style>
</style>
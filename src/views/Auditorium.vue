<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-8">
          <h2>
            Daftar
            <strong>Auditorium</strong>
          </h2>
        </div>
        <div class="col-md-4">
          <div class="input-group mb-3">
            
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Auditorium Favorit Anda .."
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
      jenis: 'auditorium',
    };
  },
  methods: {
    setObjeks(data) {
      this.objeks = data;
    },
    searchFood() {
      axios
      .get("http://localhost/be_myhotel/api/objek?objek_jenis="+this.jenis+"&objek_nama="+this.search)
      .then((response) => this.setObjeks(response.data.result))
      .catch((error) => console.log(error));
    }
  },
  mounted() {
    axios
      .get("http://localhost/be_myhotel/api/objek?objek_jenis="+this.jenis)
      .then((response) => this.setObjeks(response.data.result))
      .catch((error) => console.log(error));
  },
};
</script>
<style>
</style>
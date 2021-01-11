<template>
  <div class="detail">
    <Navbar />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/hotel" class="text-dark">Hotel</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Hotel Order</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img :src="objek.objek_foto" class="img-fluid shadow" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ objek.objek_nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga :
            <strong>Rp. {{ formatPrice(objek.objek_harga) }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="tanggal_mulai">Tanggal Mulai</label>
              <input type="date" class="form-control" v-model="pesan.tanggal_mulai" />
            </div>
            <div class="form-group">
              <label for="tanggal_selesai">Tanggal Selesai</label>
              <input type="date" class="form-control" v-model="pesan.tanggal_selesai" />
            </div>
            <!-- <div class="form-group">
              <label for="keterangan"><strong>Keterangan</strong></label>
              <p>
                {{objek.objek_keterangan}}
              </p>
            </div> -->

            
            <p v-if="!user"><i>Anda harus Login terlebih dahulu</i></p>
            <button v-else type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon-cart></b-icon-cart>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Detail",
  components: {
    Navbar,
  },
  data() {
    return {
      objek: {},
      pesan: {},
      user: this.$cookie.get('user_id'),
    };
  },
  methods: {
    setObjek(data) {
      this.objek = data;
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    pemesanan() {
      if (this.pesan.tanggal_mulai && this.pesan.tanggal_selesai) {
        this.pesan.objek_id = this.objek.objek_id;
        this.pesan.user_id = this.$cookie.get('user_id');
        this.pesan.objek = this.objek;
        this.pesan.objek_harga = this.objek.objek_harga;
        this.pesan.objek_id = this.objek.objek_id;
        console.log(this.pesan);
        axios
          .post("http://api.dagdigdug.my.id/api/cart", this.pesan)
          .then(() => {
            this.$router.push({ path: "/cart"})
            this.$toast.success("Sukses Masuk Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Tanggal Pemesanan Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://api.dagdigdug.my.id/api/objek?objek_id=" + this.$route.params.id)
      .then((response) => this.setObjek(response.data.result))
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>
<template>
  <div class="cart">
    <Navbar :updateCart="carts" />
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
              <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-center" scope="col">Room</th>
                  <!-- <th scope="col">Keterangan</th> -->
                  <th class="text-center" scope="col">Tanggal</th>
                  <th class="text-center" scope="col">Harga / Malam</th>
                  <th class="text-center" scope="col">Total Harga</th>
                  <th class="text-center" scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.cart_id">
                  <th>{{index+1}}</th>
                  <td>
                    <img
                      :src="cart.objek_foto"
                      class="img-fluid shadow mb-2"
                      width="250"
                    /> <br>
                    <strong>{{ cart.objek_nama }}</strong>
                  </td>
                  <!-- <td>{{ cart.objek_keterangan ? cart.objek_keterangan : "-" }}</td> -->
                  <td>{{ cart.tanggal_mulai|moment('MMM Do YYYY') }} - {{ cart.tanggal_selesai|moment('MMM Do YYYY') }}</td>
                  <td align="right">Rp. {{ formatPrice(cart.objek_harga) }} / {{ dateDiff[index] }} Malam</td>
                  <td align="right">
                    <strong>Rp. {{ formatPrice(cart.objek_harga*dateDiff[index]) }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <button class="btn btn-sm btn-danger" title="delete">
                      <b-icon-trash @click="hapusCart(cart.cart_id)"></b-icon-trash>
                    </button>
                  </td>
                </tr>

                <tr>
                  <td colspan="5" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ formatPrice(totalHarga) }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <!-- <div class="form-group">
              <label for="nama">Atas Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="noTelp">Nomor Telp :</label>
              <input type="text" class="form-control" v-model="pesan.noTelp" />
            </div> -->

            <button type="submit" class="btn btn-success float-right" @click="checkout">
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
import moment from 'moment';

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      pesan: {},
      cart: {},
      user: this.$cookie.get('user_id'),
    };
  },
  methods: { 
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    setCarts(data) {
      this.carts = data;
    },
    hapusCart(id) {
      this.cart.cart_id = id;
      axios
        .post("https://api.dagdigdug.my.id/api/cartDelete", this.cart)
        .then(() => {
          this.$toast.error("Sukses Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data keranjang
          axios
            .get("https://api.dagdigdug.my.id/api/cart?user_id="+ this.user)
            .then((response) => this.setCarts(response.data.result))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      // if (this.pesan.nama && this.pesan.noTelp) {
        this.pesan.user_id = this.user;
        this.pesan.transaksi_harga = this.totalHarga;
        axios
          .post("https://api.dagdigdug.my.id/api/transaksi", this.pesan)
          .then(() => {

            // Hapus Semua Keranjang 
            // this.carts.map(function (item) {
            //   return axios
            //     .delete("https://localhost:3000/cart/" + item.id)
            //     .catch((error) => console.log(error));
            // });

            this.$router.push({ path: "/pesanan-sukses" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      // } else {
      //   this.$toast.error("Nama dan Nomor Telp Harus diisi", {
      //     type: "error",
      //     position: "top-right",
      //     duration: 3000,
      //     dismissible: true,
      //   });
      // }
    },
  },
  mounted() {
    axios
      .get("https://api.dagdigdug.my.id/api/cart?user_id="+ this.user)
      .then((response) => {
        console.log(response.data.result)
        this.setCarts(response.data.result)})
      .catch((error) => console.log(error));
  },
  computed: {
    dateDiff(){
      return this.carts.map(function (data) {
        let start = moment(data.tanggal_mulai);
        let end = moment(data.tanggal_selesai);
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        return Math.round(days);
      }, 0);
    }, 
    totalHarga() {
      return this.carts.reduce(function (items, data) {
        let start = moment(data.tanggal_mulai);
        let end = moment(data.tanggal_selesai);
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        return items + data.objek_harga * Math.round(days);
      }, 0);
    },
  },
};

</script>

<style>
</style>
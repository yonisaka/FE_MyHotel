<template>
  <div class="cart">
    <Navbar/>
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
              <li class="breadcrumb-item active" aria-current="page">Transaksi</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Transaksi
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-center" scope="col">Room</th>
                  <th class="text-center" scope="col">Tanggal</th>
                  <th class="text-center" scope="col">Harga / Malam</th>
                  <th class="text-center" scope="col">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trans, index) in transaksi" :key="trans.id">
                  <th>{{index+1}} {{ trans.cart }}</th>
                  <td>
                    <img
                      :src=" '../assets/images/' + trans.cart.objek.objek_foto "
                      class="img-fluid shadow mb-2"
                      width="250"
                    /> <br>
                    <strong>{{ trans.cart.objek.objek_nama }}</strong>
                  </td>
                  <td>{{ trans.cart.tanggal_mulai|moment('MMM Do YYYY') }} - {{ trans.cart.tanggal_selesai|moment('MMM Do YYYY') }}</td>
                  <td align="right">Rp. {{ trans.cart.objek.harga }} / {{ dateDiff[index] }} Malam</td>
                  <td align="right">
                    <strong>Rp. {{ trans.cart.objek.harga*dateDiff[index] }}</strong>
                  </td>
                </tr>

                <tr>
                  <td colspan="4" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
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
  name: "Transaksi",
  components: {
    Navbar,
  },
  data() {
    return {
      transaksi: [],
      pesan: {},
    };
  },
  methods: { 
    setTransaksi(data) {
      this.transaksi = data;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/transaksi")
      .then((response) => this.setTransaksi(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    dateDiff(){
      return this.transaksi.map(function (data) {
        let start = moment(data.cart.tanggal_mulai);
        let end = moment(data.cart.tanggal_selesai);
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        return Math.round(days);
      }, 0);
    }, 
    totalHarga() {
      return this.transaksi.reduce(function (items, data) {
        let start = moment(data.cart.tanggal_mulai);
        let end = moment(data.cart.tanggal_selesai);
        let duration = moment.duration(end.diff(start));
        let days = duration.asDays();
        return items + data.cart.objek.harga * Math.round(days);
      }, 0);
    },
  },
};

</script>

<style>
</style>
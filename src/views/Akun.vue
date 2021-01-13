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
        <div class="col-md-4">
          <h2>
            Profile
          </h2>
          <div class="card">
            <div class="card-body">
              <div class="text-center py-5">
                <b-img src="assets/images/user.png" rounded="circle" alt="Circle image" height="182px"></b-img>
              </div>
              <h3 class="text-center">{{ detailUser.user_nama }}</h3>
              <h5 class="text-center">{{ detailUser.user_mail}} </h5>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>
            Transaksi
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-center" scope="col">Nomor Transaksi</th>
                  <th class="text-center" scope="col">Tanggal</th>
                  <th class="text-center" scope="col">Total Harga</th>
                  <th class="text-center" scope="col">Status</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trans, index) in transaksi" :key="trans.transaksi_id">
                  <th class="text-center">{{index+1}}</th>
                  <td class="text-center">{{ trans.transaksi_no }}</td>
                  <td class="text-center">{{ trans.transaksi_tanggal }}</td>
                  <td class="text-center">{{ formatPrice(trans.transaksi_harga) }}</td>
                  <td class="text-center">
                      <span v-if="trans.transaksi_status === 'paid'" class="badge badge-success">
                          {{ trans.transaksi_status|upper }}
                      </span>
                      <span v-else-if="trans.transaksi_status === 'waiting'" class="badge badge-warning">                
                          {{ trans.transaksi_status|upper }}
                      </span>
                      <span v-else class="badge badge-danger">
                          {{ trans.transaksi_status|upper }}
                      </span>
                  </td>
                  <td class="text-center">
                    <button v-if="trans.transaksi_status === 'waiting'" class="btn btn-sm btn-danger" title="cancel">
                      <b-icon-x @click="cancelTransaksi(trans.transaksi_id)"></b-icon-x>
                    </button>
                  </td>
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

export default {
  name: "Transaksi",
  components: {
    Navbar,
  },
  data() {
    return {
      transaksi: [],
      trans: {},
      user: this.$cookie.get('user_id'),
      detailUser: {},
    };
  },
  filters: {
    upper(value){
        if(!value) return ''
            value = value.toString()
        return value.toUpperCase()
    },
  },
  methods: { 
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    setTransaksi(data) {
      this.transaksi = data;
    },
    setDetailUser(data) {
      this.detailUser = data;
    },
    cancelTransaksi(id) {
      this.trans.transaksi_id = id;
      this.trans.transaksi_status = 'canceled';
      axios
        .post("https://api.dagdigdug.my.id/api/transaksiUpdateSt", this.trans)
        .then(() => {
          this.$toast.error("Sukses Membatalkan Transaksi", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data Transaksi
          axios
            .get("https://api.dagdigdug.my.id/api/transaksi?user_id="+ this.user)
            .then((response) => this.setTransaksi(response.data.result))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    
  },
  mounted() {
    axios
      .get("https://api.dagdigdug.my.id/api/transaksi?user_id="+ this.user)
      .then((response) => {
        console.log(response.data.result)
        this.setTransaksi(response.data.result)})
      .catch((error) => console.log(error));

    axios
      .get("https://api.dagdigdug.my.id/api/user?user_id="+ this.user)
      .then((response) => {
        console.log(response.data.result)
        this.setDetailUser(response.data.result)})
      .catch((error) => console.log(error));
  },
  computed: {
    
  },
};

</script>


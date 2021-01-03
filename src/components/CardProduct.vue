<template>
  <div class="card shadow card-product">
    <img :src="objek.objek_foto" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ objek.objek_nama }}</h5>
      <p
        class="card-text"
      >Harga : Rp. {{ formatPrice(objek.objek_harga) }}</p>
      <router-link class="btn btn-success" :to="'/detail/'+objek.objek_id"><b-icon-cart></b-icon-cart> Pesan</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["objek"],
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  }
};
</script>

<style>
</style>
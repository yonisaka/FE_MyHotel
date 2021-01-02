<template>
  <div class="card shadow card-product">
    <img :src=" 'assets/images/' + objek.objek_foto " class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ objek.objek_nama }}</h5>
      <p
        class="card-text"
      >Harga : Rp. {{ objek.harga }}</p>
      <router-link class="btn btn-success" :to="'/hotel/'+objek.id"><b-icon-cart></b-icon-cart> Pesan</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["objek"],
};
</script>

<style>
</style>
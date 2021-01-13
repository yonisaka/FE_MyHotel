<template>
    <div class="container-fluid">
        <div class="row no-gutter">
            <div class="col-md-12">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-5 mx-auto">
                                <h3 class="display-4">Register</h3>
                                <p class="text-muted mb-4">Pendaftaran akun baru</p>
                                <form class="mt-2" v-on:submit.prevent>
                                    <div class="form-group mb-3">
                                        <input type="text" placeholder="Nama Lengkap" v-model="user.user_nama" class="form-control rounded-pill border-0 shadow-sm px-4">
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="email" placeholder="Email address" v-model="user.user_mail" class="form-control rounded-pill border-0 shadow-sm px-4">
                                    </div>
                                    <div class="form-group mb-3">
                                        <input type="password" placeholder="Password" v-model="user.user_password" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary">
                                    </div>

                                    <button type="submit" @click="register" class="btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign up</button>
                                    <div class="text-center d-flex justify-content-between mt-4"><p>Sudah memiliki akun ? 
                                        <router-link to="/login" class="font-italic text-muted">Login</router-link></p></div>
                                    <p>Kembali ke <router-link to="/" class="font-italic text-muted">Home</router-link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
// import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Register",
  components: {

  },
  data() {
    return {
      // user: [],
      user: {},
    };
  },
  methods: {
    // setUser(data) {
    //   this.user = data;
    // },
    register() {
      if (this.user.user_nama && this.user.user_mail && this.user.user_password) {
        axios
          .post("https://api.dagdigdug.my.id/api/register", this.user)
          .then(() => {
            // this.setUser(response.data)
            this.$toast.success("Berhasil mendaftar", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            this.$router.push({ path: "/"})
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Form pendaftaran harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  // mounted() {
  //   axios
  //     .get("https://localhost:8000/movie")
  //     .then((response) => this.setUser(response.data))
  //     .catch((error) => console.log(error));
  // }
};
</script>

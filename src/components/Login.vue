<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center" style="flex-direction: column">
      <v-btn icon variant="text" class="ma-4" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
         Go Home
      </v-btn>

      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12" class="pa-6 rounded-xl">
          <v-card-title class="text-h5 text-center font-weight-bold">
            {{ $t('Đăng nhập') }}
          </v-card-title>

          <v-card-subtitle class="text-center mb-4">
            {{ $t('Chào mừng bạn quay lại! Vui lòng đăng nhập.') }}
          </v-card-subtitle>

          <v-form ref="loginFormRef">
            <!-- Email -->
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              prepend-inner-icon="mdi-email"
              placeholder="Nhập email"
              type="email"
              clearable
              class="mb-3"
              :rules="emailRules"
              required
            />

            <!-- Password -->
            <v-text-field
              v-model="loginForm.password"
              label="Mật khẩu"
              prepend-inner-icon="mdi-lock"
              placeholder="Nhập mật khẩu"
              type="password"
              clearable
              class="mb-3"
              required
            />

            <!-- Forgot password -->
            <div class="text-right mb-4">
              <router-link  class="text-caption text-decoration-underline">
                {{ $t('Quên mật khẩu?') }}
              </router-link>
            </div>

            <!-- Login button -->
            <v-btn
              color="primary"
              block
              class="mb-4"
              size="large"
              :loading="loading"
              @click="handleLogin"
            >
              {{ $t('Đăng nhập') }}
            </v-btn>

            <!-- Divider -->
            <v-divider class="my-4"></v-divider>

            <!-- Sign up link -->
            <div class="text-center">
              <span>{{ $t('Chưa có tài khoản?') }}</span>
              <router-link to="/register" class="ml-1 text-decoration-underline font-weight-bold">
                {{ $t('Đăng ký') }}
              </router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="mess" :timeout="5000" :color="color">
      {{ Message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { Login } from "@/model/api";

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: { email: "", password: "" },
      Message: "",
      color: "",
      mess: false,
      loading: false,
      emailRules: [
      v => !!v || 'Email không được để trống',
      v => /.+@.+\..+/.test(v) || 'Email không hợp lệ',
    ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },

    handleLogin() {
      const { email, password } = this.loginForm;

      if (!email || !password) {
        this.Message = "Vui lòng nhập đầy đủ email và mật khẩu";
        this.color = "error";
        this.mess = true;
        return;
      }

      this.loading = true;

      Login(this.loginForm, (dat) => {
        if (dat.status === 200) {
          this.$store.commit("setEmpInfor", dat.data.user);
          localStorage.setItem("name", dat.data.user.username);

          this.Message = "Đăng nhập thành công";
          this.color = "success";
          this.mess = true;
          this.loading = false;

          this.$router.push("/home");
        } else {
          this.Message = dat.response?.data?.message || "Đăng nhập thất bại";
          this.color = "error";
          this.mess = true;
          this.loading = false;
        }
      }, (err) => {
        this.Message = err.response?.data?.message || "Có lỗi xảy ra";
        this.color = "error";
        this.mess = true;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
</style>

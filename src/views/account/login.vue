<script>
import { mapState } from "vuex";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import appConfig from "../../../app.config";

import {
  authMethods,
  notificationMethods,
} from "@/state/helpers";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      authCode: "",
      securityCode: "",
      sendedAuthCode: false,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    authCode: {
      required: helpers.withMessage("Auth code is required", required),
    },
    securityCode: {
      required: helpers.withMessage("Security code is required", required),
    },
  },
  computed: {
    ...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    tryToLogIn() {
      this.submitted = true;
      this.v$.$touch();
      

      if (this.v$.$invalid) {
        return;
      } else {
          if (this.authCode && this.securityCode) {
             this.axios.get('/auth/pareCodes', {
                params: {
                  acode: this.authCode,
                  bcode: this.securityCode
                }
              })
              .then((response) => {
                const data = response.data;
                
                console.log(data);
                if (!data.ok) {
                  this.isAuthError = true;
                  
                  if (data.message) {
                    this.authError = data.message;
                  } else {
                    this.authError = this.$t('t-request-error');
                  }
                  return;
                }


                this.logIn({
                  acode: this.authCode,
                  scode: this.securityCode,
                });
              });
          }
        }
      },
      sendAuthCode() {
        this.axios.get('/auth?acode=' + this.authCode)
        .then((response) => {
          const data = response.data;
          
          if (!data.ok) {
            this.isAuthError = true;
            
            if (data.message) {
               this.authError = data.message;
            } else {
              this.authError = this.$t('t-request-error');
            }
            return;
          }

          this.sendedAuthCode = true;
        })
        .catch((error) => {
          console.log(error);
          this.authError = this.$t('t-request-error');
          this.isAuthError = true;
        })
      },
      changePasswordField() {
        if (this.$refs.securityCode.getAttribute('type') === 'password') {
          this.$refs.securityCode.setAttribute('type', 'text')
        } else {
          this.$refs.securityCode.setAttribute('type', 'password')
        }
      }
    },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img
                    src="@/assets/images/logo-light.svg"
                    alt=""
                    height="70"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5> Welcome Back!</h5>
                </div>
                <div class="p-2 mt-2">
                  <div v-if="authError" class="mb-2 alert alert-danger alert-dismissible alert-solid alert-label-icon fade show mb-0" role="alert">
                      <i class="ri-refresh-line label-icon"></i>{{ authError }}
                      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" @click="authError = false" aria-label="Close"></button>
                  </div>

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                    <div class="mb-3">
                      <label for="authCode" class="form-label">Auth code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="authCode"
                        placeholder="Enter auth code"
                        v-model="authCode"
                        :disabled="sendedAuthCode"
                        :class="{
                          'is-invalid': submitted && v$.authCode.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v$.authCode.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div class="mb-3" v-if="sendedAuthCode">
                      <label class="form-label" for="securityCode"> Security code </label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type="password"
                          v-model="securityCode"
                          class="form-control pe-5"
                          ref="securityCode"
                          :class="{
                            'is-invalid': submitted && v$.securityCode.$error,
                          }"
                          placeholder="Enter security code"
                          id="securityCode"
                        />
                        <button
                          class="
                            btn btn-link
                            position-absolute
                            end-0
                            top-0
                            text-decoration-none text-muted
                          "
                          type="button"
                          @click="changePasswordField"
                        >
                          <i class="ri-eye-fill align-middle"></i>
                        </button>
                        <div
                          v-if="submitted && v$.securityCode.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="v$.securityCode.required.$message">{{
                            v$.securityCode.required.$message
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button v-if="!sendedAuthCode" @click="sendAuthCode" class="btn btn-success w-100">
                        Send auth code
                      </button>
                      <button v-else @click="tryToLogIn" class="btn btn-success w-100">
                        Sign In
                      </button>
                    </div>        
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-muted">
                &copy; {{ new Date().getFullYear() }} Bot Base
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

     <div class="row">
        <div class="col-lg-12">
            <div class="card mt-n4 mx-n4">
                <div class="bg-soft-warning">
                    <div class="card-body pb-0 px-4">
                        <div class="row mb-3">
                            <div class="col-md">
                                <div class="row align-items-center g-3">
                                    <div class="col-md-auto">
                                        <div class="avatar-md">
                                            <div class="avatar-title bg-white rounded-circle">
                                                <img :src="item.img" alt="" class="avatar-xs">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div>
                                            <h4 class="fw-bold mb-0">{{ item.title }}</h4>
                                            <div class="mb-2">
                                              {{ item.description }}
                                            </div>
                                            <div class="hstack gap-3 flex-wrap">
                                                <div>Create Date: <span class="fw-medium">{{ item.created }}</span></div>
                                                <div class="vr"></div>
                                                <div>Update Date: <span class="fw-medium">{{ item.edited }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-auto">
                                <div class="hstack gap-1 flex-wrap">
                                    <button type="button" class="btn btn-danger p-0 px-3 rounded-pill"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteMonitoringModal"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      class="btn avatar-xs mt-n1 p-0 favourite-btn shadow-none"
                                      :class="{ active: item.favorite }"
                                      @click="item.favorite = !item.favorite"
                                    >
                                      <span class="avatar-title bg-transparent fs-15">
                                        <i class="ri-star-fill"></i>
                                      </span>
                                    </button>
                                    <button @click="setBotStatus(true)" v-if="!item.working" type="button" class="btn py-0 px-2 fs-16 text-body shadow-none">
                                        <i class="ri-play-line"></i>
                                    </button>
                                    <button @click="setBotStatus(false)" v-else type="button" class="btn py-0 px-2 fs-16 text-body shadow-none">
                                        <i class="ri-pause-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end card body -->
                </div>
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row d-flex justify-content-center">
      <div class="col-lg-8 px-1">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h4 class="card-title mb-0">Edit monitoring</h4>
          </div>

          <div v-if="errorLoad" class="alert alert-danger alert-dismissible alert-solid alert-label-icon fade show mx-5 mt-4" role="alert">
              <i class="ri-error-warning-line label-icon"></i><strong>Error</strong> - {{ errorLoad }}
          </div>
         
         <div class="row mx-3 mb-3 mt-2">
          <div class="col-lg-6">
            <label
              for="title"
              class="col-form-label"
            >Title:</label>
            <input
                type="text"
                class="form-control"
                id="title"
                v-model="item.title"
            />
          </div>
         </div>

        <div class="row mx-3 mb-3 mt-2">
          <div class="col-lg-12">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="5" v-model="item.description"></textarea>
          </div>
        </div>

         <div class="row mx-3 mt-2 mb-3">
          <div class="col-lg-6">
            <label
              for="keys"
              class="col-form-label"
            >Keys:</label>
            <input
                type="text"
                class="form-control"
                id="keys"
                v-model="item.data.keywords"
            />
          </div>

          <div class="col-lg-6">
            <label
              for="stopwords"
              class="col-form-label"
            >Stop words:</label>
            <input
                type="text"
                class="form-control"
                id="stopwords"
                v-model="item.data.stopwords"
            />
          </div>
         </div>
          <div class="row mx-3 mt-2 mb-3">
            <div class="col-lg-12">
              <label
                for="channel"
                class="col-form-label"
              >Channel:</label>
              <input
                  type="text"
                  class="form-control"
                  id="channel"
                  :placeholder="item.data.destination"
                  v-model="destination"
              />
            </div>
          </div>

          <div class="row mx-3 mt-2 mb-3">
            <div class="form-check form-check-secondary mb-2 ms-3 col-lg-2">
                <input class="form-check-input" 
                type="checkbox" 
                :checked="this.item.tags.includes('telegram')" 
                id="telegram"
                @change="check($event, 'telegram')">
                <label class="form-check-label" for="telegram">
                    Telegram
                </label>
            </div>
            <div class="form-check form-check-secondary mb-2 ms-3 col-lg-2">
                <input class="form-check-input" 
                type="checkbox" 
                :checked="this.item.tags.includes('twitter')" 
                id="twitter" 
                @change="check($event, 'twitter')">
                <label class="form-check-label" for="twitter">
                    Twitter
                </label>
            </div>
            <div class="form-check form-check-secondary mb-2 ms-3 col-lg-2">
                <input class="form-check-input" 
                type="checkbox" 
                :checked="this.item.tags.includes('reddit')" 
                id="reddit"
                @change="check($event, 'reddit')">
                <label class="form-check-label" for="reddit">
                    Reddit
                </label>
            </div>
            <div class="form-check form-check-secondary mb-2 ms-3 col-lg-2">
                <input class="form-check-input"
                type="checkbox" 
                :checked="this.item.tags.includes('sites')" 
                id="sites"
                @change="check($event, 'sites')">
                <label class="form-check-label" for="sites">
                    Sites
                </label>
            </div>
          </div>
          
          <div class="d-flex ms-3 mt-3 mb-3">
            <button
                type="button"
                class="btn btn-secondary ms-2"
                @click="save"
            >Save</button>
          </div>
        </div>
      </div>
    </div>

     <div
      class="modal fade"
      id="deleteMonitoringModal"
      tabindex="-1"
      aria-labelledby="deleteMonitoringModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="deleteMonitoringModalLabel"
                  >Are you sure you want to delete the monitoring?</h5>
                  <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                  ></button>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
                  <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                  >Cancel</button>
                  <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                      @click="deleteMonitoring"
                  >Delete</button>
              </div>
          </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";

export default {
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      select: 'Message',
      title: "Bots",
      errorLoad: '',
      destination: '',
      items: [
        {
          text: "Monitorings",
          href: "/",
        },
        {
          text: "Bots",
          href: "/bots",
        },
        {
          text: "edit",
          active: true,
        },
      ],
      item: {
        id: 1,
        title: '',
        description: '',
        working: false,
        edited: "",
        created: "",
        owner: null,
        data: {
          stopwords: '',
          keywords: '',
          destination: ''
        },
        tags: []
      },
    }
  },
  mounted() {
    this.axios.get('monitorings/' + this.$route.params.id).then(result => {
      const data = result.data;
      if (!data) {
        this.errorLoad = 'Error load monitoring';
        return;
      }

      if (!data.ok) {
        this.errorLoad = 'Error load monitoring';
        if (data.message) {
          this.errorLoad = data.message;
        }
        return;
      }
      console.log(data);
      this.item = data.data;
    }).catch(error => {
        this.errorLoad = 'Error load monitoring';
        console.log(error);
        return;
    });
  },
  methods: {
    setBotStatus(status) {
      this.item.working = status;
    },
    save() {
      this.item.data.destination = this.destinationFormat(this.destination);
       this.axios.get('monitorings/update', {
         params: {
           'data': JSON.stringify(this.item)
         }
       }).then(result => {
      const data = result.data;
      if (!data) {
        this.errorLoad = 'Error save monitoring';
        return;
      }

      if (!data.ok) {
        this.errorLoad = 'Error save monitoring';
        if (data.message) {
          this.errorLoad = data.message;
        }
        return;
      }
      
      this.$router.push({ name: 'monitorings-bots' })
    }).catch(error => {
        this.errorLoad = 'Error save monitoring';
        console.log(error);
        return;
    });
    },
    destinationFormat(dest) {
      let result = dest;
      result = result.split('/');
      result = result[result.length - 1];
      if (result.startsWith('+')) {
        result = result.replace('+', '');
      }
      return result;
    },
    check(event, name) {
      if (event.target.checked) {
        this.item.tags.push(name);
      } else {
        this.item.tags = this.item.tags.filter(element => {
          return element !== name;
        });
      }
    },

     deleteMonitoring() {
       this.axios.get('monitorings/' + this.item._id + '/delete').then(result => {
        const data = result.data;
        if (!data) {
          this.errorLoad = 'Error load monitorings';
          return;
        }

        if (!data.ok) {
          this.errorLoad = 'Error load monitorings';
          if (data.message) {
            this.errorLoad = data.message;
          }
          return;
        }
      
        this.$router.push({ name: 'monitorings-bots' })
      }).catch(error => {
          this.errorLoad = 'Error load monitorings';
          console.log(error);
          return;
      });
     }
  }
}
</script>

<style scoped>
.list {
  background-color: rgba(64,81,137,.05);
}
</style>
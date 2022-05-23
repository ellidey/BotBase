<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <div class="col-sm-auto">
        <div>
          <router-link to="/monitorings/bots/create"
                  class="btn btn-success">
          <i class="ri-add-line align-bottom me-1"></i> Add New</router-link>
        </div>
      </div>
      <div class="col-sm">
        <div class="d-flex justify-content-sm-end gap-2">
          <div class="search-box ms-2">
            <input v-model="search" type="text" class="form-control" placeholder="Search..." />
            <i class="ri-search-line search-icon"></i>
          </div>

          <select v-model="this.filter" class="form-select w-lg w-auto">
              <option value="all" selected>All</option>
              <option value="favorites">Favorites</option>
          </select>
        </div>
      </div>
    </div>
    
    <div v-if="errorLoad" class="d-flex justify-content-center">
      <div class="fs-18 my-5 p-2 px-5 card text-center">{{ errorLoad }}</div>
    </div>

    <div v-else class="row">
      <div
        class="col-xxl-3 col-sm-6 project-card"
        v-for="(item, index) of getMonitorings()"
        :key="index"
      >
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex flex-column h-100">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted mb-4">Last update: {{ normalizeDate(item.edited) }}</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="d-flex gap-1 align-items-center">
                    <i v-if="item.working" class="mt-n1 ri-play-fill"></i>
                    <i v-else class="mt-n1 ri-pause-fill"></i>
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
                    <div class="dropdown">
                      <button
                        class="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15 shadow-none"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <MoreHorizontalIcon class="icon-sm"></MoreHorizontalIcon>
                      </button>

                      <div class="dropdown-menu dropdown-menu-end">
                        <router-link
                          class="dropdown-item"
                          :to="`/monitorings/bots/edit/${item._id}`"
                          ><i
                            class="ri-pencil-fill align-bottom me-2 text-muted"
                          ></i>
                          Edit
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteMonitoringModal"
                          @click="deleted = item._id"
                          >
                          <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-1">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-sm">
                    <span class="avatar-title bg-soft-warning rounded p-2">
                      <img :src="item.img" alt="" class="img-fluid p-1" />
                    </span>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1 fs-15">{{ item.title }}
                  </h5>
                  <p class="text-muted text-truncate-two-lines mb-1">
                    {{ item.description }}
                  </p>
                </div>
              </div>
                <div>
                   <span v-for="(tag, index) of item.tags" 
                   :key="index" class="badge bg-secondary me-1 mt-2">
                     {{ tag }}
                    </span>
                </div>
            </div>
          </div>
          <!-- end card body -->
          <div class="card-footer bg-transparent border-top-dashed py-2">
            <div class="d-flex align-items-center justify-content-between">
              <div class="flex-shrink-0">
              </div>
              <div class="flex-shrink-0">
                <div class="text-muted">
                  <i class="ri-calendar-event-fill me-1 align-bottom"></i>
                  {{ onlyDate(item.created) }}
                </div>
              </div>
            </div>
          </div>
          <!-- end card footer -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- Varying modal content -->
    <div
        class="modal fade"
        id="sendMessageModal"
        tabindex="-1"
        aria-labelledby="sendMessageModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5
                        class="modal-title"
                        id="sendMessageModalLabel"
                    >Send message</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label
                                for="message"
                                class="col-form-label"
                            >Message:</label>
                            <Editor @data="(data) => { editorData = data }"> </Editor>
                        </div>
                        <div class="mb-3 d-flex justify-content-between">
                            <div class="w-100 px-1">
                              <label
                                for="buttonName"
                                class="col-form-label"
                              >Button name:</label>
                              <input
                                  type="text"
                                  class="form-control"
                                  id="buttonName"
                              />
                            </div>
                            <div class="w-100 px-1">
                              <label
                                for="buttonLink"
                                class="col-form-label"
                              >Buttom link:</label>
                              <input
                                  type="text"
                                  class="form-control"
                                  id="buttonLink"
                              />
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                    >Test</button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                    >Send</button>
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
import { MoreHorizontalIcon } from "@zhuowenli/vue-feather-icons";
import Editor from "@/components/editor.vue";
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import "@vueform/multiselect/themes/default.css";

export default {
  components: {
    Layout,
    MoreHorizontalIcon,
    Editor,
    PageHeader
  },
  data() {
    return {
      title: "Bots",
      filter: 'all',
      search: '',
      editorData: "",
      errorLoad: '',
      items: [
        {
          text: "Monitorings",
          href: "/",
        },
        {
          text: "Bots",
          active: true,
        },
      ],
      monitorings: []
    }
  },
  mounted() {
    this.loadMonitorings();
  },
  methods: {
    loadMonitorings() {
      this.axios.get('monitorings/getAll').then(result => {
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
        this.monitorings = data.data;
      }).catch(error => {
          this.errorLoad = 'Error load monitorings';
          console.log(error);
          return;
      });
    },
     isFilter(item) {
        if (this.filter === 'favorites') {
          if (!item.favorite) {
            return false;
          }
        }

        if (this.search.length > 0 && !item.title.toLowerCase().includes(this.search)) {
          return false;
        }

        return true;
     },
     getMonitorings() {
        return this.monitorings.filter(this.isFilter);
     },
     normalizeDate(date) {
       const d = new Date(date);
       return d.toLocaleDateString("en-US", {
         year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
       });
     },
     onlyDate(date) {
       const d = new Date(date);
       return d.toLocaleDateString("en-US", {
         year: 'numeric', month: 'long', day: 'numeric',
       });
     },
     deleteMonitoring() {
       this.axios.get('monitorings/' + this.deleted + '/delete').then(result => {
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
        this.loadMonitorings();
      }).catch(error => {
          this.errorLoad = 'Error load monitorings';
          console.log(error);
          return;
      });
     }
  }
}
</script>
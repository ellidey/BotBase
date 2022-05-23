<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row g-4 mb-3">
      <div class="col-sm-auto">
        <div>
          <button data-bs-toggle="modal"
                  data-bs-target="#createBotModal"
                  class="btn btn-success">
          <i class="ri-add-line align-bottom me-1"></i> Add New</button>
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

    <div class="row">
      <div
        class="col-xxl-3 col-sm-6 project-card"
        v-for="(item, index) of getBots()"
        :key="index"
      >
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex flex-column h-100">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted mb-4">Last update: {{ item.update_time }}</p>
                </div>
                <div class="flex-shrink-0">
                  <div class="d-flex gap-1 align-items-center">
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
                          to="/bots/edit"
                          target="_blank"
                          ><i
                            class="ri-pencil-fill align-bottom me-2 text-muted"
                          ></i>
                          Edit
                        </router-link>
                        <router-link
                          class="dropdown-item"
                          to="/"
                          ><i
                            class="ri-eye-fill align-bottom me-2 text-muted"
                          ></i>
                          View in Tg
                        </router-link>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#sendMessageModal"
                        >
                          <i class="ri-mail-send-fill align-bottom me-2 text-muted"></i>
                          Send messages
                        </a>
                        <router-link
                          class="dropdown-item"
                          to="/"
                          ><i
                            class="ri-user-fill align-bottom me-2 text-muted"
                          ></i>
                          Users
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a
                          class="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteBotModal"
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
                  <h5 class="mb-1 fs-15">
                    <router-link
                      to="/"
                      class="text-dark"
                      >{{ item.name }}</router-link>
                  </h5>
                  <p class="text-muted text-truncate-two-lines mb-3">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- end card body -->
          <div class="card-footer bg-transparent border-top-dashed py-2">
            <div class="d-flex align-items-center justify-content-between">
              <div class="flex-shrink-0">
                <div class="text-muted">
                  {{ new Intl.NumberFormat('ru-RU').format(item.users_count) }} users
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="text-muted">
                  <i class="ri-calendar-event-fill me-1 align-bottom"></i>
                  {{ item.create_time }}
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
      id="createBotModal"
      tabindex="-1"
      aria-labelledby="createBotModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="createBotModalLabel"
                  >Create Bot</h5>
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
                              for="id"
                              class="col-form-label"
                          >ID:</label>
                          <input
                              type="text"
                              class="form-control"
                              id="id"
                          />
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                  <button
                      type="button"
                      class="btn btn-light"
                      data-bs-dismiss="modal"
                  >Back</button>
                  <button
                      type="button"
                      class="btn btn-secondary"
                  >Add bot</button>
              </div>
          </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteBotModal"
      tabindex="-1"
      aria-labelledby="deleteBotModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="deleteBotModalLabel"
                  >Are you sure you want to delete the bot?</h5>
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
      items: [
        {
          text: "Bot Base",
          href: "/",
        },
        {
          text: "Bots",
          active: true,
        },
      ],
      bots: [
        {
          id: 1,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 2,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 2",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 3,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 3",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 4,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 4",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 5,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 5",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 6,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 6",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 7,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 7",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
        {
          id: 8,
          update_time: "3 yan 2022",
          img: require("@/assets/images/brands/slack.png"),
          name: "Bot Name 8",
          description: "Bot description",
          favorite: false,
          create_time: "10 Jul, 2021",
          users_count: 1000,
        },
      ],
    }
  },
  methods: {
     isFilter(item) {
        if (this.filter === 'favorites') {
          if (!item.favorite) {
            return false;
          }
        }

          if (this.search.length > 0 && !item.name.toLowerCase().includes(this.search)) {
            return false;
          }

        return true;
     },
     getBots() {
       return this.bots.filter(this.isFilter);
     }
  }
}
</script>
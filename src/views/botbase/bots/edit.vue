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
                                                <img src="@/assets/images/brands/slack.png" alt="" class="avatar-xs">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div>
                                            <h4 class="fw-bold mb-0">{{ bot.name }}</h4>
                                            <div class="mb-2">
                                              {{ bot.description }}
                                            </div>
                                            <div class="hstack gap-3 flex-wrap">
                                                <div>Create Date: <span class="fw-medium">{{ bot.create_time }}</span></div>
                                                <div class="vr"></div>
                                                <div>Update Date: <span class="fw-medium">{{ bot.update_time }}</span></div>
                                                <div class="vr"></div>
                                                <div>Users count: <span class="fw-medium">{{ new Intl.NumberFormat('ru-RU').format(bot.users_count) }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-auto">
                                <div class="hstack gap-1 flex-wrap">
                                    <button
                                      type="button"
                                      class="btn avatar-xs mt-n1 p-0 favourite-btn shadow-none"
                                      :class="{ active: bot.favorite }"
                                      @click="bot.favorite = !bot.favorite"
                                    >
                                      <span class="avatar-title bg-transparent fs-15">
                                        <i class="ri-star-fill"></i>
                                      </span>
                                    </button>
                                    <button @click="setBotStatus(true)" v-if="!bot.active" type="button" class="btn py-0 fs-16 text-body shadow-none">
                                        <i class="ri-play-line"></i>
                                    </button>
                                    <button @click="setBotStatus(false)" v-else type="button" class="btn py-0 fs-16 text-body shadow-none">
                                        <i class="ri-pause-line"></i>
                                    </button>
                                    <div  v-if="bot.active" class="badge rounded-pill bg-info fs-12">Active</div>
                                    <div v-else class="badge rounded-pill bg-danger fs-12">Disabled</div>
                                </div>
                            </div>
                        </div>
                        <ul class="nav nav-tabs-custom border-bottom-0" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active fw-semibold" data-bs-toggle="tab" @click="page = 'stages'"
                                    role="button">
                                    Stages
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-semibold" data-bs-toggle="tab" @click="page = 'default_message'"
                                    role="button">
                                    Default messages
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- end card body -->
                </div>
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row d-flex justify-content-center" v-if="page === 'stages'">
      <div class="col-lg-4 px-1">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Stages</h4>
          </div>
          <draggable 
            v-model="stages"
            group="stages" 
            class="p-3"
            @start="drag=true" 
            @end="drag=false" 
            item-key="id">
            <template #item="{element}">
              <div role="button" class="p-2 fs-16 list mb-1 d-flex justify-content-between align-items-center">
                <div class="text">{{element.title}}</div>
                <div class="buttons">
                  <button
                      type="button"
                      class="btn btn-danger"
                  >Delete</button>
                  <button
                      type="button"
                      class="btn btn-secondary ms-2"
                  >Edit</button>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col-lg-8 px-1">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h4 class="card-title mb-0">Add stage</h4>
            <div class="btn-group m-0">
              <b-dropdown variant="light">
                <template v-slot:button-content> {{ select }} </template>
                <b-dropdown-item @click="select = 'Message'">
                  Message
                </b-dropdown-item>
                <b-dropdown-item @click="select = 'Check Chat Joined'">
                  Check Chat Joined
                </b-dropdown-item>  
                <b-dropdown-item @click="select = 'Check Bot Subscribed'">
                  Check Bot Subscribed
                </b-dropdown-item>
                <b-dropdown-item @click="select = 'Check Twitter Follow'">
                  Check Twitter Follow
                </b-dropdown-item> 
                <b-dropdown-item @click="select = 'Check Retweet Tweet'">
                  Check Retweet Tweet
                </b-dropdown-item>  
                <b-dropdown-item @click="select = 'Ask wallet'">
                  Ask wallet
                </b-dropdown-item>              
              </b-dropdown>
            </div>
         </div>
          <div class="mb-3 ms-3 col-lg-6">
            <label
              for="title"
              class="col-form-label"
            >Title:</label>
            <input
                type="text"
                class="form-control"
                id="title"
            />
          </div>
          <div class="mb-3 mx-3">
              <label
                  for="message"
                  class="col-form-label"
              >Message:</label>
              <Editor @data="(data) => { editorData = data }"> </Editor>
          </div>
          <div class="row px-3">
            <div class="mb-3 col-lg-6">
              <label
                for="button"
                class="col-form-label"
              >Button:</label>
              <input
                  type="text"
                  class="form-control"
                  id="button"
              />
            </div>
            <div v-if="select != 'Message'" class="col-lg-6">
              <label
                for="target"
                class="col-form-label"
              >Target:</label>
              <input
                  type="text"
                  class="form-control"
                  id="target"
              />
            </div>
          </div>

          <div v-if="select != 'Message'" class="ms-3 mb-3 col-lg-6">
              <label
                for="error"
                class="col-form-label"
              >Error message:</label>
              <input
                  type="text"
                  class="form-control"
                  id="error"
              />
            </div>
          
          <div class="d-flex ms-3 mt-3 mb-3">
            <button
                type="button"
                class="btn btn-danger"
            >Delete</button>
            <button
                type="button"
                class="btn btn-secondary ms-2"
            >Save</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <label
            for="message"
            class="col-form-label"
        >Default message:</label>
        <Editor class="mb-4" @data="(data) => { defaultEditorData = data }"> </Editor>

        <div class="text-end">
        <button
            type="button"
            class="btn btn-danger inline-block"
        >Save</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import Editor from "@/components/editor.vue";
 import draggable from 'vuedraggable'

export default {
  components: {
    Layout,
    PageHeader,
    draggable,
    Editor
  },
  data() {
    return {
      select: 'Message',
      title: "Bots",
      drag: false,
      page: 'stages',
      editorData: '',
      defaultEditorData: '',
      stages: [
        {
          id: '1',
          title: 'Block title 1',
          button: '',
          target: '',
          error: '',
        },
        {
          id: '2',
          title: 'Block title 2',
          button: '',
          target: '',
          error: '',
        },
        {
          id: '3',
          title: 'Block title 3',
          button: '',
          target: '',
          error: '',
        },
        {
          id: '4',
          title: 'Block title 4',
          button: '',
          target: '',
          error: '',
        },
      ],
      items: [
        {
          text: "Bot Base",
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
      bot: {
        id: 1,
        active: false,
        update_time: "3 yan 2022",
        img: require("@/assets/images/brands/slack.png"),
        name: "Bot Name",
        description: "Bot description",
        favorite: false,
        create_time: "10 Jul, 2021",
        users_count: 1000,
      },
    }
  },
  methods: {
    setBotStatus(status) {
      this.bot.active = status;
    }
  }
}
</script>

<style scoped>
.list {
  background-color: rgba(64,81,137,.05);
}
</style>
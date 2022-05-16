<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card" id="usersList">
          <div class="card-header border-0">
            <div class="row g-4 align-items-center">
              <div class="col-sm-4 row d-flex pt-4">
                <div class="col-sm-9">
                  <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Search for..."
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
                </div>
                <button 
                    type="button"
                    class="btn btn-info col-sm-3">Send message</button>
              </div>
              <div class="col-sm-auto ms-auto">
                <div class="hstack gap-2">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteSelectedUserModal"
                  >
                    <i class="ri-delete-bin-5-line align-bottom"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-info"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                  >
                    <i class="ri-filter-3-line align-bottom me-1"></i> Fliters
                  </button>
                  <button
                    type="button"
                    class="btn btn-success add-btn"
                    id="create-btn"
                  >
                    <i class="ri-file-download-line align-bottom me-1"></i> Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card">
                <table class="table align-middle" id="customerTable">
                  <thead class="table-light">
                    <tr>
                      <th scope="col" style="width: 50px">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="checkAll"
                            @change="selectAll"
                          />
                        </div>
                      </th>

                      <th class="sort" data-sort="user">User</th>
                      <th class="sort" data-sort="name">Name</th>
                      <th class="sort" data-sort="bots">Bots</th>
                      <th class="sort" data-sort="twitter">Twitter</th>
                      <th class="sort" data-sort="wallet">Wallet BEP-20</th>
                      <th class="sort" data-sort="lost">Lost</th>
                      <th class="sort" data-sort="id">ID</th>
                      <th class="sort" data-sort="create_date">Create Date</th>
                      <th class="sort" data-sort="action">Action</th>
                    </tr>
                  </thead>
                  <tbody class="list form-check-all">
                    <tr v-for="(data, index) of resultQuery" :key="index">
                      <th scope="row">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="checkAll"
                            v-model="data.checked"
                          />
                        </div>
                      </th>
                      <td class="user">{{ data.user }}</td>
                      <td class="name">{{ data.name }}</td>
                      <td class="bots">
                      <span v-for="(bot, index) of data.bots" :key="index" class="badge bg-secondary fs-10 mx-1">{{ bot }}</span>  
                      </td>
                      <td class="twitter">{{ data.twitter }}</td>
                      <td class="wallet">{{ data.wallet }}</td>
                      <td class="lost">
                      <span v-if="!data.lost" class="badge bg-secondary fs-10 mx-1">Yes</span>   
                      <span v-else class="badge bg-danger fs-10 mx-1">No</span>  
                      </td>
                      <td class="id">{{ data.id }}</td>
                      <td class="create_date">{{ data.create_date }}</td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li
                            class="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            role="button"
                            title="Edit"
                          >
                            <a class="edit-item-btn"
                              ><i
                                class="ri-pencil-fill align-bottom text-muted"
                              ></i
                            ></a>
                          </li>
                          <li
                            class="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            role="button"
                            title="Delete"
                          >
                            <a
                              class="remove-item-btn"
                              data-bs-toggle="modal"
                              @click="selectUser = data"
                              data-bs-target="#deleteUserModal"
                            >
                              <i
                                class="ri-delete-bin-fill align-bottom text-muted"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="noresult" style="display: none">
                  <div class="text-center">
                    <lottie
                      class="avatar-xl"
                      colors="primary:#121331,secondary:#08a88a"
                      :options="defaultOptions"
                      :height="75"
                      :width="75"
                    />
                    <h5 class="mt-2">Sorry! No Result Found</h5>
                    <p class="text-muted mb-0">
                      We've searched more than 150+ Orders We did not find any
                      orders for you search.
                    </p>
                  </div>
                </div>
                <div class="d-flex justify-content-end p-3">
                  <div class="pagination-wrap hstack gap-2">
                    <a
                      class="page-item pagination-prev disabled"
                      href="#"
                      v-if="page != 1"
                      @click="page--"
                    >
                      Previous
                    </a>
                    <ul class="pagination listjs-pagination mb-0">
                      <li
                        :class="{
                          active: pageNumber == page,
                          disabled: pageNumber == '...',
                        }"
                        v-for="(pageNumber, index) in pages.slice(
                          page - 1,
                          page + 5
                        )"
                        :key="index"
                        @click="page = pageNumber"
                      >
                        <a class="page" href="#">{{ pageNumber }}</a>
                      </li>
                    </ul>
                    <a
                      class="page-item pagination-next"
                      href="#"
                      @click="page++"
                      v-if="page < pages.length"
                    >
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </div>

      

            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div class="offcanvas-header bg-light">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                  Users Filters
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <!--end offcanvas-header-->
              <div
                class="d-flex flex-column justify-content-end h-100"
              >
                <div class="offcanvas-body">
                  <div class="mb-4">
                    <label
                      for="datepicker-range"
                      class="form-label text-muted text-uppercase fw-semibold mb-3"
                      >Date register</label
                    >
                    <flat-pickr
                      placeholder="Select date"
                      v-model="filter.data_register"
                      :config="rangeDateconfig"
                      class="form-control flatpickr-input"
                      id="demo-datepicker"
                    ></flat-pickr>
                  </div>
                  <div class="mb-4">
                    <label
                      for="country-select"
                      class="form-label text-muted text-uppercase fw-semibold mb-3"
                      >Bots</label
                    >

                    <Multiselect
                      class="form-control"
                      v-model="filter.bots"
                      mode="multiple"
                      :close-on-select="false"
                      :searchable="true"
                      :options="[
                        { value: '', label: 'Select country' },
                        { value: 'Argentina', label: 'Argentina' },
                        { value: 'Belgium', label: 'Belgium' },
                        { value: 'Brazil', label: 'Brazil' },
                        { value: 'Colombia', label: 'Colombia' },
                      ]"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      for="status-select"
                      class="form-label text-muted text-uppercase fw-semibold mb-3"
                      >Options</label
                    >
                    <div class="row g-2">
                      <div class="form-check form-switch form-switch-md col-lg-6" dir="ltr">
                          <label class="form-check-label" for="customSwitchsizelg">has twitter</label>
                          <input type="checkbox" class="form-check-input" id="twitter" v-model="filter.twitter">
                      </div>
                      <div class="form-check form-switch form-switch-md col-lg-6" dir="ltr">
                          <label class="form-check-label" for="customSwitchsizelg">has purse</label>
                          <input type="checkbox" class="form-check-input" id="purse" v-model="filter.purse">
                      </div>
                      <div class="form-check form-switch form-switch-md col-lg-6" dir="ltr">
                          <label class="form-check-label" for="customSwitchsizelg">script passed</label>
                          <input type="checkbox" class="form-check-input" id="passed" v-model="filter.passed">
                      </div>
                      <div class="form-check form-switch form-switch-md col-lg-6" dir="ltr">
                          <label class="form-check-label" for="customSwitchsizelg">Lost</label>
                          <input type="checkbox" class="form-check-input" id="lost" v-model="filter.lost">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="offcanvas-footer border-top p-3 text-center hstack gap-2"
                >
                  <button class="btn btn-light w-100" @click="clearFilter">Clear Filter</button>
                  <button class="btn btn-success w-100"
                      data-bs-dismiss="offcanvas" @click="userFilter">
                    Filters
                  </button>
                </div>
                <!--end offcanvas-footer-->
              </div>
            </div>
            <!--end offcanvas-->
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  <div
      class="modal fade"
      id="deleteUserModal"
      tabindex="-1"
      aria-labelledby="deleteUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="deleteUserModalLabel"
                  >Are you sure you want to delete the user?</h5>
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
                      @click="deleteUser"
                      data-bs-dismiss="modal"
                  >Delete</button>
              </div>
          </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteSelectedUserModal"
      tabindex="-1"
      aria-labelledby="deleteSelectedUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5
                      class="modal-title"
                      id="deleteSelectedUserModalLabel"
                  >Are you sure you want to delete this users?</h5>
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
                      @click="deleteSelected"
                      data-bs-dismiss="modal"
                  >Delete</button>
              </div>
          </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";
import animationData1 from "@/components/widgets/gsqxdxog.json";

export default {
  page: {
    title: "Leads",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
    Multiselect,
    flatPickr
  },
  data() {
    return {
      title: "BotBase",
      selectUser: null,
      items: [
        {
          text: "BotBase",
          href: "/",
        },
        {
          text: "Users",
          active: true,
        },
      ],
      filter: {
        data_register: null,
        bots: null,
        twitter: false,
        passed: false,
        purse: false,
        lost: false,
      },
      defaultOptions: { animationData: animationData },
      defaultOptions1: { animationData: animationData1 },
      page: 1,
      perPage: 8,
      pages: [],
      value: null,
      searchQuery: null,
      date: null,
      rangeDateconfig: {
        mode: "range",
        dateFormat: "d M, Y",
      },
      users: [
        {
          id: 1,
          user: '12341241',
          name: "Alexis Clarke",
          bots: ['bot1', 'bot2', 'bot3', 'bot4'],
          twitter: "nameTwitter",
          wallet: "580-464-4694",
          script_done: true,
          lost: false,
          create_date: "07 Apr, 2021",
        },
      ],
    };
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.users);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.leadsId.toLowerCase().includes(search) ||
            data.name.toLowerCase().includes(search) ||
            data.company.toLowerCase().includes(search) ||
            data.score.toLowerCase().includes(search) ||
            data.phone.toLowerCase().includes(search) ||
            data.location.toLowerCase().includes(search) ||
            data.date.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    users() {
      this.setPages();
    },
  },
  created() {
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(users) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return users.slice(from, to);
    },
    clearFilter() {
      this.filter.lost = false;
      this.filter.passed = false;
      this.filter.purse = false;
      this.filter.twitter = false;
      this.filter.data_register = null;
      this.filter.bots = null;
      
    },
    selectAll(event) {
      if (event.target.checked) {
        this.users.forEach(user => {
          user.checked = true;
        });
      } else {
        this.users.forEach(user => {
          user.checked = false;
        });
      }
    },
    userFilter() {
      console.log(this.filter);
    },
    deleteUser() {
      this.users = this.users.filter(element => {
       return element != this.selectUser
      });
    },
    deleteSelected() {
      this.users = this.users.filter(element => {
        console.log(!element.checked);
       return !element.checked
      });
    }
  },
};
</script>

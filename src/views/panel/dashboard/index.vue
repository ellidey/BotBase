<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col">
        <div class="h-100">
        <div class="row mb-3 pb-1">
            <div class="col-12">
              <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                <div class="flex-grow-1">
                  <h4 class="fs-16 mb-1">Bot Base</h4>
                </div>
                <div class="mt-3 mt-lg-0">
                  <form action="javascript:void(0);">
                    <div class="row g-3 mb-0 align-items-center">
                      <div class="col-sm-auto">
                        <div class="input-group">
                          <flat-pickr
                            v-model="date"
                            :config="config"
                            class="form-control border-0 dash-filter-picker shadow"
                          ></flat-pickr>
                         
                          <div
                            class="input-group-text bg-primary border-primary text-white"
                          >
                            <i class="ri-calendar-2-line"></i>
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                    </div>
                    <!--end row-->
                  </form>
                </div>
              </div>
              <!-- end card header -->
            </div>
            <!--end col-->
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-3 col-md-6">
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-info text-white rounded-2 fs-2 shadow"
                >
                  <i class="ri-user-line"></i>
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="text-uppercase fw-medium text-muted mb-2">
                  Number of Users
                </p>
                <h4 class="fs-4 mb-0">
                  <count-to
                    :startVal="0"
                    :endVal="405"
                    :duration="5000"
                  ></count-to>
                </h4>
              </div>
              <div class="flex-shrink-0 align-self-center">
                <span class="badge badge-soft-success fs-12"
                  ><i class="ri-arrow-up-s-line fs-13 align-middle me-1"></i
                  >16.31 %<span> </span
                ></span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
      </div>
      <!-- end col-->

      <div class="col-xl-3 col-md-6">
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-info text-white rounded-2 fs-2 shadow"
                >
                  <i class="ri-user-add-line"></i>
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="text-uppercase fw-medium text-muted mb-2">
                  Number of New Users
                </p>
                <h4 class="fs-4 mb-0">
                  <count-to
                    :startVal="0"
                    :endVal="405"
                    :duration="5000"
                  ></count-to>
                </h4>
              </div>
              <div class="flex-shrink-0 align-self-center">
                <span class="badge badge-soft-success fs-12"
                  ><i class="ri-arrow-up-s-line fs-13 align-middle me-1"></i
                  >16.31 %<span> </span
                ></span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
      </div>
      <!-- end col-->

      <div class="col-xl-3 col-md-6">
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-info text-white rounded-2 fs-2 shadow"
                >
                  <i class="ri-robot-line"></i>
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="text-uppercase fw-medium text-muted mb-2">
                  Number of Bots
                </p>
                <h4 class="fs-4 mb-0">
                  <count-to
                    :startVal="0"
                    :endVal="405"
                    :duration="5000"
                  ></count-to>
                </h4>
              </div>
              <div class="flex-shrink-0 align-self-center">
                <span class="badge badge-soft-success fs-12"
                  ><i class="ri-arrow-up-s-line fs-13 align-middle me-1"></i
                  >16.31 %<span> </span
                ></span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
      </div>
      <!-- end col-->

      <div class="col-xl-3 col-md-6">
        <div class="card card-height-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="avatar-sm flex-shrink-0">
                <span
                  class="avatar-title bg-info text-white rounded-2 fs-2 shadow"
                >
                  <i class="ri-user-unfollow-line"></i>
                </span>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="text-uppercase fw-medium text-muted mb-2">
                  Number of Unsubscribed
                </p>
                <h4 class="fs-4 mb-0">
                  <count-to
                    :startVal="0"
                    :endVal="405"
                    :duration="5000"
                  ></count-to>
                </h4>
              </div>
              <div class="flex-shrink-0 align-self-center">
                <span class="badge badge-soft-success fs-12"
                  ><i class="ri-arrow-up-s-line fs-13 align-middle me-1"></i
                  >16.31 %<span> </span
                ></span>
              </div>
            </div>
          </div>
          <!-- end card body -->
        </div>
      </div>
      <!-- end col-->
    </div>
    <!-- end row-->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">User base on all bots</h4>
          </div>
          <!-- end card header -->
          <div class="card-body">
            <VueApexCharts
              class="apex-charts"
              height="350"
              dir="ltr"
              :series="chart.series"
              :options="chart.options"
            ></VueApexCharts>
          </div>
        </div>
        <!--end card-->
      </div>
      <!-- end col -->
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="card card-height-100">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Top Sellers</h4>
            <div class="flex-shrink-0">
              <div class="dropdown card-header-dropdown">
                <a
                  class="text-reset dropdown-btn"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="text-muted"
                    >Report<i class="mdi mdi-chevron-down ms-1"></i
                  ></span>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                  <a class="dropdown-item" href="#">Download Report</a>
                  <a class="dropdown-item" href="#">Export</a>
                  <a class="dropdown-item" href="#">Import</a>
                </div>
              </div>
            </div>
          </div>
          <!-- end card header -->
          
          <div class="card-body">
            <div class="table-responsive table-card">
              <table
                class="table table-centered table-hover align-middle table-nowrap mb-0"
              >
                <tbody>
                  <tr>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 me-2">
                          <img
                            src="@/assets/images/companies/img-1.png"
                            alt=""
                            class="avatar-sm p-2"
                          />
                        </div>
                        <div>
                          <h5 class="fs-14 my-1 fw-medium">
                            <router-link
                              to="/"
                              class="text-reset"
                              >Bot Name</router-link
                            >
                          </h5>
                        </div>
                      </div>
                    </td>
                    <td class="text-center">
                      <p class="mb-0 fs-14">8547</p>
                    </td>
                    <td>
                      <h5 class="fs-14 mb-0 text-center">
                        32%<i
                          class="ri-bar-chart-fill text-success fs-16 align-middle ms-2"
                        ></i>
                      </h5>
                    </td>

                    <td class="text-center">
                      <p class="mb-0 fs-14">8547</p>
                    </td>
                    <td class="text-center">
                      <b-button variant="secondary" class="waves-effect waves-light mx-1 float-right">Edit</b-button>
                      <b-button variant="secondary" class="waves-effect waves-light mx-1 float-right">Open</b-button>
                    </td>
                  </tr>
                  <!-- end -->
                </tbody>
              </table>
              <!-- end table -->
            </div>

            <div
              class="align-items-center mt-4 pt-2 justify-content-between d-flex"
            >
              <div class="flex-shrink-0">
                <div class="text-muted">
                  Showing <span class="fw-semibold">5</span> of
                  <span class="fw-semibold">25</span> Results
                </div>
              </div>
              <ul
                class="pagination pagination-separated pagination-sm mb-0"
              >
                <li class="page-item disabled">
                  <a href="#" class="page-link">←</a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">1</a>
                </li>
                <li class="page-item active">
                  <a href="#" class="page-link">2</a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">3</a>
                </li>
                <li class="page-item">
                  <a href="#" class="page-link">→</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- .card-body-->
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Recent Activity</h4>
          </div>
            <SimpleBar
              data-simplebar
              style="max-height: 410px"
              class="p-3 pt-0"
            >
              <div class="acitivity-timeline acitivity-main mt-2">
                <div class="acitivity-item py-2 d-flex">
                  <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                    <div
                      class="avatar-title bg-soft-success text-success rounded-circle shadow"
                    >
                      <i class="ri-shopping-cart-2-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1 lh-base">Add a bot</h6>
                    <p class="text-muted mb-0">
                      Bot name
                    </p>
                    <small class="mb-0 text-muted">02:14 PM Today</small>
                  </div>
                </div>

                <div class="acitivity-item py-2 d-flex">
                  <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                    <div
                      class="avatar-title bg-soft-success text-success rounded-circle shadow"
                    >
                      <i class="ri-shopping-cart-2-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1 lh-base">Update bot</h6>
                    <p class="text-muted mb-0">
                      Bot name
                    </p>
                    <small class="mb-0 text-muted">02:14 PM Today</small>
                  </div>
                </div>

                <div class="acitivity-item py-2 d-flex">
                  <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                    <div
                      class="avatar-title bg-soft-success text-success rounded-circle shadow"
                    >
                      <i class="ri-shopping-cart-2-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3 d-flex align-items-center">
                    Bot mailing
                  </div>
                </div>
              </div>
            </SimpleBar>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import flatPickr from "vue-flatpickr-component";
import { CountTo } from "vue3-count-to";
import VueApexCharts from "vue3-apexcharts";
import { SimpleBar } from "simplebar-vue3";

export default {
  components: {
    Layout,
    PageHeader,
    flatPickr,
    CountTo,
    VueApexCharts,
    SimpleBar
  },
  data() {
    return {
      title: "Dashboard",
      date: null,
      chart: {
        series: [
          {
            name: "STOCK ABC",
            data: [
              8107.85,
              8128.0,
              8122.9,
              8165.5,
              8340.7,
              8423.7,
              8423.5,
              8514.3,
              8481.85,
            ],
          },
        ],
        options: {
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          labels: [
            "13 Jan 2017",
            "14 Feb 2017",
            "15 Mar 2017",
            "16 Apr 2017",
            "17 May 2017",
            "20 June 2017",
            "21 July 2017",
            "22 Aug 2017",
            "23 Sept 2017",
          ],
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: "left",
          },
          colors: ["#45CB85"],
        },
      },
      config: {
        mode: "range",
      },
      
      items: [
        {
          text: "Bot Base",
          href: "/",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ]
    }
  }
}
</script>
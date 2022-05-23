<script>
import { layoutComputed } from "@/state/helpers";

export default {
  components: { },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    setTimeout(() => {
      if (document.querySelectorAll(".navbar-nav .collapse")) {
        let collapses = document.querySelectorAll(".navbar-nav .collapse");
        collapses.forEach((collapse) => {
          // Hide sibling collapses on `show.bs.collapse`
          collapse.addEventListener("show.bs.collapse", (e) => {
            e.stopPropagation();
            let closestCollapse = collapse.parentElement.closest(".collapse");
            if (closestCollapse) {
              let siblingCollapses =
                closestCollapse.querySelectorAll(".collapse");
              siblingCollapses.forEach((siblingCollapse) => {
                if (siblingCollapse.classList.contains("show")) {
                  siblingCollapse.classList.remove("show");
                }
              });
            } else {
              let getSiblings = (elem) => {
                // Setup siblings array and get the first sibling
                let siblings = [];
                let sibling = elem.parentNode.firstChild;
                // Loop through each sibling and push to the array
                while (sibling) {
                  if (sibling.nodeType === 1 && sibling !== elem) {
                    siblings.push(sibling);
                  }
                  sibling = sibling.nextSibling;
                }
                return siblings;
              };
              let siblings = getSiblings(collapse.parentElement);
              siblings.forEach((item) => {
                if (item.childNodes.length > 2)
                  item.firstElementChild.setAttribute("aria-expanded", "false");
                let ids = item.querySelectorAll("*[id]");
                ids.forEach((item1) => {
                  item1.classList.remove("show");
                  if (item1.childNodes.length > 2) {
                    let val = item1.querySelectorAll("ul li a");

                    val.forEach((subitem) => {
                      if (subitem.hasAttribute("aria-expanded"))
                        subitem.setAttribute("aria-expanded", "false");
                    });
                  }
                });
              });
            }
          });

          // Hide nested collapses on `hide.bs.collapse`
          collapse.addEventListener("hide.bs.collapse", (e) => {
            e.stopPropagation();
            let childCollapses = collapse.querySelectorAll(".collapse");
            childCollapses.forEach((childCollapse) => {
              let childCollapseInstance = childCollapse;
              childCollapseInstance.hide();
            });
          });
        });
      }
    }, 0);
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      setTimeout(() => {
        if (document.getElementsByClassName("mm-active").length > 0) {
          const currentPosition =
            document.getElementsByClassName("mm-active")[0].offsetTop;
          if (currentPosition > 500)
            if (this.$refs.isSimplebar)
              this.$refs.isSimplebar.value.getScrollElement().scrollTop =
                currentPosition + 300;
        }
      }, 300);
    },

    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document
            .querySelector("#navbar-nav")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <template v-if="layoutType === 'twocolumn'">
    </template>
    <template v-else>
      <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="menu-title">
          <span data-key="t-menu"> {{ $t("t-menu") }}</span>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarBotBase"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarBotBase"
          >
            <i class="mdi mdi-robot"></i>
            <span data-key="t-bot-base"> {{ $t("t-bot-base") }}</span>
          </a>

          <div class="collapse menu-dropdown" id="sidebarBotBase">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
              <router-link 
                data-key="t-dashboards" 
                class="nav-link custom-abc" 
                to="/">
                {{ $t("t-dashboards") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-bots"
                class="nav-link custom-abc" 
                to="/bots">
                {{ $t("t-bots") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-users" 
                class="nav-link custom-abc" 
                to="/users">
                {{ $t("t-users") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-settings" 
                class="nav-link custom-abc" 
                to="/settings">
                {{ $t("t-settings") }}
              </router-link>
            </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarMonitorings"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarMonitorings"
          >
            <i class="mdi mdi-monitor"></i>
            <span data-key="t-bot-base"> {{ $t("t-monitorings") }}</span>
          </a>

          <div class="collapse menu-dropdown" id="sidebarMonitorings">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
              <router-link 
                data-key="t-dashboards" 
                class="nav-link custom-abc" 
                to="/monitorings/">
                {{ $t("t-dashboards") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-bots"
                class="nav-link custom-abc" 
                to="/monitorings/bots">
                {{ $t("t-bots") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-users" 
                class="nav-link custom-abc" 
                to="/monitorings/base">
                {{ $t("t-base") }}
              </router-link>
            </li>

            <li class="nav-item">
              <router-link 
                data-key="t-settings" 
                class="nav-link custom-abc" 
                to="/monitorings/settings">
                {{ $t("t-settings") }}
              </router-link>
            </li>
            </ul>
          </div>
        </li>
      </ul>
      </template>
  </div>
  <!-- Sidebar -->
</template>

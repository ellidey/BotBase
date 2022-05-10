<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

  </Layout>
</template>

<script>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";

export default {
  components: {
    Layout,
    PageHeader
  },
  data() {
    return {
      title: "Dashboard",
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
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
      title: "Users",
      items: [
        {
          text: "Bot Base",
          href: "/users",
        },
        {
          text: "Users",
          active: true,
        },
      ]
    }
  }
}
</script>
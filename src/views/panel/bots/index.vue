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
      title: "Bots",
      items: [
        {
          text: "Bot Base",
          href: "/bots",
        },
        {
          text: "Bots",
          active: true,
        },
      ]
    }
  }
}
</script>
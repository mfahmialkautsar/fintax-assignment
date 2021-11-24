<template>
  <c-theme-provider>
    <c-reset />
    <Navbar />
    <router-view />
  </c-theme-provider>
</template>

<script>
import { CThemeProvider, CReset } from '@chakra-ui/vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CReset,
    Navbar,
  },
};
</script>

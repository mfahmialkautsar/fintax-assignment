<template>
  <CBox class="container" p="8" mx="auto">
    <CHeading
      as="h1"
      size="xl"
      pb="8"
      class="text-indigo-900 dark:text-indigo-50"
      >Calculator</CHeading
    >
    <Calculator />
  </CBox>
</template>

<script>
import Vue from 'vue';
import Calculator from '@/components/Calculator.vue';
import { CHeading, CBox } from '@chakra-ui/vue';

export default Vue.extend({
  components: {
    Calculator,
    CHeading,
    CBox,
  },
});
</script>

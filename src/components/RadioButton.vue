<template>
  <CButton
    :variant-color="isChecked ? 'indigo' : 'gray'"
    p="0"
    position="relative"
  >
    <input
      class="w-full h-full inline-block opacity-0 absolute cursor-pointer"
      type="radio"
      :id="value"
      v-bind="$props"
      role="radio"
      :aria-checked="isChecked"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <slot />
  </CButton>
</template>
<script>
import { CButton } from '@chakra-ui/vue';

export default {
  props: {
    isChecked: Boolean,
    isDisabled: Boolean,
    value: [String, Number],
    mx: [String, Number],
  },
  components: {
    CButton,
  },
};
</script>

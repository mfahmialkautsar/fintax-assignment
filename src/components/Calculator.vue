<template>
  <div>
    <form class="container space-y-4 max-w-screen-md">
      <CInput
        class="overflow-scroll flex-grow text-gray-500 text-lg"
        type="number"
        v-model="firstInput"
        placeholder="First input"
      />
      <CRadioGroup v-model="opearand" is-inline color="black">
        <RadioButton value="plus">+</RadioButton>
        <RadioButton value="minus">-</RadioButton>
        <RadioButton value="times">*</RadioButton>
        <RadioButton value="divide">/</RadioButton>
        <RadioButton value="modulo">%</RadioButton>
      </CRadioGroup>
      <CInput
        class="overflow-scroll flex-grow text-gray-500 text-lg"
        type="number"
        v-model="secondInput"
        placeholder="Second input"
      />
    </form>
    <CBox>
      <CHeading
        as="h3"
        size="lg"
        pt="8"
        pb="2"
        class="text-indigo-600 dark:text-indigo-300"
      >
        Result:
      </CHeading>
      <span
        class="dark:text-indigo-100 text-indigo-400 text-lg font-semibold"
        >{{ equal }}</span
      >
    </CBox>
  </div>
</template>

<script>
import {
  CButton,
  CInput,
  CRadio,
  CRadioGroup,
  CBox,
  CHeading,
} from '@chakra-ui/vue';
import RadioButton from './RadioButton.vue';

export default {
  data() {
    return {
      opearand: '',
      firstInput: '',
      secondInput: '',
      result: '',
    };
  },
  computed: {
    equal() {
      const number1 = this.firstInput;
      const number2 = this.secondInput;
      const opearand = this.opearand;

      switch (opearand) {
        case 'plus':
          return number1 + number2 || 0;
        case 'minus':
          return number1 - number2 || 0;
        case 'times':
          return number1 * number2 || 0;
        case 'divide':
          return number1 / number2 || 0;
        case 'modulo':
          return number1 % number2 || 0;
        default:
          return '0';
      }
    },
  },
  components: {
    CButton,
    CInput,
    CRadio,
    CRadioGroup,
    RadioButton,
    CBox,
    CHeading,
  },
};
</script>

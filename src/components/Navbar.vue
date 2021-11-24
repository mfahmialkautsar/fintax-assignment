<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div as="nav" class="bg-indigo-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.href === currentRoute
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-300 hover:bg-indigo-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
        </div>
        <CFlex align="center">
          <label class="h-8 relative w-16" for="checkbox">
            <input
              class="peer hidden"
              type="checkbox"
              id="checkbox"
              v-model="darkSwitch"
            />
            <div
              class="
                bg-gray-900
                rounded-3xl
                inset-0
                absolute
                cursor-pointer
                transition
              "
            >
              <div class="flex justify-between items-center h-full px-1.5">
                <v-icon
                  name="moon"
                  height="20px"
                  class="text-yellow-300"
                ></v-icon>
                <v-icon
                  name="sun"
                  height="20px"
                  class="text-yellow-500"
                ></v-icon>
              </div>
              <div
                class="
                  rounded-full
                  bg-white
                  inset-y-0
                  left-0.5
                  my-auto
                  absolute
                  transition
                  duration-200
                  w-7
                  h-7
                "
                :style="{
                  transform: `translateX(${darkSwitch ? '31px' : '0'})`,
                }"
              ></div>
            </div>
          </label>
        </CFlex>
      </div>
    </div>
  </div>
</template>

<script>
import { CButton, CFlex } from '@chakra-ui/vue';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Friends', href: '/friends' },
];

export default {
  methods: {
    setTheme() {
      if (this.darkSwitch) {
        document.querySelector('html').classList.add('dark');
      } else {
        document.querySelector('html').classList.remove('dark');
      }
    },
  },
  components: {
    CButton,
    CFlex,
  },
  data() {
    return {
      navigation,
      darkSwitch: localStorage.getItem('theme') == 'dark' ? true : false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
  },
  created() {
    this.setTheme();
  },
  watch: {
    darkSwitch: {
      handler(state) {
        const newDarkSwitch = state ? 'dark' : 'light';
        this.setTheme();
        localStorage.setItem('theme', newDarkSwitch);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
/* .theme-switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
}

.theme-switch input {
  display: none;
} */

/* .slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
} */

/* .slider__switch {
  background-color: #fff;
  bottom: 4px;
  height: 26px;
  left: 4px;
  position: absolute;
  transition: 0.4s;
  width: 26px;
} */

/* input:checked + .slider {
  background-color: #66bb6a;
} */

/* input:checked + .slider > .slider__switch {
  transform: translateX(26px);
} */
</style>

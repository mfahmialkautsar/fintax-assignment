<template>
  <CBox class="container" mx="auto" p="8">
    <CHeading
      as="h1"
      size="xl"
      pb="8"
      class="text-indigo-900 dark:text-indigo-50"
      >Friends</CHeading
    >
    <CBox
      p="6"
      mb="4"
      overflow="scroll"
      rounded="lg"
      border="1px"
      border-color="grey"
    >
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th
              @click="sort('first_name')"
              class="border-b p-2 cursor-pointer hover:text-indigo-800"
            >
              First Name
            </th>
            <th
              @click="sort('last_name')"
              class="border-b p-2 cursor-pointer hover:text-indigo-800"
            >
              Last Name
            </th>
            <th
              @click="sort('email')"
              class="border-b p-2 cursor-pointer hover:text-indigo-800"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="animate-pulse">
            <td
              :key="i"
              class="border-b p-2"
              v-for="(x, i) in new Array(3).fill(0)"
            >
              <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-indigo-400 rounded w-3/4"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-indigo-400 rounded"></div>
                  <div class="h-4 bg-indigo-400 rounded w-5/6"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-else :key="index" v-for="(user, index) in sortedUsers">
            <td class="border-b p-2">{{ user.first_name }}</td>
            <td class="border-b p-2">{{ user.last_name }}</td>
            <td class="border-b p-2">{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </CBox>
    <CFlex justify="right" align="center" class="gap-4">
      Rows per page:
      <CSelect
        variant="flushed"
        v-model="showCount"
        class="w-max cursor-pointer"
      >
        <option value="3" class="dark:bg-gray-800" selected>3</option>
        <option value="5" class="dark:bg-gray-800">5</option>
        <option value="10" class="dark:bg-gray-800">10</option>
        <option value="all" class="dark:bg-gray-800">all</option>
      </CSelect>
    </CFlex>
  </CBox>
</template>

<script>
import { CSelect, CBox, CFlex, CHeading } from '@chakra-ui/vue';
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: 1,
      totalPages: 0,
      total: 0,
      perPage: 0,
      showCount: new URL(location.href).searchParams.get('per_page') || '3',
      isLoading: true,
    };
  },
  methods: {
    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    fetchUsers({ per_page }) {
      this.isLoading = true;
      axios
        .get(import.meta.env.VITE_REQRES_URL + '/users', {
          params: {
            per_page: per_page == 'all' ? this.total : per_page,
          },
        })
        .then((res) => {
          this.page = res.data.page;
          this.users = res.data.data;
          this.total = res.data.total;
          this.totalPages = res.data.total_pages;
          this.perPage = res.data.per_page;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  computed: {
    sortedUsers: function () {
      return this.users.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
  watch: {
    showCount: {
      handler(per_page) {
        this.$router.push({ query: { per_page } });
        this.fetchUsers({ per_page });
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchUsers({ per_page: vm.showCount });
    });
  },
  components: {
    CSelect,
    CBox,
    CFlex,
    CHeading,
  },
};
</script>

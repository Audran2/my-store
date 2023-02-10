<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(1)">First</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
      </li>
      <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === pagesCount }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === pagesCount }">
        <a class="page-link" href="#" @click.prevent="changePage(pagesCount)">Last</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: ['totalProducts', 'productsPerPage'],
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.totalProducts / this.productsPerPage)
    },
    pages() {
      const pages = []
      for (let i = 1; i <= this.pagesCount; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.pagesCount) {
        this.currentPage = page
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

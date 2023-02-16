<template>
  <nav aria-label="Page navigation example">
    <div class="pagination">
      <button
        class="button"
        :class="{ disabled: currentPage === 1 }"
        href="#"
        @click.prevent="changePage(1)"
      >
        Première
      </button>
      <button
        class="button"
        :class="{ disabled: currentPage === 1 }"
        href="#"
        @click.prevent="changePage(currentPage - 1)"
      >
        Précédent
      </button>
      <button
        class="button"
        href="#"
        v-for="page in pages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click.prevent="changePage(page)"
      >
        {{ page }}
      </button>
      <button
        class="button"
        :class="{ disabled: currentPage === pagesCount }"
        href="#"
        @click.prevent="changePage(currentPage + 1)"
      >
        Suivant
      </button>
      <button
        class="button"
        :class="{ disabled: currentPage === pagesCount }"
        href="#"
        @click.prevent="changePage(pagesCount)"
      >
        Dernière
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: ["totalProducts", "productsPerPage"],
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.totalProducts / this.productsPerPage);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.pagesCount; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.pagesCount) {
        this.currentPage = page;
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;
}
</style>

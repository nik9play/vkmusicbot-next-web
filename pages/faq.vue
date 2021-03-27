<template>
  <div class="container">
    <section class="section">
      <p class="is-size-3 mb-4">Справка</p>
      <b-field>
        <b-input v-model="search" icon="magnify" />
      </b-field>
      <div class="cards-container">
        <!-- <Card
          v-for="(command, i) of searchList"
          :key="i"
          :name="command.name"
          :use="command.use"
          :description="command.description"
          :premium="command.premium"
        /> -->
        <b-collapse
          v-for="(question, i) of searchList"
          :key="i"
          class="card mb-1"
          animation="fade-collapse"
          :open="isOpen == question.question.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')"
          @open="isOpen = question.question.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')"
        >
          <template #trigger="props">
            <div
              class="card-header"
              role="button"
            >
              <div :id="question.question.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')" class="card-header-title is-flex-direction-column is-align-items-start">
                <div><nuxt-link :to="{ path: '', hash: question.question.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'') }">#</nuxt-link> {{ question.question }}</div>
              </div>
              <a class="card-header-icon">
                <b-icon
                  :icon="props.open ? 'menu-up' : 'menu-down'"
                />
              </a>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              <div v-html="question.answer" />
            </div>
          </div>
        </b-collapse>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: -1,
      search: '',
      questions: [
        {
          question: 'Как найти ID трека?',
          answer: '<img src="/faq2.png">'
        }
      ]
    }
  },

  head () {
    return {
      title: 'Справка — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Вопросы про VK Music Bot и ответы на них.'
        }
      ]
    }
  },

  computed: {
    searchList () {
      return this.questions.filter((question) => {
        return question.question.toLowerCase().includes(this.search.toLowerCase().trim())
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.isOpen = location.hash.slice(1)
    })
  }
}
</script>

<style lang="scss">
// .cards-container {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   column-gap: 1rem;
//   @media (max-width: 740px) {
//     grid-template-columns: 1fr;
//   }
// }

.premium {
  box-shadow: inset 0px 0px 0px 2px #e4b047e0;
}

.fade-collapse-enter-active {
  transition: opacity .8s;
}

// .fade-collapse-leave-active {
//   transition: opacity 0s;
// }

.fade-collapse-enter, .fade-collapse-leave-to {
  opacity: 0;
}
</style>

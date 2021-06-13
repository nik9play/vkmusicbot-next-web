<template>
  <div class="container">
    <section class="section">
      <p class="is-size-3 mb-4">Справка</p>
      <!-- <b-field>
        <b-input v-model="search" icon="magnify" />
      </b-field> -->
      <div class="columns">
        <div class="column">
          <div class="control has-icons-left  is-clearfix" style="width: 100%">
            <input v-model="search" type="text" autocomplete="on" class="input" placeholder="Поиск">
            <span class="icon is-left">
              <svg-icon type="mdi" :path="mdiMagnify" />
            </span>
          </div>
        </div>
      </div>
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
                <svg-icon type="mdi" :path="props.open ? mdiChevronUp : mdiChevronDown" />
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
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiChevronDown, mdiChevronUp, mdiMagnify } from '@mdi/js'

export default {
  components: {
    SvgIcon
  },

  data () {
    return {
      isOpen: -1,
      search: '',
      mdiChevronDown,
      mdiChevronUp,
      mdiMagnify,
      questions: [
        {
          question: 'Как найти ID трека?',
          answer: '<img src="/faq2.png">'
        },
        {
          question: 'Как получить рабочую ссылку на плейлист?',
          answer: '<a href="https://vk.com/@vkmusicbotds-kak-poluchit-rabochuu-ssylku-na-pleilist">Инструкция</a>'
        },
        {
          question: 'Почему из плейлиста добавляются только 10 треков?',
          answer: 'В описании к команде <code>play</code> написано, что по умолчанию добавляется 10 треков. Чтобы добавить больше, необходимо ввести нужное количество после ссылки.'
        },
        {
          question: 'Как узнать ID сервера?',
          answer: 'Инструкция:<ol><li>Зайдите в настройки Discord</li><li>Зайдите во вкладку «Расширенные»</li><li>Включите режим разработчика</li><li>Нажмите ПКМ по серверу и нажмите «Копировать ID»</li></ol>'
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
        return question.question.toLowerCase().includes(this.search.toLowerCase().trim()) || question.answer.toLowerCase().includes(this.search.toLowerCase().trim())
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.isOpen = decodeURI(location.hash.slice(1))
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

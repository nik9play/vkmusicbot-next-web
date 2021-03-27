<template>
  <div class="container">
    <section class="section">
      <p class="is-size-3 mb-4">Команды</p>
      <b-notification
        :closable="false"
      >
        Команды, помеченные жёлтым, требуют <nuxt-link to="/donate">Премиум</nuxt-link>.
        Аргументы, помеченные звездочкой — обязательные
        Стандартный префикс — <code>-v</code>.
      </b-notification>
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
          v-for="(command, i) of searchList"
          :key="i"
          class="card mb-1"
          animation="fade-collapse"
          :open="isOpen == command.name.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')"
          @open="isOpen = command.name.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')"
        >
          <template #trigger="props">
            <div
              class="card-header"
              :class="{ premium: command.premium }"
              role="button"
            >
              <div :id="command.name.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'')" class="card-header-title is-flex-direction-column is-align-items-start">
                <div><nuxt-link :to="{ path: '', hash: command.name.replace(/[^a-zA-Z0-9а-яА-Я(),]/g,'') }">#</nuxt-link> {{ command.name }}</div>
                <div class="has-text-weight-normal" v-html="command.description" />
              </div>
              <a class="card-header-icon">
                <b-icon
                  :icon="props.open ? 'menu-up' : 'menu-down'"
                />
              </a>
            </div>
          </template>
          <div class="card-content">
            <p v-if="command.use" class="subtitle is-6 command-use">
              {{ command.use }}
            </p>

            <div class="content">
              <div v-html="command.description" />
              <div v-html="command.additional" />
              <div v-if="command.examples">
                <div class="has-text-weight-medium my-4">Например:</div>
                <pre class="px-4 py-3"><div v-for="(example, i1) of command.examples" :key="i1">{{ example }}</div></pre>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable vue/no-v-html */
export default {
  data () {
    return {
      isOpen: -1,
      search: '',
      commands: [
        {
          name: '-vp (-vplay, -vpl)',
          use: '-vp <имя или id>* <count> <offset>',
          description: 'Добавить в очереди трек/треки. Принимает название трека, ID трека, ссылку на плейлист или на пользователя',
          additional: 'Так же имеются дополнительные аргументы: количество треков (count) и отступ (offset).',
          examples: [
            '-vp Егор Летов Моя Оборона',
            '-vp 163187759_456241101',
            '-vp https://vk.com/audios156982712?z=audio_playlist163187759_11%2F62885dd05cc686e318 10',
            '-vp https://vk.com/audios156982712',
            '-vp https://vk.com/music/playlist/163187759_11_62885dd05cc686e318 34 5'
          ]
        },
        {
          name: '-vq (-vqueue)',
          use: '-vq <номер стр.>',
          description: 'Отображает очередь. Первым аргументом принимает страницу для отображения'
        },
        {
          name: '-vsh',
          description: 'Перемешивает очередь.',
          premium: true
        },
        {
          name: '-vsettings',
          description: 'Настройки. Введите <code>-vsettings</code> для подробностей',
          examples: [
            '-vsettings prefix _',
            '-vsettings djenabled true',
            '-vsettings djrole @роль',
            '-vsettings djrole роль'
          ]
        },
        {
          name: '-v24/7 (-v247)',
          description: 'Включает режим 24/7. Бот будет стараться не выходить из канала',
          premium: true
        },
        {
          name: '-vl (-vloop)',
          use: '-vl <queue/song/off>*',
          description: 'Включает зацикливание очереди (<code>-vl queue</code>) или трека (<code>-vl song</code>). Чтобы выключить, используйте <code>-vl off</code>'
        },
        {
          name: '-vskip (-vn)',
          description: 'Пропуск трека'
        },
        {
          name: '-vstop (-vs)',
          description: 'Остановить воспроизведение и очистить очередь'
        },
        {
          name: '-vps (-vpause)',
          description: 'Поставить трек на паузу'
        },
        {
          name: '-vbass',
          description: 'Включать бас буст. Есть 4 режима: <code>none</code>, <code>low</code>, <code>medium</code>, <code>high</code>'
        },
        {
          name: '-vh',
          description: 'Справка'
        },
        {
          name: '-vgachi',
          description: 'Рандомный гачи-ремикс'
        },
        {
          name: '-vmashup',
          description: 'Рандомный мэшап'
        },
        {
          name: '-vdonate (-vpremium)',
          description: 'Информация о Премиуме'
        },
        {
          name: '-vfix',
          description: 'Пытается починить бота, если что-то не так'
        }
      ]
    }
  },

  head () {
    return {
      title: 'Команды — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Список команд для VK Music Bot'
        }
      ]
    }
  },

  computed: {
    searchList () {
      return this.commands.filter((command) => {
        return command.name.toLowerCase().includes(this.search.toLowerCase().trim()) || command.description.toLowerCase().includes(this.search.toLowerCase().trim())
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

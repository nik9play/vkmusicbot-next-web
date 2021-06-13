<template>
  <div class="container">
    <section class="section">
      <p class="is-size-3 mb-4">Команды</p>
      <b-notification
        :closable="false"
      >
        Команды, помеченные жёлтым, требуют <nuxt-link to="/donate">Премиум</nuxt-link>.
        Аргументы в квадратных скобках — обязательные.
        Стандартный префикс — <code>-v</code>.
      </b-notification>
      <!-- <b-input v-model="search" icon="fsdf" /> -->
      <div class="columns">
        <div class="column is-three-quarters">
          <div class="control has-icons-left  is-clearfix" style="width: 100%">
            <input v-model="search" type="text" autocomplete="on" class="input" placeholder="Поиск">
            <span class="icon is-left">
              <svg-icon type="mdi" :path="mdiMagnify" />
            </span>
          </div>
        </div>
        <div class="column">
          <div class="control has-icons-left has-icons-right is-clearfix" style="width: 100%">
            <input v-model="prefix" type="text" autocomplete="on" class="input" placeholder="Префикс (по умолчанию -v)">
            <span class="icon is-right has-text-primary is-clickable" title="Сбросить префикс" @click="prefix = '-v'">
              <svg-icon type="mdi" :path="mdiRefresh" />
            </span>
            <span class="icon is-left">
              <svg-icon type="mdi" :path="mdiConsoleLine" />
            </span>
          </div>
        </div>
      </div>
      <div class="cards-container">
        <b-collapse
          v-for="(command, i) of searchList"
          :key="i"
          class="card mb-1"
          animation="fade-collapse"
          :open="isOpen == command.name"
          @open="isOpen = command.name"
        >
          <template #trigger="props">
            <div
              class="card-header"
              :class="{ premium: command.premium }"
              role="button"
            >
              <div :id="command.name" class="card-header-title is-flex-direction-column is-align-items-start">
                <div><nuxt-link :to="{ path: '', hash: command.name }">#</nuxt-link>
                  <code v-clipboard:copy="prefix + command.name" class="command-name" @click="copyCommand(prefix + command.name)"> {{ prefix + command.name }} </code>
                </div>
                <div class="has-text-weight-normal" v-html="command.description" />
              </div>
              <a class="card-header-icon">
                <svg-icon type="mdi" :path="props.open ? mdiChevronUp : mdiChevronDown" />
              </a>
            </div>
          </template>
          <div class="card-content">
            <p v-if="command.use" class="subtitle is-6 command-use is-family-monospace">
              {{ prefix + command.use }}
            </p>

            <div class="content">
              <div v-html="command.description" />
              <div v-html="command.additional" />
              <div v-if="command.examples">
                <div class="has-text-weight-medium my-4">Например:</div>
                <pre class="px-4 py-3"><div v-for="(example, i1) of command.examples" :key="i1">{{ prefix + example }}</div></pre>
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
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiChevronDown, mdiChevronUp, mdiMagnify, mdiConsoleLine, mdiRefresh } from '@mdi/js'

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
      mdiConsoleLine,
      mdiRefresh,
      prefix: '-v',
      commands: [
        {
          name: 'play',
          aliases: ['p', 'pl'],
          use: 'play [имя или id] <count> <offset>',
          description: 'Добавить в очереди трек/треки. Принимает название трека, ID трека, ссылку на плейлист или на пользователя. По умолчанию добавляется только 10 треков.',
          additional: 'Так же имеются дополнительные, необязательные аргументы: количество треков (count) и отступ (offset).',
          examples: [
            'p Егор Летов Моя Оборона',
            'p 163187759_456241101',
            'p https://vk.com/audios156982712?z=audio_playlist163187759_11%2F62885dd05cc686e318 10',
            'p https://vk.com/audios156982712',
            'p https://vk.com/music/playlist/163187759_11_62885dd05cc686e318 34 5',
            'p >nikitabogun // включение по айди пользователя'
          ]
        },
        {
          name: 'queue',
          aliases: ['q'],
          use: 'q <номер стр.>',
          description: 'Отображает очередь. Первым аргументом принимает страницу для отображения'
        },
        {
          name: 'shuffle',
          aliases: ['sh'],
          description: 'Перемешивает очередь.',
          premium: true
        },
        {
          name: 'settings',
          description: 'Настройки. Введите <code>-vsettings</code> для подробностей. DJ-роль по умолчанию <code>DJ</code>.',
          examples: [
            'settings prefix _',
            'settings dj off',
            'settings djrole @роль',
            'settings djrole роль'
          ]
        },
        {
          name: 'search',
          description: 'Поиск по базе ВК'
        },
        {
          name: '24/7',
          aliases: ['247'],
          description: 'Включает режим 24/7. Бот будет стараться не выходить из канала',
          premium: true
        },
        {
          name: 'loop',
          aliases: ['l'],
          use: 'loop <queue/track/off>*',
          description: 'Включает зацикливание очереди (<code>queue</code>) или трека (<code>track</code>). Чтобы выключить, используйте <code>off</code>'
        },
        {
          name: 'skip',
          aliases: 'n',
          description: 'Пропуск трека'
        },
        {
          name: 'stop',
          aliases: ['s'],
          description: 'Остановить воспроизведение и очистить очередь'
        },
        {
          name: 'remove',
          aliases: ['r'],
          use: 'remove <номер/диапазон>',
          description: 'Удаляет треки из очереди'
        },
        {
          name: 'pause',
          aliases: ['ps'],
          description: 'Поставить трек на паузу'
        },
        {
          name: 'leave',
          description: 'Бот выйдет из канала'
        },
        {
          name: 'bass',
          description: 'Включить бас буст. Есть 4 режима: <code>none</code>, <code>low</code>, <code>medium</code>, <code>high</code>'
        },
        {
          name: 'help',
          aliases: ['h'],
          description: 'Справка'
        },
        {
          name: 'gachi',
          description: 'Рандомный гачи-ремикс'
        },
        {
          name: 'mashup',
          description: 'Рандомный мэшап'
        },
        {
          name: 'donate',
          aliases: ['premium'],
          description: 'Информация о Премиуме'
        },
        {
          name: 'fix',
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

  watch: {
    prefix (val) {
      this.$auth.$storage.setLocalStorage('prefix', val)
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.isOpen = location.hash.slice(1)
    })

    const newPrefix = this.$auth.$storage.getLocalStorage('prefix')

    if (newPrefix) {
      this.prefix = newPrefix
    }
  },

  methods: {
    copyCommand (name = '') {
      this.$buefy.toast.open({
        message: `Команда ${name} скопирована в буфер обмена.`,
        position: 'is-bottom-left'
      })
    }
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

.command-name {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.command-name:active {
  transition: none;
  background: #3c4049;
}

.premium {
  box-shadow: inset 0px 0px 0px 2px #f0be5be0;
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

.card-header {
  border-radius: 8px;
}
</style>

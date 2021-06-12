<template>
  <div class="container">
    <section class="section">
      <b-modal v-model="isGuildModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img class="is-rounded" :src="`https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`" :alt="currentGuild.name" @error="currentGuildImgError">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ currentGuild.name }}</p>
                <p v-if="!currentGuildSettingsLoading" class="subtitle is-6">Премиум:
                  <svg-icon class="has-text-success" :size="16" viewbox="0 0 24 16" v-if="currentGuildSettings.premium" type="mdi" :path="mdiCheck" />
                  <svg-icon class="has-text-danger" :size="16" viewbox="0 0 24 16" v-else type="mdi" :path="mdiClose" />
                  <nuxt-link v-if="!currentGuildSettings.premium" to="/donate">Купить</nuxt-link>
                </p>
                <p v-if="currentGuildSettingsLoading" class="subtitle"><b-skeleton height="20px" /></p>
              </div>
            </div>

            <div>
              <b-field label="Префикс">
                <b-skeleton v-if="currentGuildSettingsLoading" height="40px" />
                <b-tooltip v-else multilined style="width: 100%;">
                  <b-input v-model="currentGuildSettings.prefix" maxlength="5" placeholder="-vh" disabled :has-counter="false" />
                  <template #content>
                    Смена префикса через сайт временно недоступна. Используйте <code>-vsettings prefix</code>.
                  </template>
                </b-tooltip>
              </b-field>

              <b-field label="DJ режим">
                <b-skeleton v-if="currentGuildSettingsLoading" height="25px" />
                <b-switch v-else v-model="currentGuildSettings.accessRoleNameEnabled">Включить</b-switch>
              </b-field>

              <b-field label="Роль DJ режима">
                <b-skeleton v-if="currentGuildSettingsLoading" height="40px" />
                <b-input v-else v-model="currentGuildSettings.accessRoleName" maxlength="999" :has-counter="false" required placeholder="DJ" />
              </b-field>

              <b-field label="Отключить оповещения о треках">
                <b-skeleton v-if="currentGuildSettingsLoading" height="25px" />
                <b-switch v-else v-model="currentGuildSettings.disableAnnouncements">Включить</b-switch>
              </b-field>

              <b-button type="is-danger" @click="cancelModal">Отмена</b-button>
              <b-button type="is-success" style="float:right" :loading="isSaving" :disabled="isSaving" @click="saveModal">Сохранить</b-button>
            </div>
          </div>
        </div>
      </b-modal>
      <p class="is-size-3 mb-4">Список серверов</p>
      <div class="guild-list">
        <b-skeleton v-if="!loaded" height="80px" />
        <b-skeleton v-if="!loaded" height="80px" />
        <b-skeleton v-if="!loaded" height="80px" />
        <guild-card
          v-for="(guild, i) in guildList"
          :key="i"
          :name="guild.name"
          :icon="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
          :guild-id="guild.id"
          @click="currentGuild = guild; openModal()"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiCheck, mdiClose } from '@mdi/js'
import GuildCard from '~/components/GuildCard.vue'

export default {
  components: {
    GuildCard,
    SvgIcon
  },

  middleware: 'auth',

  data () {
    return {
      guildList: [],
      loaded: false,
      isGuildModalActive: false,
      isSaving: false,
      currentGuild: {},
      currentGuildSettings: {
        guild_id: null,
        prefix: '-vh',
        accessRoleName: 'DJ',
        accessRoleNameEnabled: false,
        e247: false,
        disableAnnouncements: false,
        premium: false
      },
      currentGuildSettingsLoading: false,
      mdiCheck,
      mdiClose
    }
  },

  head () {
    return {
      title: 'Список серверов — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Список серверов пользователя'
        }
      ]
    }
  },

  async mounted () {
    try {
      const guildListReq = await this.$axios.$get('https://discord.com/api/users/@me/guilds')
      this.guildList = guildListReq.filter(guild => (guild.permissions & 0x20) !== 0)
      this.loaded = true
    } catch {
      this.$buefy.toast.open({
        duration: 5000,
        message: 'Ошибка загрузки списка серверов.',
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  },

  methods: {
    test () {
      this.$axios.$get('http://localhost:5000/public/config/713734408930197524')
    },
    currentGuildImgError (event) {
      event.target.src = '/discord-default.svg'
    },
    openModal () {
      this.currentGuildSettingsLoading = true
      this.isGuildModalActive = true
      const self = this
      self.$axios.$get(`http://localhost:5000/public/config/${this.currentGuild.id}`).then((res) => {
        this.currentGuildSettings = res.config
        this.currentGuildSettingsLoading = false
      }).catch(() => {
        self.$buefy.toast.open({
          duration: 5000,
          message: 'Ошибка загрузки конфига сервера. Попробуйте позже.',
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },

    cancelModal () {
      this.isGuildModalActive = false
    },

    saveModal () {
      this.isSaving = true

      const self = this

      this.$axios.$post(`http://localhost:5000/public/config/${this.currentGuild.id}`,
        self.currentGuildSettings
      )
        .then(() => {
          self.$buefy.toast.open({
            duration: 5000,
            message: 'Настройки успешно сохранены!',
            position: 'is-bottom',
            type: 'is-success'
          })
        })
        .catch(() => {
          self.$buefy.toast.open({
            duration: 5000,
            message: 'Ошибка сохранения настроек. Проверьте заполненные данные.',
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
        .finally(() => {
          this.isSaving = false
        })

      // this.isGuildModalActive = false
    }
  }
}
</script>

<style lang="scss">
.guild-list {
  display: grid;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
</style>

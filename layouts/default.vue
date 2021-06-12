<template>
  <div>
    <div>
      <b-navbar :mobile-burger="false" fixed-top wrapper-class="container">
        <template #brand>
          <b-navbar-item id="mainlogo" tag="router-link" :to="{ path: '/' }">
            <img
              src="~/assets/VK Music Bot.svg"
              alt="VK Music Bot"
              width="120px"
            >
          </b-navbar-item>
          <div class="navbar-burger burger" :class="{ 'is-active': mobileMenuOpen }" @click="mobileMenuOpen = !mobileMenuOpen">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </template>

        <template #end>
          <b-navbar-item
            v-for="(item, key) of items"
            :key="key"
            :to="item.to"
            tag="router-link"
            class="navbar-item"
            exact
          >
            {{ item.title }}
          </b-navbar-item>
          <b-navbar-item
            v-if="!$auth.loggedIn"
            tag="a"
            class="navbar-item"
            @click="$auth.loginWith('discord')"
          >
            Войти
          </b-navbar-item>
          <b-navbar-dropdown
            v-else
            :label="$auth.user.username"
          >
            <b-navbar-item
              tag="router-link"
              class="navbar-item"
              to="/dashboard"
            >
              Сервера
            </b-navbar-item>
            <b-navbar-item
              tag="a"
              class="navbar-item"
              @click="$auth.logout()"
            >
              Выйти
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>

    <transition name="menu">
      <div v-if="mobileMenuOpen" class="mobile-menu-background is-flex-direction-column-reverse">
        <div v-if="mobileMenuOpen" class="mobile-menu-container p-5">
          <p class="is-size-4 mb-4">Разделы сайта</p>
          <div class="mobile-menu-items">
            <nuxt-link
              v-for="(item, key) of items"
              :key="key"
              :to="item.to"
              class="card p-4 has-text-white"
              @click.native="itemClicked"
            >
              <svg-icon type="mdi" :path="item.icon" />
              <p>{{ item.title }}</p>
            </nuxt-link>
          </div>

          <div class="mt-5">
            <p v-if="!$auth.loggedIn">Не авторизован</p>
            <p v-else>{{ $auth.user.username }}</p>
            <div class="mobile-menu-account mt-5">
              <div v-if="!$auth.loggedIn" class="card p-4 has-background-primary has-text-white" @click="$auth.loginWith('discord'); itemClicked()">
                <svg-icon type="mdi" :path="mdiLoginVariant" />
                <p>Войти</p>
              </div>
              <nuxt-link v-if="$auth.loggedIn" to="/dashboard" class="card p-4 has-background-info has-text-white" @click.native="itemClicked">
                <svg-icon type="mdi" :path="mdiAccountGroupOutline" />
                <p>Сервера</p>
              </nuxt-link>
              <a v-if="$auth.loggedIn" class="card p-4 has-background-danger has-text-white" @click="$auth.logout(); itemClicked()">
                <svg-icon type="mdi" :path="mdiLogoutVariant" />
                <p>Выйти</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <nuxt />
    <!-- </div> -->
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import {
  mdiHomeOutline,
  mdiConsole,
  mdiFrequentlyAskedQuestions,
  mdiChartLine,
  mdiCurrencyUsd,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountGroupOutline
} from '@mdi/js'

export default {
  components: {
    SvgIcon
  },

  data () {
    return {
      mdiLoginVariant,
      mdiLogoutVariant,
      mdiAccountGroupOutline,
      mobileMenuOpen: false,
      items: [
        {
          title: 'Домой',
          icon: mdiHomeOutline,
          to: { name: 'index' }
        },
        {
          title: 'Команды',
          icon: mdiConsole,
          to: { name: 'commands' }
        },
        {
          title: 'Справка',
          icon: mdiFrequentlyAskedQuestions,
          to: { name: 'faq' }
        },
        {
          title: 'Статистика',
          icon: mdiChartLine,
          to: { name: 'stats' }
        },
        {
          title: 'Премиум',
          icon: mdiCurrencyUsd,
          to: { name: 'donate' }
        }
      ]
    }
  },

  head: {
    bodyAttrs: {
      class: 'has-navbar-fixed-top'
    }
  },

  mounted () {
    if (!this.$auth.$storage.getLocalStorage('cookieNotice')) {
      this.$buefy.snackbar.open({
        message: 'Продолжая использовать этот сайт, вы даете согласие на хранение файлов cookie, которые обеспечивают правильную работу сайта.',
        actionText: 'Согласен',
        indefinite: true,
        type: 'is-primary',
        onAction: () => {
          this.$auth.$storage.setLocalStorage('cookieNotice', true)
        }
      })
    }
  },

  methods: {
    itemClicked () {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style lang="scss">
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}
.menu-enter,
.menu-leave-to {
  transform: translate3d(0, 50px, 0);
  opacity: 0;
}

.navbar {
  backdrop-filter: blur(20px);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 40%), 0px 1px 0 0px rgb(30, 32, 37);
  // border-radius: 1rem;
}

.nuxt-link-exact-active {
  background: #3a3c469c;
}

.card.nuxt-link-exact-active {
  box-shadow: 0 0 0em 2px #2787f5;
}

#mainlogo {
  background: transparent;
}

.mobile-menu-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 10, 0.5);
  z-index: 2;
  display: flex;

  .mobile-menu-container {
    width: 100%;
    border-radius: 10px 10px 0 0;
    background: #272930;
    box-shadow: 0 -0.3em 1em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.1);

    .mobile-menu-account {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }

    .mobile-menu-items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 1rem;
    }
  }
}
</style>

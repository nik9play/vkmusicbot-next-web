<template>
  <div>
    <b-navbar fixed-top>
      <template #brand>
        <b-navbar-item id="mainlogo" tag="router-link" :to="{ path: '/' }">
          <img
            src="~/assets/VK Music Bot.svg"
            alt="VK Music Bot"
            width="120px"
          >
        </b-navbar-item>
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
      </template>
    </b-navbar>
    <!-- <div class="container pt-5"> -->
    <nuxt />
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Домой',
          to: { name: 'index' }
        },
        {
          title: 'Команды',
          to: { name: 'commands' }
        },
        {
          title: 'Справка',
          to: { name: 'faq' }
        },
        {
          title: 'Статистика',
          to: { name: 'stats' }
        },
        {
          title: 'Премиум',
          to: { name: 'donate' }
        }
      ]
    }
  },

  head: {
    bodyAttrs: {
      class: 'has-navbar-fixed-top'
    }
  }
}
</script>

<style lang="scss">
.navbar {
  backdrop-filter: blur(20px);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 20%);
}

.nuxt-link-exact-active {
  background: #3a3c469c;
}

#mainlogo {
  background: transparent;
}
</style>

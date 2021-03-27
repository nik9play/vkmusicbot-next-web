<template>
  <div class="container">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
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
        >
          {{ item.title }}
        </b-navbar-item>
        <!-- <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </b-navbar-item> -->
      </template>
    </b-navbar>
    <nuxt />
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
  }
}
</script>

<template>
  <div class="container">
    <div class="section content">
      <h2>Перенаправление...</h2>
      <p>Если вас не перенаправляет, <a :href="url">нажмите сюда</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ params }) {
    const id = params.id
    return { id }
  },

  head () {
    return {
      title: 'Пригласить — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Добавить бота к себе на сервер'
        }
      ]
    }
  },

  data () {
    return {
      url: 'https://discord.com/oauth2/authorize?client_id=721772274830540833&scope=bot&permissions=8'
    }
  },

  mounted () {
    if (this.id) {
      this.url += `&guild_id=${this.id}&disable_guild_select=true`
    }

    setTimeout(() => {
      location.href = this.url
    }, 1000)
  }
}
</script>

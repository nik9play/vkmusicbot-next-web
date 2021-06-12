<template>
  <div class="container">
    <section v-tilt="{ max: 1 }" class="p-6 is-align-items-center is-flex mt-6 card-main is-flex-direction-row is-justify-content-space-between mx-6">
      <div>
        <p class="is-size-2 has-text-weight-medium">VK Music Bot</p>
        <p class="is-size-4">Лучшее решение для прослушивания музыки из ВК в Discord.</p>
        <p class="is-size-4 mt-2">Бота используют уже <animated-numbers class="is-family-monospace" :value="currentServers" style="min-width: 1000px" /> серверов!</p>
      </div>
      <img class="center-img is-centered" src="~/assets/music.svg">
    </section>
    <section class="section is-align-items-center is-flex card-mobile-main is-flex-direction-column">
      <img class="center-img is-centered" src="~/assets/music.svg">
      <p class="is-size-2 has-text-weight-medium mt-4">VK Music Bot</p>
      <p class="is-size-4 has-text-centered">Лучшее решение для прослушивания музыки из ВК в Discord.</p>
    </section>
    <section class="buttons-container section">
      <nuxt-link
        to="/invite"
        class="button ripple-btn is-medium is-info mx-5 my-2"
        @mouseenter.native="rippleHover"
        @mouseleave.native="rippleLeave"
      >
        <span class="ripple-span" :style="rippleStyle" />
        <svg-icon type="mdi" :path="mdiAccountPlusOutline" class="mr-2" />
        <span>Пригласить</span>
      </nuxt-link>
      <a
        href="https://discord.com/invite/3ts2znePu7"
        class="button ripple-btn is-medium is-info mx-5 my-2"
        @mouseenter="rippleHover"
        @mouseleave="rippleLeave"
      >
        <span class="ripple-span" :style="rippleStyle" />
        <svg-icon type="mdi" :path="mdiDiscord" class="mr-2" />
        <span>Сервер Discord</span>
      </a>
      <a
        href="https://vk.com/vkmusicbotds"
        class="button ripple-btn is-primary is-medium mx-5 my-2"
        @mouseenter="rippleHover"
        @mouseleave="rippleLeave"
      >
        <span class="ripple-span" :style="rippleStyle" />
        <svg-icon type="mdi" :path="mdiVk" class="mr-2" />
        <span>Группа ВК</span>
      </a>
      <a
        href="https://github.com/nik9play/vk-music-bot"
        class="button ripple-btn is-black is-medium mx-5 my-2"
        @mouseenter="rippleHover"
        @mouseleave="rippleLeave"
      >
        <span class="ripple-span" :style="rippleStyle" />
        <svg-icon type="mdi" :path="mdiGithub" class="mr-2" />
        <span>GitHub</span>
      </a>
    </section>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiDiscord, mdiAccountPlusOutline, mdiVk, mdiGithub } from '@mdi/js'
import axios from 'axios'
import AnimatedNumbers from '~/components/AnimatedNumbers.vue'

export default {
  components: {
    AnimatedNumbers,
    SvgIcon
  },

  data () {
    return {
      rippleButtonStyles: {
        clip: 'circle(0.0% at 50% 50%)',
        clipHover: 'circle(141.7% at 50% 50%)'
      },
      rippleHovered: false,
      currentServers: 0,
      rippleBtnHover: false,
      mdiDiscord,
      mdiAccountPlusOutline,
      mdiVk,
      mdiGithub
    }
  },

  head () {
    return {
      title: 'VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Официальный сайт VK Music Bot — бота для дискорда, с помощью которого можно слушать музыку из ВК. Слушайте треки, плейлисты, аудиотеку пользователя. Включайте треки по ID.'
        }
      ]
    }
  },

  computed: {
    rippleStyle () {
      return {
        '--clip': this.rippleButtonStyles.clip,
        '--clip-hover': this.rippleButtonStyles.clipHover
      }
    }
  },

  mounted () {
    axios.get('https://vk-api-v2.megaworld.space/metrics/current')
      .then((res) => {
        this.currentServers = res.data[0].metrics.servers
      })
  },

  methods: {
    setRipple (e) {
      let x = e.offsetX / e.srcElement.clientWidth
      let y = e.offsetY / e.srcElement.clientHeight

      x = x < 0 ? 0 : x
      y = y < 0 ? 0 : y

      x = (x * 100).toFixed(1)
      y = (y * 100).toFixed(1)

      let fillPercent = Math.sqrt(e.srcElement.clientWidth * e.srcElement.clientWidth +
      e.srcElement.clientWidth * e.srcElement.clientWidth) / e.srcElement.clientWidth

      fillPercent = (fillPercent * 100).toFixed()

      this.rippleButtonStyles.clip = `circle(0.0% at ${x}% ${y}%)`
      this.rippleButtonStyles.clipHover = `circle(0.0% at ${x}% ${y}%)`

      setTimeout(() => {
        this.rippleButtonStyles.clipHover = `circle(${fillPercent}% at ${x}% ${y}%)`
      }, 50)
    },

    rippleHover (e) {
      if (!this.rippleHovered) {
        this.rippleHovered = true

        this.setRipple(e)
        // console.log(e)
      }
    },

    rippleLeave (e) {
      if (this.rippleHovered) {
        this.rippleHovered = false

        this.setRipple(e)
      }
    }
  }
}
</script>

<style lang="scss">
.js-tilt-glare {
  border-radius: 1rem;
}

.buttons-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 740px) {
    display: flex;
    flex-direction: column;
  }
}

@keyframes pulsate-fwd {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.center-img {
  max-width: 250px;
  animation: pulsate-fwd 0.6s ease-in-out infinite both;
}

.card-main {
  background: linear-gradient(90deg, rgba(109,164,246,1) 0%, rgba(56,108,192,1) 100%);
  border-radius: 1rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.1);
  display: flex!important;
  @media (max-width: 740px) {
    display: none!important;
  }
}

.card-mobile-main {
  img {
    width: 50%;
  }
  display: none!important;
  @media (max-width: 740px) {
    display: flex!important;
  }
}

.ripple-btn {
  transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: .05s;
  span {
    z-index: 1;
  }

  .ripple-span {
    // transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    // transition-delay: .5s;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    // clip-path: circle(0.0% at 100% 100%);
    clip-path: var(--clip);
    z-index: 0;
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgb(255 255 255);
  }

  &:hover {
    // transform: translateY(-3px);
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.1);

    &.is-info {
      color: #5865F2!important;;
    }

    &.is-primary {
      color: #2787f5!important;
    }

    &.is-black {
      color: black!important;
    }

    .ripple-span {
      // clip-path: circle(141.7% at 100% 100%);
      clip-path: var(--clip-hover);
    }
  }

  &:active {
    .ripple-span {
      background: rgb(238, 238, 238);
    }
  }
}
</style>

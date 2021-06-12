<template>
  <div class="card guild-card">
    <div class="card-content guild-card-content p-4">
      <figure class="image is-48x48">
        <img class="is-rounded" :src="iconImg" @error="setDefaultImg">
      </figure>
      <div class="has-text-weight-medium is-flex is-align-items-center" style="text-overflow: ellipsis; overflow: hidden;">{{ name }}</div>
      <a
        class="button p-0"
        style="height: 36px; margin-top: 6px"
        @click="cardClick"
      >
        <svg-icon type="mdi" size="16px" :path="mdiTuneVertical" />
      </a>
      <nuxt-link
        :to="`/invite/${guildId}`"
        class="button is-info p-0"
        style="height: 36px; margin-top: 6px"
      >
        <svg-icon type="mdi" size="16px" :path="mdiPlus" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiTuneVertical, mdiPlus } from '@mdi/js'

export default {
  components: {
    SvgIcon
  },

  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: '/discord-default.svg'
    },
    guildId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      mdiPlus,
      mdiTuneVertical
    }
  },

  computed: {
    iconImg () {
      return this.icon || '/discord-default.svg'
    }
  },

  methods: {
    setDefaultImg (event) {
      event.target.src = '/discord-default.svg'
    },

    cardClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.guild-card-content {
  display: grid;
  grid-template-columns: 48px 1fr 36px 36px;
  grid-column-gap: .5rem;
}
</style>

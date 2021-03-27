<!-- eslint-disable vue/no-v-html -->
<template>
  <b-collapse
    class="card"
    animation="slide"
    :open="isOpen == index"
    @open="isOpen = index"
  >
    <template #trigger="props">
      <div
        class="card-header"
        role="button"
      >
        <p class="card-header-title">
          {{ name }}
        </p>
        <a class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-down' : 'menu-up'"
          />
        </a>
      </div>
    </template>
    <div :id="id" class="card mb-3" :class="{ premium: premium }">
      <div class="card-content">
        <p class="title is-5">
          <nuxt-link :to="{ path: '', hash: id }">
            #
          </nuxt-link> {{ name }}
        </p>
        <p v-if="use" class="subtitle is-6 command-use">
          {{ use }}
        </p>

        <div class="content">
          <div v-html="description" />
        </div>
      </div>
    </div>
  </b-collapse>
</template>

<script>
import { slugify } from 'transliteration'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    use: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    examples: {
      type: Array,
      required: false,
      default: new Array(0)
    },
    premium: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    id () {
      return slugify(this.name)
    }
  }
}
</script>

<style lang="scss">
.command-use {
  font-family: monospace
}

.premium {
  //border: 3px solid #e4af47;
  box-shadow: inset 0px 0px 0px 3px #e4af47;
}
</style>

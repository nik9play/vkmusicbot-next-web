<template>
  <div class="container">
    <section v-if="!$device.isMobile" v-tilt="{ max: 5, glare: true, 'max-glare': .3 }" class="section is-align-items-center is-flex mt-6 card-main is-flex-direction-column mx-6">
      <img class="center-img is-centered" src="~/assets/music.svg">
      <p class="is-size-2 has-text-weight-medium mt-4">VK Music Bot</p>
      <p class="is-size-4 has-text-centered">Лучшее решение для прослушивания музыки из ВК в Discord.</p>
    </section>
    <section v-if="$device.isMobile" class="section is-align-items-center is-flex card-mobile-main is-flex-direction-column">
      <img class="center-img is-centered" src="~/assets/music.svg">
      <p class="is-size-2 has-text-weight-medium mt-4">VK Music Bot</p>
      <p class="is-size-4 has-text-centered">Лучшее решение для прослушивания музыки из ВК в Discord.</p>
    </section>
    <section class="buttons-container section">
      <a href="https://discord.com" class="button is-info is-rounded is-large mx-5 my-2" icon-left="discord">
        <b-icon
          icon="discord"
          size="is-small"
        />
        <span>Пригласить</span>
      </a>
      <a href="https://discord.com" class="button is-warning is-rounded is-large mx-5 my-2" icon-left="discord">
        <b-icon
          icon="cash"
          size="is-small"
        />
        <span>Купить Премиум</span>
      </a>
      <a href="https://discord.com" class="button is-black is-rounded is-large mx-5 my-2" icon-left="github">
        <b-icon
          icon="github"
          size="is-small"
        />
        <span>GitHub</span>
      </a>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.js-tilt-glare {
  border-radius: 1rem;
}

.buttons-container {
  display: flex;
  justify-content: center;

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
  max-width: 300px;
  animation: pulsate-fwd 0.6s ease-in-out infinite both;
}

.card-main {
  background: linear-gradient(90deg, rgba(109,164,246,1) 0%, rgba(56,108,192,1) 100%);
  border-radius: 1rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.1);
}

.card-mobile-main {
  img {
    width: 50%;
  }
}
</style>

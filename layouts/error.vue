<template>
  <section class="section">
    <h1 v-if="error.statusCode === 404">Страница не найдена
    </h1>
    <h1 v-else>
      Произошла ошибка
    </h1>
  </section>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  props: ['error']
}
</script>

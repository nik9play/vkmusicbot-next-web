<template>
  <div class="container content">
    <section class="section">
      <p class="is-size-3 mb-4">Премиум</p>
      <div class="columns">
        <div class="column">
          <div class="card premium-card">
            <div class="card-content">
              <div class="content">
                <p class="is-size-4 has-text-weight-bold has-text-centered">
                  <!-- <svg-icon type="mdi" :size="32" :path="mdiStar" /> -->
                  Премиум статус для сервера
                </p>
                <p><svg-icon style="vertical-align: bottom;" type="mdi" :size="24" :path="mdiCheckCircleOutline" /> Режим 24/7 (<code>{{ prefix }}24/7</code>)</p>
                <p><svg-icon style="vertical-align: bottom;" type="mdi" :size="24" :path="mdiCheckCircleOutline" /> Ограничение очереди в 20к, а не в 200</p>
                <p><svg-icon style="vertical-align: bottom;" type="mdi" :size="24" :path="mdiCheckCircleOutline" /> Перемешивание очереди (<code>{{ prefix }}sh</code>)</p>
                <p><svg-icon style="vertical-align: bottom;" type="mdi" :size="24" :path="mdiCheckCircleOutline" /> Бас буст (<code>{{ prefix }}bass</code>)</p>
                <p class="is-family-monospace is-size-3 has-text-centered">
                  15₽<span class="is-size-5"> за сервер/навсегда</span>
                </p>
                <a href="https://vk.com/vkmusicbotds?w=app6887721_-197274096" class="button is-medium is-primary is-block">Купить</a>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-three-fifths">
          <h3 class="">Инструкция по покупке:</h3>
          <ol>
            <li>Нажмите кнопку "Купить"</li>
            <li>Нажмите кнопку "Поддержать"</li>
            <li>Введите любую сумму не меньше 15 руб.</li>
            <li>Введите ID сервера в комментарий к переводу</li>
            <dt>ID можно узнать при помощи команды <code>{{ prefix }}donate</code>. Вам необходимо ввести <strong>только</strong> ID, то есть например число <code>399272316099493908</code> без точек и других символов.</dt>
            <li>Оплатите любым удобным способом</li>
            <li>Через пару минут Премиум станет доступен на сервере</li>
          </ol>
          <article class="message is-success">
            <div class="message-body">
              Премиум выдаётся навсегда.
            </div>
          </article>
          <article class="message is-warning">
            <div class="message-body">
              Если что-то пошло не так, можно написать в сообщения <a href="https://vk.com/vkmusicbotds">группы ВК</a> бота.
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiCheckCircleOutline } from '@mdi/js'

export default {
  components: {
    SvgIcon
  },

  data () {
    return {
      prefix: '-v',
      mdiCheckCircleOutline
    }
  },

  head () {
    return {
      title: 'Донат — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Информация о донате для VK Music Bot. Задонать 15 руб. — и получи Премиум для сервера!'
        }
      ]
    }
  },

  mounted () {
    const newPrefix = this.$auth.$storage.getLocalStorage('prefix')

    if (newPrefix) {
      this.prefix = newPrefix
    }
  }
}
</script>

<style lang="scss">
.premium-card {
  // background: linear-gradient(45deg, rgb(56, 182, 214) 0%, rgba(33,94,222,1) 100%);
  // border: 5px solid transparent;
  // border-image: linear-gradient(45deg, rgb(56, 182, 214) 0%, rgba(33,94,222,1) 100%);
  // border-image-slice: 1;
  // border-radius: 10px;

  position: relative;
  box-sizing: border-box;

  $borderC: 8px;
  color: #FFF;
  background: #212227;
  background-clip: padding-box; /* !importanté */
  border: solid $borderC transparent; /* !importanté */
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -2;
    margin: -$borderC; /* !importanté */
    border-radius: inherit; /* !importanté */
    background: linear-gradient(45deg, rgb(67, 201, 235) 0%, rgb(24, 84, 214) 100%);
  }
}

code {
  background: #32343d52;
}
</style>

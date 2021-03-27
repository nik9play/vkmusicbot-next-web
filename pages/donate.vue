<template>
  <div class="container content">
    <section class="section">
      <p class="is-size-3 mb-4">Премиум</p>
      <div class="columns">
        <div class="column">
          <div v-tilt="{ max: 5, glare: true, 'max-glare': .3 }" class="card premium-card">
            <div class="card-content">
              <div class="content">
                <p class="is-size-4 has-text-weight-bold">
                  <b-icon
                    icon="star"
                    class="mr-3"
                  /> Премиум статус для сервера</p>
                <ul>
                  <li>Режим 24/7 (<code>-v24/7</code>)</li>
                  <li>Ограничение очереди в 20к, а не в 200</li>
                  <li>Перемешивание очереди (<code>-vsh</code>)</li>
                  <li>Бас буст (<code>-vbass</code>)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-three-fifths">
          <h3 class="">Инструкция по покупке:</h3>
          <ol class="">
            <li>Нажмите кнопку "Купить"</li>
            <li>Нажмите кнопку "Поддержать"</li>
            <li>Введите любую сумму не меньше 15 руб.</li>
            <li>Введите ID сервера в комментарий к переводу</li>
            <dt>ID можно узнать при помощи команды <code>-vdonate</code>. Вам необходимо ввести <strong>только</strong> ID, то есть например число <code>399272316099493908</code> без точек и других символов.</dt>
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
export default {
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
  }
}
</script>

<style lang="scss">
.premium-card {
  background: linear-gradient(45deg, rgb(56, 182, 214) 0%, rgba(33,94,222,1) 100%);
}

code {
  background: #32343d52;
}
</style>

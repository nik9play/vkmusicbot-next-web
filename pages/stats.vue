<template>
  <div class="container">
    <section class="section">
      <p class="is-size-3 mb-5">Статистика</p>

      <div v-if="loaded" class="columns content">
        <div class="column has-text-centered">
          <h4>Количество серверов: {{ currentServers }}</h4>
        </div>
        <div class="column has-text-centered">
          <h4>Количество шардов: {{ currentShards }}</h4>
        </div>
      </div>

      <client-only>
        <iframe
          id="metrics-servers"
          title="Server metrics"
          src="https://metrics.megaworld.space/d-solo/Ethw2e3Gz/vk-api?orgId=1&from=now-30d&to=now&refresh=5m&panelId=2"
          frameborder="0"
        />

        <!-- <Apexcharts v-if="loaded" :options="chartOptions" :series="seriesMain" height="450" /> -->
        <!-- <Apexcharts v-if="loaded" :options="chartOptions" :series="seriesShards" height="700" /> -->
        <!-- <div v-if="!loaded" class="columns">
          <div class="column"><b-skeleton height="50px" width="100%" /></div>
          <div class="column"><b-skeleton height="50px" width="100%" /></div>
        </div>

        <b-skeleton v-if="!loaded" height="450px" /> -->
        <!-- <b-skeleton v-if="!loaded" height="700px" /> -->
      </client-only>

      <!-- <apexchart :options="chartOptions" :series="seriesShards" height="400" /> -->
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { DateTime } from 'luxon'
import ru from '~/node_modules/apexcharts/dist/locales/ru.json'

export default {
  data () {
    return {
      loaded: false,
      seriesMain: [{
        name: 'Количество серверов',
        data: [{ x: 1, y: 'Загрузка' }]
      }],
      seriesShards: [],
      currentShard: {},
      chartOptions: {
        stroke: {
          show: true,
          curve: 'straight',
          lineCap: 'round',
          width: 3,
          dashArray: 0
        },
        theme: {
          mode: 'dark'
        },
        chart: {
          animations: {
            enabled: false
          },
          locales: [ru],
          defaultLocale: 'ru',
          type: 'line',
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: false
          },
          toolbar: {
            autoSelected: 'zoom'
          },
          background: 'transparent',
          fontFamily: 'Inter'
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0
        },
        tooltip: {
          style: {
            fontSize: '12px',
            fontFamily: 'Inter'
          },
          x: {
            formatter (val, timestamp) {
              const dt = DateTime.fromMillis(val)
              return dt.toLocaleString(DateTime.DATETIME_FULL)
            }
          }

        },
        yaxis: {
          title: {
            text: 'Количество серверов'
          }
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 10,
          labels: {
            rotate: -45,
            rotateAlways: true,
            formatter (val, timestamp) {
              const dt = DateTime.fromMillis(timestamp)
              return dt.toLocaleString(DateTime.DATE_SHORT)
            }
          },
          tooltip: {
            enabled: false
          }
          // labels: {
          //   datetimeFormatter: {
          //     year: 'yyyy',
          //     month: 'MMM \'yy',
          //     day: 'dd MMM',
          //     hour: 'HH:mm'
          //   }
          // }
        }
      }
    }
  },

  head () {
    return {
      title: 'Статистика — VK Music Bot',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Статистика бота в виде графиков.'
        }
      ]
    }
  },

  computed: {
    currentServers () {
      const arr = this.seriesMain[0].data
      return arr[arr.length - 1].y
    },
    currentShards () {
      return this.seriesShards.length
    }
  },

  mounted () {
    this.fillData()
  },

  methods: {
    fillData () {
      this.loaded = false
      axios.get('https://vk-api-v2.megaworld.space/metrics')
        .then((res) => {
          const dataMain = res.data.map((e) => {
            return {
              x: new Date(e.timestamp).getTime(),
              y: e.metrics.servers
            }
          })

          res.data.forEach((e) => {
            e.metrics.serverShards.forEach((m, i) => {
              if (!this.seriesShards[i]) {
                this.seriesShards[i] = { name: `Шард ${i}`, data: [] }
              }

              this.seriesShards[i].data.push({ x: new Date(e.timestamp).getTime(), y: m })
            })
          })

          this.seriesMain = [{ name: 'Количество серверов', data: dataMain }]
          this.loaded = true
        })
    }
  }
}
</script>

<style lang="scss">
#metrics-servers {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.3), 0 0px 0 1px rgba(10, 10, 10, 0.1);
}
</style>

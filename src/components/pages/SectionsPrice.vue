<template>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div v-if="error">
          Ошибка, получения данных
        </div>
        <div class="box box-info" v-else>
          <!-- Input Addons -->
          <div v-if="response">
            <div class="box-header with-border">
              <h3 class="box-title">{{response.name}}</h3>              
            </div>
          </div>
          <div class="box-body no-padding">
            <div v-if="error">
                The list of users is empty
            </div>
          </div>
          <table class="table table-striped table-hover" v-if="response">
              <tbody>
                <tr>
                  <th class="timeHead">Время</th>
                  <th class="timeHead" v-if="response" v-for="tariffItem in response.tariffs">{{tariffItem}}</th>
                </tr>
                <tr>
                <th>
                  <div class="time colPrice">с 00 до 01</div>
                  <div class="time colPrice">с 01 до 02</div>
                  <div class="time colPrice">с 02 до 03</div>
                  <div class="time colPrice">с 03 до 04</div>
                  <div class="time colPrice">с 04 до 05</div>
                  <div class="time colPrice">с 05 до 06</div>
                  <div class="time colPrice">с 06 до 07</div>
                  <div class="time colPrice">с 07 до 08</div>
                  <div class="time colPrice">с 08 до 09</div>
                  <div class="time colPrice">с 09 до 10</div>
                  <div class="time colPrice">с 10 до 11</div>
                  <div class="time colPrice">с 11 до 12</div>
                  <div class="time colPrice">с 12 до 13</div>
                  <div class="time colPrice">с 13 до 14</div>
                  <div class="time colPrice">с 14 до 15</div>
                  <div class="time colPrice">с 15 до 16</div>
                  <div class="time colPrice">с 16 до 17</div>
                  <div class="time colPrice">с 17 до 18</div>
                  <div class="time colPrice">с 18 до 19</div>
                  <div class="time colPrice">с 19 до 20</div>
                  <div class="time colPrice">с 20 до 21</div>
                  <div class="time colPrice">с 21 до 22</div>
                  <div class="time colPrice">с 22 до 23</div>
                  <div class="time colPrice">с 23 до 00</div>
                </th>

                <th v-if="response" v-for="section in response.prices">
                  <div class="colPrice" v-for="item in section"><input type="text" class="form-control" :value="item"></div>
                </th>
                </tr>
            </tbody>
          </table>
            <div class="priceBtn">
              <button v-on:click="saveSection()" class="btn bg-green">Сохранить данные</button>
              <a v-on:click="backBtn" class="btn bg-red">Отменить</a>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import $ from 'jquery'
import swal from 'sweetalert2'
export default {
  name: 'Repository',
  data: function () {
    return {
      getSections: '/sectionprices/',
      idPage: this.$route.params.id,
      response: null,
      prices: null,
      error: null
    }
  },
  components: {},
  methods: {
    callSections: function () {
      var section = this
      this.$parent.callAPI('GET', this.getSections + this.idPage).then(function (response) {
        console.log('getUsers Response:', response)
        if (response.status !== 200) {
          console.log('getUsers Response:', response)
          section.error = response.statusText
          return
        }
        section.response = response.data
        section.prices = response.data.prices
      }, function (response) {
        // Request failed.
        console.log('error', response)
        section.error = response.statusText
      })
    },
    saveSection: function () {
      console.log(this.prices)
      this.$parent.callAPI('PUT', this.getSections + this.idPage, this.response.prices).then(function (res) {
        console.log('Data put:', res)
        // this.$router.go(-1)
        swal('Данные сохранены', 'Нажмите для продолжения!', 'success')
        if (res.status !== 200) {
          this.error = res.statusText
          return
        }
      })
    },
    backBtn: function () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.callSections()
  }
}
</script>
<style lang="less">
.tariffs{
  padding: 20px;
}
.colPrice{
  height: 50px;
  padding: 20px;
  padding-top: 0;
}
.priceBtn{
  padding: 20px;
  padding-top: 10px;
}
.timeHead{
  padding-left: 25px!important;
}
</style>
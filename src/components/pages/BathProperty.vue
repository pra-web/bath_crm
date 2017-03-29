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

            <div class="box-body">
                    <div class="input-group ">
                      <span class="input-group-addon">ОГРН</span>
                      <input class="form-control" placeholder="ОГРН" type="text" v-model:value="response.ogrn">
                    </div>
                    <br/>

                    <div class="input-group ">
                      <span class="input-group-addon">ИНН</span>
                      <input class="form-control" placeholder="ИНН" type="text" v-model:value="response.inn">
                    </div>
                    <br/>
                    <div class="input-group ">
                      <span class="input-group-addon">КПП</span>
                      <input class="form-control" placeholder="КПП" type="text" v-model:value="response.kpp">
                    </div>
                    <br/>
                    <div class="input-group ">
                      <span class="input-group-addon">БИК</span>
                      <input class="form-control" placeholder="БИК" type="text" v-model:value="response.bik">
                    </div>
                    <br/>
                    <div class="input-group ">
                      <span class="input-group-addon">Расс. счет</span>
                      <input class="form-control" placeholder="рс" type="text" v-model:value="response.rs">
                    </div>
                    <br/>
                    <div class="input-group ">
                      <span class="input-group-addon">Корр. счет</span>
                      <input class="form-control" placeholder="рс" type="text" v-model:value="response.ks">
                    </div>
                    <br/>

                    <div class="input-group ">
                      <span class="input-group-addon">Юр. адрес</span>
                      <input class="form-control" placeholder="рс" type="text" v-model:value="response.registred_office">
                    </div>
                    <br/>

                    <div class="input-group ">
                      <span class="input-group-addon">Почтовый адрес</span>
                      <input class="form-control" placeholder="рс" type="text" v-model:value="response.postal_address">
                    </div>
                    <br/>

                <br/>
                <button v-on:click="saveBathProperty()" class="btn bg-green">Сохранить</button>
                <a v-on:click="backBtn" class="btn bg-red">Назад</a>
            </div>
            <!-- /input-group -->


          <!-- /.box-body -->
        </div>
      </div>
    </div>
    </div>
  </section>
</template>
<script>
import swal from 'sweetalert2'
export default {
  name: 'Repository',
  data: function () {
    return {
      getBathProperty: '/bathproperty',
      response: null,
      error: null
    }
  },
  methods: {
    callBathProperty: function () {
      var user = this
      this.$parent.callAPI('GET', this.getBathProperty).then(function (response) {
        console.log('getMe Response:', response)

        if (response.status !== 200) {
          user.error = response.statusText
          return
        }

        user.response = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    saveBathProperty: function () {
      console.log('Data put:', this.response)
      this.$parent.callAPI('PUT', this.getBathProperty, this.response).then(function (res) {
        console.log('Data put:', res)
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
    this.callBathProperty()
  }
}
</script>
<style>
  .datetime-picker input {
    height: 4em !important;
  }
</style>

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
              <h3 class="box-title">Данные пользователя {{response.username}}</h3>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-xs-10">
                    <div class="input-group ">
                      <span class="input-group-addon"><i class="fa fa-address-book"></i></span>
                      <input class="form-control" placeholder="ФИО" type="text" v-model:value="response.name">
                    </div>
                  </div>
                  <div class="col-xs-2">
                    <div class="input-group">
                      <span class="input-group-addon">ID</span>
                      <input class="form-control" placeholder="ФИО" type="text" v-bind:value="response.id" disabled>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input class="form-control" placeholder="Логин" type="text" v-model:value="response.username">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                  <input class="form-control" placeholder="Дата рождения" type="text" v-model:value="response.birthday">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-phone-square"></i></span>
                  <input class="form-control" placeholder="Телефон" type="phone" v-model:value="response.phone">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                  <input class="form-control" placeholder="E-mail" type="email" v-model:value="response.email">
                </div>
                <br/>
                <button v-on:click="saveContact()" class="btn bg-green">Сохранить</button>
                <a v-on:click="backBtn" class="btn bg-red">Назад</a>
            </div>
            <!-- /input-group -->
          </div>
          <!-- /.box-body -->
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
      getUsers: '/users/',
      response: null,
      error: null
    }
  },
  methods: {
    callUsers: function () {
      var user = this
      var itemId = this.$route.params.id
      this.$parent.callAPI('GET', this.getUsers + itemId).then(function (response) {
        console.log('getUsers Response:', response)

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
    saveContact: function () {
      var itemId = this.$route.params.id
      this.$parent.callAPI('PUT', this.getUsers + itemId, this.response).then(function (res) {
        console.log('Data put:', res)
        this.$router.go(-1)
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
    this.callUsers()
  }
}
</script>
<style>
  .datetime-picker input {
    height: 4em !important;
  }
</style>

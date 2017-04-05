<template>
  <section class="content">
    <div class="row center-block">
      <button class="btn bg-green addNewBtn" v-on:click="addAdmin()">Добавить нового администратора</button>
      <div class="col-md-12">
        <div class="row">
            <div class="box">
            <div class="box-body no-padding">
                <div v-if="error">
                    Список пуст
                </div>
                <table class="table table-striped table-hover" v-else>
                <tbody>
                    <tr>
                    <th style="width: 12px">ID</th>
                    <th>ФИО</th>
                    <th>Логин</th>
                    <th>Дата рождения</th>
                    <th>Телефон</th>
                    <th>E-mail</th>
                    <th></th>
                    <th></th>
                    </tr>
                    <tr v-if="response" v-for="user in response">
                    <td><b>{{user.id}}</b></td>
                    <td>{{user.surname}} {{user.name}} {{user.fathername}}</td>
                    <td>{{user.displayName}}</td>
                    <td>{{user.birthday}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.email}}</td>
                    <td style="text-align: right;">
                        <router-link v-bind:to="'/admins/' + user.id" class="btn bg-green" ><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
                        <button class="btn bg-red" v-on:click="deletePost(user)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </td>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from 'jquery'
import swal from 'sweetalert2'
export default {
  name: 'Repository',
  data: function () {
    return {
      getUsers: '/users',
      response: null,
      error: null,
      urlServer: this.$parent.state.serverURI
    }
  },
  methods: {
    callUsers: function () {
      var user = this
      this.$parent.callAPI('GET', this.getUsers).then(function (response) {
        console.log('getUsers Response:', response)
        if (response.status !== 200) {
          console.log('getUsers Response:', response)
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
    deletePost: function (user) {
      var deleteUser = this.response
      var parent = this.$parent
      var urlUser = this.getUsers
      swal({
        title: 'Вы уверены?',
        text: 'Вы не сможете восстановить данные!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Нет',
        closeOnConfirm: false
      }).then(function () {
        deleteUser.splice(deleteUser.indexOf(user), 1)
        parent.callAPI('DELETE', urlUser + '/' + user.id).then(function (res) {
          swal(
            'Удален!',
            'Пользователь успешно удален',
            'success'
          )
          if (res.status !== 200) {
            this.error = res.statusText
            return
          }
        })
      })
    },
    addAdmin: function () {
      var parent = this.$parent
      var urlUser = this.getUsers
      // var itemId = this.$route.params.id
      swal({
        title: 'Добавить администратора',
        showCancelButton: true,
        cancelButtonText: 'Отмена',
        cancelButtonClass: 'btn bg-red',
        confirmButtonClass: 'btn bg-green',
        confirmButtonText: 'Создать',
        showLoaderOnConfirm: true,
        customClass: 'mySwalModal',
        html:
          '<input id="swal-input1" placeholder="E-mail" type="email" class="swal2-input mySwal">' +
          '<input id="swal-input2" placeholder="Пароль" type="password" class="swal2-input mySwal">',
        preConfirm: function (userAdd) {
          return new Promise(function (resolve) {
            resolve([
              $('#swal-input1').val(),
              $('#swal-input2').val()
            ])
            var email = $('#swal-input1').val()
            var password = $('#swal-input2').val()
            var outUser = JSON.stringify({email: email, password: password})
            parent.callAPI('POST', urlUser, outUser).then(function (res) {
              console.log(urlUser + '/' + res.body)
              if (res.status !== 200) {
                this.error = res.statusText
                console.log('error')
                return
              } else {
                this.$router.push('admins/' + res.body)
                swal(
                  'Добавлен!',
                  'Пользователь успешно добавлен',
                  'success'
                )
              }
            })
          })
        }
      }).then(function (result) {
        console.log(this.error)
        swal('Данные сохранены', 'Нажмите для продолжения!', 'success')
        if (result[1].length < 5) {
          swal(
            'Ошибка!',
            'Пароль меньше 5 символов',
            'error'
          )
        }
      }).catch(swal.noop)
    }
  },
  mounted: function () {
    this.callUsers()
  }
}
</script>
<style lang="less">
    .title-users{
        margin-left: 15px;
    }
    .addNewBtn{
      margin-top: -40px;
      z-index: 1;
      position: relative;
      margin-bottom: 15px;
      float: right;
    }
    .swal2-input{
      color: #595959;
      font-weight: 400;
      &:focus{
        border-color: #3c8dbc;
      }
      &::-webkit-input-placeholder{
        color: #595959!important;
      }
    }
    .mySwalModal{
      .mySwal{
        height: 60px!important;
        margin-bottom: 10px!important;
      }
      .swal2-spacer{
        margin: 0!important;
      }
      .btn.swal2-styled{
        margin-top: 5px!important;
      }
    }
</style>

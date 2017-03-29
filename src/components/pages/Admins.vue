<template>
  <section class="content">
    <div class="row center-block">
      <!--<h2 class="title-users">List of Users</h2>-->
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
                    <td>{{user.name}}</td>
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
// import swal from 'sweetalert'
export default {
  name: 'Repository',
  data: function () {
    return {
      getUsers: '/users',
      response: null,
      error: null
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
      this.response.splice(this.response.indexOf(user), 1)
      // this.$http.delete('http://localhost:3000/users/' + user.id)
      // console.log(user.id)
      // swal({
      //   title: 'Are you sure?',
      //   text: 'You will not be able to recover this imaginary file!',
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#DD6B55',
      //   confirmButtonText: 'Yes, delete it!',
      //   closeOnConfirm: false
      // },
      //   function () {
      //   swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
      //   })
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
</style>

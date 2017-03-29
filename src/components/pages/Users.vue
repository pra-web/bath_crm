<template>
  <section class="content">
    <div class="row center-block">
      <h2 class="title-users">List of Users</h2>
      <div class="col-md-12">
        <div class="box">
          <div class="box-body no-padding">
            <div v-if="error">
                The list of users is empty
            </div>
            <table class="table table-striped" v-else>
              <tbody>
                <tr>
                  <th style="width: 15px">#</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th style="width: 35px">Edit</th>
                  <th style="width: 35px">Delete</th>
                </tr>
                <tr v-if="response" v-for="user in response">
                  <td><b>{{user.id}}</b></td>
                  <td>{{user.name}}</td>
                  <td>{{user.username}}</td>
                  <td><button class="btn bg-green">Edit</button></td>
                  <td><button class="btn bg-red">delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Repository',
  data: function () {
    return {
      getUsers: 'http://localhost:3000/users',
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
          user.error = response.statusText
          return
        }

        user.response = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
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

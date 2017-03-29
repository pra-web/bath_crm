<template>
  <section class="content">
    <div class="row center-block">
      <!--<h2 class="title-users">List of Users</h2>-->
      <div class="col-md-12">
        <div class="row">
            <div class="box">
            <div class="box-body no-padding">
                <div v-if="error">
                    The list of users is empty
                </div>
                <table class="table table-striped table-hover" v-else>
                <tbody>
                    <tr>
                    <th style="width: 12px">ID</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Текущая цена</th>
                    <th>Вместимость</th>
                    <th>Свободно</th>
                    <th></th>
                    <th></th>
                    </tr>
                    <tr v-if="response" v-for="section in response">
                    <td><b>{{section.id}}</b></td>
                    <td>{{section.name}}</td>
                    <td>{{section.sectionType.name}}</td>
                    <td>{{section.price}}</td>
                    <td>{{section.capacity}}</td>
                    <td>
                    <i class="fa fa-check" aria-hidden="true" v-if="section.free == 1"></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                    </td>
                    <td style="text-align: right;">
                        <router-link v-bind:to="'/sections/' + section.id" class="btn bg-blue" ><i class="fa fa-calendar-o" aria-hidden="true"></i></router-link>
                    </td>
                    <td style="text-align: right;">
                        <router-link v-bind:to="'/sections/' + section.id" class="btn bg-green" ><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
                    </td>
                    <td style="text-align: right;"><button class="btn bg-red" v-on:click="deletePost(section)"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
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
      getSections: '/sections',
      response: null,
      error: null
    }
  },
  methods: {
    callSections: function () {
      var section = this
      this.$parent.callAPI('GET', this.getSections).then(function (response) {
        console.log('getUsers Response:', response)
        if (response.status !== 200) {
          console.log('getUsers Response:', response)
          section.error = response.statusText
          return
        }

        section.response = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        section.error = response.statusText
      })
    },
    deletePost: function (section) {
      this.response.splice(this.response.indexOf(section), 1)
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
    this.callSections()
  }
}
</script>
<style lang="less">
    .title-users{
        margin-left: 15px;
    }
</style>

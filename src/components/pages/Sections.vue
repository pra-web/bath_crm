<template>
  <section class="content">
    <div class="row center-block">
      <button class="btn bg-green addNewBtn" v-on:click="addSection()">Добавить новое отделение</button>
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
                        <router-link v-bind:to="getSections + '/' + section.id + '/calendar'"  class="btn bg-blue" ><i class="fa fa-calendar-o" aria-hidden="true"></i></router-link>
                    </td>
                    <td style="text-align: right;">
                        <router-link v-bind:to="getSections + '/' + section.id" class="btn bg-green" ><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
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
import $ from 'jquery'
import swal from 'sweetalert2'
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
    },
    addSection: function () {
      var parent = this.$parent
      var getSections = this.getSections
      // var itemId = this.$route.params.id
      swal({
        title: 'Добавить новое отделение',
        showCancelButton: true,
        cancelButtonText: 'Отмена',
        confirmButtonText: 'Добавить',
        cancelButtonClass: 'btn bg-red',
        confirmButtonClass: 'btn bg-green',
        customClass: 'mySwalModal',
        showLoaderOnConfirm: true,
        html:
          '<input id="swal-input1" placeholder="Название" type="text" class="swal2-input">',
        preConfirm: function () {
          return new Promise(function (resolve) {
            resolve([
              $('#swal-input1').val()
            ])
            var title = $('#swal-input1').val()
            var outTitle = JSON.stringify({title: title})
            parent.callAPI('POST', getSections, outTitle).then(function (res) {
              console.log(getSections + '/' + res.body)
              if (res.status !== 200) {
                this.error = res.statusText
                console.log('error')
                return
              } else {
                this.$router.push('sections/' + res.body)
                swal(
                  'Добавлено!',
                  'Отделение успешно добавлено',
                  'success'
                )
              }
            })
          })
        }
      }).then(function (result) {
        console.log(this.error)
        swal('Данные сохранены', 'Нажмите для продолжения!', 'success')
        if (result[0].length < 3) {
          swal(
            'Ошибка!',
            'В Название меньше 3 символов',
            'error'
          )
        }
      }).catch(swal.noop)
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

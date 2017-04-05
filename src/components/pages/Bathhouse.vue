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
            <div class="row">
            <div class="col-md-3">
              <div class="photoUser">
                <img :src="urlImage + response.image" alt="" class="img-responsive">
                <button class="btn btn-default" v-on:click="uploadPhoto()">Загрузить новое изображение</button>
              </div>
              <div class="otherOption">
                <a v-on:click="propertyBtn" class="btn bg-blue">Банковские реквизиты</a>
                <a v-on:click="galleryBtn" class="btn bg-blue">Галерея</a>
              </div>
            </div>
              <div class="col-md-9">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-building"></i></span>
                  <input class="form-control" placeholder="Название бани" type="text" v-model:value="response.title">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-address-card-o"></i></span>
                  <textarea class="form-control" placeholder="Описание бани" type="text" v-model="response.description">
                  </textarea>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-map-signs"></i></span>
                  <input class="form-control" placeholder="Адрес" type="text" v-model:value="response.address">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                  <input class="form-control" placeholder="Телефон" type="text" v-model:value="response.phone">
                </div>
                  <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                  <input class="form-control" placeholder="Email" type="text" v-model:value="response.email">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-safari"></i></span>
                  <input class="form-control" placeholder="Сайт" type="text" v-model:value="response.site">
                </div>
                <br/>
                <div class="row">
                  <div class="col-lg-4">
                    <input type="checkbox" id="wificheckbox"  v-model="response.wifi">
                    <label for="wificheckbox">Wi-Fi</label>
                  </div>
                  <div class="col-lg-4">
                    <input type="checkbox" id="parkingcheckbox"  v-model="response.parking">
                    <label for="parkingcheckbox">Парковка</label>
                  </div>
                  <div class="col-lg-4">
                    <input type="checkbox" id="soapSuppliescheckbox"  v-model="response.soapSupplies">
                    <label for="soapSuppliescheckbox">Мыльные принадлежности</label>
                  </div>
                </div>
                <br/>
                <button v-on:click="saveBathhouse()" class="btn bg-green">Сохранить</button>
                <a v-on:click="backBtn" class="btn bg-red">Назад</a>
              </div>
            </div>
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
import $ from 'jquery'
import swal from 'sweetalert2'
import Dropzone from 'dropzone'
export default {
  name: 'Repository',
  data: function () {
    return {
      getBathhouse: '/bathhouse',
      response: null,
      error: null,
      urlImage: 'https://online-bani.ru/assets/data/gallery',
      id: null
    }
  },
  methods: {
    callBathhouse: function () {
      var user = this
      this.$parent.callAPI('GET', this.getBathhouse).then(function (response) {
        console.log('getMe Response:', response)
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.response = response.data
        user.id = response.data.gallery_id
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    uploadPhoto: function () {
      var token = this.$store.state.token
      var urlBath = this.getBathhouse
      var reload = this.callBathhouse
      var server = this.$store.state.serverURI
      swal({
        title: 'Загрузить изображение',
        html: '<div class="uploadBlock"><div id="uploadGallery"></div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>',
        confirmButtonText: 'Закрыть',
        onOpen: function () {
          $(function () {
            var myDropzone = new Dropzone('#uploadGallery', {
              url: server + urlBath,
              maxFiles: 1,
              acceptedFiles: '.jpg,.png,.jpeg,.gif',
              maxFilesize: 1.5,
              headers: {
                'Authorization': token
              }
            })
            document.getElementById('uploadGallery').className = 'dropzone dz-clickable'
            myDropzone.on('complete', function () { reload() })
          })
        },
        onClose: function () {
          reload()
        }
      })
    },
    saveBathhouse: function () {
      console.log('Data put:', this.response)
      this.$parent.callAPI('PUT', this.getBathhouse, this.response).then(function (res) {
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
    },
    propertyBtn: function () {
      this.$router.push('/bathproperty')
    },
    galleryBtn: function () {
      this.$router.push('/gallery/' + this.id)
    }
  },
  mounted: function () {
    this.callBathhouse()
  }
}
</script>
<style lang="less">
  .datetime-picker input {
    height: 4em !important;
  }
  .otherOption{
    .btn{
      width: 100%;
      margin-top: 5px;
      margin-bottom: 5px;
      border-radius: 0;
    }
  }
</style>

<template>
  <section class="content">
    <div class="row center-block">
      <!--<h2 class="title-users">List of Users</h2>-->
      <div class="col-md-12">      
        <div class="row">
            <div class="box">
            <div class="box-body no-padding">
            <button class="btn bg-green addImage" v-on:click="addImage()">Добавить новые изображения</button>
                <div v-if="error">
                    The list of images is empty
                </div>
                <div v-else>
                <div class="row">
                    <div class="gallery">
                        <div v-if="response" v-for="image in response">
                              <div class="col-md-3">
                                  <div class="galleryImage">
                                      <div class="galleryImageBlock">
                                          <img :src="'https://online-bani.ru/assets/data/gallery' + image.file" alt="" class="img-responsive">
                                      </div>
                                      <div class="deleteImage">
                                          <button class="btn bg-red" v-on:click="deletePost(image)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                      </div>
                                      <a :href="'https://online-bani.ru/assets/data/gallery' + image.file" data-lightbox="roadtrip" class="resizeImage"><i class="fa fa-search" aria-hidden="true"></i></a>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
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
import lightbox2 from 'lightbox2'
import 'lightbox2/dist/css/lightbox.css'
import Dropzone from 'dropzone'
export default {
  name: 'Repository',
  data: function () {
    return {
      response: null,
      error: null
    }
  },
  components: { lightbox2 },
  methods: {
    callImages: function () {
      var itemId = this.$route.params.id
      var image = this
      var urlImage = '/gallery/' + itemId
      this.$parent.callAPI('GET', urlImage).then(function (response) {
      // this.$http.get(urlImage).then(function (response) {
        console.log('getImages Response:', response)
        if (response.status !== 200) {
          console.log('getImages Response:', response)
          image.error = response.statusText
          return
        }
        image.response = response.data
        console.log
      }, function (response) {
        // Request failed.
        console.log('error', response)
        image.error = response.statusText
      })
    },
    addImage: function () {
      var itemId = this.$route.params.id
      var token = this.$store.state.token
      var reload = this.callImages
      swal({
        title: 'Загрузите изображения',
        html: '<div class="uploadBlock"><div id="uploadGallery"></div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>',
        confirmButtonText: 'Закрыть',
        onOpen: function () {
          $(function () {
            var myDropzone = new Dropzone('#uploadGallery', {
              url: 'https://api.online-bani.ru/gallery/' + itemId,
              acceptedFiles: '.jpg,.png,.jpeg,.gif',
              maxFilesize: 3,
              headers: {
                'Authorization': token
              }
            })
            document.getElementById('uploadGallery').className = 'dropzone dz-clickable'
            myDropzone.on('complete', function () { reload() })
          })
        },
        onClose: function () {}
      })
    },
    deletePost: function (img) {
      this.$http.delete('https://api.online-bani.ru/gallery/' + img.id)
      console.log(this.response.indexOf(img))
      var deleteData = this.response
      swal({
        title: 'Вы уверены?',
        text: 'Вы не сможете восстановить это изображение!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Нет',
        closeOnConfirm: false
      }).then(function () {
        deleteData.splice(deleteData.indexOf(img), 1)
        swal(
          'Удален!',
          'Изображение успешно удалено',
          'success'
        )
      })
    }
  },
  mounted: function () {
    this.callImages()
  }
}
</script>
<style lang="less">
    .addImage{
      margin-left: 30px;
      margin-top: 30px;
    }
    .swal2-title{
      margin-top: 20px!important;
    }
    .uploadBlock{
      position: relative;
      #uploadGallery{
        background: none;
        border: 3px dashed #ddd;
        margin-top: 35px;
        z-index: 1;
        transition: all ease-out 0.3s;
      }
      .fa{
        margin-top: 0px;
        display: block;
        font-size: 50px;
        color: #ddd;
        z-index: 0;
        position: absolute;
        top: 50px;
        margin: 0 auto;
        left: 0;
        right: 0;
        transition: all ease-out 0.3s;
      }
      &:hover{
        #uploadGallery{
          border-color: #3c8dbc;
        }
        .fa{
          color: #3c8dbc;
        }
      }
    }
    .gallery{   
        padding: 30px;
        .galleryImage{
            margin-bottom: 30px;
            background-color: #000;
            position: relative;
            .deleteImage{
                position: absolute;
                top: 10px;
                right: 15px;
                color: #fff;
                z-index: 2;
                font-size: 17px;
                display: none;
            }
            .resizeImage{
                position: absolute;
                left: 0;
                right: 0;
                text-align: center;
                top: 0;
                color: #fff;
                z-index: 1;
                font-size: 17px;
                display: none;
                height: 100%;
                width: 100%;
                i{
                    margin: 0 auto;
                }
            }
            a{
                display: block;
                z-index: 0;
            }
            &:hover,&:focus{
                .galleryImageBlock{
                    opacity: 0.2;
                }
                .deleteImage{
                    display: block;
                }
                .resizeImage{
                    display: flex;
	                align-items: center;
                }
            }
        }
    }
</style>

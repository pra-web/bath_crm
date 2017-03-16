<template>
  <section class="content">
    <div class="row center-block">
      <!--<h2 class="title-users">List of Users</h2>-->
      <div class="col-md-12">
        <div class="row">
            <div class="box">
            <div class="box-body no-padding">
            <button class="btn bg-red" v-on:click="addImage()"><i class="fa fa-plus" aria-hidden="true"></i></button>
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
                                        <img :src="image.image" alt="" class="img-responsive">
                                    </div>
                                    <div class="deleteImage"><i class="fa fa-trash" aria-hidden="true"></i></div>
                                    <a :href="image.image" data-lightbox="roadtrip" class="resizeImage"><i class="fa fa-search" aria-hidden="true"></i></a>
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
// import $ from 'jquery'
import swal from 'sweetalert2'
import lightbox2 from 'lightbox2'
import MyDropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import 'lightbox2/dist/css/lightbox.css'
export default {
  name: 'Repository',
  data: function () {
    return {
      getImages: '/gallery',
      response: null,
      error: null
    }
  },
  components: { lightbox2, MyDropzone },
  methods: {
    addImage: function () {
      swal({
        title: 'Введите данные',
        html: '<div id="MyDropzone"></div>',
        onOpen: function () {
        }
      })
    },
    callImages: function () {
      var image = this
    //   this.$parent.callAPI('GET', getImages).then(function (response) {
      this.$http.get('http://localhost:3000/gallery').then(function (response) {
        console.log('getImages Response:', response)
        if (response.status !== 200) {
          console.log('getImages Response:', response)
          image.error = response.statusText
          return
        }

        image.response = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        image.error = response.statusText
      })
    },
    deletePost: function (image) {
      this.response.splice(this.response.indexOf(image), 1)
      // this.$http.delete('http://localhost:3000/images/' + image.id)
      // console.log(image.id)
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
    this.initDropzone()
    this.callImages()
  }
}
</script>
<style lang="less">
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

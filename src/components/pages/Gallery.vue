<template>
  <section class="content">
    <div class="row center-block">
      <!--<h2 class="title-users">List of Users</h2>-->
      <div class="col-md-12">
        <div class="row">
            <div class="box">
            <div class="box-body no-padding">
                <div v-if="error">
                    The list of images is empty
                </div>
                <div v-else>
                <div class="row">
                    <div v-if="response" v-for="image in response">
                        <div class="col-md-6">
                            <div class="galleryImage">
                                <img :src="image.image" alt="" class="img-responsive">
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
// import swal from 'sweetalert'
export default {
  name: 'Repository',
  data: function () {
    return {
      getImages: '/gallery',
      response: null,
      error: null
    }
  },
  methods: {
    callImages: function () {
      var image = this
      this.$parent.callAPI('GET', this.getImages).then(function (response) {
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
    this.callImages()
  }
}
</script>
<style lang="less">
    .galleryImage{
        margin-bottom: 30px;
    }
</style>

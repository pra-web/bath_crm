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
              <h3 class="box-title">{{response.name}}</h3>              
            </div>
            <div class="box-body">
                <div class="row">
                <div class="col-md-3">
                  <div class="photoUser">
                    <img :src="urlImage + response.image" alt="" class="img-responsive">
                    <button class="btn btn-default" v-on:click="uploadPhoto()">Загрузить новое изображение</button>
                  </div>
                  <div class="otherOption">
                    <a v-on:click="galleryBtn" class="btn bg-blue">Галерея</a>
                    <router-link v-bind:to="getSections + '/' +  response.id + '/price'"  class="btn bg-blue" >Таблица цен</router-link>
                  </div>                
                </div>
                <div class="col-md-9 mainFormInfo">
                <div class="row">
                <div class="col-xs-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-home"></i></span>
                    <input class="form-control" placeholder="Название" type="text" v-model:value="response.name">
                  </div>
                  </div>
                  <div class="col-xs-2">
                    <div class="input-group">
                      <span class="input-group-addon">ID</span>
                      <input class="form-control" placeholder="ID" type="text" v-model:value="response.id" disabled>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-commenting-o"></i></span>
                    <textarea class="form-control" placeholder="Описание" type="text" v-model:value="response.description" title="Описание"  data-toggle="tooltip" data-placement="left"></textarea>
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input class="form-control" placeholder="Вместимость" type="text" v-model:value="response.capacity" title="Вместимость"  data-toggle="tooltip" data-placement="left">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-users"></i></span>
                  <input class="form-control" placeholder="Максимальная вместимость" type="text" v-model:value="response.extraCapacity" title="Максимальная вместимость"  data-toggle="tooltip" data-placement="left">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user-plus"></i></span>
                  <input class="form-control" placeholder="Цена за дополнительного человека" type="text" v-model:value="response.extraCapacityCost" title="Цена за дополнительного человека"  data-toggle="tooltip" data-placement="left">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                  <input class="form-control" placeholder="Время уборки" type="text" v-model:value="response.cleanTime" title="Время уборки"  data-toggle="tooltip" data-placement="left">
                </div>
                <br/>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-list"></i></span>
                  <select class="form-control" id="select" v-model="response.section_type_id">
                    <option v-if="dataSectionType" v-for="section in dataSectionType" :selected="response.section_type_id" :value="section.id">{{section.name}}</option>
                  </select>
                </div>
                <br/>
                
                <!-- with checkbox -->
                <div class="dropdownBtn">
                  <input type="checkbox" id="dropdownList"  v-model="dropdownList">
                  <label for="dropdownList"><i class="fa fa-plus-square-o" aria-hidden="true"></i> Дополнительные поля</label>
                </div>
                <!-- dropdown list START -->
                <transition name="dropdownList">
                <div class="dropdownList" v-if="dropdownList">
                  <div class="checkBlock">
                    <input type="checkbox" id="besomBirch"  v-model="response.besomBirch">
                    <label for="besomBirch">Березовый веник</label>
                  </div>
                  <div class="input-group" v-if="response.besomBirch">
                    <span class="input-group-addon"><i class="fa fa-rub"></i></span>
                    <input class="form-control" placeholder="Цена" type="text" v-model:value="response.besomBirchCost">
                  </div>
                  <br/>
                  <div class="checkBlock">
                    <input type="checkbox" id="besomOak"  v-model="response.besomOak">
                    <label for="besomOak">Дубовый веник</label>
                  </div>
                  <div class="input-group" v-if="response.besomOak">
                    <span class="input-group-addon"><i class="fa fa-rub"></i></span>
                    <input class="form-control" placeholder="Цена" type="text" v-model:value="response.besomOakCost">
                  </div>
                  <br/>
                  <div class="checkBlock">
                    <input type="checkbox" id="grill"  v-model="response.grill">
                    <label for="grill">Мангал</label>
                  </div>
                  <div class="input-group" v-if="response.grill">
                    <span class="input-group-addon"><i class="fa fa-rub"></i></span>
                    <input class="form-control" placeholder="Цена" type="text" v-model:value="response.grillCost">
                  </div>
                  <br/>
                  <div class="checkBlock">
                    <input type="checkbox" id="pool"  v-model="response.pool">
                    <label for="pool">Бассейн</label>
                  </div>
                  <br/>
                  <div v-if="response.pool">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-long-arrow-down"></i></span>
                      <input class="form-control" placeholder="Глубина" type="text" v-model:value="response.poolDepth" title="Глубина"  data-toggle="tooltip" data-placement="left">
                    </div>
                    <br/>
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-arrows-v"></i></span>
                      <input class="form-control" placeholder="" type="text" v-model:value="response.poolLength" title="Длина"  data-toggle="tooltip" data-placement="left">
                    </div>
                    <br/>
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-arrows-h"></i></span>
                      <input class="form-control" placeholder="" type="text" v-model:value="response.poolWidth" title="Ширина"  data-toggle="tooltip" data-placement="left">
                    </div>
                    <br/>
                  </div>
                  <div class="checkBlock">
                    <input type="checkbox" id="soapSupplies" v-model="response.soapSupplies">
                    <label for="soapSupplies">Банные принадлежности</label>
                  </div>
                  <div v-if="response.soapSupplies">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-rub"></i></span>
                      <input class="form-control" placeholder="Цена" type="text" v-model:value="response.soapSuppliesCost">
                    </div>
                    <br/>
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-info"></i></span>
                      <input class="form-control" placeholder="Описание" type="text" v-model:value="response.soapSuppliesText" title="Описание"  data-toggle="tooltip" data-placement="left">
                    </div>
                    <br/>
                  </div>
                  <br/>
                  <div class="checkBlock">
                    <input type="checkbox" id="summerhouse"  v-model="response.summerhouse">
                    <label for="summerhouse">Беседка</label>
                  </div>
                  <div class="input-group" v-if="response.summerhouse">
                    <span class="input-group-addon"><i class="fa fa-rub"></i></span>
                    <input class="form-control" placeholder="" type="text" v-model:value="response.summerhouseCost">
                  </div>
                  <br/>
                  <div class="checkBlock">
                    <input type="checkbox" id="jacuzzi"  v-model="response.jacuzzi">
                    <label for="jacuzzi">Джакузи</label>
                  </div>
                  <br/>                
                  <div class="checkBlock">
                    <input type="checkbox" id="showerCabin"  v-model="response.showerCabin">
                    <label for="showerCabin">Душевая кабинка</label>
                  </div>
                  <!-- dropdown list END -->              
                </div>
                </transition>
                <!-- with checkbox END -->
               <div class="specialBtn">
                  <button v-on:click="saveContact()" class="btn bg-green">Сохранить данные</button>
                  <a v-on:click="backBtn" class="btn bg-red">Отменить</a>
                </div>
            </div>
            </div>
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
import $ from 'jquery'
import swal from 'sweetalert2'
import {ru} from 'vue-flatpickr/dist/ru.js'
import Dropzone from 'dropzone'
export default {
  name: 'Repository',
  data: function () {
    return {
      getSections: '/sections',
      urlImage: 'https://online-bani.ru/assets/data/gallery',
      getSectionType: '/sectionType',
      dataSectionType: null,
      response: null,
      error: null,
      dropdownList: 0,
      fpOptions: {
        locale: ru,
        dateFormat: 'd.m.Y'
      }
    }
  },
  components: {},
  methods: {
    tooltip: function () {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    },
    getSection: function () {
      var user = this
      console.log(this.getSectionType)
      this.$parent.callAPI('GET', this.getSectionType).then(function (response) {
        console.log('getSectionType Response:', response)
        if (response.status !== 200) {
          user.error = response.statusText
          return
        }
        user.dataSectionType = response.data
      }, function (response) {
        // Request failed.
        console.log('error', response)
        user.error = response.statusText
      })
    },
    callSections: function () {
      var user = this
      var itemId = this.$route.params.id
      this.$parent.callAPI('GET', this.getSections + '/' + itemId).then(function (response) {
        console.log('getSections Response:', response)
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
    uploadPhoto: function () {
      var itemId = this.$route.params.id
      var token = this.$store.state.token
      var urlSection = this.getSections
      var reload = this.callSections
      var server = this.$store.state.serverURI
      console.log()
      swal({
        title: 'Загрузить изображение',
        html: '<div class="uploadBlock"><div id="uploadGallery"></div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>',
        confirmButtonText: 'Закрыть',
        onOpen: function () {
          $(function () {
            var myDropzone = new Dropzone('#uploadGallery', {
              url: server + urlSection + '/' + itemId,
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
        }
      })
    },
    galleryBtn: function () {
      this.$router.push('/gallery/' + this.response.gallery_id)
    },
    saveContact: function () {
      var itemId = this.$route.params.id
      this.$parent.callAPI('PUT', this.getSections + '/' + itemId, this.response).then(function (res) {
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
    this.callSections()
    this.getSection()
  }
}
</script>
<style lang="less">
  .datetime-picker input {
    height: 4em !important;
  }
  .photoUser{
    text-align: center;
    img{
      max-height: 140px;
      margin: 0 auto;
    }
    .btn{
      width: 100%;
      padding-top: 16.5px;
      padding-bottom: 17px;
      margin-top: 24px;
      margin-bottom: 5px;
      border-radius: 0;
      background: none!important;
      font-size: 14px;
      &:hover,&:focus{
        border-color: #3c8dbc;
        color: #3c8dbc;
      }
    }
  }
  .mainFormInfo{
    textarea{
      height: 100px;
    }
    .form-control{
      border-radius: 0!important;
      -webkit-appearance: none;
    }
  }
  .dropdownList{
    background: lighten(#eeeeee, 2%);
    padding: 15px;
    margin-top: -20px;
    margin-bottom: 20px;
    transition: all .3s ease;
    .checkBlock{
      label,input{
        cursor: pointer;
      }
    }
  }
  .dropdownList-enter {
    opacity: 0;
  }

  .dropdownList-leave-active {
    opacity: 0;
  }

  .dropdownList-enter .dropdownList-container,
  .dropdownList-leave-active .dropdownList-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .dropdownBtn{
    margin-bottom: 20px;
    i{
      position: absolute;
      margin-left: -17px;
      margin-top: 2.5px;
    }
    label{
      cursor: pointer;
      background: #eee;
      display: block;
      padding: 10px;
      padding-left: 33px;
      &:hover,&:focus{
        background: #ddd;
      }
    }
    input{
      display: none;
    }
  }
  .specialBtn{
    margin-bottom: 10px;
  }
</style>

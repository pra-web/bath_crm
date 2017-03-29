<template>
  <div class="wrapper">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/img/logo_sm.png" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="container logo-lg">
          <div class="pull-left image"><img src="/static/img/logo_sm.png" alt="Logo" class="img-responsive"></div>
          <div class="pull-left info">CoPilot</div>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">

              <a v-on:click="meBtn">
                <!-- The user image in the navbar-->
                <img v-bind:src="'https://online-bani.ru/assets/data/gallery' + state.user.photo" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">{{state.user.displayName}}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">
          <img v-bind:src="'https://online-bani.ru/assets/data/gallery' + state.user.photo" class="user-image" alt="">
          </div>
          <div class="pull-left info">
            <div><p class="white">{{state.user.name}} - {{state.user.role.name}}</p></div>
            <a href="javascript:;"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>

        <!-- search form (Optional) -->
        <form v-on:submit.prevent class="sidebar-form">
          <div class="input-group">
            <input type="text" name="search" id="search" class="search form-control" data-toggle="hideseek" placeholder="Поиск по навигации" data-list=".sidebar-menu">
                <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
          <li class="header">Инструменты</li>
          <li class="active pageLink" v-on:click="toggleMenu"><router-link to="/"><i class="fa fa-columns"></i><span class="page">Панель управления</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/notice"><i class="fa fa-bell"></i><span class="page">Уведомления</span></router-link></li>

          <li class="header">Основное</li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/admins"><i class="fa fa-user-circle"></i><span class="page">Администраторы</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/bathhouse"><i class="fa fa-book"></i><span class="page">Баня</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/sections"><i class="fa fa-puzzle-piece"></i><span class="page">Отделелния</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/orders"><i class="fa fa-shopping-cart"></i><span class="page">Заказы</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/finance"><i class="fa fa-rub"></i><span class="page">Финансы</span></router-link></li>
          <li class="pageLink" v-on:click="toggleMenu"><router-link to="/gallery/2"><i class="fa fa-picture-o"></i><span class="page">Галерея</span></router-link></li>

          <li class="header">Авторизация</li>"
          <li class="pageLink" v-on:click="logout()"><router-link to="/"><i class="fa fa-sign-out"></i><span class="page">Выход</span></router-link></li>
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <!--<ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <li class="active">{{$route.name.toUpperCase() }}</li>
        </ol>-->
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="javascript:;">CoPilot</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import faker from 'faker'
import 'sweetalert2/dist/sweetalert2.css'
require('hideseek')
module.exports = {
  name: 'Dash',
  data: function () {
    return {
      section: 'Dash',
      me: '',
      error: '',
      api: {
        servers: {
          url: '', // Back end server
          result: []
        }
      }
    }
  },
  computed: {
    store: function () {
      return this.$parent.$store
    },
    state: function () {
      return this.store.state
    },
    callAPI: function () {
      return this.$parent.callAPI
    },
    demo: function () {
      return {
        displayName: faker.name.findName(),
        avatar: this.store.state,
        email: faker.internet.email(),
        randomCard: faker.helpers.createCard()
      }
    },
    year: function () {
      var y = new Date()
      return y.getFullYear()
    }
  },

  methods: {
    changeloading: function () {
      this.store.commit('TOGGLE_SEARCHING')
    },
    toggleMenu: function (event) {
      // remove active from li
      window.$('li.pageLink').removeClass('active')

      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    },
    logout: function () {
      this.store.commit('SET_USER', null)
      this.store.commit('SET_TOKEN', null)
      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login')
    },
    meBtn: function () {
      this.$router.push('/me')
    }
  },
  mounted: function () {
    // Page is ready. Let's load our functions!
  }
}
</script>
<style>
.user-panel {
  height: 60px;
}
.user-panel .image{
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
}
.user-panel .image img{
  width: 100%;
  height: 100%;
}
.sidebar-collapse .user-panel .image{
  border-radius: 50%;
  overflow: hidden;
  width: 2.1em;
  height: 2.1em;
}
.user-menu a{
  cursor: pointer;
}
hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>

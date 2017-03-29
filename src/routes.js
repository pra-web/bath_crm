import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/pages/Home.vue'
import TablesView from './components/dash/Tables.vue'
import TasksView from './components/dash/Tasks.vue'
import SettingView from './components/dash/Setting.vue'
import AccessView from './components/dash/Access.vue'
import ServerView from './components/dash/Server.vue'
import ReposView from './components/dash/Repos.vue'
// New
import Users from './components/pages/Users.vue'
import Admins from './components/pages/Admins.vue'
import AdminsEdit from './components/pages/Admins_edit.vue'
import Service from './components/pages/Service.vue'
import Orders from './components/pages/Orders.vue'
import Finance from './components/pages/Finance.vue'
import Notice from './components/pages/Notice.vue'
import Gallery from './components/pages/Gallery.vue'
import Me from './components/pages/Me.vue'
import Bathhouse from './components/pages/Bathhouse.vue'
import BathProperty from './components/pages/BathProperty.vue'
import Sections from './components/pages/Sections.vue'

// Routes
const routes = [{
  path: '/login',
  component: LoginView
}, {
  path: '/',
  component: DashView,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      component: DashboardView,
      name: 'Панель управления',
      description: ''
    }, {
      path: '/tables',
      component: TablesView,
      name: 'Таблица',
      description: ''
    }, {
      path: '/tasks',
      component: TasksView,
      name: 'Tasks',
      description: 'Tasks page in the form of a timeline'
    }, {
      path: '/setting',
      component: SettingView,
      name: 'Settings',
      description: 'User settings page'
    }, {
      path: '/access',
      component: AccessView,
      name: 'Access',
      description: 'Example of using maps'
    }, {
      path: '/server',
      component: ServerView,
      name: 'Servers',
      description: 'List of our servers'
    }, {
      path: '/repos',
      component: ReposView,
      name: 'Repository',
      description: 'List of popular javascript repos'
    }, {
      path: '/users',
      component: Users,
      name: 'Users',
      description: 'List of users'
    }, {
      path: '/admins',
      component: Admins,
      name: 'Администраторы',
      description: 'Редактировать администраторов'
    }, {
      path: '/me',
      component: Me,
      name: 'Личные данные',
      description: 'Редактировать личные данные'
    }, {
      path: '/bathhouse',
      component: Bathhouse,
      name: 'Информация о бане',
      description: 'Редактировать информацию о бане'
    }, {
      path: '/bathproperty',
      component: BathProperty,
      name: 'Платежная информация о бане',
      description: 'Редактировать платежные свойства бани'
    }, {
      path: '/sections',
      component: Sections,
      name: 'Отделелния',
      description: 'Список отделелний'
    }, {
      path: '/admins/:id',
      component: AdminsEdit,
      name: 'Редактировать',
      description: 'Редактировать администратора'
    }, {
      path: '/service',
      component: Service,
      name: 'Услуги',
      description: 'Редактировать услуги'
    }, {
      path: '/orders',
      component: Orders,
      name: 'Заказы',
      description: 'Управление заказами'
    }, {
      path: '/finance',
      component: Finance,
      name: 'Финансы',
      description: 'Управление финансами'
    }, {
      path: '/notice',
      component: Notice,
      name: 'Уведомления',
      description: 'Настройки уведомлений'
    }, {
      path: '/gallery/:id',
      component: Gallery,
      name: 'Галерея',
      description: 'Настройки уведомлений'
    }
  ]
}, {
  // not found handler
  path: '*',
  component: NotFoundView
}]

export default routes

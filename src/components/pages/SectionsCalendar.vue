<template>
    <div class="container">
        <div id='calendar'></div>
    </div>
</template>

<script>
import $ from 'jquery'
import fullcalendar from 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar/dist/locale/ru.js'
export default {
  name: 'Home',
  components: { fullcalendar },
  data: function () {
    return {
      getItem: '/sectionReserve/',
      response: null
    }
  },
  methods: {
    callCalendar: function () {
      var user = this
      var idSection = this.$route.params.id
      this.$parent.callAPI('GET', this.getItem + idSection).then(function (response) {
        console.log('getUsers Response:', response)
        $('#calendar').fullCalendar({
          locale: 'ru',
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'list,month,agendaWeek,agendaDay'
          },
          selectable: false,
          selectHelper: true,
          navLinks: true,
          editable: false,
          eventLimit: false,
          slotEventOverlap: false,
          events: response.data
        })
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
    this.callCalendar()
  }
}
</script>
<style>
#calendar{
    max-width: 900px;
    max-height: 900px;
    padding: 50px;
}
</style>

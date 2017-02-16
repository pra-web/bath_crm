<template>
    <div class="container">
        <h1>Home test</h1>
        <div id='calendar'></div>
    </div>
</template>

<script>
import $ from 'jquery'
import fullcalendar from 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.min.css'
export default {
  name: 'Home',
  components: { fullcalendar },
  methods: {
    getCall: function () {
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end) {
          var title = 'test'
          var eventData
          if (title) {
            eventData = {
              title: title,
              start: start,
              end: end
            }
            $('#calendar').fullCalendar('renderEvent', eventData, true)
          }
          $('#calendar').fullCalendar('unselect')
        },
        resources: {
          refetchResourcesOnNavigate: true,
          url: 'http://localhost:3000/login',
          type: 'POST'
        },
        navLinks: true,
        editable: true,
        eventLimit: false,
        events: [{
          title: 'All Day Event',
          start: '2017-02-18'
        },
        {
          title: 'tester',
          start: '2017-02-10'
        }
        ]
      })
    }
  },
  mounted: function () {
    this.getCall()
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

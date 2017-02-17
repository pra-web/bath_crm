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
        // eventClick: function (event, element) {
        //   event.title = 'CLICKED!'
        //   $('#calendar').fullCalendar('updateEvent', event)
        // },
        eventClick: function (drag, title, event, start, end, minuteDelta, allDay, revertFunc) {
          console.log(event)
          $.ajax({
            url: 'http://localhost:3000/events',
            type: 'POST',
            dataType: 'json',
            data: ({
              title: title,
              start: start,
              end: end
            }),
            success: function (data, textStatus) {
              if (!data) {
                revertFunc()
                return
              }
              $('#calendar').fullCalendar('updateEvent', event)
            },
            error: function () {
              revertFunc()
            }
          })
        },
        navLinks: true,
        editable: true,
        eventLimit: false,
        events: {
          url: 'http://localhost:3000/events'
        }
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

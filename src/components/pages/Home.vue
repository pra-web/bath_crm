<template>
    <div class="container">
        <div id='calendar'></div>
    </div>
</template>

<script>
import $ from 'jquery'
import fullcalendar from 'fullcalendar'
import datetimepicker from 'eonasdan-bootstrap-datetimepicker'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar/dist/locale/ru.js'
import swal from 'sweetalert2'
export default {
  name: 'Home',
  components: { fullcalendar, datetimepicker },
  methods: {
    getCall: function () {
      $('#calendar').fullCalendar({
        locale: 'ru',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        navLinks: true,
        editable: true,
        eventLimit: false,
        slotEventOverlap: false,
        select: function (start, end) {
          swal({
            title: 'Введите данные',
            html:
              '<input id="swal-input1" class="swal2-input">' +
              '<div class="input-group date" id="datetimepicker1"><input type="text" class="form-control" /><span class="input-group-addon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></span></div>',
            preConfirm: function () {
              return new Promise(function (resolve) {
                resolve([
                  $('#swal-input1').val(),
                  $('#dateInput').val()
                ])
              })
            },
            onOpen: function () {
              $(function () {
                $('#datetimepicker1').datetimepicker()
              })
              $('#swal-input1').focus()
            }
          }).then(function (result) {
            var getInput = result
            var title = getInput[0]
            var eventData
            if (title) {
              eventData = {
                title: title,
                start: start,
                end: end
              }
            }
            $('#calendar').fullCalendar('renderEvent', eventData, true)
          }).catch(swal.noop)
          $('#calendar').fullCalendar('unselect')
        },
        // eventClick: function (event, element) {
        //   event.title = 'CLICKED!'
        //   event.start = '2017-02-01'
        //   $('#calendar').fullCalendar('updateEvent', event)
        // },
        events: [
          {
            id: 12,
            title: 'Long Event',
            start: '2017-02-07',
            end: '2017-02-14'
          },
          {
            id: 125,
            title: 'Repeating Event',
            start: '2017-02-09',
            end: '2017-02-11'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2017-02-16',
            end: '2017-02-13'
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

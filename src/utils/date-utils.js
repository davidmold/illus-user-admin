
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const millisecondsPerDay = (24 * 60 * 60 * 1000)

function padString (str, len) {
  if (!str) str = ''
  while (str.length < len) {
    str = '0' + str
  }
  return str
}
// The server must be in the UTC time zone for this to work. So on your dev server, the times will
// be all wrong if the server is on US time.
export default {
  padString: function (str) {
    return padString(str, 2)
  },
  convertDateToTimezone (adate) {
    let mdate = new Date(adate)
    let tz = mdate.getTimezoneOffset()
    let tzadd = 60000 * tz
    let nt = mdate.getTime() + tzadd
    return new Date(nt)
  },
  revertDateToTimezone (adate) {
    let mdate = new Date(adate)
    let tz = mdate.getTimezoneOffset()
    let tzadd = 60000 * tz
    let nt = mdate.getTime() - tzadd
    return new Date(nt)
  },
  formatDate: function (adate) {
    if (!adate) return ''
    var md2 = this.convertDateToTimezone(adate)
    let formatted_date = md2.getDate() + ' ' + months[md2.getMonth()] + ' ' + md2.getFullYear()
    return formatted_date
  },
  formatTime: function (adate) {
    if (!adate) return ''
    let mdate = this.convertDateToTimezone(adate)
    let formatted_date = mdate.getDate() + ' ' + months[mdate.getMonth()] + ' ' + mdate.getFullYear() +
            ' ' + this.padString('' + mdate.getHours()) + ':' + this.padString('' + mdate.getMinutes())
    return formatted_date
  },
  formatTimeOnly: function (adate) {
    if (!adate) return ''
    let mdate = this.convertDateToTimezone(adate)
    let formatted_date = this.padString('' + mdate.getHours()) + ':' + this.padString('' + mdate.getMinutes())
    return formatted_date
  },
  daysBetween: function (startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / millisecondsPerDay
  },
  addDaysToDate: function (adate, numDays) {
    return new Date(adate.getTime() + (numDays * millisecondsPerDay))
  },
  getDateMonthsBack: function (numMonths) {
    let d = new Date()
    d.setMonth(d.getMonth() - numMonths)
    return d
  },
  getMonthStart: function (adate) {
    if (!adate) {
      adate = new Date()
    }
    return new Date(adate.getFullYear(), adate.getMonth(), 1)
  },
  getNextMonthStart: function (adate) {
    if (!adate) {
      adate = new Date()
    }
    if (adate.getMonth() == 11) {
      return new Date(adate.getFullYear() + 1, 0, 1)
    } else {
      return new Date(adate.getFullYear(), adate.getMonth() + 1, 1)
    }
  },
  daysAgo: function (days) {
    let d = new Date()
    return new Date(d.getTime() - (days * millisecondsPerDay))
  },
  getDaysBetween: (fromDate, toDate) => {
    return Math.ceil((toDate.getTime() - fromDate.getTime()) / millisecondsPerDay)
  },
  addDays: function (days) {
    let d = new Date()
    return new Date(d.getTime() + (days * millisecondsPerDay))
  },
  parseCsDate: function (ds) {
    if (ds) {
      var s = ds.replace(/\//g, '')
      let w = s.indexOf('-')
      if (w > 0) {
        s = s.substring(0, w) + ')'
      }
      w = s.indexOf('+')
      if (w > 0) {
        s = s.substring(0, w) + ')'
      }
      return eval('new ' + s)
    }
    return new Date()
  },
  formatCsDate: function (ds) {
    if (ds) {
      var d = this.parseCsDate(ds)
      return this.formatDate(d)
    }
    return 'error'
  },
  formatCsTime: function (ds) {
    if (ds) {
      var d = this.parseCsDate(ds)
      return this.formatTime(d)
    }
    return 'error'
  },
  formatCsTimeOnly: function (ds) {
    if (ds) {
      var d = this.parseCsDate(ds)
      return this.formatTimeOnly(d)
    }
    return 'error'
  },
  wfcFormatDate: function (adate) {
    return '/Date(' + adate.getTime() + ')/'
  }

}

const moment = require('moment')

module.exports = (date) => {
    return moment(date).format('Do MMMM YYYY,hh:mm:ss a')
}









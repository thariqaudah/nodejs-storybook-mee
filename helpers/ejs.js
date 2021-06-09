const moment = require('moment');

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let newStr = str.substr(0, len);
      return `${newStr}...`;
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = false) {
    if (storyUser.toString() === loggedUser.toString() && floating) {
      return `<a href="/stories/edit/${storyId}" class="btn btn-primary btn-sm rounded-circle position-absolute top-0 start-100 translate-middle shadow-sm"><i class="fas fa-edit edit-small"></i></a>`;
    } else if (storyUser.toString() === loggedUser.toString()) {
      return `<a href="/stories/edit/${storyId}" class="btn btn-primary rounded-circle shadow-sm"><i class="fas fa-edit edit-small"></i></a>`;
    }
    return '';
  },
};

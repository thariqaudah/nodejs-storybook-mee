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
  editIcon: function (storyUser, loggedUser, storyId, iconLarge = false) {
    if (storyUser.toString() === loggedUser.toString() && iconLarge) {
      return `<a href="/stories/edit/${storyId}" class="text-primary ms-auto pt-2 pe-2"><i class="fas fa-edit icon-large"></i></a>`;
    } else if (storyUser.toString() === loggedUser.toString()) {
      return `<a href="/stories/edit/${storyId}" class="text-primary ms-auto pt-2 pe-2"><i class="fas fa-edit"></i></a>`;
    }
    return '';
  },
};

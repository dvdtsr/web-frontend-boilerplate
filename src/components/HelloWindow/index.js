/**
 * Created by glenn on 01/03/16.
 */

import './styles';
import $ from 'jquery';

const view = $(require('./view'));

view
  .find('.profpic-image')
  .attr('src', require('img/glenn-dwiyatcita-foto.256x256.jpg'));

const HelloWindow = view
  .kendoWindow({
    width     : 600,
    height    : 300,
    title     : 'About Glenn Dwiyatcita',
    resizable : false,
    scrollable: false,
    actions   : [
      'Pin',
      'Minimize',
      'Maximize',
      'Close',
    ],
  })
  .data('kendoWindow');

export { HelloWindow as default, HelloWindow };

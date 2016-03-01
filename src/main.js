/**
 * Created by glenn on 29/02/16.
 */

import './styles';
import 'babel-polyfill';

import $ from 'jquery';
import { HelloWindow } from './components/HelloWindow';

HelloWindow
  .open()
  .center();

/**
 * Created by glenn on 29/02/16.
 */

import './styles';
import 'babel-polyfill';

import { HelloWindow } from './components/HelloWindow';

HelloWindow
  .open()
  .center();

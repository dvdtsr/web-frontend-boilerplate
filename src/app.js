/**
 * Created by glenn on 29.02.16.
 * Last updated on 17.10.18.
 */

import $ from 'jquery';
import { identity } from 'lodash';
import './styles.css';

$(() => {
  $('#app').html(`
    <div class="mt-4 card">
      <div class="card-header">
        ${identity('halo, glenn')}
      </div>
      <div class="card-block">
        <blockquote class="card-blockquote">
          <p>Это ты, куда приводят мечты</p>
          <p>Маяк среди темноты</p>
          <p>Мой океан - это ты</p>
          <footer>♥ <cite title="ieva">ieva</cite></footer>
        </blockquote>
      </div>
    </div>
  `);
});

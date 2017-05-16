/**
 * Created by glenn on 29/02/16.
 */

import $ from 'jquery';
import './styles.css';

$(() => $('.container')
  .html(`
    <div class="mt-4 card">
      <div class="card-header">
        halo, glenn
      </div>
      <div class="card-block">
        <blockquote class="card-blockquote">
          <p>Это ты, куда приводят мечты</p>
          <p>Маяк среди темноты</p>
          <p>Мой океан - это ты</p>
          <footer>♥</footer>
        </blockquote>
      </div>
    </div>
  `)
);

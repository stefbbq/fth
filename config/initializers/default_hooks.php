<?php

// This function include screen.css in wp_head() function

function enqueue_stylesheets() {
  wp_register_style("screen", stylesheet_url("screen"), false, false);
  wp_enqueue_style("screen");
}

add_action('wp_enqueue_scripts', 'enqueue_stylesheets');

// This function include jquery and application.js in wp_footer() function

function enqueue_javascripts() {
  wp_enqueue_script("jquery");
  // wp_register_script("application", javascript_url("application"), '', false, true);
  wp_register_script("thing", javascript_url("thing"), '', false, true);	
  wp_register_script("main", javascript_url("main"), '', false, true);
  wp_register_script("CSSplugin", javascript_url("plugins/CSSPlugin.min"), '', false, true);
  wp_register_script("easing", javascript_url("easing/EasePack.min"), '', false, true);
  wp_register_script("TweenLite", javascript_url("TweenLite.min"), '', false, true);
  wp_register_script("three.min", javascript_url("three.min"), '', false, true);
	wp_register_script("CSS3DObject", javascript_url("CSS3DObject"), '', false, true);

	wp_enqueue_script("CSSplugin");
	wp_enqueue_script("easing");
	wp_enqueue_script("TweenLite");
	wp_enqueue_script("three.min");
	wp_enqueue_script("CSS3DObject");
	wp_enqueue_script("thing");	
	wp_enqueue_script("main");
}

add_action('wp_enqueue_scripts', 'enqueue_javascripts');

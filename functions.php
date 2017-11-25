<?php
	
	add_theme_support( 'menus' );
	
	//
	// override menu
	add_filter('wp_nav_menu_items', 'my_wp_nav_menu_items', 10, 2);
	function my_wp_nav_menu_items( $items, $args ) {
	
		$menu = wp_get_nav_menu_object($args->menu);
	
		// social items
		if( have_rows('social_items', $menu) ){
			echo '<div class="social-items">';
	    while ( have_rows('social_items', $menu) ) : the_row();

					$url = get_sub_field('url');
					$icon = get_sub_field('icon', 'url');
	        echo '<a class="social-link" target="_blank" href="' . $url . '"><img src="' . $icon . '"/></a>';

	    endwhile;
			echo '</div>';
			
		}

		return $items;
	}
?>
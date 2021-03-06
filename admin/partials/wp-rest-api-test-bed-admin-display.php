<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://lukepettway.name
 * @since      1.0.0
 *
 * @package    Wp_Rest_Api_Test_Bed
 * @subpackage Wp_Rest_Api_Test_Bed/admin/partials
 */
?>

<h2>WP Rest API Test Bed</h2>

<?php if( is_plugin_active( 'rest-api/plugin.php' ) || class_exists( 'WP_REST_Controller' ) ): ?>

<p>Use the controls below to choose request parameters and display the output.</p>

<div class="rest-request-string-container">
	<input id="rest-request-string" value="/wp-json/wp/v2/">
	<a class="button" id="viewRequestEndpoint" target="_blank" href="/wp-json/wp/v2/">View Route</a>
</div>

<a class="load-rest-content button" href="pages">Pages</a>

<a class="load-rest-content button" href="posts">Posts</a>

<!-- <a class="load-rest-content button" href="comments">Comments</a> -->

<a id="media-rest-content" class="button" href="media">Media</a>

<!-- <a class="load-rest-content button" href="#">Custom Post Types</a> -->

<div id="wrapper">
	<ul id="tabs"> 
		<li><a href="#tab1">Rendered Request</a></li>
		<li><a href="#tab2">JSON Output From Endpoint</a></li>
		<li><a href="#tab3">Code Examples</a></li>
	</ul>
	<div class="container" id="tab1">		
		<div id="js-data-formated"></div>						
	</div>
	<div class="container" id="tab2" >
		<div id="js-data-json-container">
			<pre id="js-data-json"></pre>
		</div>
	</div>
	<div class="container" id="tab3">
		<div id="js-example-container"></div>
	</div>
</div>

<?php else: ?>	

<p>Hmmm.... It looks like you don't have the WP REST API Installed or 
it isn't active. Make sure you download the latest version of it <a href="https://wordpress.org/plugins/rest-api/" target="_blank">here</a>.</p>

<?php endif; ?>








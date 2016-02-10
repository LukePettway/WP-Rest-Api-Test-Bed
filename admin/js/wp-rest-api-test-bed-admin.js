(function( $ , _ ) {
	'use strict';
	 //Thanks Rachel Baker for giving me a starting point!

	 var $restContentBtn = $( '.load-rest-content' );
	 var $restRequestStringInput = $( '#rest-request-string' );

	 $restContentBtn.on( 'click', function(){
 		 
		var apiEndpointData = $(this).attr('href'), 
		$responseContainerFormated = $( '#js-data-formated' ),
		$responseContainerJSON =  $( '#js-data-json' ),
		$viewRequestEndpoint = $('#viewRequestEndpoint'),
		tmpl = '<article id="post-<%= id %>"><h1><%= title %></h1><%= content %></article>';

	 	$.get( '/wp-json/wp/v2/' + apiEndpointData , function( data ) {

	 		$responseContainerFormated.empty();
	 		$restRequestStringInput.val( '/wp-json/wp/v2/' + apiEndpointData ) ;
 			$viewRequestEndpoint.attr("href", '/wp-json/wp/v2/' + apiEndpointData )

	 		for ( var key in data ) {
	 			var output = {
	 				id : data[ key ].id,
	 				title : data[ key ].title.rendered,
	 				content : data[ key ].content.rendered,
	 				},
	 				$template = $( _.template( tmpl , output ) );
				$responseContainerFormated.append( $template );
	 		}

	 		var dataString = JSON.stringify(data);

	 		$responseContainerJSON.text( dataString );
	 		
	 	});

	 	return false;

	 });

})( jQuery , _ );

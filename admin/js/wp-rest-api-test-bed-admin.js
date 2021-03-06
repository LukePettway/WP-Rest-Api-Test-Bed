(function( $ , _ ) {
	'use strict';
	//Thanks Rachel Baker for giving me a starting point!


	var dataString;
	//Dom caching
	var $restContentBtn = $( '.load-rest-content' ),
		$mediaRestContentBtn = $( '#media-rest-content' ),
		$restRequestStringInput = $( '#rest-request-string' ),
		$responseContainerFormated = $( '#js-data-formated' ),
		$responseContainerJSON =  $( '#js-data-json' ),
		$viewRequestEndpoint =  $( '#viewRequestEndpoint' ),
		$jsExampleContainer = $('#js-example-container');

	function outputJsonData(data){
		$responseContainerJSON.empty();
		dataString = JSON.stringify(data, undefined, 4);
		$responseContainerJSON.append( dataString );
	}

	function outputJavaScriptExample(data){

		var jsExampleString = "$.get( '/wp-json/wp/v2/"+data+", function( data ) { });";

		$jsExampleContainer.text(jsExampleString);
	}


	$restContentBtn.on( 'click', function(){
		 
		var apiEndpointData = $(this).attr('href'), 
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

			outputJsonData(data);
			outputJavaScriptExample(apiEndpointData);

		});

		return false;
	});


	$mediaRestContentBtn.on( 'click', function(){

		var apiEndpointData = $(this).attr('href'),
			tmpl = '<article id="post-<%= id %>" class="media">' +
				   '<% if (mediatype == "image") { %>' +
				   '<img src="<%= imgsrc %>">' +
				   '<% } else { %>' +
				   '<img src="/wp-includes/images/media/document.png">' +
				   '<% } %>' +
				   '<p><%= filename %></p>' +
				   '</article>';


		$.get( '/wp-json/wp/v2/' + apiEndpointData , function( data ) {

			$responseContainerFormated.empty();
			$restRequestStringInput.val( '/wp-json/wp/v2/' + apiEndpointData ) ;
			$viewRequestEndpoint.attr("href", '/wp-json/wp/v2/' + apiEndpointData )

			for ( var key in data ) {

				var output = {
						id : data[ key ].id,
						mediatype: data[ key ].media_type,
						imgsrc: data[ key ].source_url,
						filename: data[ key ].title.rendered
					},
					$template = $( _.template( tmpl , output ) );

				$responseContainerFormated.append( $template );
			}

			outputJsonData(data);
			outputJavaScriptExample(apiEndpointData);
		});

		return false;
	});

	$('#tabs li a:not(:first)').addClass('inactive');
	$('.container:not(:first)').hide();	
	
	$('#tabs li a').click(function(){		
		var t = $(this).attr('href');
		if($(this).hasClass('inactive')){ //added to not animate when active
			$('#tabs li a').addClass('inactive');		
			$(this).removeClass('inactive');
			$('.container').hide();
			$(t).show();	
		}			
		return false;
	}) //end click




})( jQuery , _ );

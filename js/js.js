
$(document).ready(function(){
	var scroll_bool = false;
	var i = 0;
	var stats = 3;
	/*
	 * Comprueba si la ventana modifica su tamaño.
	 * En el caso correcto si el tamñano es menor a 768 píxels se comprueba si esta en el top 
	 * para activar el banner en dispositivos móviles. En caso contrario se deja el banner activo.
	*/

	window.onresize = function() {
    	$(window).scroll(function(){
    		if ($(window).width() < 768) {
    			if ($(window).scrollTop() == 0){
					$(".advert-container").show();

				} else  {
					$(".advert-container").hide();
				}

    		} else {
    			$(".advert-container").show();
    		}			
		});	
	}


	$("#scrolling").click(function(){
		if (scroll_bool == false) {
			scroll_bool = true;
			$(this).html("<span class=\"glyphicon glyphicon-stop\"></span> Desactivar Scrolling");
			alert("Ha activado el scrolling");

		} else {
			scroll_bool = false;
			$(this).html("<span class=\"glyphicon glyphicon-play\"></span> Activar Scrolling");
			alert("Ha desactivado el scrolling");
		}
	});
	

	$("#more-news").click(function(){
		if (i == 0){
			cargarJSON(i+1);
			i++;

		} else if (i == 1){
			cargarJSON(i+1);
			i++;
			$("#more-news").hide();
		} 
	});

	$(window).scroll(function(){
		if (($(window).scrollBottom()==0) && (scroll_bool)){
			if (i == 0){
				cargarJSON(i+1);
				i++;

			} else if (i == 1){
				cargarJSON(i+1);
				i++;
				$("#more-news").hide();
			}
		};		
	});

	$.fn.scrollBottom = function() { 
		return $(document).height() - this.scrollTop() - this.height(); 
	};

	function cargarJSON(i){
		fichero = "json/1.json" + i + "2.json";
		$.getJSON(fichero, function(jsonObject) {
	        ponerNoticias(jsonObject);
	    });
	}

	function ponerNoticias(json){
     $.each( json, function(j, item) {
		var noticia_container = $('<div>');
		var img = $('<img>');
		var section = $('<section>');
		var h2  = $('<h2>');
		var datetime = $('<div>');
		var info = $('<div>');
		var p   = $('<p>');
		var imagen = $('<div>');
		var li = $('<li>');
     	var a = $('<a>');


		noticia_container.attr('id', item.id);
		noticia_container.attr('class', 'container-fluid');
		section.attr('class', 'noticias');
		h2.text(item.titulo);
		datetime.attr('class', 'datetime');
		datetime.text(item.datetime);
		info.attr('class', 'informacion');
		p.text(item.desc);
		datetime.attr('class', 'datetime');
		datetime.html('<span class=\"glyphicon glyphicon-calendar\"></span>' + item.datetime);
		img.attr('class', 'img-responsive center-block');
		img.attr('src', item.imgmid);

		h2.appendTo(section);
		datetime.appendTo(section);
		info.appendTo(section);
		p.appendTo(info);
		img.appendTo(imagen);
		imagen.appendTo(section);
		section.appendTo(noticia_container);
     	noticia_container.appendTo('.main-container');

     	a.attr('href', '#'+item.id);
     	a.text(item.nav_element);
     	a.appendTo(li);
     	li.appendTo(".nav");

     	//Modifica el número de noticias visualizadas en el sitio.
     	stats = stats + 1;
     	$('.stats').html('<span class=\"glyphicon glyphicon-eye-open\"></span><p>' + stats + ' noticias visualizadas en el sitio.</p>');

     }); 
}
});

(function($) {
        $.fn.editable = function(nodeId, dgrm) {
                var self = $(this);
                self.value = self.text();
                self.bind('dblclick', function() {
		var initWidth = $(this).width();
		var initHeight = $(this).height();
                    self.html('<textarea style="background: url(\'../../../static/cronograma/pirateado/images/transparent.gif\')">'+ $.trim(self.value.replace(/<br\s?\/?>/g,"\n")) +'</textarea>')
			    .find('textarea')
                            .bind('blur', function(event) {
				self.value = $.trim($(this).val().replace(/\r\n|\r|\n/g,"<br />"));
                                self.html(self.value);
				dgrm.updateNodeContent(nodeId, self.value);
                            }).keydown(function (e) { 
  				var keyCode = e.keyCode || e.which; 
   					if (keyCode == 13) { 
						/*Enter key*/
  					}else if (keyCode == 27) { /*Esc*/
						$(this).val(self.value);
						$(this).blur();
					}  
				}).width(initWidth).height(initHeight).css({'border':'0'}).focus();
                   });
        }
        
})(jQuery);






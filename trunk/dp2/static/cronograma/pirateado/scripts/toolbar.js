Toolbar = function(dgrm, params)
{
	var toolbar = this;
	if(!params){params={'empty':'empty'};}
	toolbar.xPosition=(params["xPosition"])? params["xPosition"] : 20;
	toolbar.yPosition=(params["yPosition"])? params["yPosition"] : 30;
	toolbar.width=(params["width"])? params["width"] : 1000;
	toolbar.add_button=(params["add_button"] == false)? params["add_button"] : true;
	toolbar.save_button=(params["save_button"] == false)? params["save_button"] : true;
	toolbar.delete_button=(params["delete_button"] == false)? params["delete_button"] : true;
	toolbar.background_color_button=(params["background_color_button"] == false)? params["background_color_button"] : true;
	toolbar.border_color_button=(params["border_color_button"] == false)? params["border_color_button"] : true;
	toolbar.font_color_button=(params["font_color_button"] == false)? params["font_color_button"] : true;
	toolbar.font_size_button=(params["font_size_button"] == false)? params["font_size_button"] : true;
	toolbar.font_family_button=(params["font_family_button"] == false)? params["font_family_button"] : true;
	toolbar.border_width_button=(params["border_width_button"] == false)? params["border_width_button"] : true;
	toolbar.defaultNodePalette = [
			{
			'order': '1',
			'color': '000000',
			'icon' : dgrm.imagesPath+'node.gif',
			'nodeType':'NODE',
			'nodeContent': 'Node Content',
			'width': '100',
			'height' : '100',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':200,
			'minWidth':40,
			'maxWidth':200,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':'',
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '2',
			'color': '572342',
			'icon' : dgrm.imagesPath+'text2.gif',
			'nodeType':'TEXT',
			'nodeContent': 'Node Content',
			'width': '100',
			'height' : '40',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':200,
			'minWidth':40,
			'maxWidth':200,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':'',
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '3',
			'color': '123456',
			'icon' : dgrm.imagesPath+'54.png',
			'nodeType':'IMAGE',
			'nodeContent': '',
			'width': '50',
			'height' : '50',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':100,
			'minWidth':40,
			'maxWidth':100,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':dgrm.imagesPath+'54.png',
			'imageWidth': 40,
			'imageHeight': 40,
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '4',
			'color': '876543',
			'icon' : dgrm.imagesPath+'12.png',
			'nodeType':'IMAGE',
			'nodeContent': 'Node Content',
			'width': '50',
			'height' : '50',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':100,
			'minWidth':40,
			'maxWidth':100,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':dgrm.imagesPath+'12.png',
			'imageWidth': 40,
			'imageHeight': 40,
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '5',
			'color': '0e2532',
			'icon' : dgrm.imagesPath+'circle.gif',
			'nodeType':'IMAGE',
			'nodeContent': 'Node Content',
			'xPosition':300,
			'yPosition':200,
			'width': '100',
			'height' : '100',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':100,
			'minWidth':40,
			'maxWidth':100,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':dgrm.imagesPath+'circle.gif',
			'imageWidth': 40,
			'imageHeight': 40,
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '6',
			'color': 'ff0000',
			'icon' : dgrm.imagesPath+'decision.gif',
			'nodeType':'IMAGE',
			'nodeContent': 'Node Content',
			'xPosition':300,
			'yPosition':200,
			'width': '100',
			'height' : '100',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':100,
			'minWidth':40,
			'maxWidth':100,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':dgrm.imagesPath+'decision.gif',
			'imageWidth': 40,
			'imageHeight': 40,
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			},
			{
			'order': '7',
			'color': '876543',
			'icon' : dgrm.imagesPath+'3.png',
			'nodeType':'IMAGE',
			'nodeContent': 'Node Content',
			'width': '50',
			'height' : '50',
			'bgColor':'#FFFFFF',
			'borderColor':'#AAAAAA',
			'borderWidth':'1',
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':40,
			'maxHeight':100,
			'minWidth':40,
			'maxWidth':100,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':dgrm.imagesPath+'3.png',
			'imageWidth': 40,
			'imageHeight': 40,
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true

			}
		   ];

	toolbar.getNodeByOrder = function(order)
	{
		for(i=0; i<toolbar.defaultNodePalette.length; i++)
		{
			if(toolbar.defaultNodePalette[i]['order'] == order)
			{
				return (toolbar.defaultNodePalette[i]);
			}
		}
	};

	toolbarExists=false;
	if(toolbar.add_button || toolbar.save_button || toolbar.delete_button || toolbar.background_color_button || toolbar.border_color_button || toolbar.font_color_button || toolbar.font_size_button || toolbar.border_width_button || toolbar.font_family_button)
	{
		toolbarExists=true;
	}

	if(toolbarExists)
	{
	    var bar = '<div id="toolbar_'+dgrm.canvasID+'" style="position: absolute;left:'+toolbar.xPosition+'px; top:'+toolbar.yPosition+'px; width:'+toolbar.width+'px; height:30px;padding:2px;" class="ui-widget-header ui-corner-all">';
	    if(toolbar.add_button)
	    {
	    	bar+= '<button id="add_button_'+dgrm.canvasId+'">Add Node</button>';		
	    }
	    if(toolbar.delete_button)
	    {
	        bar+= '<button id="delete_button_'+dgrm.canvasId+'">Delete</button>';
	    }
	    if(toolbar.save_button)
	    {
	    	bar+= '<button id="save_button_'+dgrm.canvasId+'">Save</button>';
	    }
	    if(toolbar.background_color_button)
	    {
	    	bar+= '<button id="bgcolor_button_'+dgrm.canvasId+'">Background Color</button>';
	    }
	    if(toolbar.border_color_button)
	    {
	    	bar+= '<button id="bcolor_button_'+dgrm.canvasId+'">Border Color</button>';
	    }
	    if(toolbar.font_color_button)
	    {
	    	bar+= '<button id="fcolor_button_'+dgrm.canvasId+'">Font Color</button>';
	    }
	    if(toolbar.font_size_button)
	    {
	   	bar+= '<button id="fsize_button_'+dgrm.canvasId+'">Font Size</button>';
	    }
	    if(toolbar.font_family_button)
	    {
	    	bar+= '<button id="ffamily_button_'+dgrm.canvasId+'">Font Family</button>';
	    }
	    if(toolbar.border_width_button)
	    {
	    	bar+= '<button id="bwidth_button_'+dgrm.canvasId+'">Border Width</button>';
	    }

    	    bar+= '</div>';
	    $('body').append(bar);

	    if(toolbar.add_button)
	    {				
	   	$( "#add_button_"+dgrm.canvasId ).button({icons: {primary: "add_node"}}).simpleNodePalette(dgrm,toolbar.defaultNodePalette);
	    }
	    if(toolbar.delete_button)
	    {
	   	$( "#delete_button_"+dgrm.canvasId ).button({icons: {primary: "delete_node"}}).click(function(){dgrm.deleteSelectedNodes()});
	    }
	    if(toolbar.save_button)
	    {
	   	$( "#save_button_"+dgrm.canvasId ).button({icons: {primary: "save_diagram"}}).click(function(){dgrm.toXML()});
	    }
	    if(toolbar.border_color_button)
	    {
	   	$( "#bgcolor_button_"+dgrm.canvasId ).button({icons: {primary: "background_color"}}).simpleColorPalette(dgrm,'bgcolor');
	    }
	    if(toolbar.border_color_button)
	    {
	   	$( "#bcolor_button_"+dgrm.canvasId ).button({icons: {primary: "border_color"}}).simpleColorPalette(dgrm,'bordercolor');
	    }
	    if(toolbar.font_color_button)
	    {
	   	$( "#fcolor_button_"+dgrm.canvasId ).button({icons: {primary: "font_color"}}).simpleColorPalette(dgrm, 'fontcolor');
	    }
	    if(toolbar.font_size_button)
	    {
	   	$( "#fsize_button_"+dgrm.canvasId ).button({icons: {primary: "font_size"}}).simpleFontSizePalette(dgrm);
	    }
	    if(toolbar.font_family_button)
	    {
	   	$( "#ffamily_button_"+dgrm.canvasId ).button({icons: {primary: "font_family"}}).simpleFontFamilyPalette(dgrm);
	    }
	    if(toolbar.border_width_button)
	    {
	   	$( "#bwidth_button_"+dgrm.canvasId ).button({icons: {primary: "border_width"}}).simpleBorderWidthPalette(dgrm);
	    }
				
	}			
				
};





(function($) {
        $.fn.simpleNodePalette = function(dgrm, defaultNodes) {
        var self = $(this);
	var id = self.attr("id")+"_"+dgrm.canvasId;
	var container = '<div id="'+id+'" class="simple_node_palette"></div>';		
	$("body").append(container);
	$("#"+id).hide();		
	self.click(function(){
	var x = self.offset().left;
	var y = self.offset().top + self.height()+8;
	$("#"+id).css('left', x);
	$("#"+id).css('top', y);
	$("#"+id).show();
	});
	hidePalette = function()
	{
		$(".simple_node_palette").hide();
	};
	checkMouse = function(event)
	{
       		var selector = ".simple_node_palette";
		var selectorParent = $(event.target).parents(selector).length;
		if(event.target == $(selector)[0] ||  selectorParent > 0){ return;}
    		hidePalette();   
  		};
		$(document).bind("mousedown", checkMouse);
  		$.each(defaultNodes, function(i)
		{
     			swatch = $("<div id='"+this['order']+"_"+dgrm.canvasId+"' class='node_palette_item'><img width=40px height=40px border=0 src='"+this['icon']+"'/></div>");
     			swatch.css("background", "#EEEEEE");
     			swatch.draggable({
					helper: "clone", 
					stop: function(event, ui)	
					{
						
						hidePalette();
					}
				});
     			swatch.bind("mouseover", function(e)
			{ 
       				$(this).css("border", "1px solid #AAAAAA"); 
     			}); 
     			swatch.bind("mouseout", function(e)
			{ 
       				$(this).css("border", "1px solid #EEEEEE");
     			});
     		swatch.appendTo("#"+id);
   		});


        }
        
    })(jQuery);


(function($) {
        $.fn.simpleColorPalette = function(dgrm, color) {
        var self = $(this);
	defaultColors = [ '000000', '585858', '6E6E6E', '848484','A4A4A4', 'BDBDBD','D8D8D8', 'E6E6E6', 'FFFFFF','610B21', '8A0829','B40431', 'DF013A', 'FF0040','FE2E64', 'FA5882','F7819F', 'F5A9BC', '610B5E','8A0886', 'B404AE','DF01D7', 'FF00FF', 'FE2EF7','FA58F4', 'F781F3','F5A9F2', '0B0B61', '08088A','0404B4', '0101DF','0000FF', '2E2EFE', '5858FA','8181F7', 'A9A9F5','0B3861', '084B8A', '045FB4','0174DF', '0080FF','2E9AFE', '58ACFA', '81BEF7','A9D0F5', '088A85','04B4AE', '01DFD7', '00FFFF','2EFEF7', '58FAF4','81F7F3', 'A9F5F2', 'CEF6F5', '0B610B','088A08', '04B404', '01DF01','00FF00', '2EFE2E','58FA58', '81F781', 'A9F5A9'	, '21610B','298A08', '31B404', '3ADF00','40FF00', '64FE2E','82FA58', '9FF781', 'BCF5A9'	, '5E610B','868A08', 'AEB404', 'D7DF01','FFFF00', 'F7FE2E','F4FA58', 'F3F781', 'F2F5A9'	, '61380B','8A4B08', 'B45F04', 'DF7401','FF8000', 'FE9A2E','FAAC58', 'F7BE81', 'F5D0A9'	, '610B0B','8A0808', 'B40404', 'DF0101','FF0000', 'FE2E2E','FA5858', 'F78181', 'F5A9A9'];
	var id = self.attr("id")+"_"+dgrm.canvasId;
	var container = '<div id="'+id+'" class="simple_color_palette"></div>';		
	$("body").append(container);
	$("#"+id).hide();		
	self.click(function(){
		var x = self.offset().left;
		var y = self.offset().top + self.height()+8;
		$("#"+id).css('left', x);
		$("#"+id).css('top', y);
		$("#"+id).show();
	});
	hideColorPalette = function()
	{
		$(".simple_color_palette").hide();
	};
	checkColorMouse = function(event)
	{
       		var selector = ".simple_color_palette";
		var selectorParent = $(event.target).parents(selector).length;
    		if(event.target == $(selector)[0] ||  selectorParent > 0) { return;}
   			hideColorPalette();   
  		};

		$(document).bind("mousedown", checkColorMouse);


  		$.each(defaultColors, function(i)
		{
     			swatch = $("<div id='"+this+"' class='color_palette_item'>&nbsp;</div>");
     			swatch.css("background-color", "#" + this);
			swatch.click(function(event){
							if(color == 'bgcolor')
								{
									dgrm.updateSelectedNodesBGColor("#"+event.target.id);
									hideColorPalette();
								}
							if(color == 'bordercolor')
								{
									dgrm.updateSelectedNodesBorderColor("#"+event.target.id);
									hideColorPalette();
								}
							if(color == 'fontcolor')
								{
									dgrm.updateSelectedNodesFontColor("#"+event.target.id);
									hideColorPalette();
								}
						    });
     			swatch.bind("mouseover", function(e)
			{ 
       				$(this).css("border", "1px solid #AAAAAA"); 
     			}); 
     			swatch.bind("mouseout", function(e)
			{ 
       				$(this).css("border", "1px solid #EEEEEE");
     			});
     		swatch.appendTo("#"+id);
   		});


        }
        
    })(jQuery);


(function($) {

        $.fn.simpleFontSizePalette = function(dgrm) {
            
        
                
                var self = $(this);
		defaultFontSizes = [ '7pt', '9pt', '11pt', '13pt','15pt', '17pt'];



		var id = self.attr("id")+"_"+dgrm.canvasId;
		var container = '<div id="'+id+'" class="simple_font_size_palette"></div>';		
		$("body").append(container);
		
		$("#"+id).hide();		


		self.click(function(){

			var x = self.offset().left;
			var y = self.offset().top + self.height()+8;
			$("#"+id).css('left', x);
			$("#"+id).css('top', y);
			$("#"+id).show();


		});

		


		hideFontSizePalette = function()
		{
			$(".simple_font_size_palette").hide();
		};

 		checkFontSizeMouse = function(event)
		{
        		var selector = ".simple_font_size_palette";
    			var selectorParent = $(event.target).parents(selector).length;
    			if(event.target == $(selector)[0] ||  selectorParent > 0) {return;}
    
    			hideFontSizePalette();   
  		};

		$(document).bind("mousedown", checkFontSizeMouse);


  		$.each(defaultFontSizes, function(i)
		{
     			swatch = $("<div id='"+this+"' class='font_size_palette_item' style='font-size:"+this+"'>Font Size</div>");
			swatch.click(function(event){dgrm.updateSelectedNodesFontSize(event.target.id);hideFontSizePalette();   });
     			swatch.bind("mouseover", function(e)
			{ 
       				$(this).css("border", "1px solid #AAAAAA"); 
     			}); 
     			swatch.bind("mouseout", function(e)
			{ 
       				$(this).css("border", "1px solid #EEEEEE");
     			});
     		swatch.appendTo("#"+id);
   		});


        }
        
    })(jQuery);

(function($) {

        $.fn.simpleFontFamilyPalette = function(dgrm) {
            
        
                
                var self = $(this);
		defaultFontFamilies = [ 'Arial', 'Georgia', 'Impact', 'Verdana','Monospace', 'Tahoma','Serif'];



		var id = self.attr("id")+"_"+dgrm.canvasId;
		var container = '<div id="'+id+'" class="simple_font_family_palette"></div>';		
		$("body").append(container);
		
		$("#"+id).hide();		


		self.click(function(){

			var x = self.offset().left;
			var y = self.offset().top + self.height()+8;
			$("#"+id).css('left', x);
			$("#"+id).css('top', y);
			$("#"+id).show();


		});

		


		hideFontFamilyPalette = function()
		{
			$(".simple_font_family_palette").hide();
		};

 		checkFontFamilyMouse = function(event)
		{
        		var selector = ".simple_font_family_palette";
    			var selectorParent = $(event.target).parents(selector).length;
    			if(event.target == $(selector)[0] ||  selectorParent > 0) {return;}
    
    			hideFontFamilyPalette();   
  		};

		$(document).bind("mousedown", checkFontFamilyMouse);


  		$.each(defaultFontFamilies, function(i)
		{
     			swatch = $("<div id='"+this+"' class='font_family_palette_item' style='font-family:"+this+"'>"+this+"</div>");
			swatch.click(function(event){dgrm.updateSelectedNodesFontType(event.target.id);hideFontFamilyPalette();   });
     			swatch.bind("mouseover", function(e)
			{ 
       				$(this).css("border", "1px solid #AAAAAA"); 
     			}); 
     			swatch.bind("mouseout", function(e)
			{ 
       				$(this).css("border", "1px solid #EEEEEE");
     			});
     		swatch.appendTo("#"+id);
   		});


        }
        
    })(jQuery);


(function($) {

        $.fn.simpleBorderWidthPalette = function(dgrm) {
            
        
                
                var self = $(this);
		defaultBorderWidths = [ '0','1','2','3','4','5','6','7'];



		var id = self.attr("id")+"_"+dgrm.canvasId;
		var container = '<div id="'+id+'" class="simple_border_width_palette"></div>';		
		$("body").append(container);
		
		$("#"+id).hide();		


		self.click(function(){

			var x = self.offset().left;
			var y = self.offset().top + self.height()+8;
			$("#"+id).css('left', x);
			$("#"+id).css('top', y);
			$("#"+id).show();


		});

		


		hideBorderWidthPalette = function()
		{
			$(".simple_border_width_palette").hide();
		};

 		checkBorderWidthMouse = function(event)
		{
        		var selector = ".simple_border_width_palette";
    			var selectorParent = $(event.target).parents(selector).length;
    			if(event.target == $(selector)[0] ||  selectorParent > 0) {return;}
    
    			hideBorderWidthPalette();   
  		};

		$(document).bind("mousedown", checkBorderWidthMouse);


  		$.each(defaultBorderWidths, function(i)
		{
			hrfor = this;
     			swatch = $("<div id='"+this+"' class='border_width_palette_item'><hr id='"+this+"_hr' style='border:0;height:"+this+"px;background-color: #000000;'/></div>");
			swatch.click(function(event){dgrm.updateSelectedNodesBorderWidth((event.target.id).replace('_hr',''));hideBorderWidthPalette();   });
			
			
     			swatch.bind("mouseover", function(e)
			{ 
       				$(this).css("border", "1px solid #AAAAAA"); 
     			}); 
     			swatch.bind("mouseout", function(e)
			{ 
       				$(this).css("border", "1px solid #EEEEEE");
     			});
     		swatch.appendTo("#"+id);
   		});


        }
        
    })(jQuery);





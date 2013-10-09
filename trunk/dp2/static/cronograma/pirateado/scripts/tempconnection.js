	function drawTempConnection(node,direction,port,canvasobj,line)
	{

		direction = node+"_"+direction;
		
		var startx;
		var starty;
		var endx=port.position().left + $("#"+node).position().left + $(canvasobj.getCanvas).scrollLeft();
		var endy=port.position().top + $("#"+node).position().top + $(canvasobj.getCanvas).scrollTop();
		var nodex=  $("#"+node).position().left + $(canvasobj.getCanvas).scrollLeft();
		var nodey= $("#"+node).position().top + $(canvasobj.getCanvas).scrollTop();
		var nodeWidth=$("#"+node).width();
		var nodeHeight=$("#"+node).height();
		var halfNodeWidth = Math.floor(nodeWidth/2);
		var halfNodeHeight = Math.floor(nodeHeight/2);
		var zone;
		var portNumber;

		if(direction.match(/_n$/))
		{
			startx = nodex + halfNodeWidth;
			starty = nodey;
			portNumber=1;
		}else if(direction.match(/_e$/))
		{
			startx = nodex + nodeWidth;
			starty = nodey + halfNodeHeight;
			portNumber=2;
		}else if(direction.match(/_s$/))
		{
			startx = nodex + halfNodeWidth;
			starty = nodey + nodeHeight;
			portNumber=3;
		}else if(direction.match(/_w$/))
		{
			startx = nodex;
			starty = nodey + halfNodeHeight;
			portNumber=4;
		}
		



		if(endx <= (nodex + halfNodeWidth))
		{
			if(endy <= (nodey + halfNodeHeight)) /* Top Left Corner*/
			{
				if(endy <= nodey) /* z8, z1a*/
				{
					if(endy >= nodey-10 && endx>nodex)
					{
							zone="Z1A10";
							line.clear();
					}else
					{
						if(endx <= nodex-10)
						{
							zone="Z8";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z8";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,endy);
									line.drawLine((nodex)+halfNodeWidth,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z8";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z8";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z8";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, endx, nodey+halfNodeHeight);
									line.drawLine(endx, nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
							}

						}else
						{
							zone="Z1A";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z1A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,endy);
									line.drawLine((nodex)+halfNodeWidth,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z1A";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z1A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, nodex -10,nodey+nodeHeight+10);
									line.drawLine(nodex -10,nodey+nodeHeight+10, nodex -10,endy);
									line.drawLine(nodex -10,endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z1A";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}
					}

				}else
				{
					if(endx <= nodex-10)
					{
						zone="Z7B";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z7B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z7B";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey-10);
									line.drawLine((nodex)+nodeWidth+10,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z7B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z7B";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, endx, nodey+halfNodeHeight);
									line.drawLine(endx, nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
							}

					}else
					{
						zone="Z7B10";
						line.clear();
					}

				}
			}else /* Bottom Left Corner*/
			{
				if(endy >= nodey+nodeHeight) /* z6, z5b*/
				{
					if((endy <= nodey+nodeHeight+10) && (endx>=nodex))
					{
							zone="Z5B10";
							line.clear();
					}else
					{
						if(endx <= nodex-10)
						{
							zone="Z6";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z6";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy-10);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z6";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z6";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, endy);
									line.drawLine((nodex)+halfNodeWidth, endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z6";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, endx, nodey+halfNodeHeight);
									line.drawLine(endx, nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
							}

						}else
						{
							zone="Z5B";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z5B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, nodex-20,nodey-10);
									line.drawLine(nodex-20,nodey-10, nodex-20,endy);
									line.drawLine(nodex-20,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z5B";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z5B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, endy);
									line.drawLine((nodex)+halfNodeWidth, endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z5B";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}
					}

				}else
				{
					if(endx <= nodex-10)
					{
						/*zone="Z7A";*/
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z7A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();

								break;
								case 2:
									zone = "E ---> Z7A";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+nodeHeight+10);
									line.drawLine((nodex)+nodeWidth+10,nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z7A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z7A";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, endx, nodey+halfNodeHeight);
									line.drawLine(endx, nodey+halfNodeHeight, endx,endy);
									line.paint();

								break;
							}

					}else
					{
						zone="Z7A10";
						line.clear();
					}

				}

			}

		}else
		{
			if(endy <= (nodey + halfNodeHeight)) /* Top Right Corner*/
			{
				if(endy <= nodey) /* z1b, z2*/
				{
					if(endy >= nodey-10 && endx<=nodeWidth)
					{
							zone="Z1B10";
							line.clear();
					}else
					{
						if(endx <= nodex+nodeWidth)
						{
							zone="Z1B";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z1B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,endy);
									line.drawLine((nodex)+halfNodeWidth,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z1B";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z1B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, nodex + nodeWidth+10,nodey+nodeHeight+10);
									line.drawLine(nodex + nodeWidth+10,nodey+nodeHeight+10, nodex + nodeWidth+10,endy);
									line.drawLine(nodex + nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z1B";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}else
						{
							zone="Z2";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z2";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,endy);
									line.drawLine((nodex)+halfNodeWidth,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z2";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, endx,nodey+halfNodeHeight);
									line.drawLine(endx,nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z2";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z2";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}
					}

				}else
				{
					if(endx <= nodex+nodeWidth+10)
					{
						zone="Z3A10";
						line.clear();
					}else
					{
						zone="Z3A";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z3A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z3A";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, endx,nodey+halfNodeHeight);
									line.drawLine(endx,nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z3A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z3A";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,nodey-10);
									line.drawLine(nodex-10,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
							}

					}

				}

			}else /* Bottom Right Corner*/
			{
				if(endy >= nodey+nodeHeight) /* z5a, z4*/
				{
					if((endy <= nodey+nodeHeight+10) && (endx <= nodex+nodeWidth))
					{
							zone="Z5A10";
							line.clear();
					}else
					{
						if(endx <= nodex+nodeWidth)
						{
							zone="Z5A";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z5A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, nodex+nodeWidth+10,nodey-10);
									line.drawLine(nodex+nodeWidth+10,nodey-10, nodex+nodeWidth+10,endy);
									line.drawLine(nodex+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z5A";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, (nodex)+nodeWidth+10,nodey+halfNodeHeight);
									line.drawLine((nodex)+nodeWidth+10,nodey+halfNodeHeight, (nodex)+nodeWidth+10,endy);
									line.drawLine((nodex)+nodeWidth+10,endy, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z5A";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, endy);
									line.drawLine((nodex)+halfNodeWidth, endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z5A";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}else
						{
							zone="Z4";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z4";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z4";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, endx,nodey+halfNodeHeight);
									line.drawLine(endx,nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z4";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, endy);
									line.drawLine((nodex)+halfNodeWidth, endy, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z4";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,endy);
									line.drawLine(nodex-10,endy, endx,endy);
									line.paint();
								break;
							}

						}
					}

				}else
				{
					if(endx <= nodex+nodeWidth+10)
					{
						zone="Z3B10";
						line.clear();
					}else
					{
						zone="Z3B";
							switch (portNumber)
							{
								case 1:
									zone = "N ---> Z3B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey, (nodex)+halfNodeWidth,nodey-10);
									line.drawLine((nodex)+halfNodeWidth,nodey-10, endx,nodey-10);
									line.drawLine(endx,nodey-10, endx,endy);
									line.paint();
								break;
								case 2:
									zone = "E ---> Z3B";
									line.clear();
									line.drawLine((nodex)+nodeWidth, nodey+halfNodeHeight, endx,nodey+halfNodeHeight);
									line.drawLine(endx,nodey+halfNodeHeight, endx,endy);
									line.paint();
								break;
								case 3:
									zone = "S ---> Z3B";
									line.clear();
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight, (nodex)+halfNodeWidth, nodey+nodeHeight+10);
									line.drawLine((nodex)+halfNodeWidth, nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
								case 4:
									zone = "W ---> Z3B";
									line.clear();
									line.drawLine(nodex, nodey+halfNodeHeight, nodex-10, nodey+halfNodeHeight);
									line.drawLine(nodex-10, nodey+halfNodeHeight, nodex-10,nodey+nodeHeight+10);
									line.drawLine(nodex-10,nodey+nodeHeight+10, endx,nodey+nodeHeight+10);
									line.drawLine(endx,nodey+nodeHeight+10, endx,endy);
									line.paint();
								break;
							}
					}

				}

			}

			


		}




		
	}


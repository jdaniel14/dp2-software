function comparaMenorFecha(diaMenor,mesMenor, anioMenor,diaMayor,mesMayor, anioMayor){
	
	if (anioMayor>anioMenor){
		return true;
	}else{
		if (anioMayor==anioMenor){
			if (mesMayor>mesMenor){
				return true;
			}else{
				if (mesMayor==mesMenor){
					if (diaMayor>diaMenor){
						return true;
					}
				}
			}
		}
	}
	return false;
}

function comparaMenorIgualFecha(diaMenor,mesMenor, anioMenor,diaMayor,mesMayor, anioMayor){
	
	if (anioMayor>anioMenor){
		return true;
	}else{
		if (anioMayor==anioMenor){
			if (mesMayor>mesMenor){
				return true;
			}else{
				if (mesMayor==mesMenor){
					if (diaMayor>=diaMenor){
						return true;
					}
				}
			}
		}
	}
	return false;
}
function setDoubleRange(configDoubleRange)
{
	//Configuration du mobule :
	var classOrIDDoubleRange = configDoubleRange.element;
	var minValue = configDoubleRange.minValue;
	var maxValue = configDoubleRange.maxValue;
	var maxInfinite = configDoubleRange.maxInfinite;
	var stepValue = configDoubleRange.stepValue;
	var unite = configDoubleRange.unite;

	var doubleRange = document.querySelector(classOrIDDoubleRange);
	var barre = doubleRange.querySelector('.barre');
	var barreMilieu = doubleRange.querySelector('.barreMilieu');
	var thumb1 = doubleRange.querySelector('.t1');
	var thumb2 = doubleRange.querySelector('.t2');

	var draggable = false;
	var targetToMove = false;
	var largeurBarre = barre.scrollWidth;
	var margeLeftBarre = barre.getBoundingClientRect().left;

	//Le mousemove est détecté sur la div contenant tout le double range pour éviter les pertes de suivis si la souris sort du thumb
	//Detection de la souris pour les ordinateurs :
	thumb1.addEventListener("mousedown", dragStart, false);
	thumb2.addEventListener("mousedown", dragStart, false);
	doubleRange.addEventListener("mousemove", drag, false);
	document.addEventListener("mouseup", dragStop, false);

	//Detection du tactile pour les téléphone/tablettes... :
	thumb1.addEventListener("touchstart", dragStart, false);
	thumb2.addEventListener("touchstart", dragStart, false);
	doubleRange.addEventListener("touchmove", drag, false);
	document.addEventListener("touchend", dragStop, false);
	
	function dragStart(e){ draggable = true; targetToMove = e.target.className.split(' ')[0]; largeurBarre = barre.scrollWidth; margeLeftBarre = barre.getBoundingClientRect().left; }
	function dragStop(){ draggable = false; targetToMove = false; }

	function drag(e)
	{
		if(draggable && targetToMove != false)
		{
			var thumbToMove = doubleRange.querySelector('.'+targetToMove);
			//Detection de la position X de la souris :
			var x = e.clientX;
			//Detection de la position X pour le tactile :
			if(e.type === 'touchmove'){ x = e.touches[0].clientX; }

			var pourcentage = ((x-margeLeftBarre)*100)/largeurBarre;

			if(pourcentage <= 0 || pourcentage >= 100){ return false; }

			//Déplacement du thumb :
			thumbToMove.style.left = pourcentage+'%';
			
			//Mise à jour de la barre du milieu et des labels :
			majBarreMilieuETLabels();
		}
	}

	function majBarreMilieuETLabels()
	{
		var pourcentageT1 = parseFloat(thumb1.style.left);
		var pourcentageT2 = parseFloat(thumb2.style.left);
		var labelMin = doubleRange.querySelector('.labelMin');
		var labelMax = doubleRange.querySelector('.labelMax');
		var inputMin = doubleRange.querySelector('.inputMin');
		var inputMax = doubleRange.querySelector('.inputMax');

		//Detection du pourcentage le plus petit et le plus grand, car les thumbs peuvent se croiser :
		var pourcentageMin = pourcentageMax = 0;
		if(pourcentageT1 <= pourcentageT2){ pourcentageMin = pourcentageT1; pourcentageMax = pourcentageT2; }
		else{ pourcentageMin = pourcentageT2; pourcentageMax = pourcentageT1; }

		//Mise à jour de la position de la barre du milieu
		barreMilieu.style.left = pourcentageMin+'%';
		barreMilieu.style.width = (pourcentageMax-pourcentageMin)+'%';

		//Mise à jour des labels :
		labelMin.textContent = convertionPercentForValue(pourcentageMin);
		labelMax.textContent = convertionPercentForValue(pourcentageMax);

		//Mise à jour des inputs :
		inputMin.value = convertionPercentForValue(pourcentageMin, false);
		inputMax.value = convertionPercentForValue(pourcentageMax, false);

		//Gestion du maxInfinite (remplace la valeur du max par l'infini) :
		console.log(pourcentageMax);
		if(pourcentageMax > 99 && maxInfinite == true){ labelMax.textContent = '∞'; inputMax.value = ''; }
	}

	function convertionPercentForValue(pourcentage, afficherUnite = true)
	{
		//Converti le pourcentage en valeur par rapport au minValue et maxValue :
		var resPFV = ((pourcentage*(maxValue-minValue))/100)+minValue;
		//Arrondie la valeur par rapport au chiffre stepValue :
		resPFV = Math.round(resPFV/stepValue)*stepValue;
		//Ajoute l'unité :
		if(afficherUnite){ resPFV = resPFV+' '+unite; }

		return resPFV;
	}
}
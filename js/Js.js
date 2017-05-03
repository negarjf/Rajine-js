$(function(){

		//Input variables
		var $densInput = $('#planDens'),
			$heightInput = $('#planHeight'),
			$widthInput = $('#planWidth'),
			$unit = $('#planUnit'),
		//Group A results
			$resA = $('.resA span'),
			$aWidth = $resA.eq(1),
			$aHeight = $resA.eq(0),
		//Group B results
			$resB = $('.resB span'),
			$bWidth_px = $resB.eq(0),
			$bHeight_px = $resB.eq(1),
			$bWidth_cm = $resB.eq(2),
			$bHeight_cm = $resB.eq(3),
		//Group C results
			$resC = $('.resC span'),
			$cInch = $resC.eq(0),
			$cCm = $resC.eq(1),
		//Group D results
			$resD = $('.resD span'),
			$dBorder = $resD.eq(1),
			$dMain = $resD.eq(0),
		//Table Cells
			$tr = $('#tableData>tr'),
			$td = $tr.children('td'),
			$td1 = $tr.eq(0).children('td').eq(0),
			$td2 = $tr.eq(1).children('td').eq(0),
			$td3 = $tr.eq(2).children('td').eq(0),
			$td4 = $tr.eq(3).children('td').eq(0),
			$td5 = $tr.eq(4).children('td').eq(0);



		$('select#planType').on('click',function(){

			$('#planUnit').val($(this).children('option:checked').data('unit'));

		});

		$('form button.cal-btn').on('click',function(event){
			event.preventDefault();
			var densValue = $densInput.val(),
				heightValue = $heightInput.val(),
				widthValue = $widthInput.val(),
				unit = $unit.val(),
				ratio = $('select#planRatio option:checked').data('ratio'),
				border = $('select#planBorder option:checked').data('open');


			//calculation

			var aWidth = ( widthValue/unit ).toFixed(1),
				aHeight = ( heightValue/unit ).toFixed(1),
				ratioArrey = ratio.split(','),
				bWidth_cm = Math.round( widthValue*(ratioArrey[0]) ),
				bHeight_cm = Math.round( heightValue*(ratioArrey[1]) ),
				bWidth_px = Math.round( aWidth*densValue*(ratioArrey[0]) ),
				bHeight_px = Math.round( aHeight*densValue*(ratioArrey[1]) ),
				cCm = ( densValue/unit ).toFixed(2),
				cInch = (cCm*2/54).toFixed(2),
				dBorder = Math.round(bWidth_px/3),
				dMain = bWidth_px - dBorder,
				td5 = Math.round( dBorder/21 ),
				sum = 0;
				
				if( border == 'false'){
					var td2 = (td5*4),
						td3 = 0,
						td4 = 3;
				}else{
					var td2 = (td5*3),
						td3 = td5,
						td4 = 2;
				}

				var td1 = (dBorder-(td2*2)-(td3*4)-(td4*4)-td5);


				$aWidth.html(aWidth);
				$aHeight.html(aHeight);
				$bWidth_cm.html(bWidth_cm+'cm');
				$bHeight_cm.html(bHeight_cm + 'cm');
				$bWidth_px.html(bWidth_px + 'px');
				$bHeight_px.html( bHeight_px + 'px' );
				$cCm.html( cCm );
				$cInch.html(cInch);
				$dBorder.html(dBorder + 'px');
				$dMain.html(dMain + 'px');
				$td5.html(td5);
				$td4.html(td4);
				$td3.html(td3);
				$td2.html(td2);
				$td1.html(td1);

				$tr.each(function(){
					var $this = $(this),
						col1 = $this.children('td').eq(0).text(),
						col2 = $this.children('td').eq(1).text(),
						col3 = eval(col1*col2);
					$this.children('td').eq(2).html(col3);
					sum += col3;
					$('#total').html(sum);
				});


			
		});

});
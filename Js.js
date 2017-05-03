$(function(){

		//Input variables
		var $DensInput = $('#planDens'),
			$HeightInput = $('#planHeight'),
			$WidthInput = $('#planWidth'),
			$Unit = $('#planUnit'),
		//Group A results
			$resA = $('.resA span'),
			$AWidth = $resA.eq(1),
			$AHeight = $resA.eq(0),
		//Group B results
			$resB = $('.resB span'),
			$BWidth_px = $resB.eq(0),
			$BHeight_px = $resB.eq(1),
			$BWidth_cm = $resB.eq(2),
			$BHeight_cm = $resB.eq(3),
		//Group C results
			$resC = $('.resC span'),
			$CInch = $resC.eq(0),
			$CCm = $resC.eq(1),
		//Group D results
			$resD = $('.resD span'),
			$DBorder = $resD.eq(1),
			$DMain = $resD.eq(0),
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
			var DensValue = $DensInput.val(),
				HeightValue = $HeightInput.val(),
				WidthValue = $WidthInput.val(),
				Unit = $Unit.val(),
				Ratio = $('select#planRatio option:checked').data('ratio'),
				Border = $('select#planBorder option:checked').data('open');


			//calculation

			var AWidth = ( WidthValue/Unit ).toFixed(1),
				AHeight = ( HeightValue/Unit ).toFixed(1),
				RatioArrey = Ratio.split(','),
				BWidth_cm = Math.round( WidthValue*(RatioArrey[0]) ),
				BHeight_cm = Math.round( HeightValue*(RatioArrey[1]) ),
				BWidth_px = Math.round( AWidth*DensValue*(RatioArrey[0]) ),
				BHeight_px = Math.round( AHeight*DensValue*(RatioArrey[1]) ),
				CCm = ( DensValue/Unit ).toFixed(2),
				CInch = (CCm*2/54).toFixed(2),
				DBorder = Math.round(BWidth_px/3),
				DMain = BWidth_px - DBorder,
				td5 = Math.round( DBorder/21 ),
				sum = 0;
				
				if( Border == 'false'){
					var td2 = (td5*4),
						td3 = 0,
						td4 = 3;
				}else{
					var td2 = (td5*3),
						td3 = td5,
						td4 = 2;
				}

				var td1 = (DBorder-(td2*2)-(td3*4)-(td4*4)-td5);


				$AWidth.html(AWidth);
				$AHeight.html(AHeight);
				$BWidth_cm.html(BWidth_cm+'cm');
				$BHeight_cm.html(BHeight_cm + 'cm');
				$BWidth_px.html(BWidth_px + 'px');
				$BHeight_px.html( BHeight_px + 'px' );
				$CCm.html( CCm );
				$CInch.html(CInch);
				$DBorder.html(DBorder + 'px');
				$DMain.html(DMain + 'px');
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
					$('#Total').html(sum);
				});


			
		});

});
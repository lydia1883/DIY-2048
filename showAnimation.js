/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-13 10:45:48
 * @version $Id$
 */


function showNumberWithAnimation(i,j,randNumber){

	var numberCell=$('#number-cell-'+i+'-'+j);  //通过id获取相应的number cell的元素

	numberCell.css('background',getNumberBackgroundColor(randNumber));//设置背景色
    numberCell.css('color',getNumberColor(randNumber));//设置前景色
    numberCell.text( randNumber );//设置数字

    numberCell.animate({

    	width:"100px",
    	height:"100px",
    	top:getPosTop(i,j),   
    	left:getPosLeft(i,j)//设置宽高
    },50);

};

function showMoveAnimation(fromx,fromy,tox,toy){

	var numberCell=$('#number-cell-'+fromx+'-'+fromy);//拼出相应的id，并获取

	numberCell.animate({

		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)

	},200)

}


function updateScore(score){

	$("#score").text(score);	
}

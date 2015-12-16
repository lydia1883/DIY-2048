/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-13 10:48:22
 * @version $Id$
 */

var board=new Array();
var score=0;
var hasConflicted=new Array();




$(document).ready(function(){
	newGame();
})

function newGame(){
    //初始化棋盘格
    init();

    //在随机的两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){

 for(var i=0;i<4;i++){
 	for(var j=0;j<4;j++){
		var gridCell=$("#grid-cell-"+i+"-"+j);
		 gridCell.css('top',getPosTop(i,j));
		 gridCell.css('left',getPosLeft(i,j));		
 	}
 }

  for(var i=0;i<4;i++){
  	board[i]=new Array();//把一维数组每一位变成数组，即成二维数组
	hasConflicted[i]=new Array();

  	for(var j=0;j<4;j++){
  		board[i][j]=0;//初始化数组为零
  		hasConflicted[i][j]=false;
     }
   }
     updateBoardView();//二维数组变化使视图的发生变化

     score=0;
}

function updateBoardView(){

 $('.number-cell').remove();//先清空
 for(var i=0;i<4;i++){
 	for(var j=0;j<4;j++){
 		$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');//将生成的number-cell数字添加到游戏区域,自动生成id
 		var theNumberCell=$('#number-cell-'+i+'-'+j);


 		if(board[i][j]==0){ //当二维数组为零

 			theNumberCell.css('width','0');//初始化数字为不可见
 			theNumberCell.css('height','0');

 			theNumberCell.css('left',getPosLeft(i,j)+50);//初始化数字在格子中间
 			theNumberCell.css('top',getPosTop(i,j)+50);

 		}else{//当二维数组被操作改变

 			theNumberCell.css('width','100px');//初始化数字为可见
 			theNumberCell.css('height','100px');

 			theNumberCell.css('left',getPosLeft(i,j));
 			theNumberCell.css('top',getPosTop(i,j));

 			theNumberCell.css( 'background', getNumberBackgroundColor( board[i][j] ));//设置背景色
 			theNumberCell.css( 'color', getNumberColor( board[i][j] ));//设置前景色
 			theNumberCell.text( board[i][j] );
 		}

 		 hasConflicted[i][j]=false;
	 }
  }

 
 
}


function generateOneNumber(){   //随机生成数字函数

	if( noSpace( board ) ){   //判断格子是否有空间
		return false;   //没有空间函数从出口返回
	}
	
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));//生成随机数,向下取整

	var times=0
	
	while(times<50){
		
		if(board[randx][randy]==0){//如果坐标可用，返回
			 break;
		}

		 randx=parseInt(Math.floor(Math.random()*4));//如果不可用，继续生成
	     randy=parseInt(Math.floor(Math.random()*4));//如果不可用，继续生成

	     times++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					
					randx=i;
					randy=j;
				}
			}
		}
	}

   	//随机一个数字(2,4)

   	var randNumber=Math.random() < 0.5 ? 2 : 4;	//随机数小于0.5，就生成2

   	//最随机位置显示随机数字

   	board[randx][randy]=randNumber;//更新数字变量

   	showNumberWithAnimation(randx,randy,randNumber);//生成数字
	
	return true;
}


 $(document).keydown(function(event){

 	switch(event.keyCode){

 		case 37:  //left
 		   if( moveLeft() ){
	 		   setTimeout(generateOneNumber(),210);
	 		    setTimeout(isGameOver(),300);
 		   }
 		   break;

 		case 38:  //up

 		 if( moveUp() ){
	 		   	setTimeout(generateOneNumber(),210);
	 		    setTimeout(isGameOver(),300);
 		   }
 		   break;
 		
 		case 39:  //right

 		 if( moveRight() ){
	 		 	setTimeout(generateOneNumber(),210);
	 		    setTimeout(isGameOver(),300);
 		   }
 		   break;

 		case 40:  //down

 		 if( moveDown() ){
	 		   setTimeout(generateOneNumber(),210);
	 		    setTimeout(isGameOver(),300);
 		   }

 		   break;   

 		default://default   

 		   break;	
 	}

 });

 function isGameOver(){

 	if( noSpace(board) && noMove(board) ){

 		gameover();
 	}
 }

  function gameover(){

  alert('gameover');

  }



 function moveLeft(){

 	if( !canMoveLeft(board) ){
 		return false;
 	}

 	//moveleft逻辑

 	for(var i=0;i<4;i++){  //4行
 		for(var j=1;j<4;j++){  //3列

 		   if(board[i][j]!=0){//当前数字不为零时

 		   		for(var k=0;k < j;k++){//遍历[i][j]左侧的元素

 		   			if( board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ){ //左侧某元素为零,并且没有障碍物   k为j(当前要移动的元素)左侧同行元素
 		   				//move
 		   				showMoveAnimation(i,j,i,k);
 		   				board[i][k]=board[i][j];//将移动元素赋给左边
 		   				board[i][j]=0;//原位置为零
 		   				continue;
 		   			}else if( board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){//左侧某元素与本移动数字相同,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,i,k);//移动到相同元素位置

 		   				//add
 		   				board[i][k]+=board[i][j];
 		   				board[i][j]=0;

 		   				//add score;;
 		   				score+=board[i][k];
 		   				updateScore(score);
 		   				
 		   				hasConflicted[i][k]=true;	
 		   				continue;
 		   			}
 		   		}
 		    }

 		}
 	}

 	setTimeout("updateBoardView()",200);  //对整体数据刷新
 	return true;
 }


  function moveRight(){ 

 	if( !canMoveRight(board) ){
 		return false;
 	}

 	//moveUp逻辑

 	for(var i=0;i<4;i++){  //4行
 		for(var j=2;j>=0;j--){  //3列

 		   if(board[i][j]!=0){//当前数字不为零时

 		   		for(var k=3;k>j;k--){//遍历[i][j]右侧的元素

 		   			if( board[i][k] == 0 && noBlockHorizontal(i,j,k,board) ){ //左侧某元素为零,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,i,k);
 		   				board[i][k]=board[i][j];//将移动元素赋给左边
 		   				board[i][j]=0;//原位置为零
 		   				continue;
 		   			}else if( board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k] ){//左侧某元素与本移动数字相同,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,i,k);

 		   				//add
 		   				board[i][k]+=board[i][j];
 		   				board[i][j]=0;

 		   				score+=board[i][k];

 		   				updateScore(score);

 		   				hasConflicted[i][k]=true;	
 		   				
 		   				continue;
 		   			}
 		   		}
 		    }

 		}
 	}

 	setTimeout("updateBoardView()",200);  //对整体数据刷新
 	return true;
 }


 function moveUp(){

 	if( !canMoveUp(board) ){
 		return false;
 	}

 	//moveUp逻辑
for(var j=0;j<4;j++){  //4列
 	
 	for(var i=1;i<4;i++){	//3行	  

 		   if(board[i][j]!=0){//当前数字不为零时

 		   		for(var k=0;k < i;k++){//遍历[i][j]上方的元素

 		   			if( board[k][j] == 0 && noBlockVertical(j,k,i,board) ){ //左侧某元素为零,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,k,j);
 		   				board[k][j]=board[i][j];//将移动元素赋给左边
 		   				board[i][j]=0;//原位置为零
 		   				continue;
 		   			}else if( board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[i][k] ){//左侧某元素与本移动数字相同,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,k,j);

 		   				//add
 		   				board[k][j]*=2;
 		   				board[i][j]=0;

 		   				score+=board[k][j];

 		   				updateScore(score);

 		   				hasConflicted[i][k]=true;	
 		   				
 		   				continue;
 		   			}
 		   		}
 		    }

 		}
 	}

 	setTimeout("updateBoardView()",200);  //对整体数据刷新
 	return true;
 }

 function moveDown(){

 	if( !canMoveDown(board) ){
 		return false;
 	}

 	//moveDown逻辑

  for(var j=0;j<4;j++){  //4列
	for(var i=2;i>=0;i--){  //3行

 		   if(board[i][j]!=0){//当前数字不为零时

 		   		for(var k=3;k > i;k--){//遍历[i][j]下侧的元素

 		   			if( board[k][j] == 0 && noBlockVertical(j,i,k,board) ){ //左侧某元素为零,并且没有障碍物
 		   				//move
 		   				showMoveAnimation(i,j,k,j);
 		   				board[k][j]=board[i][j];//将移动元素赋给左边
 		   				board[i][j]=0;//原位置为零
 		   				continue;
 		   			}else if( board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[i][k] ){//左侧某元素与本移动数字相同,并且没有障碍物
 		   				//move
 		   				showMoveAnimation( i , j , k , j );

 		   				//add
 		   				board[k][j]=board[i][j]
 		   				board[i][j]=0;

 		   				score+=board[k][j];

 		   				updateScore(score);
 		   				
 		   				hasConflicted[i][k] =true;
 		   				continue;
 		   			}
 		   		}
 		    }

 		}
 	}

 	setTimeout("updateBoardView()",200);  //对整体数据刷新
 	return true;
 }





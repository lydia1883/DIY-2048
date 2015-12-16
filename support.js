/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-13 10:45:58
 * @version $Id$
 */

 function getPosTop(i,j){

 	return 20+i*120;
}
 function getPosLeft(i,j){

 	return 20+j*120;

 }

 function getNumberBackgroundColor(number){

 	switch(number){

 	  case 2:return "#eee4da";break;
 	  case 4:return "#ede0c8";break;
 	  case 8:return "#f2b179";break;	
 	  case 16:return "#f59563";break;
 	  case 32:return "#f67c5f";break;
 	  case 64:return "#f65e3b";break;
 	  case 128:return "#edcf72";break;
 	  case 256:return "#edcc61";break;
 	  case 512:return "#9c0";break;
 	  case 1024:return "#33b5e5";break;
 	  case 2048:return "#09c";break;	
 	  case 4096:return "#a6c";break;
 	  case 8192:return "#93c";break;
 	  case 16384:return "#ccc";break;

 	}

 	return "black";
 }

 function getNumberColor(number){

 	if(number<=4){

 		return "#776e65";
 	}

 	return "#fff";
 }

 function noSpace( board ){  
 
 	for(var i=0;i<4;i++){   //遍历所有格子
 		for(var j=0;j<4;j++){
 			
 			if(board[i][j]==0){//说明格子还有空间
 				return false;
 			}
 		}
 	}

 	return true;
 }

 function canMoveLeft( board ){

 	for(var i=0;i<4;i++){  //4行
 		for(var j=1;j<4;j++){  //3列
 			
 			if(board[i][j]!=0){  //有数字的情况
 				if(board[i][j-1] == 0 || board[i][j-1]==board[i][j]){ //左边没有数字，或者左边数字与其相等

 					return true;//返回true以便使用
 				}
 			}	
 		}
 	}

 	return false;

 }
 function canMoveRight( board ){

 	for(var i=0;i<4;i++){  //4行
 		for(var j=2;j>=0;j--){  //3列
 			
 			if(board[i][j]!=0){  //有数字的情况
 				if(board[i][j+1] == 0 || board[i][j+1]==board[i][j]){ //左边没有数字，或者左边数字与其相等

 					return true;//返回true以便使用
 				}
 			}	
 		}
 	}

 	return false;

 }
 function canMoveUp( board ){	
	
	for(var j=0;j<4;j++){  //4列
	  for(var i=1;i<4;i++){ //3行
 			
 			if(board[i][j]!=0){  //有数字的情况
 				if(board[i-1][j] == 0 || board[i-1][j]==board[i][j]){ //左边没有数字，或者左边数字与其相等

 					return true;//返回true以便使用
 				}
 			}	
 		}
 	}

 	return false;

 }
 function canMoveDown( board ){

	for(var j=0;j<4;j++){  //4列
	  for(var i=2;i>=0;i--){  //3行
	 			
	 			if(board[i][j]!=0){  //有数字的情况
	 				if(board[i+1][j] == 0 || board[i+1][j]==board[i][j]){ //左边没有数字，或者左边数字与其相等

	 					return true;//返回true以便使用
	 				}
	 			}	
	 		}
	 	}

 	return false;

 }

 function noBlockHorizontal(row,col1,col2,board){

 	  for(var i=col1+1;i<col2;i++){//循环j左边元素

 	  	if(board[row][i]!=0){  //存在不等于零的元素
 	  		return false;
 	  	}
 	  }

  return true;

 }

 function noBlockVertical(col,row1,row2,board){

 	  for(var i=row1+1;i<row2;i++){//循环j上边元素

 	  	if(board[i][col]!=0){  //存在不等于零的元素
 	  		return false
 	  	}
 	  }

  return true;

 }

 function noMove(board){

 	if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){

 		return false;
 	}

 	return true;

 }




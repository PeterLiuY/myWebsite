/**
 * Created by LiuYing on 2017/12/10.
 */
/**********************************************
 * JavaScript扫雷游戏
 *
 * @author : Sailor
 *
 * @version : 1.0
 *
 * Date : 2010-03-15
 *
 * Email : zpsailor@yahoo.com.cn
 *
 **********************************************/

var Mine;//用来记录每个小方块应对应的值
var markNum=8;//用来记录用户标记的数目
/**
 * 布局游戏界面 size是布局大小，number是布雷数
 */
function Interface(size,number){
    markNum=number;
    var mainFrame=$("mainInt");
    $("markNum").innerText=markNum;
    mainFrame.innerText="";
    var mine=new Array(size);
    for(var i=0;i<size;i++){
        mine[i]=new Array(size);
    }
    mine=randomNumber(mine,number);
    Mine=mine;
    for(var i=0;i<size;i++){
        mainFrame.appendChild(createRow(i,size,mine));
    }
}

/**
 * randomNumber
 * 参数mine,num分别表示一个二维数组和布雷的数目
 */
function randomNumber(mine,num) {
    var mine=mine;
    var rows=mine.length;
    var cols=mine.length;
    var i=0;

//完成布雷工作
    while(i<num){
        var row=Math.ceil((rows*Math.random()))-1;
        var col=Math.ceil((cols*Math.random()))-1;
        if(mine[row][col]!="雷"){
            mine[row][col]="雷";
            i++;
        }
    }

    //完成雷数提示工作
    for(var i=0;i<rows;i++){
        for(var j=0;j<cols;j++){
            var mineNum=0;
            //判断左上
            if((i-1>=0)&&(j-1>=0)){
                if(mine[i-1][j-1]=="雷")
                    mineNum++;
            }
            //判断正上
            if(i>=1){
                if(mine[i-1][j]=="雷")
                    mineNum++;
            }
            //判断右上
            if((i-1>=0)&&(j<=cols-2)){
                if(mine[i-1][j+1]=="雷")
                    mineNum++;
            }
            //判断左边
            if(j>=1){
                if(mine[i][j-1]=="雷")
                    mineNum++;
            }
            //判断右边
            if(j<=cols-2){
                if(mine[i][j+1]=="雷")
                    mineNum++;
            }
            //判断左下
            if((i<=rows-2)&&(j-1>=0)){
                if(mine[i+1][j-1]=="雷")
                    mineNum++;
            }
            //判断正下
            if(i<=rows-2){
                if(mine[i+1][j]=="雷")
                    mineNum++;
            }
            //判断右下
            if((i<=rows-2)&&(j<=cols-2)){
                if(mine[i+1][j+1]=="雷")
                    mineNum++;
            }
            if(mine[i][j]!="雷"){
                mine[i][j]=mineNum;
            }
        }
    }
    return mine;
}

/**
 * 创建行
 */
function createRow(row,len,mine){
    var mine=mine;
    var tr=document.createElement("tr");
    for(var i=0;i<len;i++){
        var td=document.createElement("td");
        var button=document.createElement("input");
        button.type="button";
        button.id=row+"."+i;
        button.className="myButton";

        var context=mine[row][i];
        button.onclick=function (){
            //alert(this.id)
            getValue(this);
            if(this.value=="雷"){
                this.className="myButton_";
                getValue("over");
                alert("你触雷了，游戏结束！");
                if(confirm("重新开始？")){
                    window.location.reload();
                }
                return false;
            }
            if(this.value==0){
                showSpace2(this);
            }
            this.oncontextmenu=function (){
                return false;
            }
            judge();
        };
        button.oncontextmenu=function (){

            if(this.value=="确定"){
                this.value="?";
                markNum++;
                $("markNum").innerHTML=markNum;
            }else if(this.value=="?"){
                this.value="";
            }else{
                this.value="确定";
                markNum--;
                $("markNum").innerHTML=markNum;
                judge();
            }

        }
        //button.value=mine[row][i];
        td.appendChild(button);
        tr.appendChild(td);
    }
    return tr;
}


//当点击的不是空白区或者是触动雷的时候调用下面的函数
function getValue(object){
    if("over"!=object){
        var id=object.id;
        var button=document.getElementById(id);
        var row=id.split(".")[0];
        var col=id.split(".")[1];
        button.value=Mine[row][col];
        button.className="myButton"+button.value;
    }else{
        for(var i=0;i<Mine.length;i++)
            for(var j=0;j<Mine[i].length;j++){
                var button = $(i+"."+j);
                if(Mine[i][j]=="雷"){
                    button.value=Mine[i][j];
                    button.className="myButton_";
                }
            }
    }
}

/**
 * 当点击的区域为空白区域时调用的下面的函数将与该区域相连的空白区域都显示出来
 */

function showSpace(object){
    var id=object.id;
    var button=document.getElementById(id);
    var cols=Mine.length;
    var rows=Mine.length;
    var mark=0;
    while(mark<cols){
        for(var i=0;i<cols;i++)
            for(var j=0;j<rows;j++){
                var button2 = $(i+"."+j);
                if(button2.value=="0"){
                    //判断左上
                    if((i-1>=0)&&(j-1>=0)){
                        var but=$((i-1)+"."+(j-1));
                        but.value=(Mine[i-1][j-1]=="雷") ? "" : Mine[i-1][j-1];
                        but.className="myButton"+but.value;
                    }
                    //判断正上
                    if(i>=1){
                        var but=$((i-1)+"."+(j));
                        but.value=(Mine[i-1][j]=="雷") ? "" : Mine[i-1][j];
                        but.className="myButton"+but.value;
                    }
                    //判断右上
                    if((i-1>=0)&&(j<=cols-2)){
                        var but=$((i-1)+"."+(j+1));
                        but.value=(Mine[i-1][j+1]=="雷") ? "" : Mine[i-1][j+1];
                        but.className="myButton"+but.value;
                    }
                    //判断左边
                    if(j>=1){
                        var but=$((i)+"."+(j-1));
                        but.value=(Mine[i][j-1]=="雷") ? "" : Mine[i][j-1];
                        but.className="myButton"+but.value;
                    }
                    //判断右边
                    if(j<=cols-2){
                        var but=$((i)+"."+(j+1));
                        but.value=(Mine[i][j+1]=="雷") ? "" : Mine[i][j+1];
                        but.className="myButton"+but.value;
                    }
                    //判断左下
                    if((i<=rows-2)&&(j-1>=0)){
                        var but=$((i+1)+"."+(j-1));
                        but.value=(Mine[i+1][j-1]=="雷") ? "" : Mine[i+1][j-1];
                        but.className="myButton"+but.value;
                    }
                    //判断正下
                    if(i<=rows-2){
                        var but=$((i+1)+"."+(j));
                        but.value=(Mine[i+1][j]=="雷") ? "" : Mine[i+1][j];
                        but.className="myButton"+but.value;
                    }
                    //判断右下
                    if((i<=rows-2)&&(j<=cols-2)){
                        var but=$((i+1)+"."+(j+1));
                        but.value=(Mine[i+1][j+1]=="雷") ? "" : Mine[i+1][j+1];
                        but.className="myButton"+but.value;
                    }
                }
            }
        mark++;
    }
}

/**
 * 3月18日在showSpace()方法的基础上使用递归算法改进的，速度快了很多。
 */
function showSpace2(object){
    var id=object.id;
    var row=parseInt(id.split(".")[0]);
    var col=parseInt(id.split(".")[1]);
    //alert(row+"."+col);
    var cols=Mine.length;
    var rows=Mine.length;
    //判断左上
    if((row-1>=0)&&(col-1>=0)){
        var but=$((row-1)+"."+(col-1));
        if(but.value!="0"){
            but.value=(Mine[row-1][col-1]=="雷") ? "" : Mine[row-1][col-1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断正上
    if(row>=1){
        var but=$((row-1)+"."+(col));
        if(but.value!="0"){
            but.value=(Mine[row-1][col]=="雷") ? "" : Mine[row-1][col];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断右上
    if((row-1>=0)&&(col<=cols-2)){
        var but=$((row-1)+"."+(col+1));
        if(but.value!="0"){
            but.value=(Mine[row-1][col+1]=="雷") ? "" : Mine[row-1][col+1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断左边
    if(col>=1){
        var but=$((row)+"."+(col-1));
        if(but.value!="0"){
            but.value=(Mine[row][col-1]=="雷") ? "" : Mine[row][col-1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断右边
    if(col<=cols-2){
        var but=$((row)+"."+(col+1));
        if(but.value!="0"){
            but.value=(Mine[row][col+1]=="雷") ? "" : Mine[row][col+1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断左下
    if((row<=rows-2)&&(col-1>=0)){
        var but=$((row+1)+"."+(col-1));
        if(but.value!="0"){
            but.value=(Mine[row+1][col-1]=="雷") ? "" : Mine[row+1][col-1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断正下
    if(row<=rows-2){
        var but=$((row+1)+"."+(col));
        if(but.value!="0"){
            but.value=(Mine[row+1][col]=="雷") ? "" : Mine[row+1][col];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
    //判断右下
    if((row<=rows-2)&&(col<=cols-2)){
        var but=$((row+1)+"."+(col+1));
        if(but.value!="0"){
            but.value=(Mine[row+1][col+1]=="雷") ? "" : Mine[row+1][col+1];
            but.className="myButton"+but.value;
            if(but.value=="0"){
                showSpace2(but);
            }
        }
    }
}

/**
 * 判断是否说有的格子是否都是正确的找出来了
 */
function judge(){
    var cols=Mine.length;
    var rows=Mine.length;
    var allTrue=true;
    for(var i=0;i<cols;i++)
        for(var j=0;j<rows;j++){
            var button = $(i+"."+j);
            if(Mine[i][j]=="雷"&&button.value!="确定"){
                allTrue=false;
            }
            else if(Mine[i][j]!="雷"&&button.value!=Mine[i][j]){
                allTrue=false;
            }
        }
    if(allTrue){
        if(confirm("全部雷已经挖出，你胜利了!重新开始?")){
            window.location.reload();
        }
    }
}
/**
 * 选择难度
 */

function selectLevel(level){
    if(level=="1"){
        Interface(8,6);
    }else if(level=="2"){
        Interface(12,15);
    }else if(level=="3"){
        Interface(24,35);
    }
}

function $(id){
    return document.getElementById(id);
}
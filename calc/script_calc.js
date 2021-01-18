window.onload = init; //startup

//----------активные элементы-------------
var mainTxt = document.getElementById('mainTxt'); //основное поле ввода
var memTxt = document.getElementById('memTxt');	//поле памяти
var resTxt = document.getElementById('resTxt');	//поле предрасчета
var tt = document.getElementById('tt');	//всплывающая подсказка
var outMsg = document.getElementById('outMsg');	//полоса сообщений

//----------Переменные окружения----------
var zeroCnt = 1; //нулей после запятой в отображении

var mainTxt_txt = "0"; //значения полей
var memTxt_txt = "0";
var resTxt_txt = "0";


//-----------Переменные расчетов----------
var memNum = 0; //Значения для вычислений
var tmpEq = 0;
var mainNum = 0;

var currPart = 1;
var currOp = 1;

var canFinish = 1;
var isNumFinished = 1;
var finished = 0;

var op0 = "";
var firPart = 0;
var firSem = 0;
var op1 = "";
var secPart = 0;
var secSem = 0;
var op2 = "";
var thdPart = 0;
var thdSem = 0;

var tmpMainNum = new Array('',0,'',0,'',0,1);
var histArr = new Array();
var err = "Вводите данные";
//----------------------------------------

//STARTUP
function init()
{
	toolT();
	btns();
	//mainTxt.oninput = f5; //обработка ручного ввода
	//Ручной ввод и моментальный подсчет в данной версии не будут реализованы в связи с отсутствием времени
}



//------Функции работы интерфейса---------
function f5() //обновление данных UI 
{
	zeroCut();
	mainTxt_txt	= op0+String(firPart)+op1
	if (secPart != 0) mainTxt_txt += String(secPart)+op2;
	if (thdPart != 0) mainTxt_txt += String(thdPart);
	
	
	mainTxt.value = mainTxt_txt;
	memTxt.value = memTxt_txt;
	resTxt.value = resTxt_txt;
	outMsg.innerHTML = err;
}


function zeroCut() //Обрезка и округление чисел UI
{	
	memTxt_txt = memNum.toFixed(zeroCnt);	
	resTxt_txt = tmpEq.toFixed(zeroCnt);
}

function addNum(num) //Кнопки цифер
{
	if(finished == 1)
	{
		reset1();
		finished = 0;
	}
	if(String(mainNum).length<17)
	{
		if(!isNaN(num))
		{
			document.getElementById('btnCol').style.background = 'rgb(245,245,245) linear-gradient(#f4f4f4, #f1f1f1)';
			isNumFinished = 1;
			err = "Вводите данные";
			
			if(currPart == 1) 
				if(firSem == 1)
				{
					if(firPart!=0) firPart = parseFloat(String(String(firPart)+".").slice(0, -1));
					firPart = parseFloat(String(firPart)+'.'+String(num));
					firSem = 2;
				}
				else firPart = parseFloat(String(firPart)+String(num));
				
			if(currPart == 2) 
				if(secSem == 1)
				{
					if(secPart!=0) secPart = parseFloat(String(String(secPart)+".").slice(0, -1));
					secPart = parseFloat(String(secPart)+'.'+String(num));
					secSem = 2;
				}
				else secPart = parseFloat(String(secPart)+String(num));
			if(currPart == 3) thdPart = parseFloat(String(thdPart)+String(num));
			
			if(mainNum == 0) mainNum += num
			else mainNum += String(num);
		}
		
		//console.log(mainNum);
		if(num == ",")
		{
			if(currPart == 1) {if(!String(firPart).includes('.')) firSem = 1;}
			if(currPart == 2) {if(!String(secPart).includes('.')) secSem = 1;}
			if(currPart == 3) {if(!String(thdPart).includes('.')) thdSem = 1;}
			isNumFinished = 0;
			document.getElementById('btnCol').style.background = 'green';
			err = "Завершите дробную часть числа.";
		}
		if(num == "+-")
		{
			if(isNumFinished == 1)
			{
				if(currPart == 1) {firPart *= -1;}
				if(currPart == 2) {secPart *= -1;}
				if(currPart == 3) {thdPart *= -1;}
			}			
			f5();
		}
		
		
	}
	else err = "Введено максимальное число для расчетов: 16 знаков";
	
	f5();
}

function oper(op) //Кнопки операций
{
	
	mainNum = 0;
	
	if(finished == 1){
		reset2();
		finished = 0;
	}
	
	if(op == '=') proc(11);
	
	if((op == '+')||(op == '-')||(op == '*')||(op == '/')||(op == '^')||(op == '%'))
	{
		if(isNumFinished == 1)
			{
				if(currPart == 2) {proc(op);}
				if(currPart == 1) {op1 = op;currPart+=1;}
			}		
	}
	
	if(op == '1')
	{
		if(isNumFinished == 1)
			{
				if(currPart == 1) {op0 = "1/";}
			}		
	}
	
	if(op == '!')
	{
		if(isNumFinished == 1)
			{
				if(currPart == 1) {op1 = "!";}
			}		
	}	
	
	if(op == 'Q')
	{
		if(isNumFinished == 1)
			{
				if(currPart == 1) {op0 = '√'; op1="  ";}
			}		
	}
	if(op == 'S')
	{
		if(isNumFinished == 1)
			{
				if(currPart == 1) {op0 = 'Sin '; op1="   ";}
			}		
	}
	if(op == 'C')
	{
		if(isNumFinished == 1)
			{
				if(currPart == 1) {op0 = 'Cos '; op1="    ";}
			}		
	}
	f5();
}

function proc(op) // расчет
{
	//console.log("proc");
	//console.log(op0+"|"+firPart+"|"+op1+"|"+secPart+"|"+op2+"|"+thdPart);
	if(op == '11') {tmpEq = firPart;}
	if(op1 == '+') {tmpEq = firPart + secPart;}
	if(op1 == '-') {tmpEq = firPart - secPart;}
	if(op1 == '/') {if(secPart!=0)tmpEq = firPart / secPart; else err = ">>> Деление на ноль";}
	if(op1 == '*') {tmpEq = firPart * secPart;}
	if(op1 == '^') {tmpEq = Math.pow(firPart, secPart);}
	if(op1 == '%') {tmpEq = firPart*(secPart/100);}
	if(op0 == '1/') {tmpEq = 1/firPart;}
	if(op1 == '!') {tmpEq = factorial(firPart);}
	if(op1 == "  ") {tmpEq = Math.sqrt(firPart);}
	if(op1 == "   ") {tmpEq = Math.sin(firPart);}
	if(op1 == "    ") {tmpEq = Math.cos(firPart);}
	finished = 1;
	
	tmpMainNum[0]=op0;
	tmpMainNum[1]=firPart;
	tmpMainNum[2]=op1;
	tmpMainNum[3]=secPart;
	tmpMainNum[4]=op2;
	tmpMainNum[5]=thdPart;
	tmpMainNum[6]=currPart;
	histArr.push(tmpMainNum);
	tmpMainNum = [];
	//console.log(tmpMainNum);
	//buildHist(tmpMainNum);
	
}
//---------мелочи------------

function reset1()
{
	console.log("reset1");
	firPart = 0; 
	secPart = 0; 
	thdPart = 0; 
	currPart = 1;
	op1 = '';
	op2 = '';
	finished = 0;
	op0 = '';
}

function reset2()
{
	console.log("reset2");
	firPart = tmpEq; 
	secPart = 0; 
	thdPart = 0; 
	currPart = 1;
	currOp = 1;
	op1 = '';
	op2 = '';
	finished = 0;
	op0 = '';
}
function buildHist(item) //построить список истории
{
	if(item[0]=='') item[0] = ' ';
	if(item[2]=='') item[2] = ' ';
	if(item[3]!=0)sP = item[3]; else sP = ' ';
	if(item[4]=='') item[4] = ' ';
	if(item[5]!=0)tP = item[5]; else tP = ' ';
	
	tmp = "<div id=\"hItem\" title=\"Нажмите для выбора\" onclick=\"getHist([\'"+item[0]+"\',"+item[1]+",\'"+item[2]+"\',"+item[3]+",\'"+item[4]+"\',"+item[5]+","+item[6]+"])\"> "+item[0]+item[1]+item[2]+sP+item[4]+tP+"</div>";
	return tmp;
}
function getHist(arr) //выбор элемента истории
{
	
	if(arr[0]==' ') arr[0] = '';
	if(arr[2]==' ') arr[2] = '';
	if(arr[3]==' ') arr[3] = 0;
	if(arr[4]==' ') arr[4] = '';
	if(arr[5]==' ') arr[5] = 0;
	tmpMainNum = arr;
	console.log(tmpMainNum);
	btnCanc();
	err = "Продолжайте вычисления";
	f5();
}
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}
//----------------------------
function memory(op) // Кнопки памяти
{
	console.log("memory:"+op);
	if(op == '+') memNum += parseFloat(tmpEq);
	if(op == '-') memNum -= parseFloat(tmpEq);
	if(op == '*') memNum = memNum * parseFloat(tmpEq);
	if(op == '/') if(parseFloat(tmpEq) != 0) memNum = memNum / parseFloat(tmpEq); else err = ">>> Деление на ноль";
	if(op == 'C') memNum = 0;
	if(op == 'R') 
	{
		if(currPart == 1) firPart = memNum;
		if(currPart == 2) secPart = memNum;
		if(currPart == 3) thdPart = memNum;
	}
	f5();
}



//------Функции загрузки интерфейса-------
function toolT()
{	
	document.onmousemove = function(e) { moveTt(e);}
	document.body.appendChild(tt);
	
	mainTxt.onmouseover = function(e) {moveTt(e);ttxt(String(mainNum));} //tt для поля
	mainTxt.onmouseout = function(e) {tt.style.display = "none";}
	
	memTxt.onmouseover = function(e) {moveTt(e);ttxt(String(memNum));} //tt для поля
	memTxt.onmouseout = function(e) {tt.style.display = "none";}
	
	resTxt.onmouseover = function(e) {moveTt(e);ttxt(String(tmpEq));} //tt для поля
	resTxt.onmouseout = function(e) {tt.style.display = "none";}
	
	function ttxt(txt) //забивка текста для tt
	{ 			
		tt.innerHTML = txt;
		tt.style.display = "inline-block";
		tt.style.position = 'absolute';
		tt.style.zIndex = 1000;	
	}
	
	function moveTt(e,txt)//перемещение tt
	{	
		tt.style.left = e.pageX - tt.offsetWidth / 2 +20+ 'px';
		tt.style.top = e.pageY - tt.offsetHeight / 2 +20+ 'px';
	}
}

function btns()
{
	//UI
	document.getElementById('btnC').onclick = 			btnC;
	document.getElementById('btnCE').onclick =			btnCE;
	document.getElementById('btnBks').onclick = 		btnBks;
	document.getElementById('btnHist').onclick = 		btnHist;
	document.getElementById('btnCanc').onclick = 		btnCanc;
	document.getElementById('btnZLess').onclick = 		btnZLess;
	document.getElementById('btnZMore').onclick = 		btnZMore;
	
	//MEM
	document.getElementById('btnMPlus').onclick = 		function() {memory('+')};
	document.getElementById('btnMDiv').onclick = 		function() {memory('/')};
	document.getElementById('btnMRead').onclick = 		function() {memory('R')};
	document.getElementById('btnMMinus').onclick = 		function() {memory('-')};
	document.getElementById('btnMMult').onclick = 		function() {memory('*')};
	document.getElementById('btnMClr').onclick = 		function() {memory('C')};
	
	//MATH
	document.getElementById('btnPow').onclick = 		function() {oper('^')};
	document.getElementById('btn1X').onclick = 			function() {oper('1')};
	document.getElementById('btnSin').onclick = 		function() {oper('S')};
	document.getElementById('btnCos').onclick = 		function() {oper('C')};
	document.getElementById('btnFac').onclick = 		function() {oper('!')};
	document.getElementById('btnPlus').onclick = 		function() {oper('+')};
	document.getElementById('btnMinus').onclick = 		function() {oper('-')};
	document.getElementById('btnDiv').onclick = 		function() {oper('/')};
	document.getElementById('btnMult').onclick = 		function() {oper('*')};
	document.getElementById('btnMod').onclick = 		function() {oper('%')};
	document.getElementById('btnSqrt').onclick = 		function() {oper('Q')};
	document.getElementById('btnEq').onclick = 			function() {oper('=')};
	
	//NUM
	document.getElementById('btn0').onclick = 			function() {addNum(0)};
	document.getElementById('btn1').onclick = 			function() {addNum(1)};
	document.getElementById('btn2').onclick = 			function() {addNum(2)};
	document.getElementById('btn3').onclick = 			function() {addNum(3)};
	document.getElementById('btn4').onclick = 			function() {addNum(4)};
	document.getElementById('btn5').onclick = 			function() {addNum(5)};
	document.getElementById('btn6').onclick = 			function() {addNum(6)};
	document.getElementById('btn7').onclick = 			function() {addNum(7)};
	document.getElementById('btn8').onclick = 			function() {addNum(8)};
	document.getElementById('btn9').onclick = 			function() {addNum(9)};
	document.getElementById('btnCol').onclick = 		function() {addNum(',')};
	document.getElementById('btnPlMin').onclick = 		function() {addNum('+-')};
}

//----Кнопки------
//{
function btnC()
{
	mainNum = 0;
	tmpEq = 0;
	mainTxt.value = 0;
	isNumFinished = 1;
	
	currPart = 1;
    canFinish = 1;
	
	currOp = 1;
	firPart = 0;
	op1 = "";
	secPart = 0;
	op2 = "";
	thdPart = 0;
	finished = 0;
	op0 = "";
	
	err = "Вводите данные";
	f5();
}
function btnCE()
{
	if(currPart == 1) {firPart =  0; op1 = "";}
	if(currPart == 2) {secPart =  0; op2 = "";}
	if(currPart == 3) {thdPart =  0;}
	isNumFinished = 1;
	f5();
}
function btnBks()
{
	//console.log("cp:"+currPart);
	if(currPart == 1){ 
		if((firPart>0)&&(firPart<10))
			firPart = 0;
		
		if((firPart>0)||(firPart<0)) 
			firPart = parseFloat(String(firPart).slice(0, -1));
		else 
			firPart = 0;
	}
	if(currPart == 2){
		if((secPart>0)&&(secPart<10))
			secPart = 0; 
		if((secPart>0)||(secPart<0)) 
			secPart = parseFloat(String(secPart).slice(0, -1)); 
		else
		{	
			if(secPart == 0){ op1=""; currPart -=1;}			
		}
	}
	if(currPart == 3) {}

	f5();
}
function btnHist()
{
	err = '';
	f5();
	histArr.forEach(item => outMsg.innerHTML+=buildHist(item));
}
function btnCanc()
{
	finished = 0;
	op0=tmpMainNum[0];
	firPart=tmpMainNum[1];
	op1=tmpMainNum[2];
	secPart=tmpMainNum[3];
	op2=tmpMainNum[4];
	thdPart=tmpMainNum[5];
	currPart=tmpMainNum[6];
	err="Отменена расчетов"
	f5();
}
function btnZLess()
{
	if(zeroCnt>0)zeroCnt-=1;
	f5();
}
function btnZMore()
{
	if(zeroCnt<9)zeroCnt+=1;
	f5();
}
//}
//----------

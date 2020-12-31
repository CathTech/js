
// ###################################################################################################################
// Задание 1
function compare(a,b)
{
  let tmp = ["+",1];
  
  if(a>b)
  {tmp[0] = "больше"; tmp[1] = a/b; }
  else
    if (a==b)
      {tmp[0] = "равно"; tmp[1] = a/b; }
    else      
      {tmp[0] = "меньше"; tmp[1] = a/b; }
  var out = a+" "+tmp[0]+" "+b+" Множитель: "+tmp[1];
  
  console.log(out);
}
// ###################################################################################################################
//Задание 2
function sort(tmp)
{
  console.log(tmp);
  tmp.sort(function(a, b)
  {
     var nameA=a.toLowerCase(), nameB=b.toLowerCase();
     if (nameA < nameB) //сортировка выше
       return -1;
    
     if (nameA > nameB) //сортировка ниже
       return 1;
    
     return 0; //не сортирует
  });
  console.log(tmp);
}
// ###################################################################################################################
//Задание 3
function cut(tmp)
{
  console.log(tmp);
  var out=[];
  tmp.forEach(function(item, i, arr) 
    {
      if((item*item>20)&&(item*item<100))
        {
          out.push(item);
        }
    });
  console.log(out);
}

// ###################################################################################################################
//Задание 4
function what()
{
  for(var i = 1; i<26; i++)
    console.log("Я номер "+i);
}
// ###################################################################################################################
//Задание 5
function flip(tmp)
{
  console.log(tmp);
  var out=[];
  var lgt = tmp.length;
  
  tmp.forEach(function(item, i, arr) 
    {
      out[lgt-1]=item;
      lgt -=1;
    });
  
  console.log(out);
}
// ###################################################################################################################
//Задание 6
function split(tmp)
{
  console.log(tmp);
  var out=tmp.split("");  
  console.log(out);
}
// ###################################################################################################################
//Задание 7
function summ(tmp)
{
  console.log(tmp);
  var out = 0;
  tmp.forEach(function(item, i, arr) 
    {
      out+= item;
    });
  
  console.log(out);
}
// ###################################################################################################################
//Задание 8
function lgth(tmp)
{
  console.log(tmp);
  console.log(tmp.length);
}
// ###################################################################################################################
//Задание 9
function wtoto(tmp,num)
{
  for(var i = 0; i<parseInt(num); i++)
    console.log(tmp);
}

var comments = new Array();
var postNum = 0;
var lastComm = '';
var innHtml = '';
function getIt()
{
    var req = new XMLHttpRequest();
    req.open('GET', 'https://jsonplaceholder.typicode.com/comments', false);
    req.send();
    
    if (req.status != 200) {
        alert( req.status + ': ' + req.statusText );
    } 
    else {
        comments= JSON.parse(req.responseText );
    }
    console.log(comments);

    innHtml = '';
    console.log("Поехали! =_=");
    postNum = 0;
    comments.forEach(item => buildHtml(item));
    document.getElementById("mainBlock").innerHTML = innHtml;
    document.getElementById("textBlock").innerHTML = lastComm;
}

function buildHtml(item)
{
    
    let tmpEnd = '';
    if(postNum != parseInt(item.postId)){
        if(postNum != 0) {tmpEnd = "</div>";}else tmpEnd = ''; //на случай конца поста

        postNum++;
        let tmp = tmpEnd + 
            "<div id=\"post\">"+
                "<div id=\"postID\">Post: "+item.postId+"</div>";
        
                innHtml += tmp;
    }

    let tmp = 
        "<div id=\"comment\">"+
        "<div id=\"idBlock\">ID: "+item.id+"</div>"+
        "<div id=\"nameBlock\">"+item.name+"</div>"+
        "<div id=\"mailBlock\">"+item.email+"</div>"+
        "<div id=\"bodyBlock\">"+item.body+"</div>"+
        "</div>"
    
           
        innHtml += tmp;    
    console.log("post: "+postNum+" | comment: "+item.id);
    lastComm = "Постов: "+postNum+" | Комментариев: "+item.id;
}

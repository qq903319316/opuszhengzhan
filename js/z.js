$(function(){
  // banner轮播
  var banner=$(".banner")[0];
  var img=$("img",banner);
  var num=0;
  var t=setInterval(move,3000);

  function move(){
    num++;
    if (num>img.length-1) {
    	num=0
    }
  	for (var i = 0; i < img.length; i++) {
  		   animate(img[i],{opacity:0},500)
  	}
    animate(img[num],{opacity:1},500)
  }


// 节点轮播

var dada=$(".rightxiaokuang4")[0]

function lunbo(obj,num){
  var num=num||1;
var dakuang=$(".rightbaonei")[0];
var neikuang=$(".right4neikuang")[0];
var as=$("a",neikuang);
var btnl=$(".btnl")[0];
var btnr=$(".btnr")[0];
var widths=as[0].offsetWidth;
var flag=true;
var tt=setInterval(moveL,2000);

function moveL(){
  if (!flag) {
    return
  }
  flag=false;
    animate(neikuang,{left:-widths*num},function(){
      for (var i = 0; i < num; i++) {
        var first=getFirst(neikuang);
       neikuang.appendChild(first);
       neikuang.style.left=0
      }
       flag=true;
    })
}
btnl.onclick=function(){
  if (!flag) {
    return
  }
  flag=false;
    animate(neikuang,{left:-widths*num},function(){
      for (var i = 0; i < num; i++) {
        var first=getFirst(neikuang);
       neikuang.appendChild(first);
       neikuang.style.left=0
      }
       flag=true;
    })


    // animate(getFirst(neikuang),{width:0},function(){
    //     neikuang.appendChild(getFirst(neikuang));
    //     getLast(neikuang).style.width="200px";
    // })
}
btnr.onclick=function(){
  if (!flag) {
    return
  }
  flag=false;
  for (var i = 0; i < num; i++) {
    var last=getLast(neikuang);
       var first=getFirst(neikuang);
       neikuang.insertBefore(last,first);
       neikuang.style.left=-widths+"px"
  };  
    animate(neikuang,{left:0},function(){
       flag=true;
    })
}
dada.onmouseover=function(){
  // alert(1)
  clearInterval(tt);
}
dada.onmouseout=function(){
  tt=setInterval(moveL,2000);
}

}
lunbo(dada,1)







})
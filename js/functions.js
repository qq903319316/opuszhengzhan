//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名
function getClass(classname,father){//兼容函数
    father=father||document;
    //1. 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE
      //ID  Tag  name
      var all=father.getElementsByTagName("*");//所有的
      /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,
      <div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
      var newarr=[];
      //遍历数组
      for (var i = 0; i < all.length; i++) {
      	//"one fi".split()["one","fi"]  "one"
      	  //if(all[i].className==classname){//如果条件相等，表示找见了
      	  if(checkRep(all[i].className,classname)){    // 切记这里用逗号
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
  }
  function checkRep(str,classname){//"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }

/****************************************************************************************************/
//2016.5.3
//2.纯文本的兼容函数(获取和设置)
//obj:获取--获取谁的
//    设置--给谁设置
//value:要设置的内容(纯文本)
function getText(obj,value){
  if(value!=undefined){//如果传入的value值不是未定义的(就是有值),设置
      if(obj.textContent){//FF,Chrome
       obj.textContent=value;
      }else{
       obj.innerText=value;//IE
      }
  }else{//否则(就是没有值),获取
      if(obj.textContent){//FF,Chrome
      return obj.textContent;
      }else{
      return obj.innerText;//IE
      }
  }
}

/****************************************************************************************************/
//2016.5.3
//3.获取样式的兼容函数
//obj:对象(要获取的对象)
//attr:对象的属性
function getStyle(obj,attr){
  if(obj.currentStyle){//IE
    return parseInt(obj.currentStyle[attr]);//parseInt字符串转换为数值类型的方法
  }else{
    return parseInt(getComputedStyle(obj,null)[attr]);
  }
}

/****************************************************************************************************/
//2016.5.5
//4.获取元素的兼容函数
//selector:选择器[# . li]
function $(selector,father){
  father=father||document//给父容器设置默认值
  //对selector的值进行判断，是那种类型
  if(typeof selector=="string"){//如果是字符串，判断那种
    // select=trim(select); //把两边空格去掉
    selector=selector.replace(/^\s*|\s*$/g,"");//去除字符串左右的空格
    if(selector.charAt(0)=="."){
      //charAt返回指定位置的字符，if是.就是类名
     return getClass(selector.slice(1),father);
    }else if(selector.charAt(0)=="#"){//if是#,就是id
    return father.getElementById(selector.slice(1));
    }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){
      //正则判断标签名
     return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){
    //是一个函数，执行window.onload事件
      // window.onload=function(){
      //   selector();
      addEvent(window,"load",selector);
    }
  
}

/*************************************************************************************************************/

//2016.5.6
//5.获取子节点的兼容函数
function getChild(father){
 var all=father.childNodes;
 var arr=[];
 for(var i=0; i<all.length;i++){
    if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && all[i].nodeType==3)){
//如果节点类型是1的话，是元素节点,放入新数组  或者 正则去除空格，如果没有空格的话，就留下，并且保证文本内容没有注释
      arr.push(all[i]);
}
}
 return arr;
}


//6.获得子节点中的第一个
function getFirst(father){
  return getChild(father)[0];
} 

//7.获得子节点中的最后一个
function getLast(father){
  return getChild(father)[getChild(father).length-1]
}


//8.通过指定下标来获得子节点中一个
function getNum(father,num){
   return getChild(father)[num];
  }


//9.获取上一个兄弟节点

function getUp(obj){
 var up=obj.previousSibling;
 if(up==null){
   return false;
 }
 while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时，接着再找(条件为注释节点或者文本节点为空字符串时,条件满足)
   up=up.previousSibling;
      if(up==null){
        return false;
      }
 }
  return up;
}


//10.获取下一个兄弟节点

function getNext(obj){
  var next=obj.nextSibling;
   if(next==null){
     return false;
   }
   while(next.nodeType==8 || (next.nodeType==3 && next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
    next=next.nextSibling;
       if(next==null){
        return false;
       }
   }
  return next;
}


//11.插入某个对象之后

function insertAfter(father,newNode,obj){
  var next=getNext(obj);
  if(next){
    father.insertBefore(newNode,next);
  }else{
    father.appendChild(newNode);
  }
}


/*************************************************************************************************************/

//2016.5.9
//12.事件绑定兼容函数
function addEvent(obj,event,fun){
  if(obj.addEventListener){//FF,Chrome
   return  obj.addEventListener(event,fun,false)
  }else{
    //IE
   return obj.attachEvent("on"+event,function(){
    fun.call(obj);
   })
  }
}

//13.删除绑定事件兼容函数
function deleteEvent(obj,event,fun){
  if(obj.removeEventListener){
    return  obj.removeEventListener(event,fun,false) 
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}

/*************************************************************************************************************/
//2016.5.9
//14.滚轮事件
//obj:对象   up:向上的函数   down:向下的函数


function mouseWheel(obj,up,down){
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
     }else if(obj.addEventListener){
     obj.addEventListener("mousewheel",scrollFn,false);
//chrome,safari -webkit-
     obj.addEventListener("DOMMouseScroll",scrollFn,false);
//firefox -moz-
}
function scrollFn(e){//处理程序
  var ev=e || window.event;//获取事件对象(scrollTn)
  //阻止浏览器的默认行为
   if (ev.preventDefault ){
    ev.preventDefault(); //阻止默认浏览器动作(W3C)
    }else{
    ev.returnValue = false;//IE中阻止函数器默认动作的方式
   }
  var val=ev.detail || ev.wheelDelta;//获取滚轮滚动方向
  if(val==-3 || val==120){
    if(up){
     up(); 
    }
    
  }else if(val==3 || val==-120){
    if(down){
      down();
    }
   
  }
}
}
/*************************************************************************************************************/
//2016.5.10
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

 /*****************************************************************************************************/
 //2016.5.11
 //16.事件对象阻止浏览器默认行为

 function evStop(e){
  var ev=e||window.event;
  if (ev.preventDefault ){
     ev.preventDefault(); //阻止默认浏览器动作(W3C)
  }else{
     ev.returnValue = false;//IE中阻止函数器默认动作的方式
 }
} //17.阻止事件流的兼容函数





/*
addEvent(obj,type,fn)
给元素添加事件
obj 指定的对象
type 事件类型
fn 事件处理程序
*/

// 添加事件
function addEvent(obj,type,fn){
  if (obj.addEventListener) {
    obj.addEventListener(type,fn,false)
  } else{
    obj.attachEvent("on"+type,fn)
  }
}

// 移除事件
function removeEvent(obj,type,fn){
  if (obj.addEventListener) {
    obj.removeEventListener(type,fn,false)
  } else{
    obj.detachEvent("on"+type,fn)
  }
}





/*
offset(obj)
获取元素到浏览器的位置
left=所有具有定位属性的父元素的offsetLeft（+）
所有具有定位属性的父元素的左边框+自身的offsetLeft

1，获取所有具有定位属性的父元素   position=relative  absolute;
2，offsetLeft（+）borderLeftWidth
3,返回最终的结果 （对象）{left:200;top:300}
*/
// function offset(obj){
//     var result={left:0,top:0};
//     // 存放obj和具有定位属性的父元素
//     var arr=[];
//     arr.push(obj);
//     var parent=obj.parentNode;
//     // 获取具有定位属性的父元素
//     while(parent.nodeName!="BODY"){
//      if (getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute") {
//          arr.push(parent);
//      }
//      parent=parent.parentNode
//     }
//     // 计算
//     // left=所有具有定位属性的父元素的offsetLeft（+）
//     // 所有具有定位属性的父元素的左边框+自身的offsetLeft

//     for (var i = 0; i < arr.length; i++) {
//     // 去掉自身的边框
//     // 如果父元素没有边框，边框宽度为0
//     var LeftWidth=getStyle(arr[i],"borderLeftWidth")?parseInt(getStyle(arr[i],"borderLeftWidth")):0;
//     var TopWidth=getStyle(arr[i],"borderTopWidth")?parseInt(getStyle(arr[i],"borderTopWidth")):0;
//         if (i==0) {
//           LeftWidth=0;
//           TopWidth=0;
//         }
//       result.left+=arr[i].offsetLeft+LeftWidth;
//       result.top+=arr[i].offsetTop+TopWidth;
//     }

//     return result;

// }


function offset(obj){
    var result={left:0,top:0};
    var arr=[];
    arr.push(obj);
    var parent=obj.parentNode;
    while(parent.nodeName!="BODY"){
        if (getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute") {
            arr.push(parent);
        }
        parent=parent.parentNode;
    }
    for (var i = 0; i < arr.length; i++) {
        var left=arr[i].offsetLeft;
        var top=arr[i].offsetTop;
        var borderLeft=getStyle(arr[i],"borderLeftWidth")?parseInt(getStyle(arr[i],"borderLeftWidth")):0;
        var borderTop=getStyle(arr[i],"borderTopWidth")?parseInt(getStyle(arr[i],"borderTopWidth")):0;
        if (i==0) {
            borderLeft=0;
            borderTop=0;
        }
        result.left+=(left+borderLeft);
        result.top+=(top+borderTop);
    }
    return result;

}


/*
mousewheel(obj,downfn,upfn)
给一个对象绑定滚轮事件
*/
// function mousewheel(obj,downfn,upfn){
//   if (document.attachEvent) {
//     document.attachEvent("onmousewheel",scrollFn);
//   } else if(document.addEventListener){
//     document.addEventListener("mousewheel",scrollFn,false);
//   } else if(document.addEventListener){
//     document.addEventListener("DOMMouseScroll",scrollFn,false);
//   }


// function scrollFn(e){
//   var ev=e||window.event;
//   var dir=ev.wheelDelta||ev.detail;
//   if (dir==-120||dir==3) {
//     downfn.call(obj);
//   } else if(dir==120||dir==-3){
//     upfn.call(obj);
//   }

//   if (ev.preventDefault) {
//     ev.preventDefault();
//   } else{
//     ev.returnValue=false;
//   }

// }


// }

// cookie函数封装
// setCoolie("weather","sunny");
// setCoolie("weather1","sunny",4)

function setCookie(name,val,time){
    if (time) {
      // 存活一段时间
      var date=new Date();
      // date.setDate(date.getDate()+time);
      // date.setDate(date.getDate()+time);
      document.cookie=name+"="+val+";expires="+date;
    }else{
      // 临时
      document.cookie=name+"="+val;
    }
}

function delCookie(name){
  // 这个函数是删除
  var date=new Date;
  date.setDate(date.getTime()-1000);
  document.cookie=name+"=aa;expires="+date;
}

// 把字符换切分为数组
/*
  document.cookie获取
  1,split("; ") var
  arr=["user=zhangsan","pass=123","weather=sunny"]
  2,aee[0] "=" arr2=["user","shangsan"]
*/
function getCookie(name){
  var str=document.cookie;
  var arr=str.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2=arr[i].split("=");
    if (arr2[0]==name) {
      return arr2[1];
    };
    
  };
}


// 删除空白的地方  正则

function time(str,type){
  type=type?type:"both";
  if (type=="left") {
    var reg=/^\s*/;
    return str.replace(reg,"")
  }else if (type=="right") {
    var reg=/\s*$/;
    return str.replace(reg,"")
  }else if (type=="both") {
    var reg=/^\s*|\s*$/g;
    return str.replace(reg,"")
  }else if (type=="all") {
    var reg=/\s*/g;
    return str.replace(reg,"")
  }
}




//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 
  function getEvent(e){
    return e||window.event;
  }


// ajax函数
function ajax(option){
    if (!option.url) {
        return;
    }else {
        var type=option.type==undefined?"get":option.type;
        var url=option.url;
        var asynch=option.asynch==undefined?true:option.asynch;
        var dataType=option.dataType==undefined?"string":option.dataType;
        var data="";
        /*var success=function(){};*/
        if (typeof option.data=="string") {
            data=option.data;
        }else if (option.data instanceof Object) {
            for(var i in option.data){
                data+=i+"="+option.data[i]+"&";
            }
            data=data.slice(0,-1);
        }
        var xml=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
            if (type=="get") {
                //打开请求
                xml.open(type,url+"?"+data,asynch);
                //发送请求
                xml.send(null);
            }else if (type=="post") {
                //打开请求
                xml.open(type,url,asynch);
                //发送请求
                xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xml.send(data);
            };
        
            //添加异步监听的函数
        xml.onreadystatechange=function(){
            if (xml.readyState==4) {
                if (xml.status==200) {
                    if(option.dataType=="string"){
                        option.success(xml.responseText) ;
                    }else if(option.dataType=="json"){
                        option.success(eval("("+xml.responseText+")"));
                    }else if(option.dataType=="xml"){
                        option.success(xml.responseXML) ;
                    }
                }
            }
        }
    }
    
}











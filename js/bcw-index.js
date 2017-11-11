/**
 * Created by 张欣鑫 on 2017/11/6.
 */
window.onload = function () {

    $(function() {
        FastClick.attach(document.body);
    });

    //加载完成后进行判断,如果有账号直接登录,调用登录成功函数
    if (window.localStorage.getItem("userTel") !=null) {
        enterSuccess();
    }else {
        enter();
    }

    qiehuan();

    firstJs();

    twoJs();

    fourJs();

    fiveJs();

};


//实现左右切换功能
//-------------------------------------------------------------------------------
function qiehuan(){
    //获取上部分大页面
    var sectionBox = document.querySelector(".allBox").querySelector("ul");
    var secLis = sectionBox.querySelectorAll("li");
    //获取下面四个小导航
    var point = document.querySelector(".allBox").querySelector(".point");
    var pointLis = point.querySelectorAll("div");
    for (var i=0;i<pointLis.length;i++){
        pointLis[i].index = i;
        pointLis[i].addEventListener("touchend", function (e) {
            //sectionBox.style.transition = "left 1s";
            sectionBox.style.left = -this.index * 100 + "%";
            for (var i=0;i<pointLis.length;i++){
                pointLis[i].classList.remove("active");
            };
            this.classList.add("active");
        });
    }
}
//用户手机号码,密码,验证码
var userTel,userPassword,userCode,userName,$yzm;
function enter() {
//登录页面注册页面弹出与返回
//-------------------------------------------------------------------------------
    //点击页面上带dlzc类名标签登录页面弹出
    $('.dlzc').click(function () {
        $(".enter").css("top","0");
        //console.log(11);
    });
    //点击页面上带quxiao类名标签登录页面收缩到底部
    $(".quxiao").click(function () {
        $(".enter").css("top","100%");
        //$(".enter").remove();
    });
    //点击页面上带zhuce类名标签注册页面弹出
    $("#zhuce").click(function () {
        //alert(111);
        $(".zhuce").css("left","0").css("opacity",1);
    });
    //点击注册页面的 < ，注册页面消失
    $(".zhuce").children("span:nth-of-type(1)").click(function () {
        $(".zhuce").css("left","100%").css("opacity",0);
    });
//左右切换特效,以及密码可视与否获取验证码特效
//-------------------------------------------------------------------------------
    $(".enter-center>span").click(function(){
        $(this).addClass('dlact').siblings().removeClass('dlact');
        $(".enter-center ul").css('left',($(this).index() * (-100) +'%' ));
        $(".enter-center em").css('left',($(this).index()*(50) + "%"))
    });
    var enterCenterUl = document.querySelector(".enter-center").querySelectorAll("ul")[0];
    var enterCenterEm = document.querySelector(".enter-center").querySelectorAll("em")[0];
    var enterCenterSpan = document.querySelector(".enter-center").querySelectorAll("span");
    //手动滑动图片
    var startX,moveX,distanceX;
    enterCenterUl.addEventListener("touchstart",function(e){
        //获取当前手指的起始位置
        startX= e.targetTouches[0].clientX;
    });
    //为图片添加触摸事件--滑动过程
    enterCenterUl.addEventListener("touchmove",function(e){
        //记录手指在滑动过程中的位置
        moveX= e.targetTouches[0].clientX;
        //计算坐标的差异
        distanceX=moveX-startX;
    });
    enterCenterUl.addEventListener("touchend",function(e){
        //获取当前滑动的距离，判断距离是否超出指定的范围 100px
        if(Math.abs(distanceX) > 100){
            //根据正负值判断方向
            if(distanceX < 0){
                enterCenterUl.style.left = -100 + "%";
                enterCenterEm.style.left = 50 + "%";
                enterCenterSpan[1].className = "dlact";
                enterCenterSpan[0].className = "";
            }
            if(distanceX > 0){
                enterCenterUl.style.left = 0 + "%";
                enterCenterEm.style.left = 0 + "%";
                enterCenterSpan[0].className = "dlact";
                enterCenterSpan[1].className = "";
            }
        }
        //清除上一次move所产生的数据
        startX=0;
        moveX=0;
        distanceX=0;
    });
    //密码可见不可见
    $(".icon-eye-close").off('click');//取消绑定事件
    $(".icon-eye-close").click(function(){
        if ($(this).is(".icon-eye-close")==true) {
            $(this).removeClass("icon-eye-close").addClass("icon-eye-open").css("color","#FF4F39");
            $(this).prev().attr("type","text");
        }else {
            $(this).removeClass("icon-eye-open").addClass("icon-eye-close").css("color","#666666");
            $(this).prev().attr("type","password");
        }
    });
    //获取验证码
    $sx = 15 ;
    $(".yanzhengma button").click(function () {
        $(".yanzhengma button").prop("disabled",true);
        clearInterval($yzm)
        $yzm = setInterval(function () {
            if($sx>0){
                $(".yanzhengma button").text( "(" + $sx + "秒）");
                $sx--;
                $(".yanzhengma button").css("background","#C0C0C0");
            }else {
                $(".yanzhengma button").text("重新获取");
                $(".yanzhengma button").prop("disabled",false);
                $(".yanzhengma button").css("background","#FF4F39");
                clearInterval($yzm);
                $sx = 15;
            }
        },1000)
    });
    //点击注册获取用户手机号,密码,和验证码
    var zhuce = document.querySelector(".zhuce");
    zhuce.querySelectorAll("input")[3].onclick = function () {
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(zhuce.querySelectorAll("input")[0].value))){
            clearValue();
            this.value = "手机号格式有误";
        }else if (!(/^[0-9A-Za-z]+$/.test(zhuce.querySelectorAll("input")[2].value))) {
            clearValue();
            this.value = "密码格式有误";
        }else if (zhuce.querySelectorAll("input")[1].value.trim().length <4 ) {
            clearValue();
            this.value = "验证码小于四位";
        }else {
            //重要!!!重要!!!重要,获取用户的账号密码验证码以及用户的昵称
            userTel = zhuce.querySelectorAll("input")[0].value;
            window.localStorage.setItem("userTel",userTel);
            userPassword = zhuce.querySelectorAll("input")[2].value;
            window.localStorage.setItem("userPassword",userPassword);
            userCode = zhuce.querySelectorAll("input")[1].value;
            window.localStorage.setItem("userCode",userCode);
            userName = prompt("给自己一个可爱的昵称吧");
            window.localStorage.setItem("userName",userName);
            zhuce.style.left = "100%";
        }
        //上面判断失败都要加这个属性,所以封一个小函数代替
        function clearValue(){
            zhuce.querySelectorAll("input")[0].value = "";
            zhuce.querySelectorAll("input")[2].value = "";
            zhuce.querySelectorAll("input")[1].value = "";
            setTimeout(function () {
                zhuce.querySelectorAll("input")[3].style.backgroundColor = "#FF4F39";
                zhuce.querySelectorAll("input")[3].value = "注册";
            },1500);
            zhuce.querySelectorAll("input")[3].style.backgroundColor = "#C0C0C0";
        }
    };
    //账号密码登录
    $("#passwordEnter").find("input").eq(2).click(function () {
        if ($("#passwordEnter").find("input").eq(0).val() ==  window.localStorage.getItem("userTel") && $("#passwordEnter").find("input").eq(1).val() == window.localStorage.getItem("userPassword") ) {
            //登陆成功后清空上面两个value的值,然后调用登录成功的函数
            $("#passwordEnter").find("input").eq(0).val("");
            $("#passwordEnter").find("input").eq(1).val("");
            enterSuccess();
        }else {
            //登录失败提示错误,并出现短暂的按钮灰色
            $(this).val("账号密码错误");
            $(this).css("backgroundColor","#C0C0C0");
            $("#passwordEnter").find("input").eq(1).val("");
            setTimeout(function(){
                $("#passwordEnter").find("input").eq(2).css("backgroundColor","#FF4F39");
                $("#passwordEnter").find("input").eq(2).val("登录");
            },1500);
        }
    });
    //手机验证登录
    $("#codeEnter").find("input").eq(2).click(function () {
        if ($("#codeEnter").find("input").eq(0).val() ==  window.localStorage.getItem("userTel") && $("#codeEnter").find("input").eq(1).val() == window.localStorage.getItem("userCode") ) {
            $("#codeEnter").find("input").eq(0).val("");
            $("#codeEnter").find("input").eq(1).val("");
            enterSuccess();
        }else {
            $(this).val("账号验证码错误");
            $(this).css("backgroundColor","#C0C0C0");
            $("#codeEnter").find("input").eq(1).val("");
            setTimeout(function(){
                $("#codeEnter").find("input").eq(2).css("backgroundColor","#FF4F39");
                $("#codeEnter").find("input").eq(2).val("登录");
            },1500);
        }
    });

    //console.log("这是bug，这是bug，这是bug")
}
//登录成功js
var FLAG = false;//FLAG为true说明已经登录,为false说明没登录
function enterSuccess() {
    //登录成功后登录页面返回底部.并改变人物头像,昵称,移除所有dlzc按钮的事件,移除第四页面的去登陆,显示购物车详情.显示第五页面设置里的退出登录按钮
    $(".enter").css("top","100%");
    $(".five-top").children("a:last-child").text(window.localStorage.getItem("userName"));
    $(".five-top").find("img").attr("src","./upload/zxxxx.png");
    $("#outEnter").css("display","block");
    $(".five-top").find("div").css("display","block");
    //$(".enter").remove();

    //第四页面购物车登录后没登录页面隐藏,其他显示
    $(".noEnter").css("display","none");
    $(".myFoodCar").css("display","block");
    $(".point-four").find("a").css("display","block");
    //----------------------------------------------------------------------------------------------
    $(".dlzc").unbind();
    //给页面上的a便签地址加上
    $(".five-dd").find("div").find("a").attr("href","./another/myIndent.html");
    $(".five-dd").find("ul").find("li").find("a").attr("href","./another/myIndent.html");
    $(".five-dd").find("ul").find("li").eq(4).find("a").attr("href","./another/myBackIndent.html");
    //点击退出登录时,执行退出登录函数
    $("#outEnter").click(function () {
        OutEnter();
        $("#outEnter").css("display","none");
    });
    FLAG = true;
}
//退出登录js
function OutEnter() {
    //点击退出登录之还原页面dlzc类名的点击事件,人物昵称头像,第四页面购物车部分隐藏,显示去登录页面
    $(".dlzc").bind(enter());
    //-------------------------------------------------------------------------------------------------
    //给页面上的a便签地址删除
    $(".five-dd").find("div").find("a").attr("href","javascript:;");
    $(".five-dd").find("ul").find("li").find("a").attr("href","javascript:;");
    $(".five-dd").find("ul").find("li").eq(4).find("a").attr("href","javascript:;");

    //第五页面右上角的点击事件
    $(".five-top").find("div").css("display","none");
    $(".five-top").children("a:last-child").text("登录/注册");
    $(".yanzhengma button").text("获取验证码");
    $(".five-top").find("img").attr("src","./upload/weizhishu.jpg");
    $(".five-set").css("left","100%");
    //第四页面购物车登录后没登录页面隐藏,其他显示
    $(".point-four").find("a").css("display","none");
    $(".noEnter").css("display","block");
    $(".myFoodCar").css("display","none");
    FLAG = false;



    //重要!!!重要!!!重要,删除用户的账号密码验证码以及用户的昵称
    //window.localStorage.removeItem("userTel");
    //window.localStorage.removeItem("userPassword");
    //window.localStorage.removeItem("userCode");
    //window.localStorage.removeItem("userName");
}
//第一页面Js.
//-------------------------------------------------------------------------------
function firstJs(){
    //获取装八个li的ul.还有li
    var sectionBox = document.querySelector(".oneContent").querySelector("ul");
    var secLis = sectionBox.querySelectorAll("li");
    //获取顶部八个栏.
    var point = document.querySelector(".oneLocoIn");
    var pointLis = point.querySelectorAll("div");
    var count = 0;
    for (var i=0;i<pointLis.length;i++){
        pointLis[i].index = i;
        pointLis[i].addEventListener("click", function (e) {
            count = this.index;

            for (var j=0;j<pointLis.length;j++){
                pointLis[j].className = "";
            }
            pointLis[count].className = "oneActive";
            sectionBox.style.left = -count * 100 + "%";
        });
    }
    var startX,moveX,distanceX;
    sectionBox.addEventListener("touchstart",function(e){
        //获取当前手指的起始位置
        startX= e.targetTouches[0].clientX;
    });
    //为图片添加触摸事件--滑动过程
    sectionBox.addEventListener("touchmove",function(e){
        //记录手指在滑动过程中的位置
        moveX= e.targetTouches[0].clientX;
        //计算坐标的差异
        distanceX=moveX-startX;
    });
    sectionBox.addEventListener("touchend",function(e){
        //获取当前滑动的距离，判断距离是否超出指定的范围 100px
        if(Math.abs(distanceX) > 100){
            //根据正负值判断方向
            if(distanceX < 0){
                if(count ==pointLis.length-1 ) {
                    return;
                }
                count++;
                sectionBox.style.left = -count * 100 + "%";
                for (var j=0;j<pointLis.length;j++){
                    pointLis[j].className = "";
                }
                pointLis[count].className = "oneActive";
            }
            if(distanceX > 0){
                if(count == 0 ) {
                    return;
                }
                count--;
                sectionBox.style.left = -count * 100 + "%";
                for (var j=0;j<pointLis.length;j++){
                    pointLis[j].className = "";
                }
                pointLis[count].className = "oneActive";
            }
        }
        //清除上一次move所产生的数据
        startX=0;
        moveX=0;
        distanceX=0;
    });
}
//第二页面Js.
//-------------------------------------------------------------------------------
function twoJs() {
    for ($i=0;$i<12;$i++){
        $("#toEating").children().eq($i).find("img").attr("src","images/sectionTwo00"+ ($i+1) + ".png");

    }
}
//第四页面Js.(添加购物车的js)
//-------------------------------------------------------------------------------
var carNum = 0;//购物车物品数量
//window.localStorage.setItem("userFoodNum",carNum);
function fourJs() {
    $(".point-four").find("a").text(carNum);

    $(".addFoodCar").click(function () {
        if(FLAG == true){
            carNum++;

            $(".point-four").find("a").text(carNum);

            //window.localStorage.setItem("userFoodNum",carNum);
            //console.log(window.localStorage.getItem("userFoodNum") - 0);
            alert("您已经登录");
            //$(".myFoodCar").css("display","none");
            //console.log($(this).parent().parents());
        }else if(FLAG == false) {
            alert("您还未登录");
        }
    });
    if (carNum > 0 ) {
        //NullCar();
    }



    function NullCar(){
        $(".noEnter").css("display","none");
        $(".myFoodCar").css("display","block");
    }






}






//第五页面js特效
//-------------------------------------------------------------------------------
function fiveJs() {
    //左上角设置点击跳出设置页面以及返回
    $(".five-top").find("span").eq(0).click(function () {
        $(".five-set").css("left","0").css("opacity","1");
    });
    $(".five-set").find("span").eq(0).click(function () {
        $(".five-set").css("left","100%").css("opacity","0");
    });
    //设置页面第一个li点击跳出版本信息页面及返回
    $(".five-set").find("ul").eq(0).find("li").eq(0).click(function () {
        $(".editionBcw").css("left",0).css("opacity",1);
    });
    $(".editionBcw").find("span").eq(0).click(function () {
        $(".editionBcw").css("opacity",0).css("left","100%");
    });
    //设置页面第三个li点击跳出关于百草味页面及返回
    $(".five-set").find("ul").eq(0).find("li").eq(2).click(function () {
        $(".aboutBcw").css("left",0).css("opacity",1);
    });
    $(".aboutBcw").find("span").eq(0).click(function () {
        $(".aboutBcw").css("opacity",0).css("left","100%");
    });
    //第五页面右上角点击跳出消息通知页面(需要登录之后绑定事件)
    $("#newNews").click(function () {
        if (FLAG == true){
            $(".five-news").css("left","0").css("opacity","1");
        }else if(FLAG == false) {
            $(".enter").css("top","0");
        }
    });
    //消息通知页面左上角点击退出
    $(".five-news").find("span").click(function () {
        $(".five-news").css("left","100%").css("opacity","0");
    });
}



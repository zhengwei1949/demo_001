/**
 * Created by ÕÅÐÀöÎ on 2017/11/9.
 */

var html = document.getElementsByTagName('html')[0];
var width = window.innerWidth;
if (width>768) {
    width = 768;
}else if (width<320) {
    width = 320;
}
var fontSize = 100/640*width;
html.style.fontSize = fontSize +'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
    var width = window.innerWidth;
    if (width>768) {
        width = 768;
    }else if (width<320) {
        width = 320;
    }
    var fontSize = 100/640 * width;
    html.style.fontSize = fontSize +'px';
};

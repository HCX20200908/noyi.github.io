window.onload = function() {
    var oWrap = document.getElementById('wrap');
    var oImg = oWrap.getElementsByTagName('img');
    var oImgLength = oImg.length;
    var Deg = 360 / oImgLength;
    var nowX, nowY, lastX, lastY, minusX = 0,
        minusY = 0;
    var roY = 0,
        roX = -10;
    var timer;

    for (var i = 0; i < oImgLength; i++) {
        oImg[i].style.transform = 'rotateY(' + i * Deg + 'deg) translateZ(350px)';
        oImg[i].style.transition = 'transform 1s ' + (oImgLength - 1 - i) * 0.1 + 's';

    }

    mTop();

    window.onresize = mTop;

    function mTop() {
        var wH = document.documentElement.clientHeight;
        oWrap.style.marginTop = wH / 2 - 180 + 'px';
    }
    document.ontouchstart = function(ev) {
        ev = ev || window.event;
        lastX = ev.changedTouches[0].clientX;
        lastY = event.changedTouches[0].clientY;
        this.ontouchmove = function(ev) {
            ev = ev || window.event;
            clearInterval(timer);
            nowX = ev.changedTouches[0].clientX; // clientX 鼠标距离页面左边的距离
            nowY = ev.changedTouches[0].clientY; // clientY ………………………………顶部………………

            minusX = nowX - lastX;
            minusY = nowY - lastY;

            //更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
            roY += minusX * 0.2; // roY = roY + minusX*0.2;
            roX -= minusY * 0.1;

            oWrap.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

            lastX = nowX;
            lastY = nowY;

        }
        //抬起
        this.ontouchend = function() {

            this.ontouchmove = null;
            timer = setInterval(function() {
                minusX *= 0.95;
                minusY *= 0.95;
                roY += minusX * 0.2; // roY = roY + minusX*0.2;
                roX -= minusY * 0.1;
                oWrap.style.transform = 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

                if (Math.abs(minusX) < 0.1 && Math.abs(minusY) < 0.1) {
                    clearInterval(timer);
                }
            }, 13);
        }
        return false;
    }
}
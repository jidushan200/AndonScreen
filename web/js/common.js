//右字符子串
function right(mainStr, lngLen) {
    if (mainStr.length - lngLen >= 0 && mainStr.length >= 0 && mainStr.length - lngLen <= mainStr.length) {
        return mainStr.substring(mainStr.length - lngLen, mainStr.length)
    }
    else { return null }
}
function pxtofloat(str) {
    return parseFloat(str.substring(0, str.length - 2));
}

//星期转换
var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//本年第几周（参数a 年，b月，c日）
var getYearWeek = function (a, b, c) {
    /*
    date1是当前日期
    date2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */
    var date1 = new Date(a, parseInt(b) - 1, c),
        date2 = new Date(a, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
};

//显示时间
var strdate1 = '';      //保存上次显示的时间
timer = setInterval(
    function () {
        var d = new Date();
        var strdate = d.getFullYear() + '-' + right('00' + (d.getMonth() + 1), 2) + '-' + right('00' + d.getDate(), 2) + ' '
            + right('00' + d.getHours(), 2) + ':' + right('00' + d.getMinutes(), 2) + ':' + right('00' + d.getSeconds(), 2);
        if (strdate != strdate1) {
            strdate1 = strdate;
            strdate = strdate + ' ' + weekday[d.getDay()];
            strdate = strdate + '(第' + getYearWeek(d.getFullYear(), d.getMonth() + 1, d.getDate()) + '周)';
            $('#time').text(strdate);
        }
    }, 200);

//文本水平滚动插件
(function ($) {
    $.fn.HScroll = function (options) {
        var method = typeof arguments[0] == "string" && arguments[0];
        var args = method && Array.prototype.slice.call(arguments, 1) || arguments;
        if (method.toLowerCase() == "init") {
            if (this.hscrolltimer)
                window.clearInterval(this.hscrolltimer);
            this.children("ul").remove();                                                   //清除当前显示内容，增加ul框架
            this.append("<ul style='visibility:hidden'></ul>");
        }
        if (method.toLowerCase() == "set") {
            if (args.length == 2)                                                           //确认两个参数，1：文本，2：颜色
            {
                this.children("ul").append("<li style= 'color:" + args[1] + "'>" + args[0] + "</li>");
            }
        }
        if (method.toLowerCase() == "show") {
            var interval = 30;
            var step = 2;
            if (args.length == 1)                                                          //确认一个参数，1：Interval，2：移动步长
                interval = args[0];
            if (args.length == 2) {
                interval = args[0];
                step = args[1];
            }
            this.children("ul").css('visibility', '');
            var left = this.width();                                                        //初始显示位置在DIV最右侧
            this.children("ul").css("left", left + "px");
            this.hscrolltimer = setInterval(function (e) {
                var h = e.parent().height();
                e.children("ul").height(h);                                                 //设置ul的高度等于父元素
                e.children("ul").css("lineHeight", h + "px");                               //显示内容垂置居中
                var left = pxtofloat(e.children("ul").css("left"));
                var sumwidth = e.children("ul").width();
                if (left < -sumwidth)
                    left = e.width();
                else
                    left -= step;
                //设置ul的left值
                e.children("ul").css("left", left + "px");
            }, interval, this);
        }
    }
})(jQuery);

//文本垂置滚动
(function ($) {
    $.fn.VScroll = function (options) {
        var method = typeof arguments[0] == "string" && arguments[0];
        var args = method && Array.prototype.slice.call(arguments, 1) || arguments;
        if (method.toLowerCase() == "init") {
            if (this.vscrolltimer)
                window.clearInterval(this.vscrolltimer);
            this.children("ul").remove();                                                   //清除当前显示内容，增加ul框架
            this.append("<ul style='visibility:hidden'></ul>");
        }
        if (method.toLowerCase() == "set") {
            if (args.length == 2)                                                           //确认两个参数，1：文本，2：颜色
            {
                this.children("ul").append("<li style= 'color:" + args[1] + "'>" + args[0] + "</li>");
            }
        }
        if (method.toLowerCase() == "show") {
            var interval = 30;
            var step = 2;
            if (args.length == 1)                                                           //确认一个参数，1：Interval，2：移动步长
                interval = args[0];
            if (args.length == 2) {
                interval = args[0];
                step = args[1];
            }
            this.children("ul").css('visibility', '');
            var top = this.height();                                                        //初始显示位置在DIV最下方
            this.children("ul").css("top", top + "px");
            this.vscrolltimer = setInterval(function (e) {
                var top = pxtofloat(e.children("ul").css("top"));
                var sumheight = e.children("ul").height();
                if (top < -sumheight)
                    top = e.height();
                else
                    top -= step;
                //设置ul的top值
                e.children("ul").css("top", top + "px");
            }, interval, this);
        }
    }
})(jQuery);

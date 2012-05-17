
/**
 * [toggleSubtree description]
 * @param  {[type]} settings [description]
 * @return {[type]}          [description]
 */
function toggleSubtree (settings) {
    settings = $.extend({
        triggers: 'i[data-trigger=trigger]',
        categorys: '.category',
        trigger: '.openMonth',
        iconPlus: 'icon-plus',
        iconMinus: 'icon-minus'
    }, settings);


    var triggers = $('#turnoverList').find(settings.triggers);
    var categorys = $('#turnoverList').find(settings.categorys);

    $('#turnoverList').delegate(settings.trigger, 'click', function(e){
        var n = $(this).next();
        var t = $(this).find(settings.triggers);
        var flag = t.hasClass(settings.iconPlus);

        triggers.attr('class', settings.iconPlus);
        categorys.slideUp('normal');

        if (flag) {
            t.attr('class', settings.iconMinus);
            n.slideDown('normal');
        } else{
            t.attr('class', settings.iconPlus);
            n.slideUp('normal');
        }
        return false;
    });

    if (settings.cancel) {
        $('#turnoverList').delegate(settings.cancel, 'click', function(e){
            var n = $(this).closest(settings.categorys);
            var t = n.prev().find(settings.triggers);

            n.slideUp('normal');
            t.attr('class', settings.iconPlus);
        });
    }

}


/**
 * 页面切换
 * @return {[type]} [description]
 */

function togglePage (page, li, callback) {
    var actPage = $('#' + page);

    //对外的回调函数，可进行切换页面前的页面自定义数据渲染
    if (callback) callback.call(document.getElementById(page)); 
    //帐户点击现金，银行卡，信用卡，支付宝时传进去的参数

    //
    $('#nav li').removeClass('on');
    $(li).addClass('on');

    setSiblings(actPage);

    $(window).scrollTop(0);
}

/**
 * 切换时设置页面的translate
 * @param {[type]} page [description]
 */

function setSiblings (page) {
    //

    page.css({
        'webkitTransform': 'translate(0, 0)',
        'position': 'static'
    });
    

    //
    var i = 0;
    var act = page.prev();
    while (act.length > 0 && act.hasClass('page')) {
        i++;
        act.css('webkitTransform', 'translate(-'+ i * 100 +'%, 0)');
        act.css('position', 'absolute');
        act = act.prev();
    }

    //
    var j = 0;
    var aft = page.next();
    while (aft.length > 0 && aft.hasClass('page')) {
        j++;
        aft.css('webkitTransform', 'translate('+ j * 100 +'%, 0)');
        aft.css('position', 'absolute');
        aft = aft.next();
    }
}


/**
 * 样式表切换 
 */

function styleChange () {
    var n = localStorage.css;
    if (!n) {return;}
    var i = parseInt(n, 10);
    var l = document.getElementById('css');
    
    l.href = 'css/style'+ i +'.css';
    return i;
}

function setStyleOn (n) {
    var styles = $('#changeStyleContent .style');
    styles.removeClass('on');
    styles.eq(n - 1).addClass('on');
}

//iphone里隐藏地址栏
$(window).load(function () {
    setTimeout(function() {
        $(window).scrollTop(0);
    }, 0)
});








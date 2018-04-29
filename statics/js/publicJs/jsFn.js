/*
*
*
*
*
*
*
*   expect()         暂未开放按钮
*   myAlert(txt)     弹窗      参数为索讨显示的文字  1.3后以300ms隐藏，并且删除弹窗元素
*   loading(state)   loading  参数为200的时候隐藏  参数不传或者不是200的时候一直显示
*
* */

function expect() {
    $div = $('<div style="width: 60%;height: 4rem;line-height: 4rem;text-align: center;font-size: 0.522rem;position: absolute;left: 20%;top: calc((100% - 4rem )/2);background: #fff;border-radius: 10px;">暂未开放,敬请期待！</div>');
    $('#wrapper').append($div);
}

function loading(state) {
    $img = $('<img style="width: 5rem;' +
        'height: 5rem;' +
        'position: absolute;' +
        'left: calc((100% - 5rem)/2);' +
        'top: calc((100% - 5rem)/2);' +
        'border-radius: 8px;"' +
        ' src="../statics/images/loading.gif">');
    $('body').append($img);
    if (state == 200) {
        $img.hide();
    } else {
        return;
    }
}

function myAlert(txt) {
    $('.alertBox').remove();
    $div = $('<div class="alertBox" style="' +
        'height: 1.2rem;' +
        'background: #444;' +
        'font-size: 0.512rem;' +
        'text-align: center;' +
        'line-height: 1.2rem;' +
        'padding: 0 1rem;' +
        'position: absolute;' +
        'bottom: 4rem;' +
        'color: #fff;' +
        'border-radius:5px;' +
        'z-index: 999999999999999999;' +
        ' ">' + txt + '</div>');
    $('body').append($div);
    $l = $(window).width() - $div.outerWidth();
    $div.css({
        'left': $l / 2,
    });
    setTimeout(function () {
        $div.fadeOut(300, function () {
            $div.remove();
        });
    }, 1300);
};
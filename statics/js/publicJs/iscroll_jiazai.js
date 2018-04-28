

/*

    html:

        <div class="header"></div>
        <div id="wrapper">
            <div id="scroller">
                <div id="pullDown" class="">
                    <div class="pullDownLabel"></div>
                </div>
                <div class="pulldown-tips">下拉刷新</div>


                <ul id='list'>
                    //动态添加li

                </ul>


                <div id="pullUp" class="">
                    <div class="pullUpLabel">加载更多</div>
                </div>
            </div>
        </div>
        <div class="footer"></div>


        接口规范
            1、数据列表按照页数来传
            2、key值page  val：num；
            3、判断总页数还有没有数据
*/



var num = 1, pageNum;

function load() {

    //页面首次加载
    $.ajax({
        url: '',        //接口
        type: 'post',
        dataType: 'json',
        data: {page: num},      //第几页数据
        success: function (data) {
            console.log(data);   //遍历数据加载到页面
        },
        error: function (err) {
            console.log(err)
        }
    });


    var windowH = $(window).height();       //当前屏幕的高
    var titHeight = $('.header').outerHeight();     //页头的高
    var footer = $('.footer').outerHeight();        //页脚的高
    var contentHfooter = windowH - titHeight - footer;   //页面高度低于wrapper高度的以后，无法滚动问题的解决，给列表设置最小高度
    if ($("#list").height() < contentHfooter) {
        $("#list").css({
            'min-height': contentHfooter      //最小高度
        })
    }


    var myScroll,
        pullDown = $("#pullDown"),
        pullUp = $("#pullUp"),
        pullDownLabel = $(".pullDownLabel"),
        pullUpLabel = $(".pullUpLabel"),
        loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新
    pullDown.hide();
    pullUp.hide();

    myScroll = new IScroll("#wrapper", {
        scrollbars: false,   //是否显示滚动条
        mouseWheel: false,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        scrollY: true,
        probeType: 2,
        bindToWrapper: true
    });
    myScroll.on("scroll", function () {
        if (loadingStep == 0 && !pullDown.attr("class").match('refresh|loading') && !pullUp.attr("class").match('refresh')) {
            if (this.y > 40) { //下拉刷新操作
                $(".pulldown-tips").hide();
                pullDown.addClass("refresh").show(); //显示刷新框
                pullDownLabel.text("松手刷新数据");
                loadingStep = 1;
                myScroll.refresh();
            } else if (this.y < (this.maxScrollY - 14)) { //上拉加载更多
                pullUp.addClass("refresh").show();//显示刷新框
                pullUpLabel.text("正在载入");
                loadingStep = 1;
                //上拉加载函数
                pullUpAction();
            }
        }
    });
    myScroll.on("scrollEnd", function () {
        if (loadingStep == 1) {
            if (pullDown.attr("class").match("refresh")) { //下拉刷新操作
                pullDown.removeClass("refresh").addClass("loading");
                pullDownLabel.text("正在刷新");
                loadingStep = 2;
                pullDownAction();  //下拉刷新函数
            }
        }
    });

    function pullDownAction() {
        setTimeout(function () {

            $.ajax({
                url: '',
                type: 'post',
                dataType: 'json',
                data: {page: num},
                success: function (data) {
                    console.log(data)
                },
                error: function (err) {
                    console.log(err)
                }
            });

            pullDown.attr('class', '').hide();
            myScroll.refresh();
            loadingStep = 0;
            $(".pulldown-tips").show();
        }, 1000);
    }

    function pullUpAction() {
        setTimeout(function () {
            num++;
            if (num > pageNum) {
                pullUp.addClass("refresh").show();
                pullUpLabel.text("已经没有数据了！");
                return;
            }
            $.ajax({
                url: '',
                type: 'post',
                dataType: 'json',
                data: {page: num},
                success: function (data) {
                    console.log(data);

                    pullUp.attr('class', '').hide();
                    myScroll.refresh();
                    loadingStep = 0;
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }, 1000);
    }

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
}

$(function () {
    //1.导航条滑块特效
    navSpecialEffects();
    //2.导航条吸顶效果
    navSuctionTop();
    //3.移动端导航栏菜单按钮特效
    navMenuBtnClick();
    //4.博客板块鼠标悬停特效
    blogItemMouseOver();
    //5.加载我喜欢的歌曲
    loadMyLoveMusic();
    //6.加载最新歌曲
    var newMusic = [];
    var newMusicUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?' +
        'g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&' +
        'notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
    loadMusic($(".newsong>ul"),newMusicUrl,newMusic);
    //7.加载最热歌曲
    var hotMusic = [];
    var hotMusicUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?' +
        'g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&' +
        'notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472'
    loadMusic($(".hotsong>ul"),hotMusicUrl,hotMusic);
    //8.加载热门mv
    var hotMv = [];
    loadHotMv();


    /**
     * 导航条特效
     */
    function navSpecialEffects() {
        var huakuai = $("#huakuai");
        var currentIndex = 0;
        var begin = 0,end = 0, rate = 0.1;
        var prevIndex = 0,index = 0;
        $("#nav li").mouseover(function () {
            index = $(this).index();
            var li_width = $(this).width();
            end = index * li_width;
            prevIndex = index;
            var timer = setInterval(function () {
                begin = begin + (end - begin) * rate;
                huakuai.css("left",begin + "px");
                if(Math.ceil(begin) === Math.ceil(end)){
                    clearInterval(timer);
                }
            }, 50);

        });
        $("#nav li").mouseout(function () {
            var li_width = $(this).width();
            end = currentIndex * li_width;
            var timer = setInterval(function () {
                begin = begin + (end - begin) * rate;
                huakuai.css("left",begin + "px");
                if(Math.ceil(begin) === Math.ceil(end)){
                    clearInterval(timer);
                }
            }, 50);
        });
        $("#nav li").click(function () {
            index = $(this).index();
            currentIndex = index;
        });
    }

    /**
     * 导航条吸顶效果
     */
    function navSuctionTop() {
        var header = $("#header_silde_down");
        var header_height = header.height();
        $(window).scroll(function () {
            // console.log($(this).scrollTop());
            var header_scrollTop = $(this).scrollTop();
            if(header_scrollTop >= header_height ){
                header.stop().slideUp("fast");
            }else{
                header.stop().slideDown("fast");
            }
        });

    }

    /**
     * 移动端导航栏菜单按钮特效
     */
    function navMenuBtnClick() {
        var menuBtn = $("#menuBtn").find("span");
        var menuList = $("#menuBtn").find("ul");
        // console.log(menuBtn);
        menuBtn.click(function () {
            $(this).toggleClass(function () {
                if($(this).is(".srivenIcon-4")){
                    return "srivenIcon--";
                }else{
                    return "srivenIcon-4";
                }
            });
            menuList.stop().slideToggle("slow");
        });
    }

    /**
     * 博客板块鼠标悬停特效
     */
    function blogItemMouseOver() {
        var blog = $("#blog");
        var blog_list = blog.find("li");
        blog_list.mouseover(function () {
            $(this).addClass("blog-item currentBlog");
            $(this).find("p").stop().show();
            $(this).siblings().removeClass("currentBlog");
            $(this).siblings().find("p").stop().hide();
        })
    }

    /**
     * 加载我喜欢的歌曲
     */
    function loadMyLoveMusic() {

    }

    /**
     * 加载最新歌曲
     */
    function loadMusic(newsong,url,music) {
        // console.log(newsong);

        $.ajax({
            url:url,
            type:"get",
            dataType:'jsonp',
            jsonp: "jsonpCallback",
            scriptCharset: 'GBK',//解决中文乱码
            success: function(data){
                // console.log(data);
                for(var i = 0; i < 10; i++){
                    music[i] = data.songlist[i].data;
                    music[i].songurl = "https://api.bzqll.com/music/tencent/url?id="+music[i].songmid+"&key=579621905";
                    music[i].songpic = "https://api.bzqll.com/music/tencent/pic?id="+music[i].songmid+"&key=579621905";
                    music[i].songlrc = "https://api.bzqll.com/music/tencent/lrc?id="+music[i].songmid+"&key=579621905";
                    var item = creatEleMusic(i,music[i]);
                    newsong.append(item);
                    // console.log(music[i].songpic);
                }
            },
            error:function (e) {
                console.log(e);
            }
        });

    }

    function loadHotMv() {
        var mv = $("#mv ul");
        var hotMvUrl = 'https://api.bzqll.com/music/tencent/hotMvList?key=579621905&year=0&tag=0&area=0&limit=100&offset=0';
        $.ajax({
            url:hotMvUrl,
            type:"get",
            dataType:'json',
            jsonp: "jsonpCallback",
            scriptCharset: 'GBK',//解决中文乱码
            success: function(data){
                // console.log(data);
                for(var i = 0; i < 6; i++){
                    hotMv[i] = data.data[i];
                    var item = creatEleMv(i,hotMv[i]);
                    mv.append(item);
                    console.log(hotMv[i]);
                }
            },
            error:function (e) {
                console.log(e);
            }
        });
    }

    /**
     * 创建音乐元素
     */
    function creatEleMusic(index,music) {
        var str = null;
        if(index === 0){
            str = $('<li class="music-content-item number-one">\n' +
                '                            <div class="number-one-desc">\n' +
                '                                <ul>\n' +
                '                                    <li class="first">NO.1</li>\n' +
                '                                    <li class="first-song-name">'+music.songname+'</li>\n' +
                '                                    <li class="first-song-singer">'+music.singer[0].name+'</li>\n' +
                '                                </ul>\n' +
                '                            </div>\n' +
                '                            <a class="number-one-pic">\n' +
                '                                <img src=' + music.songpic + '>\n' +
                '                            </a>\n' +
                '                        </li>');
        }else if(index === 1){
            str = $('<li class="music-content-item">\n' +
                '                            <p class="music-index second">'+(index+1)+'</p>\n' +
                '                            <p class="music-song-name">'+music.songname+'</p>\n' +
                '                            <p class="music-song-singer">'+music.singer[0].name+'</p>\n' +
                '                        </li>');
        }else if(index === 2){
            str = $('<li class="music-content-item">\n' +
                '                            <p class="music-index third">'+(index+1)+'</p>\n' +
                '                            <p class="music-song-name">'+music.songname+'</p>\n' +
                '                            <p class="music-song-singer">'+music.singer[0].name+'</p>\n' +
                '                        </li>');
        }else{
            str = $('<li class="music-content-item">\n' +
                '                            <p class="music-index">'+(index+1)+'</p>\n' +
                '                            <p class="music-song-name">'+music.songname+'</p>\n' +
                '                            <p class="music-song-singer">'+music.singer[0].name+'</p>\n' +
                '                        </li>');
        }
        str.get(0).index = index;
        str.get(0).music = music;
        return str;
    }
    
    function creatEleMv(index,mv) {
        var mvstr = $('<li>\n' +
            '                        <a href="javascript:;" title='+mv.name+'--'+mv.singer+'>\n' +
            '                            <img src='+mv.pic+'>\n' +
            '                        </a>\n' +
            '                        <p class="mv-name">'+mv.name+'</p>\n' +
            '                        <p class="mv-singer">--'+mv.singer+'</p>\n' +
            '                    </li>');
        mvstr.get(0).index = index;
        mvstr.get(0).mv = music;
        return mvstr;
    }
})();
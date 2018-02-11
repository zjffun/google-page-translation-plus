// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  if(request.cmd == 'trans_pre') {
    // 给popup返回全部pre标签中的内容
    var pre_tag = [];
    $('pre').each(function(){
      pre_tag.push($(this).html());
    })
    sendResponse(JSON.stringify(pre_tag));
  }
  if(request.cmd == 'OT'){
    translated_page_pretreatment();
    injectCustomJs("_intlStrings._originalText = '中文译文'");
    $('[dh-lang=ori]').removeClass('google-src-text');
    $('[dh-lang=tran]').addClass('google-src-text');
  }
  if(request.cmd == 'TO'){
    translated_page_pretreatment();
    injectCustomJs("_intlStrings._originalText = '英语原文'");
    $('[dh-lang=tran]').removeClass('google-src-text');
    $('[dh-lang=ori]').addClass('google-src-text');
  }
  if(request.cmd == 'SS'){
    translated_page_pretreatment();
  }
  if(request.cmd == 'TB'){
    translated_page_pretreatment();
  }
});

$(function(){
  goto_translated_page();
  replace_pre_html();
})


// 展示谷歌翻译过的iframe里的界面（translate_p）
function goto_translated_page(){
  var $translated_page = $("iframe[src^='https://translate.googleusercontent.com/translate_p?']")
  if ($translated_page.length) {
    location.href = $translated_page.attr('src')
  }
}

// 替换pre标签的html（translate_c）
function replace_pre_html(){
  if (location.href.startsWith('https://translate.googleusercontent.com/translate_c?')) {
    chrome.runtime.sendMessage({cmd: 'get_pre'}, function(response) {
      console.log('replace_pre_html收到来自popup.js的回复：'+response);
      var pre_html = JSON.parse(response);
      if (pre_html) {
        $('pre').each(function(index, element){
          $(element).html(pre_html[index]);
        })
      }
    });
  }
}

// 处理翻译过的界面
function translated_page_pretreatment(){
  // 检查是否处理过
  if ($('#gptp_pretreatmented').length) {
    return
  }
  if (location.href.startsWith('https://translate.googleusercontent.com/translate_c?')) {
    // 获取全部翻译过的节点
    var $translateNodes = $('span.notranslate');
    $translateNodes.each(function(){
      var $translateNodeChilds = $(this).children();
      var translatechildNodes = this.childNodes;
      $translateNodeChilds.first().attr("dh-lang","ori");
      var $spanZh = $('<span></span>');
      // 使用$translateNodeChilds.each()纯文本节点无法转移
      // 所以使用this.childNodes（translatechildNodes）
      for (var i = translatechildNodes.length - 1; i > 0; i--) {
        $spanZh.append($(translatechildNodes[1]));
      }
      $spanZh.attr("dh-lang","tran");
      $(this).append($spanZh);
    });
    // 添加处理过的标识
    $('body').append('<div id="gptp_pretreatmented"></div>');
  }else{
    alert('请先点击翻译翻译界面');
  }
}


// 向页面注入JS
function injectCustomJs(js)
{
  // jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  // temp.src = chrome.extension.getURL(jsPath);
  temp.innerHTML = js;
  temp.onload = function()
  {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}
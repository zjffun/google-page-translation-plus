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

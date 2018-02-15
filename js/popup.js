// 接收来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  if (request.cmd == 'get_pre') {
    sendResponse(localStorage.pre_tag);
  }
});


$(function(){
  var trans_url_prefix = 'https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&ie=UTF8&prev=_t&rurl=translate.google.com.hk&sl=en&sp=nmt4&tl=zh-CN&u='
  // 点击翻译网页按钮
  $('#trans').click(() => {
    sendMessageToContentScript({cmd:'trans_pre'}, (response) => {
      console.log('#trans收到来自content-script的回复：'+response);
      localStorage.pre_tag = response;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.update({url: trans_url_prefix + tabs[0].url});
      });
    });
  });
  $('#view_to').click(() => {
    sendMessageToContentScript({cmd:'TO'});
  });
  $('#view_ot').click(() => {
    sendMessageToContentScript({cmd:'OT'});
  });
  $('#view_oot').click(() => {
    sendMessageToContentScript({cmd:'OOT'});
  });
  $('#func_edit').click(() => {
    sendMessageToContentScript({cmd:'toggle_edit'});
  });
  $('#func_save_pre').click(() => {
    sendMessageToContentScript({cmd:'trans_pre'}, (response) => {
      console.log('#trans收到来自content-script的回复：'+response);
      localStorage.pre_tag = response;
      alert('保存成功');
    });
  });
  $('#func_replace_pre').click(() => {
    sendMessageToContentScript({cmd:'replace_pre'});
  });
});

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
  getCurrentTabId((tabId) =>
  {
    chrome.tabs.sendMessage(tabId, message, function(response)
    {
      if(callback) callback(response);
    });
  });
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    if(callback) callback(tabs.length ? tabs[0].id: null);
  });
}

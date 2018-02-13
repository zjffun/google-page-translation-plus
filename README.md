# 《谷歌页面翻译增强插件》google-page-translation-plus
对谷歌的页面翻译进行增强的插件。主要功能：水平并列、垂直并列展示翻译结果，鼠标悬停展示原文或译文，通过保存翻译前的格式修正代码块显示异常，保存翻译结果等。This is a plugin that enhances Google's page translation. The main function: Display of translation results side by side or top / bottom, Original with hover translation or translation with hover original, Correct the display of code block by saving the pre-translation format, Save the translation results,etc.

# 安装
因为咱还没花$5成为开发者，所以打包成crx安装了也不让启用，只能用入下方式安装。。    

1. 更多工具->拓展程序

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image1.png)

2. 选择开发者模式-加载已解压的扩展程序-选择下载下来的google-page-translation-plus文件夹-确定

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image2.png)

3. 这样就是安装成功了

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image3.png)

# 使用
因为本插件要使用google翻译所以要先学会[如何科学上网](https://www.baidu.com/baidu?wd=%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91&tn=monline_4_dg&ie=utf-8)，咱在chrome-extension文件夹里放了一个良心的Chrome科学上网插件，直接安装然后在右上角工具栏找到，注册后选择地区就能用。

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image13.png)


## 右上角工具栏的谷歌翻译带个加号的图标
就是这个：

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image14.png)

## 翻译
点击翻译进行翻译（没做选项，只有默认的英译汉）  
对比一下吧：  
google翻译翻译网页的结果（代码的格式乱了）：

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image4.png)

本插件翻译翻译的结果（对代码的格式进行了修正，并且去掉了上面谷歌翻译自带的工具条）：

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image5.png)

虽然使用Chrome右键菜单里的翻译成中文（简体）的功能也将代码格式保留，但没有办法查看翻译前的内容比较坑了。。

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image6.png)


## 视图
鼠标停留显示翻译前内容

（默认就是这个）

鼠标停留显示翻译后内容

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image7.png)

同时显示翻译前后内容

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image8.png)

## 功能

### 编辑
会使页面所有元素可编辑（主要想将错误的地方改了保存起来）  

1. 鼠标点击或选择要修改的地方

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image9.png)

2. 修改

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image10.png)

3. 编辑状态下无法另存为，所以要再点击一下编辑按钮关闭编辑（咱确实想做一个保存网页的但发现太难了，谷歌自带的就很好了）

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image11.png)

4. 保存后打开还可以选择各种视图或者再次进行编辑

![image](https://raw.githubusercontent.com/1010543618/google-page-translation-plus/master/readme-img/Image12.png)




以后可能会再填别的坑，祝您使用愉快\^_^
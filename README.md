# JLU VPNS Dokodemo Door
一个简单的Node.js后端部署在Heroku上。只负责URL转换并302到新URL。
跳转url只需要 `http://webvpn.jlu.merlyn.cc/`+`<原URL>`即可。如果原URL不合法会自动跳转到`about:blank`
---
**以下为旧版**
其实就是一个重定向任意门，打开[这个页面](https://webvpn.jlu.edu.cn/https/77726476706e69737468656265737421fdf253903e3e695c720d87e29f5c373d3f27c82a2a/jlu-vpns-dokodemo-door/)，再使用重定向功能就可以用打开JLU vpns代理的网页。
更新：
1. 新增url传参方式直接跳转，url后拼接"?"+目标url即可。
2. 由于WebVPN改版，更新一下url。

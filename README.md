# JLU VPNS Dokodemo Door
Node.js脚本，用于将任意（中国大陆可以访问的）URL转换并跳转到JLU Web VPN的URL。
## Prerequisite
需要[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)和[Node.js](https://nodejs.org/en/)
## Usage
- 
    ```shell
    npm run start
    ```  
    之后启动浏览器访问<http://localhost:8080>可。  
- 也支持直接在主机名后直接拼接目标网址的URL。如<http://localhost:8080/https://www.baidu.com/>  
- 可能会跳转到登陆界面，完成登陆后重新尝试一次即可。

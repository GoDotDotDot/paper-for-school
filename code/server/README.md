# CAS
Micro Central Authentication Service based nodejs and mongodb.

基于`nodejs`、`mongodb`的微型CAS系统
## 说明
- 由于公司会员系统数据库在阿里云的`MySql`上，业务系统使用过多，不方便迁移到`mongodb`，所以在单点登录这快需要使用`mysql npm`包驱动，获取会员信息。
- 目前公司业务系统都使用了同一个主域名，所以只是简单的使用了'同域'下的单点登录，后期将会新增跨域。
## 版本
- 同域请访问`master`分支
- 跨域请访问`cross-orign`分支
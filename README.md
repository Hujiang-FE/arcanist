# arcanist

对 phabricator 中 arcanist 的一个 nodejs 的封装，方便用户安装使用

## Requires

- `git`
- `php`: mac 一般自带 php， windows 要安装 php 可以[参考这里](https://secure.phabricator.com/book/phabricator/article/arcanist_windows/#detailed-php-install-ins)


## Install

```
# 安装
npm install -g arcanist

# 认证
arc install-certificate http://your_phabricator_site.com
```


官方的安装方法： [Arcanist Quick Start](https://secure.phabricator.com/book/phabricator/article/arcanist_quick_start/)


`使用 npm 安装的方法` 与 `官方的安装方法` 相比，优点是：

- **下载速度快：** 将源代码压缩之后托管在七牛上，中国用户在下载时相比官方方法来说会快许多
- **无需配置：** 安装完后直接就可以使用 `arc` 命令，无需任何配置


## 使用 arc 的 review 流程

1. `git checkout -b feature_xxx` — 创建一个新分支，并修改代码
2. `git commit` — 将该提交的都提交上去
3. `arc diff [last_commit]` — 此命令会将 last_commit 到最新的 commit 之间的改动的所有代码发送到 phabricator 平台，并创建一个 revision；如果没有指定 last_commit，则会使用 master 分支来作为 last_commit 的起点。
  - 运行命令后会弹出一个编辑面板，在此面板中你需要指定 reviewers，即指定一个或多个给你 review code 的人
  - 如果指定了多个 reviewers，则其中任何一个 review 通过就可以，不用全部 review 通过
  - 另外编辑面板中也有一个 test plan 选项，国外人一般每个项目都有测试，所以此项是必填的，如果没有测试，我们只需要随便设置一个字段即可，比如设置成 `no` 或 `skip`
4. 第 2 步操作之后，系统会发送邮件通知 reviewers 去 review 你的代码，你也可以通过 `arc list` 来查看当前 review 的状态
5. 
  - 如果 review 没有通过，你需要在原来的基础上修改，修改完并 commit 之后需要执行 `arc diff --update D(id)` 继续 review
  - 如果 review 通过了，只需要运行 `arc land`， arc 会将你当前分支合并的 master 上，并删除当前分支


> 更多详情可以查看[英文指导文档](https://phab.enlightenment.org/w/arcanist/)


## code review 的个人观点

1. 提交 review 时至少提交给两个人，这样就不至少因为某人太忙而 review 被搁置了
1. 一个功能就提交一次 review，不要将一大堆代码一股脑的提交上去，尽量将一次 review 的代码最小化




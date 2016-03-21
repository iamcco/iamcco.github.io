title: Neovim 插件开发
date: 2016-03-21 21:19:04
categories:
 - editor
tags:
 - neovim
---

自从掉进 vim 这个大坑之后，用其他编辑器总是感觉很不舒服，就算装了 vim-mode 插件也是一个样。在用了几个月的 Atom 和 Webstorm 后，还是把 Windows 卸了装了 Ubuntu，然后装了 neovim，：）。之所以转向 neovim 的理由是 neovim 的很多特性真的很令人兴奋，并且对 vim 的兼容程度很高，配置基本不用做任何修改就能用。从 neovim 发布 0.1.0 版的时候就特别想试试，现在连续用了一个多月，感觉很棒。

吧啦吧啦了这么多，下面进入这篇文章的主题，编写一个简单的 neovim 插件

[dict.nvim](https://github.com/iamcco/dict.nvim) 一个简单的翻译插件

以前曾写过一个 [dict.vim](https://github.com/iamcco/dict.vim) 插件，这个插件在网络流畅的时候是没有什么问题的，但是在网络很差的时候，在翻译的过程中可能要卡你个一秒半秒的，让人很不爽。这也是因为 vim 本身不支持异步（到目前为止貌似 vim 已经开始支持 job）

下面开写

打开 neovim，输入 `:h remote-plugin` 回车，可以看帮助文档，并且附有一个简单的例子：

```
import neovim

@neovim.plugin
class Limit(object):
    def __init__(self, vim):
        self.vim = vim
        self.calls = 0

    @neovim.command('Cmd', range='', nargs='*', sync=True)
    def command_handler(self, args, range):
        self._increment_calls()
        self.vim.current.line = (
            'Command: Called %d times, args: %s, range: %s' % (self.calls,
                                                               args,
                                                               range))

    @neovim.autocmd('BufEnter', pattern='*.py', eval='expand("<afile>")',
                    sync=True)
    def autocmd_handler(self, filename):
        self._increment_calls()
        self.vim.current.line = (
            'Autocmd: Called %s times, file: %s' % (self.calls, filename))

    @neovim.function('Func')
    def function_handler(self, args):
        self._increment_calls()
        self.vim.current.line = (
            'Function: Called %d times, args: %s' % (self.calls, args))

    def _increment_calls(self):
        if self.calls == 5:
            raise Exception('Too many calls!')
        self.calls += 1

```

把代码保存到 `~/.config/nvim/rplugin/python/limit.py`，然后敲入 `:UpdateRemotePluins` 回车，这样一个简单的插件就配置好了，然后敲入 `:Cmd` 命令等就能看到效果。

有了这个例子我们就能开始写我们的插件了，当然前提是需要对 vim 的插件开发有所了解。

首先在 github 上新建一个项目，我建的项目名字是 `dict.nvim`，然后通过插件管理器安装这个“插件”，
我用的 plug-vim 来管理插件，所以只需要写入 `Plug 'iamcco/dict.nvim'`，之后保存退出后，再次进入
neovim 然后敲入 `:PlugInstall` 就能安装到本地了。

进入 dict.nvim 插件目录，创建以下文件结构:

```
dict.nvim
├── .gitignore
├── plugin
│   └── dict.vim
└── rplugin
    └── python3
        ├── dict
        │   ├── __init__.py
        │   └── util.py
        └── dict.py
```
在 .gitignore 中加入不想同步的文件 `*.pyc`

首先要翻译，得有一个翻译的 api，这里用的是[有道翻译 API](http://fanyi.youdao.com/openapi?path=data-mode)

用有道翻译得申请 key，当然是免费的，这里我申请的 key 是：

```
keyfrom: aioiyuuko
key:     1932136763
```

然后就可以通过:

```
http://fanyi.youdao.com/openapi.do?keyfrom=aioiyuuko&key=1932136763&type=data&doctype=json&version=1.1&q=hello
```
在浏览器地址填入上面的接口地址，就能得到 hello 的翻译了

好了，接口有了就开始写插件。

打开 `util.py` 编写工具类：

```
import json
from urllib import request

URL     = 'http://fanyi.youdao.com/openapi.do?keyfrom=%s&key=%s&type=data&\
                                                doctype=json&version=1.1&q=%s'
errorCode = {
    '0':       'success',
    '20':      'Text is too loog',
    '30':      'Cannot not be translated effectively',
    '40':      'Language type is not suppport',
    '50':      'Invalid key',
    '60':      'No result',
    'other':   'Query failed',
    'noQuery': 'Result type is not json'
}

class Util(object):
    def __init__(self, keyfrom, key):
        self.keyfrom = keyfrom
        self.key = key

    def filter(self, data):
        result = {}
        if data['errorCode'] == 0:
            result['status'] = True
            result['message'] = ' '.join(data['translation'])
        else:
            result['status'] = False
            result['message'] = errorCode[str(data['errorCode'])]
        return result

    def query(self, q = '', type = 'base'):
        queryUrl = URL % (self.keyfrom, self.key, request.quote(q))
        try:
            data = request.urlopen(queryUrl).read().decode('utf-8')
            data = json.loads(data)
            data = self.filter(data)
        except ValueError:
            data = {
                'status': False,
                'message': errorCode['noQuery'],
            }
        except request.URLError as message:
            data = {
                'status': False,
                'message': 'No network'
            }
        except Exception as message:
            data = {
                'status': False,
                'message': message
            }
        return data
```

工具类 Util 有三个方法，`__init__` 方法初始化对象，保存 key 和 keyfrom，`filter` 方法处理数据为需要的格式，`query` 用来获取翻译数据。

打开 `__init__.py` 编写：

```
import neovim
from dict.util import Util

@neovim.plugin
class Dict(object):
    def __init__(self, vim):
        self.vim = vim
        self.util = ''

    @neovim.function('__dict_query')
    def dict_query(self, args):
        if self.util == '':
            self.util = Util(args[0], args[1])

        data = self.util.query(' '.join(args[2:]))
        if data['status']:
            message = data['message']
        else:
            message = 'Search failed：%s' % data['message']

        # escape " and '
        message = message.replace('"','\\"').replace("'","\\'")

        self.vim.command('echo "%s"' % message)
```

首先引入 neovim 模块，然后是我们上面写的工具类 Util，然后通过 neovim 模块的修饰器定义 Dict 类， `__init__` 方法初始化的时候，neovim 会传入 vim 对象，有了这个对象，就可以像对 neovim 进行各种操作了。`@neovim.function` 修饰器的作用就是在让 python 方法可以在 viml 中调用，在 neovim 中 `:call __dict_query` 调用的就是 `dict_query` 这个方法

> 关于 vim 这个对象，可以通过 `:h python-vim` 查看文档

好了，现在敲入 `:UpdateRemotePluins` 回车，现在就可以通过 `:call __dict_query('1932136763', 'aioiyuuko', 'hello')` 看到 hello 的翻译结果了

每次这样翻译，估计没人会用这个插件吧。。。

最后一步就是写个 function 封装一下，然后配置一下快捷键，一键翻译什么的

打开 `dict.vim` 文件编写：

```
" 有道 openapi key
if !exists('g:dict_key') || !exists('g:dict_keyfrom')
    let g:dict_keyfrom = 'aioiyuuko'
    let g:dict_key = '1932136763'
endif

nmap <silent> <Leader>d :call __dict_query(g:dict_keyfrom, g:dict_key, expand("<cword>"))

```

返回 normal 模式，敲入 `:source %` 回车，现在把光标移到一个单词上，敲入快捷键 `<Leader>d`，就能翻译当前光标下的单词了

好了，一个最简单的插件就写完了。

全部代码看这里 [dict.nvim](https://github.com/iamcco/dict.nvim)

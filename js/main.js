var css1 = 
`
/* 
 * 面试官你好，我是xxx
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
* {
    transition: all 1s;
}
html {
    background: #333;
}
#code {
    border: 1px solid #aaa;
    padding: 16px;
}

/* 接下来，我需要一点代码高亮 */

.token.selector {color: #690;}
.token.property {color: #905;}

/*加一个呼吸效果*/

#code {
    animation: breath .5s infinite alternate-reverse;
}

/* 给我一张白纸 */

#code-wrapper {
    width: 50%; 
    height: 100%;
    left: 0;
    position: fixed;
}
#paper>.content {
    display: block;
}

/*现在我就可以在这张白纸上展示我的简历了*/
`
var css2 =
`
/* 接下来利用一个不错的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

var md = 
`
# 自我介绍
我叫xxx，1994年9月出生，本科毕业，所学专业为信息管理与信息系统
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉JavaScript、CSS，了解Vue的基本使用

# 项目介绍
1. 微信小程序
2. H5动画
3. 响应式网站界面设计

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
var css3 = 
`
/*
 * 这就是我的动态的简历
 * 谢谢观看
 */
`
writeCss('',css1,() => {
    createPaper(() => {
        writeMarkdown(md,() => {
            writeCss(css1,css2,() => {
                convertMarkdownToHtml(() => {
                    writeCss(css1+css2,css3,() => {
                        console.log('完成！')
                    })
                })
            })
        })
    })
})
//把code写到#code里和style标签里
function writeCss(prefix,code,fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix+code.substring(0,n),Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    },70)
}
function writeMarkdown(markdown,fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn && fn.call()
        }
    },35)
}

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html mrakdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper>.content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}
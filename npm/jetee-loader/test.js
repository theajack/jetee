let {parse} = require('node-html-parser')
let recast = require('recast')
const {
    property,
    identifier,
    literal
} = recast.types.builders;

let html = /*html*/`<style>
.aaa{
    color: #fff;
}
</style>
<div j='user'>
<div j=name>'姓名:'+$</div>
<div>年龄:<input j='age' type='text' class='j-input' jon='input:logAge'/></div>
<div j='age'>($<18)?'未成年':'成年人'</div>
</div>
<script>
import Jet from '../jetee/index.js';
var a = 'xxx';
export default {
    test: '111'
    data: {
        test () {
            return a + '11';
        }
    },
    func: {
        logAge () {
            this.$nextTick(() => {
                console.log(this.$par.user.age, a, this.test);
            });
        }
    }
};
</script>`

let root = parse(html, {
    lowerCaseTagName: false,  // convert tag name to lower case (hurt performance heavily)
    script: true,            // retrieve content in <script> (hurt performance slightly)
    style: true,             // retrieve content in <style> (hurt performance slightly)
    pre: false,               // retrieve content in <pre> (hurt performance slightly)
    comment: false            // retrieve comments (hurt performance slightly)
})

let template = '';
let style = '';
let script = '';

for(let i=0;i<root.childNodes.length;i++){
    let node = root.childNodes[i];
    if(node.nodeType === 1){
        let content = node.innerHTML;
        if(node.tagName === 'style'){
            style += content;
        }else if(node.tagName === 'script'){
            script += content;
        }else{
            template += content;
        }
    }else if(node.nodeType === 3){
        template += node.text;
    }
}

template = template.replace(/\n/g, '\\\n');
style = style.replace(/\n/g, '\\\n');

console.log(template)
// const ast = recast.parse(script)

// var visitor={};
// // if(options.Expression){
// visitor.visitExpressionStatement = function(path) {
//     if (!TNT.ExpressionStatement.check(path.node)) {
//         throw new Error('TNT.ExpressionStatement.check(node)=false')
//     }
//     if(!refactor.call(this,path)){
//         return false;
//     }
// }
// // }

// // let commonFunc = function(path){
// //     if(!refactor.call(this,path)){
// //         return false;
// //     }
// // };

// // if(options.Return){
// //     visitor.visitReturnStatement = commonFunc;
// // }
// // if(options.Throw){
// //     visitor.visitThrowStatement = function(path){
// //         if(!refactor.call(this,path, true)){
// //             return false;
// //         }
// //     };
// // }
// // if(options.Declaration){
// //     visitor.visitVariableDeclaration = commonFunc;
// // }


// // recast.visit(ast, visitor)

// // if(needDealCode){
// //     return resetCode(recast.print(ast).code);
// // }
// // return recast.print(ast).code;
// let body = ast.program.body
// for(let i =0;i< body.length;i++){
//     let declaration = body[i];
//     if(declaration.constructor.name === 'ExportDefaultDeclaration'){
//         declaration.declaration.properties.push(
//             property('init', identifier('template'), literal(template)),
//             property('init', identifier('style'), literal(style))
//         )
//     }
// }

// let code = recast.print(ast).code

// console.log(root, ast, code)
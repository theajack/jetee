let {parse} = require('node-html-parser')
let recast = require('recast')
const {
    property,
    identifier,
    literal
} = recast.types.builders;

function parseHTML(html){
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
    template = template.replace(/\n/g, '\\');
    style = style.replace(/\n/g, '\\');
    return {template, style, script};
}

function rebuildScript({template, style, script}){
    const ast = recast.parse(script)
    
    var visitor={};
    // if(options.Expression){
    visitor.visitExpressionStatement = function(path) {
        if (!TNT.ExpressionStatement.check(path.node)) {
            throw new Error('TNT.ExpressionStatement.check(node)=false')
        }
        if(!refactor.call(this,path)){
            return false;
        }
    }

    let body = ast.program.body
    for(let i =0;i< body.length;i++){
        let declaration = body[i];
        if(declaration.constructor.name === 'ExportDefaultDeclaration'){
            declaration.declaration.properties.push(
                property('init', identifier('template'), literal(template)),
                property('init', identifier('style'), literal(style))
            )
        }
    }
    
    return recast.print(ast).code
}

module.exports = function(html){
    return rebuildScript(parseHTML(html))
}
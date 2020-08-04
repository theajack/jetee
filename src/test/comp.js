
// const hello = 'Hello world!';
var a = 'xxx';
export default {
    template: /* html*/`
        <div j='user'>
            <div j=name>'姓名:'+$</div>
            <div>年龄:<input j='age' type='text' class='j-input' jon='input:logAge'/></div>
            <div j='age'>($<18)?'未成年':'成年人'</div>
        </div>
    `,
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
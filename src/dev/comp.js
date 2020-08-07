
// const hello = 'Hello world!';
var a = 'xxx';
export default {
    template: /* html*/`
        <div j='$props'>
            <div j=aaa>'姓名:'+$</div>
            <input j='aaa'/>
        </div>
        <div j='user'>
            <div j=name>'姓名:'+$</div>
            <div>年龄:<input j='age' type='text' class='j-input' jon='input:logAgeChild'/></div>
            <div j='age'>($<18)?'未成年':'成年人'</div>
        </div>
        <button jon='logAha'>logAha</button>
    `,
    data: {
        test () {
            return a + '11';
        }
    },
    func: {
        logAgeChild () {
            console.log(this.$par);
            this.$nextTick(() => {
                console.log(this.$par.user.age, a, this.test);
            });
        }
    }
};
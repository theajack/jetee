
export default {
    data: {
        test () {
            return '11';
        }
    },
    onmounted () {
        // debugger;
        console.log(this);
        window.aaa = this;
    },
    func: {
        logAge () {
            this.$nextTick(() => {
                console.log(this.$par.user.age, this.test);
            });
        }
    },
    template: `<div j='user'>
        <div j=name>'姓名:'+$</div>
        <div>年龄:<input j='age' type='text' class='j-input' jon='input:logAge'/></div>
        <div j='age'>($<18)?'未成年':'成年人'</div>
    </div>
    <div j='$props'>
    <div j='user'>
        <div j=name>'姓名:'+$</div>
        <div>年龄:<input j='age' type='text' class='j-input' jon='input:logAge'/></div>
        <div j='age'>($<18)?'未成年':'成年人'</div>
    </div>
    </div>`,
    style: `
    .aaa{
        color: #fff;
    }`,
};
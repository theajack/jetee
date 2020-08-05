
export default {
    template: /* html*/`
        <div class='test-common2'>使用phone：<input type="text" jvalid='phone'></div>
        <div>
            <span jlang>
                <span jname='cn'>使用带规定值的规则：</span>
                <span jname='en'>hello world</span>
            </span>
            <input type="text" jvalid='number[2]'>
        </div>
        <div>使用带范围的规则：<input type="text" jvalid='range[10,20]'></div>
        <div>使用null来允许空值：<input type="text" jvalid='date null'></div>
        <div>使用自定义的规则（手机号验证）：<input type="text" jvalid='express[^([1]\d{10})$]'></div>
    `
};
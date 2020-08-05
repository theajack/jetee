
export default {
    style: /* css*/`
        .test-mes{
            color: ((themeColor));
        }
    `,
    template: /* html*/`
        <div class="j-select" width='300'>
            <!--使用icon-->
            <div class="j-option" value='1' icon='bar-chart'>选项一</div>
            <div class="j-option" default value='2' icon='pencil'>选项二</div>
            <div class="j-option" disabled value='3' icon='pencil'>选项三</div>
        </div><br>

        <div class="j-select" disabled>
            <div class="j-option" value='1'><i class='j-icon icon-pencil'></i>选项一</div>
            <div class="j-option" default value='2'><i class='j-icon icon-pencil'></i>选项二</div>
            <div class="j-option" disabled value='3'><i class='j-icon icon-pencil'></i>选项三</div>
        </div>
        <!--使用数据绑定-->
        <div j='vs'>
            <span J='value'></span>
            <div class="j-select" jui-bind='value' jattr='aaa:{{$.list}}' j='list'>
                <div class="j-option" j=$each>
                    <i class='j-icon icon-pencil'></i><span j=$value></span>
                </div>
            </div>
        </div>
    `,
    data: {
        list: ['选项a', '选项b'],
        select: null,
        vs: {
            value: '选项1',
            list: ['选项1', '选项2']
        },
    }
};
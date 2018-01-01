layui.use(['element', 'layer', 'form'], function() {
    var layer = layui.layer,
        form = layui.form,
        element = layui.element;
    $(document).on("click", "#insertTalent", function() {
        layer.open({
            type: 1,
            title: '新增学校',
            maxmin: true,
            shadeClose: true, //点击遮罩关闭层
            area: ['858px', '700px'],
            content: $('#layer_inster'),
            btn: ['提交'],
            btnAlign: 'c',
            yes: function(index, layero) {
                layer.close(index);
                layer.msg("新增成功", {
                    time: 1000
                })
            }
        });
    })
});
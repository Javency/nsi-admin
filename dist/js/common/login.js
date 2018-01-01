 //弹出一个页面层
 $(function() {
     $('#login').on('click', function() {
         layer.open({
             type: 1,
             area: ['600px', '360px'],
             shadeClose: true, //点击遮罩关闭
             content: '<h2>hahahahahaha</h2>'
         });
     });
 })
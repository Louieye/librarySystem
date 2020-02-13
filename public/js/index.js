$(function(){
    //渲染页面
    function initList(){
        //获取所有信息
        $.ajax({
            type : 'get',
            url : '/books',
            dataType : 'json',
            success : function(data){
                //渲染页面
                var html = template('indexTpl',{list : data});
                $('#dataList').html(html);
                //操作DOM标签 (必须在渲染完页面后才能进行)
                $('#dataList').find('tr').each(function(index,element){
                    //获取编辑删除标签
                    var td = $(element).find('td:eq(5)');
                    //获取id
                    var id = $(element).find('td:eq(0)').text();
                    //绑定修改图书事件
                    td.find('a:eq(0)').click(function(){
                        editBook(id);
                    });
                    //绑定删除图书事件
                    td.find('a:eq(1)').click(function(){
                        deleteBook(id);
                    });
                    //绑定添加图书事件
                    addBook();
                    //重置表单
                    var form = $('#addBookForm');
                    form.get(0).reset();
                    form.find('input[type=hidden]').val(null);
                });
                
            }
        });
    }
    initList();
    //编辑图书
    function editBook(id){
        $.ajax({
            type : 'get',
            url : '/books/book/' + id,
            dataType : 'json',
            success : function(data){
                var form = $('#addBookForm');
                //初始化弹窗
                var mark = new MarkBox(350,300,'修改图书',form.get(0));
                mark.init();
                //填充表单数据
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);
                //对表单提交按钮重新绑定事件
                form.find('input[type=button]').unbind('click').click(function(){
                    $.ajax({
                        type : 'put',
                        url : '/books/book',
                        data : form.serialize(),
                        dataType : 'json',
                        success : function(data){
                            if(data.flag == '1'){
                                mark.close();
                                initList();
                            }
                        }
                    })
                })
            }
        });
    }
    //添加图书
    function addBook(){
        $('#addBookId').click(function(){
            var form = $('#addBookForm');
            var mark = new MarkBox(350,300,'添加图书',form.get(0));
            mark.init();
            form.find('input[type=button]').unbind('click').click(function(){
                $.ajax({
                    type : 'post',
                    url : '/books/book',
                    data : form.serialize(),
                    dataType : 'json',
                    success : function(data){
                        if(data.flag == '1'){
                            mark.close();
                            initList();
                        }
                    }
                });
            });
        });
    }
    //删除图书
    function deleteBook(id){
        $.ajax({
            type : 'delete',
            url : '/books/book/' + id,
            dataType : 'json',
            success : function(data){
                if(data.flag == 1){
                    initList();
                }
            }
        });
    }
});
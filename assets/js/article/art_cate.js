$(function () {
  var layer = layui.layer
  //获取文章分类方法
  getInitData()
  function getInitData() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success:function(res){
        console.log(res);
       let htmlstr =  template("tpl-table",res)
       $("tbody").html(htmlstr)
      }
    })
  }
  $("#btnAddCate").on('click',function(){
layer.open({
   type: 1, 
   area: ['500px', '300px'],
   title:"添加文章分类",
  content: '传入任意的文本或html' //这里content是一个普通的String
})
  })
})
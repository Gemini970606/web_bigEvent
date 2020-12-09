$(function () {
  var layer = layui.layer
  template.defaults.imports.dataFormat = function (data) {
    let dt = new Data(data)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  //定义一个查询对象,需要将请求参数对象提交到服务器
  var q = {
    pagenum: 1,//默认显示第一页
    pagesize: 2,//默认显示两个数据
    cate_id: '',//文章分类id
    state: ''//文章发布状态
  }
  getTable()
  function getTable() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          layer.msg("获取文章列表失败")
        } else {
          var htmlstr = template("tpl_table", res)
          console.log(htmlstr);

          $("tbody").html(htmlstr)
        }
      }
    })
  }
})
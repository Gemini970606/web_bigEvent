$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return y + '年' + m + '月' + d + '日' + hh + ':' + mm + ':' + ss
  }
  //定义补零函数
  function padZero(n) {
    return n > 9 ? n : "0" + n
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
        if (res.status !== 0) {
          layer.msg("获取文章列表失败")
        } else {
          var htmlstr = template("tpl_table", res)
          $("tbody").html(htmlstr)
          renderPage(res.total)
        }
      }
    })
  }
  //初始化文章分类
  getCate()
  function getCate() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("初始化文章分类失败")
        } else {
          var htmlstr = template("htmlCate", res)
          $("[name=cate_id]").html(htmlstr)
          form.render()
        }
      }
    })
  }
  $("#form-search").on("submit", function (e) {
    e.preventDefault()
    var cate_id = $("[name = cate_id]").val()
    var state = $("[name = state]").val()
    q.cate_id = cate_id
    q.state = state
    getTable()
  })
  //定义渲染分页的方法
  function renderPage(total) {
    laypage.render({
      elem: "pageBox",
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          getTable()
        }
      }
    })
  }
  $("body").on("click", ".btnDel", function () {
    var len = $(".btnDel").length
    let id = $(this).attr("data-id")
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除文章失败")
          } else {
            layer.msg("删除文章成功")
            layer.closeAll()
            getTable()
            if (len === 1) {
              q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
            }
          }
        }
      })
    }

    )
  })
})
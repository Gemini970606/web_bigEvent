$(function () {
  var layer = layui.layer
  //获取文章分类方法
  getInitData()
  function getInitData() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        let htmlstr = template("tpl-table", res)
        $("tbody").html(htmlstr)
      }
    })
  }
  //定义索引之后关闭对应的索引弹出层
  let index = null
  $("#btnAddCate").on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: "添加文章分类",
      content: $("#dialong-add").html()
    })
  })
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault()
    $.ajax({
      method: "post",
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("新增文章失败");
        } else {
          layer.msg("新增文章成功")
          getInitData()
          layer.close(index)
        }
      }
    })
  })
  //通过代理为按钮绑定点击事件
  $("tbody").on("click", "#btnEdit", function () {
    layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: "修改文章分类",
      content: $("#dialog-edit").html()
    })
    let id = $(this).attr("data-id")
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })
  $("body").on("submit", "#form-edit", function () {
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新文章失败")
        } else {
          layer.msg("更新文章成功")
          layer.closeAll()
          getInitData()
        }
      }
    })
  })
  $("tbody").on("click", "#btnDel", function () {
    let id = $(this).attr("data-id")
    $.ajax({
      method: "get",
      url: "/my/article/deletecate/" + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("删除失败")
        } else {
          layer.msg("删除成功")
          layer.closeAll()
          getInitData()
        }
      }

    })
  })
})
$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6)
        return "昵称长度必须在1-6位之间"
    }
  })
  getData()
  function getData() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("请求失败")
        } else {
          //调用form.val快速给表单赋值
          form.val("formUserInfo", res.data)
        }
      }
    })
  }
  $("#btnReset").on("click", function (e) {
    //阻止表单默认重置行为
    e.preventDefault()
    getData()
  })
  //监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault()
    //发起ajax数据请求
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败")
        } else {
          console.log(res);
          layer.msg("更新用户信息成功")
          //调用父页面中的方法，重新渲染头像和信息
          window.parent.getUserinfo()
        }
      }
    })
  })
})
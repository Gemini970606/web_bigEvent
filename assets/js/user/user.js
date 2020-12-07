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
          console.log(res);
          //调用form.val快速给表单赋值
          form.val("formUserInfo",res.data)
        }
      }
    })
  }
})
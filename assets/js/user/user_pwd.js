$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      let pwd = $(".layui-form")[name = "oldPwd"].val()
      if (value === pwd) {
        return ('新密码不能和旧密码一致')
      }
    }
  })
  $(".layui-form").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      method: "post",
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("重置密码失败")
        }else{
          layer.msg("密码重置成功")
          $(".layui-form")[0].reset()
        }
      }
    })
  })

})
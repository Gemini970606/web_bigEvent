$(function () {
  //注册按钮
  $("#link_reg").on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  //登录按钮

  $("#link_login").on('click', function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })
  //从layui中获取对象
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      /* 通过形参拿到的是确认密码框中的值,去比较两个密码框中的值是否相等,然后进行判断 */
      var pwd = $(".reg-box [name=password]").val()
      if (pwd !== value) {
        return ("两次密码不一致")
      }
    }
  })
})
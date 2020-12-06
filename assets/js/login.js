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
    '密码必须6到12位，且不能出现空格']
  })
})
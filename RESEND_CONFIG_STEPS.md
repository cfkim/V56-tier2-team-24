# Resend 配置步骤指南

## 🎯 当前状态
✅ 已创建 Resend API Key  
⏳ 需要配置环境变量  
⏳ 需要安装依赖  
⏳ 需要测试集成  

## 📝 配置步骤

### 1. 编辑 backend/.env 文件

请手动编辑 `backend/.env` 文件，添加以下配置：

```bash
# 在文件顶部添加 Resend 配置
RESEND_API_KEY=re_xxxxxxxxx
FROM_EMAIL=onboarding@resend.dev

# 注释掉或保留 Gmail 配置作为备用
# EMAIL_SERVICE=gmail
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-email-password
# EMAIL_APP_PASSWORD=your-gmail-app-password
```

**注意**: 
- 将 `re_xxxxxxxxx` 替换为你实际的 API Key
- 对于测试，可以使用 `onboarding@resend.dev` 作为发件人邮箱
- 生产环境建议使用你自己的域名邮箱

### 2. 安装 Resend 依赖

```bash
cd backend
npm install
```

### 3. 重启后端服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
cd backend && npm start
```

### 4. 测试 Resend 集成

```bash
# 测试 API 连接
node test-password-reset.js
```

### 5. 在浏览器中测试

1. 访问: `http://localhost:5173/password/forgot`
2. 输入你的邮箱地址
3. 点击 "Reset Password"
4. 检查邮箱是否收到重置链接

## 🔍 验证配置

### 检查服务器日志
启动后端后，应该看到类似这样的日志：
```
🚀 Server running on port 5000
📧 Email service: Resend
🌍 Environment: development
```

### 测试邮件发送
在 Resend Dashboard 中：
1. 点击 "Activity" 标签
2. 查看是否有新的邮件发送记录
3. 检查邮件状态（delivered, opened, etc.）

## 🚨 常见问题

### 1. API Key 错误
```
Error: Invalid API key
```
**解决方案**: 检查 API Key 是否正确复制，确保没有多余的空格

### 2. 发件人邮箱无效
```
Error: Invalid from address
```
**解决方案**: 使用 `onboarding@resend.dev` 进行测试，或验证你的域名

### 3. 邮件发送失败
```
Error: Failed to send reset email
```
**解决方案**: 
- 检查网络连接
- 确认 Resend 账户状态
- 查看服务器日志

## 🎉 成功标志

配置成功后，你应该看到：
- ✅ 服务器启动时显示 "Email service: Resend"
- ✅ 忘记密码页面不再显示开发模式链接
- ✅ 邮箱收到格式化的重置邮件
- ✅ Resend Dashboard 显示发送记录

## 📞 需要帮助？

如果遇到问题：
1. 检查 `RESEND_CONFIG_STEPS.md` 中的故障排除部分
2. 查看服务器日志中的错误信息
3. 在 Resend Dashboard 中检查 API Key 状态
4. 运行 `node test-password-reset.js` 进行诊断

---

**下一步**: 完成配置后，我们可以测试完整的密码重置流程！ 
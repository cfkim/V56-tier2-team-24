# Resend Email Service Setup Guide

## 为什么选择 Resend？

[Resend](https://resend.com/) 是一个专为开发者设计的现代邮件服务，具有以下优势：

### 🚀 主要优势
- **开发者友好** - 简单的 API 和 SDK
- **高送达率** - 专门优化避免垃圾邮件文件夹
- **React Email 支持** - 可以用 React 组件写邮件模板
- **免费额度** - 每月 3,000 封免费邮件
- **多区域部署** - 全球多个数据中心
- **实时分析** - 邮件打开、点击等统计数据

### 💰 定价
- **免费计划**: 每月 3,000 封邮件
- **付费计划**: $20/月，100,000 封邮件
- **企业计划**: 自定义定价

## 设置步骤

### 1. 注册 Resend 账户

1. 访问 [https://resend.com/](https://resend.com/)
2. 点击 "Get Started"
3. 使用 GitHub 或邮箱注册账户

### 2. 获取 API Key

1. 登录后进入 Dashboard
2. 点击 "API Keys" 标签
3. 点击 "Create API Key"
4. 复制生成的 API Key（格式：`re_xxxxxxxxx`）

### 3. 配置环境变量

编辑 `backend/.env` 文件：

```bash
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com

# 或者使用 Resend 提供的测试域名
FROM_EMAIL=onboarding@resend.dev
```

### 4. 安装依赖

```bash
cd backend
npm install
```

### 5. 验证域名（可选，但推荐）

对于生产环境，建议验证你的域名：

1. 在 Resend Dashboard 中点击 "Domains"
2. 添加你的域名（如 `yourdomain.com`）
3. 按照指示配置 DNS 记录
4. 等待验证完成

## 测试 Resend 集成

### 1. 启动服务器

```bash
# 启动后端
cd backend && npm start

# 启动前端
npm run dev
```

### 2. 测试邮件发送

1. 访问 `http://localhost:5173/password/forgot`
2. 输入邮箱地址
3. 点击 "Reset Password"
4. 检查邮箱是否收到重置链接

### 3. 查看发送状态

在 Resend Dashboard 中：
- 查看 "Activity" 标签页
- 监控邮件发送状态
- 查看送达率和打开率

## 与现有 Gmail 集成的对比

### 当前实现
- ✅ 支持 Resend（优先）
- ✅ 支持 Gmail（备用）
- ✅ 开发模式回退
- ✅ 自动故障转移

### 配置优先级
1. **Resend** - 如果配置了 `RESEND_API_KEY`
2. **Gmail** - 如果配置了 `EMAIL_USER`
3. **开发模式** - 如果都没有配置

## 生产环境建议

### 1. 域名验证
```bash
# 使用你自己的域名
FROM_EMAIL=noreply@yourdomain.com
```

### 2. 环境变量
```bash
# 生产环境
NODE_ENV=production
RESEND_API_KEY=re_production_key_here
FROM_EMAIL=noreply@yourdomain.com
```

### 3. 监控和日志
- 在 Resend Dashboard 中监控邮件发送状态
- 设置 Webhook 接收实时通知
- 配置错误告警

## 故障排除

### 常见问题

1. **API Key 无效**
   - 检查 API Key 是否正确复制
   - 确认账户状态是否正常

2. **邮件发送失败**
   - 检查 `FROM_EMAIL` 是否有效
   - 确认域名是否已验证

3. **送达率低**
   - 验证域名 DNS 设置
   - 检查邮件内容是否合规

### 调试步骤

1. 检查服务器日志：
   ```bash
   cd backend && npm start
   ```

2. 查看 Resend Dashboard 中的错误信息

3. 测试 API 连接：
   ```bash
   node test-password-reset.js
   ```

## 下一步

1. **React Email 集成** - 使用 React 组件创建邮件模板
2. **Webhook 设置** - 接收邮件事件通知
3. **分析集成** - 跟踪邮件打开和点击
4. **模板优化** - 创建更美观的邮件模板

## 资源链接

- [Resend 官网](https://resend.com/)
- [Resend API 文档](https://resend.com/docs)
- [React Email 文档](https://react.email/)
- [最佳实践指南](https://resend.com/docs/best-practices)

---

**注意**: Resend 是推荐的邮件服务，但项目仍然支持 Gmail 作为备用选项。你可以根据项目需求选择合适的服务。 
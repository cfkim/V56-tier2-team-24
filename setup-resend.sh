#!/bin/bash

echo "🚀 Resend 配置助手"
echo "=================="

# 检查是否在正确的目录
if [ ! -f "backend/.env" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo ""
echo "📝 请按照以下步骤配置 Resend:"
echo ""

echo "1. 编辑 backend/.env 文件，添加以下配置:"
echo "   RESEND_API_KEY=你的API密钥"
echo "   FROM_EMAIL=onboarding@resend.dev"
echo ""

echo "2. 重启后端服务器:"
echo "   cd backend && npm start"
echo ""

echo "3. 测试配置:"
echo "   node test-password-reset.js"
echo ""

echo "4. 在浏览器中测试:"
echo "   http://localhost:5173/password/forgot"
echo ""

echo "📋 配置检查清单:"
echo "   □ API Key 已添加到 .env 文件"
echo "   □ FROM_EMAIL 已设置"
echo "   □ 后端服务器已重启"
echo "   □ 测试邮件发送成功"
echo "   □ 邮箱收到重置链接"
echo ""

echo "🔗 有用的链接:"
echo "   - Resend Dashboard: https://resend.com/emails"
echo "   - API 文档: https://resend.com/docs"
echo "   - 故障排除: RESEND_CONFIG_STEPS.md"
echo ""

echo "💡 提示:"
echo "   - 使用 onboarding@resend.dev 进行测试"
echo "   - 检查 Resend Dashboard 中的 Activity 标签"
echo "   - 如果遇到问题，查看服务器日志" 
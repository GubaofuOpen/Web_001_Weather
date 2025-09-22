// functions/submit-form.js
// 你需要先通过 npm 安装 supabase-js 并配置环境变量
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {
  try {
    // 只接受 POST 请求
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // 解析表单数据
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // 简单验证
    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // 这里可以保存到数据库或发送邮件
    console.log('收到表单:', { name, email, message });

 // 保存到 Supabase 数据库
    const { data, error } = await supabase
      .from('contacts') // 假设你有一个叫 contacts 的表
      .insert([{ name, email, message, submitted_at: new Date().toISOString() }])

    if (error) {
      console.error('数据库错误:', error)
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save data' }) }
    }

    console.log('数据已保存:', data)


    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '表单提交成功！',
        data: { name, email }
      })
    };
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
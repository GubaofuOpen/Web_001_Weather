// functions/submit-form.js
exports.handler = async (event, context) => 
{
  try 
  {
    // 只接受 POST 请求
    if (event.httpMethod !== 'POST') 
	{
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

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: '表单提交成功！', 
        data: { name, email }
      })
    };

  } 
  catch (error) 
  {
    return 
	{
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
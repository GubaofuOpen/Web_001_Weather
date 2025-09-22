// functions/get-weather.js
// const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    // 从查询参数获取城市
    const city = event.queryStringParameters.city || 'Beijing';

    console.log('City:', {city});

    // // 使用免费天气 API（以 OpenWeatherMap 为例）
    // // 注册获取 API Key: https://openweathermap.org/api
    // // 注册 OpenWeatherMap 获取免费 API Key
    // // 在 Netlify 后台设置环境变量 WEATHER_API_KEY
    // // 在 "Environment variables" 中添加 WEATHER_API_KEY=你的API密钥
    // const apiKey = process.env.WEATHER_API_KEY; // 推荐使用环境变量

    // if (!apiKey) {
    //   return {
    //     statusCode: 500,
    //     body: JSON.stringify({ error: 'Weather API key not configured' })
    //   };
    // }

    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;

    // // const response = await axios.get(url);
    // // 改用 Node.js 内置的 fetch（Netlify Functions 支持）：避免 axios 包依赖；
    // const response = await fetch(url);
    // if (!response.ok) {
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify({ error: '无法获取天气信息' })
    //   };
    // }

    // // const weatherData = response.data;
    // const weatherData = await response.json();

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     city: weatherData.name,
    //     temperature: weatherData.main.temp,
    //     description: weatherData.weather[0].description,
    //     humidity: weatherData.main.humidity
    //   })

      return {
      statusCode: 200,
      body: JSON.stringify({
        city: city,
        temperature: 32,
        description: '晴',
        humidity: 60
      })
    };

  }
  catch (error) {
    console.error('天气查询失败:', error.response?.data || error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: '无法获取天气信息，请检查城市名称或稍后重试'
      })
    };
  }
};
const express = require('express');
const { authenticateJWT, isAdmin } = require('./middleware/authMiddleware'); // 引入中间件
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');

const app = express();

// 普通用户路由，需要身份验证
app.get('/user/menu', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('vehicles'); // 使用 populate 获取车辆数据
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ vehicles: user.vehicles });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 仅管理员可访问的路由
app.delete('/user/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.remove(); // 删除用户
    res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

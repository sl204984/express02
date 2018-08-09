## 数据库

## 传输数据规范
{
  "data": {}, // 返回的数据
  "status": 0, // 状态码 0: 成功 1: 失败 2: 未登录
  "ok": true,
  "statusInfo": {
    "message": "提示信息",
    "detail": "用于排查"
  }
}

## 商品分类 type
[{
  label: '新鲜',
  value: 0
}, {
  label: '书籍',
  value: 1
}, {
  label: '美食',
  value: 2
}, {
  label: '服装',
  value: 3
}, {
  label: '手机',
  value: 4
}, {
  label: '电子',
  value: 5
}, {
  label: '数码',
  value: 6
}, {
  label: '美妆',
  value: 7
}, {
  label: '运动器械',
  value: 8
}, {
  label: '电器',
  value: 9
}, {
  label: '玩具乐器',
  value: 10
}]

# 排序规则
[{
  label: '综合',
  value: 0
}, {
  label: '价格升序',
  value: 1
}, {
  label: '价格降序',
  value: 2
}, {
  label: '信用值',
  value: 3
}]# express 02

module.exports =  app => {
  app.get('/api/data', function (req, res) {
    const data = [{name: "test_mock", status: 'success'}]
    res.json({code: 0, data})
  })

  app.get('/api/user_info', function (req, res) {
    const data = [{name: "test_mock", id: 'user_info', status: 'success'}]
    res.json({code: 0, data})
  })

  app.get('/api/login', function (req, res) {
    const data = [{name: "test_mock", id: 'login', status: 'success'}]
    res.json({code: 0, data})
  })
}
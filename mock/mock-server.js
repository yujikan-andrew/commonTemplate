module.exports =  app => {
  app.get('/api/data', function (req, res) {
    const data = [{name: "test_mock", status: 'success'}]
    res.json({code: 0, data})
  })
}
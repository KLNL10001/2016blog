//flash的原理

var req={}

req.flash= function (key,value) {
    if (value)
    {
        if (req[key])
        {
          req[key].push(value)
        }
        else
        {
          req[key] = [value]

        }
    }
    else
    {
        var result =  req[key]
        req[key] = []//说明只能调用一次  调用一次即被清除
        return  result;return req[key]
    }
}
//两个参数表示赋值
req.flash('error','失败1')
req.flash('error','失败2')
req.flash('success','成功')

//如果一个参数表示取值
console.log(req.flash('error'));//[ '失败1', '失败2' ]
console.log(req.flash('error'));//[]
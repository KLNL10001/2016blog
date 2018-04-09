/**
 * Created by zichunli on 18/4/8.
 */
//必须登陆之后才能访问
exports.checkLogin = function (req,res,next) {
    if (req.session.user){
        next()
    }
    else
    {
        req.flash('error','必须登陆后才能访问')
        res.redirect('/users/login')
    }
    
}

//必须登陆之前才能访问
exports.checkNotLogin = function (req,res,next) {
    if (req.session.user){
        req.flash('error','必须登陆前才能访问')
        res.redirect('/')
    }
    else
    {
        next()
    }

}

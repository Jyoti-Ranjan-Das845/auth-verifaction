

const isLogged = (req, res, next) => {
    // if(req.user.id){
    //     next();
    // } else {
    //     res.redirect('http://localhost:5173/weather'); 
    // }
   const result = req.session.status;
    if(result){
       console.log('yes');
        next();
    }else{
        console.log(result);
    }

    
};

export default isLogged;
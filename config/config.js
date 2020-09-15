
//=====================================
// CONFIGURANDO URL GLOBAL PORTO HEROKU                            
//=====================================

process.env.PORT = process.env.PORT || 3000;


//=====================================
// CONFIGURANDO URL GLOBAL DB                              
//=====================================
//
let urlDB;
process.env.NODE_ENV === process.env.NODE_ENV || 'dev';

if(process.env.NODE_ENV === 'dev'){
    urlDB =  process.env.MONGO_TESTE
    
}else{
   

    urlDB = process.env.MONGO_URI;
     //urlDB  //mongodb+srv://developer-dci-pr:Geov2020!@cluster0-nxlwx.mongodb.net/DC_cond_DB
     urlDB = 'mongodb+srv://geovanedasilva:nelliebeach4205@cluster0-bipz8.mongodb.net/tests'

}

//heroku 

//sendtopuertorico@gmail.com
//$sendtopuertoricosolution2019

process.env.URLDB = urlDB;


//=====================================
// CONFIGURANDO URL SEED TOKE                             
//=====================================

// Token vencimento 100 horas

process.env.expiresIn = '1000h';

//SEED

process.env.SEED = process.env.SEED || 'key-desarollo-secrets-yes'

process.env.AWS_ID = process.env.AWS_ID || 'AKIAYHSJ7FZWIV5GG5UJ'
process.env.AWS_SECRET = process.env.AWS_SECRET || '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'


//Auth config nodemailer

process.env.EMAIL = process.env.EMAIL  ||'AKIAYHSJ7FZWDLQEN7VY',
process.env.PASSWORD = process.env.PASSWORD ||'BKIKL3QtaYlBOvgOTWxJImJIJ9MZD0ZpoRkVfsdpLvEJ'

process.env.URL_SITE = process.env.URL_SITE || 'http://localhost:3000'
//process.env.URL_SITE = 'https://send-to-puerto-rico.herokuapp.com'

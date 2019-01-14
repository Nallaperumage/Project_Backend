'use strict';
const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'gmadhushann@gmail.com',
        clientId: '751762166569-p3esttv1ks864qk4rno4vm5lrqbguv2s.apps.googleusercontent.com',
        clientSecret: '-5tWM1XSQJjUQoOy7OeWqIVg',
        accessToken: 'ya29.Glt1BgCUNZcbsMxYWr1B5oxLV0Rdbje5oTOG2Yav_eP9So4Gmb2Z8BPbqb59uVwtHtIOQ59xFWKKuX6C8oQv61fpFw8wTyKcSAf8Hv1j0Eiumktm2VFTC6g3XOeX',
        refreshToken:'1/-mNd-W2St3qAVqURmNZC5OSeioCQLA_pWg_6f9zOoX1lrvbfEzX6kHIBZSlbfvhx',
        expires: 1484314697598
    },
    tls:{
        rejectUnauthorized:false
    }
});
transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    let accessToken = userTokens[user];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
    }
});
transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});

module.exports.sendEmail = function(req, res, next){
    User.findOne({
         email: req.body.email 
        }, function (err, user) {

        if (err) { return res.send(err); }

        if (!user) {
          return res.send('User not found');
        }

        user.resetPasswordToken = user.generateJwt();
        user.resetTokenValidity = true;
        
        user.save(function(err) {
            let mailOptions = {
                from: '"SLGSP 👻" <gmadhushann@gmail.com>',
                to: 'gmadhushann@gmail.com', 
                subject: 'Recover Password', 
                text: 'Hello '+user.userName+
                'Someone has requested to reset yor password for the SLGSP account '+
                'If you requested to reset the password, Please go with the link below to reset the password '+
                'http://localhost:8000/login/'+user.resetPasswordToken+
                ' If you did not requested please ignore the message'+
                'Best regards,'+
                'SLGSP', 
                html: 'Hello <strong>'+user.userName+
                '</strong>,<br><br>Someone has requested to <mark>reset</mark> your password for the SLGSP account !<br>'+
                'If you requested to reset the password, Please go with the <mark>link</mark> below to reset the password.'+
                '<br><br><a href="http://localhost:8000/login/'+user.resetPasswordToken+'">http://localhost:8000/login/</a>'+
                '<br><br>If you did not requested please ignore the message'+
                '<br><br><strong>Best regards</strong>,'+
                '<br><i>SLGSP</i>'
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.send(err);
                }
                
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                return res.send(info);

            });
        })
    })

}

module.exports.sendEmailCustomer = function(customerEmail, geologistEmail){
    User.findOne({
        email: customerEmail
    }, function (err, user) {
        let mailOptions = {
            from: '"SLGSP 👻" <gmadhushann@gmail.com>',
            to: customerEmail, 
            subject: 'Investigation Done!', 
            text: 'Hello '+user.userName+
            'Your Investigation result has been added to our database by '+geologistEmail+'.'+
            'Please go and check your account'+
            'Best regards,'+
            'SLGSP', 
            html: 'Hello <strong>'+user.userName+
            '</strong>,<br><br>Your Investigation result has been added to our database by '+geologistEmail+'.<br>'+
            'Please go and check your account.'+
            '<br><br><strong>Best regards</strong>,'+
            '<br><i>SLGSP</i>'
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return err;
            }
            
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return info;
        });
})
}

var stripe = require('stripe')('sk_test_ooaPZFrmnKS49hg1rvtU0KEv');
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports.payment = function(req, res, next){
    
    User.findOne({ email: req.body.email }, function (err, user) {
        
        if (err) { return err }
        
        if (user.stripeCustomerId == null) {
           
            return stripe.customers.create({
                email : req.body.token.email,
                source : req.body.token.id
            })
            .then( function(customer){
                user.stripeCustomerId = customer.id;
                return stripe.charges.create({
                    amount: req.body.amount,
                    description: 'my payment',
                    currency: 'usd',
                    // source : req.body.token.id,
                    customer : customer.id
                }),
                user.save();
            })
            .then( charges => res.send(" Your Fisrt Payment Success! "));
        }
        // If credentials are correct, return the user object
        return stripe.customers.retrieve(user.stripeCustomerId).then(customer => stripe.charges.create({
            amount: req.body.amount,
             description: 'my payment',
            currency: 'usd',
            // source : req.body.token.id,
            customer : customer.id
        }))
        .then( charges => res.send(" Payment Success! "));
    })
    
}
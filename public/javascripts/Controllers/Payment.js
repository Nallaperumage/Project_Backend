var stripe = require('stripe')('sk_test_ooaPZFrmnKS49hg1rvtU0KEv');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Service = mongoose.model('Service');


module.exports.payment = function(req, res, next){
    
    Service.findOne({
        name : req.body.service
    }, function(err, service){
        if(err){return res.send('no matching service'+err)}

        if(req.body.email != null){
            return User.findOne({ email: req.body.email }, function (err, user) {
            
                var amount = ((100-user.discount)*service.dataPrice)/100;

                if (err) { return res.send(err) }
                
                if (user.stripeCustomerId == null) {
                
                    return stripe.customers.create({
                        email : req.body.token.email,
                        source : req.body.token.id
                    })
                    .then( function(customer){
                        user.stripeCustomerId = customer.id;
                        return stripe.charges.create({
                            amount: amount,
                            description: 'my payment',
                            currency: 'usd',
                            // source : req.body.token.id,
                            customer : customer.id
                        }),
                        user.save();
                    })
                    .then( charges => {
                        var packet = {
                            charge : service.dataPrice,
                            discount : (service.dataPrice-amount),
                            payment : amount,
                            paid : charges.paid,
                            status : charges.status,
                            email : charges.source.name
                        };

                        return res.send(packet);
                    })
                }
                // If credentials are correct, return the user object
                return stripe.customers.retrieve(user.stripeCustomerId).then(customer => stripe.charges.create({
                    amount: amount,
                    description: 'my payment',
                    currency: 'usd',
                    // source : req.body.token.id,
                    customer : customer.id
                }))
                .then( charges => {
                    var packet = {
                        charge : service.dataPrice,
                        discount : (service.dataPrice-amount),
                        payment : amount,
                        paid : charges.paid,
                        status : charges.status,
                        email : charges.source.name
                    };

                    return res.send(packet);
                })
            })
        }

        
        return stripe.charges.create({
            amount: service.dataPrice,
            description: 'my payment',
            currency: 'usd',
            source : req.body.token.id,
        })
        .then( charges => {
            var packet = {
                charge : service.dataPrice,
                discount : 0,
                payment : service.dataPrice,
                paid : charges.paid,
                status : charges.status,
                email : charges.source.name
            };

            return res.send(packet);
        })

})
    
}
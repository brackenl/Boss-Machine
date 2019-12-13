const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    const ideaValue = numWeeks * weeklyRevenue;
    console.log(`numWeeks: ${numWeeks} weeklyRevenue: ${weeklyRevenue}`);
    console.log(ideaValue);
    if (!numWeeks || !weeklyRevenue || typeof ideaValue != 'number'  || ideaValue < 1000000) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

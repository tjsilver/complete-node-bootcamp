const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, id) => {
    console.log(`Tour id is ${id}`);
    if (id * 1 >= tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    console.log(`the body is ${req.body}`);
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length, // not part of JSON spec but nice to do
        data: {
            tours, // same as tours: tours
        },
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1; // converts string to number

    const tour = tours.find((el) => el.id === id); // :id is a param, :id/:x? - x would be optional param

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here...>',
        },
    });
};

exports.deleteTour = (req, res) => {


    res.status(204).json({
        status: 'success',
        data: null,
    });
};

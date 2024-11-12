const express = require("express"); // import express
const { default: mongoose } = require("mongoose"); // import mongoose
const Driver = require("../models/driver"); // Driver model
const Package = require("../models/package"); // Pakcge model
const { connectDB, generateRandomString } = require("../utils/utils"); // utility functions
const { increaseOperation } = require("../utils/firestore"); // function to increase CRUD operation counter

connectDB();

let router = express.Router(); // REST package router

router.use(express.urlencoded({extended: true}));
router.use(express.json());


/**
 * This function handles the GET request and returns the list of packages
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function getPackage(req, res) {
    let packages = await Package.find({}).populate("driverId").exec();
    increaseOperation("read")
    return res.status(200).json(packages);
}
router.get("/", getPackage);

/**
 * This function handles the POST method to add a new package
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function insertPackage(req, res) {
    let id = new mongoose.Types.ObjectId();
    let packageId = "P" + generateRandomString("letters", 2) + "-JN-" + generateRandomString("numbers", 3);
    
    let driverId = new mongoose.Types.ObjectId(req.body.driver_id);

    // create a new package
    let newPackage = new Package({
        _id: id,
        packageId,
        title: req.body.package_title,
        weight: req.body.package_weight,
        destination: req.body.package_destination,
        isAllocated: req.body.isAllocated ? true : false,
        driverId: driverId,
        ...(req.body.package_description && { description: req.body.package_description })
    });

    try {
        // save the package
        await newPackage.save();
        // add the package to the driver's assigned_packages field
        await Driver.updateOne(
            {
                _id: driverId
            },
            {
                $push: {
                    assigned_packages: newPackage._id
                }
            }
        );
        increaseOperation("create");
        return res.status(200).json({
            id,
            package_id: packageId
        });
    } catch (err) {
        return res.status(400).json({
            status: err.message
        });
    }
}
router.post("/add", insertPackage);

/**
 * This function handles the DELETE request 
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function deletePackage(req, res) {
    // check if the package id is valid
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).json({
            status: "ID not found"
        });
    };

    // find the package
    let id = new mongoose.Types.ObjectId(req.query.id);
    let package = await Package.findOne({
        _id: id
    });

    // if no package, redirect to the invalid page
    if (!package) {
        return res.status(400).json({
            status: "ID not found"
        });
    }
    
    // find the driver and remove the package from the driver's assigned_packages list
    let driverId = package.driverId;
    await Driver.updateOne(
        {
            _id: driverId
        },
        {
            "$pull": {
                "assigned_packages": id
            }
        }
    );

    // delete the package
    let result = await Package.deleteOne({
        _id: id
    });
    
    increaseOperation("delete");
    return res.status(200).json(result);
}
router.delete("/delete", deletePackage);

/**
 * This function handles the PUT request to update a package
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function updatePackage(req, res) {
    let { id, package_destination } = req.body;

    // check if the package id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "ID not found"
        });
    }
    
    id = new mongoose.Types.ObjectId(id);

    // construct the object storing the data to be updated
    let updateData = {}
    if (package_destination) {
        updateData["destination"] = package_destination;
    }

    // update the package
    let result = await Package.updateOne(
        {
            _id: id
        },
        updateData
    );
    
    // check if the package is updated
    if (result.modifiedCount === 0 || !result.acknowledged) {
        return res.status(400).json({
            status: "ID not found or no changes were made"
        })
    }
    
    increaseOperation("update");
    return res.status(200).json({
        status: "Package updated successfully"
    })
    
}
router.put("/update", updatePackage);



module.exports = router;
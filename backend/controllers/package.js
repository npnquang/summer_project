const express = require("express"); // import express
const Package = require("../models/package"); // Package model
const Driver = require("../models/driver"); // Driver model
const { default: mongoose } = require("mongoose"); // import mongoose
const { connectDB, generateRandomString } = require("../utils/utils"); // utility functions
const { increaseOperation } = require("../utils/firestore"); // function to increase CRUD operation counter

connectDB();

let router = express.Router(); // package router
router.use(express.static("node_modules/bootstrap/dist/css"));

router.use(express.urlencoded({extended: true}));
router.use(express.json());


/**
 * This function renders the list packages view
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function renderPackages(req, res) {
    let packages = await Package.find({});
    increaseOperation("read");
    res.render("package_view/list", {data: packages, login: true});
}
router.get("/list", renderPackages);



/**
 * This function renders the form to add drivers
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function renderAddPackageForm(req, res) {
    let drivers = await Driver.find({});
    res.render("package_view/add", {data: drivers, login: true});

}
router.get("/add", renderAddPackageForm);

/**
 * This function handles the POST method submitted to the add a package to the database
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function addNewPackage(req, res) {
    // create a new package
    let newPackage = new Package({
        _id: new mongoose.Types.ObjectId(),
        packageId: "P" + generateRandomString("letters", 2) + "-JN-" + generateRandomString("numbers", 3),
        title: req.body.title,
        weight: req.body.weight,
        destination: req.body.destination,
        description: req.body.description,
        isAllocated: req.body.isAllocated ? true : false,
        driverId: new mongoose.Types.ObjectId(req.body.driverId)
    });

    try {
        // save the package
        await newPackage.save();
        // add the package to the driver's assigned_packages field
        await Driver.updateOne(
            {
                _id: new mongoose.Types.ObjectId(req.body.driverId),
            },
            {
                $push: {
                    assigned_packages: newPackage._id
                }
            }
        );
        increaseOperation("create");
        return res.redirect("/32963742/James/package/list");
        
    } catch (err) {
        let messages = [];
        for (let field in err.errors) {
            if (field == "weight") {
                messages.push("Package weight must be a positive number");
            } else {
                messages.push(err.errors[field].message);
            }
        }
        return res.render("common/invalid", {errors: messages, login: true});
    }

    
}
router.post("/add-package", addNewPackage);

/**
 * This function renders the form to delete a package by ID
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function renderDeletePackageForm(req, res) {
    res.render("package_view/delete", {login: true});
}
router.get("/delete", renderDeletePackageForm);

/**
 * This function handles the DELETE request submitted by the button from the list package view
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function deletePackageButton(req, res) {
    let id = req.query.id;
    id = new mongoose.Types.ObjectId(id.trimEnd());

    // find the package
    let package = await Package.findOne({
        _id: id
    });

    // if no package, return immediately
    if (!package) {
        return res.status(400);
    }

    // find the driverId and remove the package's id from the driver's assigned_packages list
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
    await Package.deleteOne({
        _id: id
    })

    increaseOperation("delete");
    res.status(200);
}
router.delete("/delete-button", deletePackageButton);

/**
 * This function handles the DELETE request submitted by the form from the delete package view
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function deletePackageForm(req, res) {
    let id = req.query.id;
    id = id.trimEnd();
    // check if the package id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.render("common/invalid", {errors: ["Invalid Driver ID"], login: true});
    }
    
    // find the package
    id = new mongoose.Types.ObjectId(id);
    let package = await Package.findOne({
        _id: id
    });

    // if no package, redirect to the invalid page
    if (!package) {
        return res.render("common/invalid", {errors: ["Package not found"], login: true});
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
    await Package.deleteOne({
        _id: id
    })

    increaseOperation("delete");
    return res.redirect("/32963742/James/package/list");
    
}
router.get("/delete-form", deletePackageForm);


module.exports = router;
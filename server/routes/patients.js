const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Record = require("../models/Record");
const Pregnancy = require("../models/Pregnancy");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/create", (req, res, next) => {
  const { patient } = req.body;
  const emailCheck = patient.email;
  User.find({ email: emailCheck, role: "CUSTOMER" }, (err, user) => {
    if (user.length !== 0) {
      res.json({ message: "The email already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync("12345", salt);

    const newPatient = new User({
      ...patient,
      password: hashPass,
      role: "CUSTOMER"
    });

    newPatient
      .save()
      .then(patient => res.json({ patient }))
      .catch(err => {
        res.json(err);
      });
  });
});

router.get("/all", (req, res, next) => {
  User.find({ role: "CUSTOMER" })
    .sort({ createdAt: -1 })
    .then(patients => {
      res.json({ patients });
    });
});

//route for searching - exact text
router.get("/search", (req, res, next) => {
  let { q } = req.query;
  User.find(
    { role: "CUSTOMER", $text: { $search: q } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then(patients => {
      res.json({ patients });
    });
});

router.put("/update", (req, res, next) => {
  let { patient, id } = req.body;

  User.findByIdAndUpdate(id, patient, { new: true })
    .populate("recordId")
    .then(patient => res.json({ patient }))
    .catch(e => console.log(e));
});

router.post("/record/create", (req, res, next) => {
  let { id } = req.body;

  const newRecord = new Record();
  console.log(newRecord);
  newRecord.save().then(record =>
    User.findByIdAndUpdate(id, { recordId: record._id }, { new: true })
      .populate("recordId")
      .then(patient => res.json({ patient }))
      .catch(e => console.log(e))
  );
});

router.put("/record/update", (req, res, next) => {
  let { record, idRecord } = req.body;

  Record.findByIdAndUpdate(idRecord, record, { new: true }).then(record =>
    User.findOne({ recordId: record._id })
      .populate("recordId")
      .then(patient => {
        res.json({ patient });
      })
      .catch(e => console.log(e))
  );
});

router.put("/record/visit", (req, res, next) => {
  let { visit, weight, bloodPressure, IMC, idRecord, idPatient } = req.body;

  Record.findById(idRecord).then(record => {
    Promise.all([
      record.visits.push(visit),
      record.weight.push(weight),
      record.bloodPressure.push(bloodPressure),
      record.IMC.push(IMC)
    ]).then(() => {
      record.save();
      User.findOne({ _id: idPatient })
        .populate("recordId")
        .then(patient => {
          res.json({ patient });
        })
        .catch(e => console.log(e));
    });
  });
});

router.get("/record/:id", (req, res, next) => {
  let { id } = req.params;

  User.findById(id)
    .populate("recordId")
    .then(patient => {
      res.json({ patient });
    })
    .catch(e => console.log(e));
});

router.get("/pregnancy/:id", (req, res, next) => {
  let { id } = req.params;
  console.log(id);
  Pregnancy.findById(id)
    .then(pregnancy => {
      console.log(pregnancy);
      res.json({ pregnancy });
    })
    .catch(e => console.log(e));
});

router.get("/record/delete/:id", (req, res, next) => {
  let { id } = req.params;

  User.findByIdAndDelete(id)
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
});

module.exports = router;

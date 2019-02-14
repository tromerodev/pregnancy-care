const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pregnancySchema = new Schema(
  {
    recordId: { type: Schema.Types.ObjectId, ref: "Record" },
    pregnantId: { type: Schema.Types.ObjectId, ref: "User" },

    partnerBirthDate: { type: Date },

    LMP: { type: Date },
    EDC: { type: Date },
    HPT: { type: Date },
    pregnancyType: {
      type: String,
      enum: [
        "Spontaneus",
        "In Vitro - Derived",
        "In Vitro - Generated",
        "Artificial Insemination - Donor",
        "Artificial Insemination - Partner"
      ]
    },

    diet: {
      type: String,
      enum: ["Mediterranean", "Vegetarian", "Vegan", "Other"],
      default: "Mediterranean"
    },
    dietOther: { type: String, default: "" },

    dietSuplements: [
      {
        type: String,
        enum: ["polivitaminics", "iron", "folic", "iodine", "none"],
        default: "none"
      }
    ],

    sport: { type: String, default: "" },
    workRisk: [
      {
        type: String,
        enum: [
          "noise",
          "weight lifting",
          "stress",
          "toxics",
          "cold",
          "standing up",
          "none"
        ],
        default: "none"
      }
    ],

    risk: { type: String, enum: ["Low", "High"], default: "Low" },
    riskReason: { type: String, default: "" },

    visits: [
      {
        weight: { type: Number, default: 0 },
        IMC: { type: Number, default: 0 },

        bloodPressure: {
          Systolic: { type: Number, default: 0 },
          Diastolic: { type: Number, default: 0 }
        },
        medicalTest: [
          {
            type: String,
            enum: [
              "none",
              "Ultrasound 1Term",
              "Ultrasound 2Term",
              "Ultrasound 3Term",
              "Blood Test 1Term",
              "Blood Test 2Term",
              "Blood Test 3Term"
            ],
            default: "none"
          }
        ],

        notes: { type: String, default: "" },
        notesOut: { type: String, default: "" },
        date: { type: Date, dafault: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const Pregnancy = mongoose.model("Pregnancy", pregnancySchema);
module.exports = Pregnancy;

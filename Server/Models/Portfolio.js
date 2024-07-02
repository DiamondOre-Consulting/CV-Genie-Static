import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  portfolioId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  uniqueUserName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
  },
  document: {
    type: String,
  },
  services: {
    type: [
      {
        heading: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    default: [],
  },
  products: {
    type: [
      {
        productName: {
          type: String,
        },
        productImage: {
          type: String,
        },
        productDescription: {
          type: String,
        },
      },
    ],
    default: [],
  },
  contact: {
    address: {
      type: String,
    },
  },
  socialMedias: {
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  bgColor: {
    type: String,
  },
  primaryTextColor: {
    type: String,
  },
  secondaryTextColor: {
    type: String,
  },
  buttonColor: {
    type: String
  }
});

export default mongoose.model("Portfolio", portfolioSchema);

import { Role } from "@prisma/client";
import { LOGIN_TYPE } from "./enums";
import { configData } from "src/config";
import { ConfigService } from "@nestjs/config";

export const API_ROUTES = {
  KYC: {
    LOGIN: `oauth/token`,
    CREATE_CASE: `graphql`,
    GET_CASE: `graphql`,
  },
  COIN_REMITTER: {
    CREATE_INVOICE: "create-invoice",
  },
};

export const CONSTANT = {
  ADMIN_ORDER_MONITORING_EMAIL: "orders@dregreennft.com",
  SOCIAL_MEDIA_URLS: {
    INSTAGRAM_URL: "https://www.instagram.com/drgreen/"
  },
  DR_GREEN_WELCOME_IMAGE_URL: "https://prod-profiles-backend.s3.amazonaws.com/f8c55a0e-af12-4049-b769-b0f7b641e0e1-aff87138-846a-45dc-9b80-ef90f49e2a00-Dr. Green Mailer Image.png",
  DR_GREEN_SKULL_IMAGE_URL: "https://prod-profiles-backend.s3.amazonaws.com/e9bf84c2-25f1-4705-b8d3-cc99d9ba304c-d1caf700-87a8-4409-b3c4-933f3fae6e80-Grey&Green-Skull.png",
  PAYMENTS: {
    INVOICE: {
      NAME: "DrGreen",
      CURRENCY: {
        USD: "USD",
      },
      EXPIRY_TIME: 60,
      NOTIFY_URL: "https://api.drgreennft.com/api/v1/payments/webhook",
      SUCCESS_URL: "https://dapp.drgreennft.com/payment/success",
      FAIL_URL: "https://dapp.drgreennft.com/payment/failed",
    },
    COIN_REMITTER: {
      INVOICE_TYPE: { TCN: "TCN", USDT: "USDT", ETH: "ETH", BTC: "BTC" },
    },
    PAYINN_API: {
      CREATE_INVOICE: "payment/process",
      CHECKOUT_URL: "https://sandbox.pay-inn.com",
      WEBHOOK_URL:
        "https://api.drgreennft.com/api/v1/payments/fiat/webhook",
      SUCCESS_URL: "https://dapp.drgreennft.com/payment/success",
      FAIL_URL: "https://dapp.drgreennft.com/payment/failed",
    },
  },
  FIREBASE: {
    CLIENT_EMAIL: "FIREBASE_CLIENT_EMAIL",
    PRIVATE_KEY: "FIREBASE_PRIVATE_KEY",
    PROJECT_ID: "FIREBASE_PROJECT_ID",
    NOTIFICATION: {
      EVENT_TOPIC: "dr_green_events",
      IMAGE_URL: "FIREBASE_NOTIFICATION_IMAGE_URL",
    },
  },
  DELEVERY_REFUND_DURATION: "30 days",
  DELIVERY_CHARGE: 6,
  REFUND_DURATION: 30,
  GOLD_MINT_LIMIT: 55,
  PLATINUM_MINT_LIMIT: 50,
  STANDARD_MINT_LIMIT: 5040,
  STANDARD_START_INDEX: 106,
  TRAIT_TYPES: {
    NFT_TYPE: "PLANET NAME",
    KEY_TYPE: "KEY TYPE",
    PLANET_NAME: "PLANET NAME",
  },
  NOTIFICATION: {
    CLIENT_ADDED: {
      TITLE: "Client Added",
      MESSAGE: "A new client has been added successfully.",
    },
    CLIENT_VERIFIED: {
      TITLE: "Client Verified",
      MESSAGE: "A client has been verified successfully.",
    },
    CLIENT_REJECTED: {
      TITLE: "Client Rejected",
      MESSAGE: "A client application has been rejected.",
    },
    CLIENT_DELETED: {
      TITLE: "Client Deleted",
      MESSAGE: (firstName: string, lastName: string) =>
        `A client ${firstName} ${lastName} has been deleted.`,
    },
    ORDER_PLACED: {
      TITLE: "Order Placed",
      MESSAGE: "Your order has been placed successfully.",
    },
    ORDER_VERIFIED: {
      TITLE: "Order Verified",
      MESSAGE: "Your order has been verified successfully.",
    },
    ORDER_REJECTED: {
      TITLE: "Order Rejected",
      MESSAGE: "Your order has been rejected.",
    },
    EVENT_ADDED_TO_BANNER: {
      TITLE: "New Event",
      MESSAGE: "A new event has been added to our banner. Check it out!",
    },
    COMMISSION_PAID: {
      TITLE: "Commission Paid",
      MESSAGE: "Your commission has been paid.",
    },
  },
  TOKEN_EXPIRY: "24h",
  PREFIX: "api/v1",
  EMAIL_SUBJECT: {
    VERIFICATION_INVITE: "Email verification link from Dr. Green Admin",
    TWO_STEP_VERIFICATION: "Two step verification from Dr. Green Admin",
    SUB_ADMIN_ABOARD: "Aboard as Sub Admin",
    MANAGER_ABOARD: "Aboard as Manager",
    CLIENT_KYC_VERIFICATION: "KYC verification link from Dr. Green Admin",
    CLIENT_KYC_VERIFICATION_PASSED:
      "You're In! 🌿 Your Dr. Green Account Is Now Verified",
    CLIENT_KYC_VERIFICATION_FAILED: "KYC Verification Failed",
    CLIENT_KYC_VERIFICATION_FAILED_REVIEW:
      "KYC Verification Failed - Admin Review Needed",
    CLIENT_KYC_PROCESS_NOT_STARTED: "KYC process not started",
    CLIENT_ORDER_APPROVAL: (orderId: string) =>
      `🚨 New Order Pending Verification - Order #${orderId}`,
    CLIENT_ORDER_INVOICE: "Order Invoice from Dr. Green Admin",
    CLIENT_ORDER_PAYMENT_RECEIVED: (orderId: string) =>
      `✅ Payment Confirmed - Ready for Dispatch - Order #${orderId}`,
    CLIENT_ORDER_PLACED: "🙌 We've Got Your Order - It's On the Way!",
    CLIENT_ORDER_SHIPPED: "Your Order Has Shipped - It's Heading Your Way!",
    CLIENT_ORDER_DELIVERED: "Your Package Has Been Delivered - Enjoy!",
    CLIENT_ORDER_REJECTED: "Heads Up - Your Order Couldn't Be Processed 😥",
  },
  MAIL_TYPE: {
    VERIFICATION_INVITE: "VERIFICATION_INVITE",
    TWO_STEP_VERIFICATION: "TWO_STEP_VERIFICATION",
    SUBADMIN_OR_MANAGER_ABOARD: "SUBADMIN_OR_MANAGER_ABOARD",
    CLIENT_KYC_VERIFICATION: "CLIENT_KYC_VERIFICATION",
    CLIENT_KYC_VERIFICATION_PASSED: "CLIENT_KYC_VERIFICATION_PASSED",
    CLIENT_KYC_VERIFICATION_FAILED: "CLIENT_KYC_VERIFICATION_FAILED",
    CLIENT_KYC_VERIFICATION_FAILED_REVIEW:
      "CLIENT_KYC_VERIFICATION_FAILED_REVIEW",
    CLIENT_KYC_PROCESS_NOT_STARTED: "CLIENT_KYC_PROCESS_NOT_STARTED",
    CLIENT_ORDER_APPROVAL: "CLIENT_ORDER_APPROVAL",
    CLIENT_ORDER_INVOICE: "CLIENT_ORDER_INVOICE",
    CLIENT_ORDER_PAYMENT_RECEIVED: "CLIENT_ORDER_PAYMENT_RECEIVED",
    CLIENT_ORDER_PLACED: "CLIENT_ORDER_PLACED",
    CLIENT_ORDER_SHIPPED: "CLIENT_ORDER_SHIPPED",
    CLIENT_ORDER_DELIVERED: "CLIENT_ORDER_DELIVERED",
    CLIENT_ORDER_REJECTED: "CLIENT_ORDER_REJECTED",
  },
  DB_ERROR_CODE: {
    NOT_FOUND: "P2025",
    UNIQUE_CONSTRAINT: "P2002",
    FOREIGN_KEY: "P2003",
  },
  S3_BUCKET_BASE_URL: "https://prod-profiles-backend.s3.amazonaws.com/",
  PLANET_DETAILS: {
    GOLD: {
      planetNo: 21,
      name: "Gold",
      imageUrl:
        "https://stage-profiles-backend.s3.amazonaws.com/ac90f888-2316-484a-a0c1-aaad1be8ce01-planetbig.png",
      videoUrl:
        "https://stage-profiles-backend.s3.amazonaws.com/ac90f888-2316-484a-a0c1-aaad1be8ce01-planetbig.png",
      description:
        "In the expanse of the gaming universe, amidst the sprawling cosmic web, there exists a planet known as Gold. This lush, verdant world is celebrated across galaxies for its unparalleled contribution to the cosmic cannabis culture, birthing strains that resonate with adventurers and connoisseurs alike.",
      updatedAt: new Date(),
      createdAt: new Date(),
      planetDetailJson: {
        headName: "THE STAR STRAINS",
        data: [
          {
            name: "Blue Dream",
            description:
              "The pride of Gold, Blue Dream, a sativa-dominant hybrid, flourishes under the crystal-blue skies. Its creative, uplifted, and energetic effects mirror the planet's vibrant spirit, making it a favorite for those seeking solace from stress and anxiety. The strain's flavors of blueberry, berry, and sweet encapsulate the essence of Gold's lush landscapes.",
          },
          {
            name: "Jack Herer",
            description:
              "Named after a legendary activist, this sativa strain embodies the planet's fiery sunrise. It imparts an energetic, creative, and uplifted state to its users, much like the dawn of a new day on Gold. The pine, spicy/herbal, and woody flavors pay homage to the ancient forests covering the planet's surface.",
          },
        ],
      },
      deletedAt: null,
      chronicles: {
        name: "THE CHRONICLES OF GOLD",
        description: "Gold, a jewel in the celestial tapestry",
      },
    },
    PLATNIUM: {
      planetNo: 22,
      name: "Platinum",
      videoUrl:
        "https://stage-profiles-backend.s3.amazonaws.com/ac90f888-2316-484a-a0c1-aaad1be8ce01-planetbig.png",
      imageUrl:
        "https://stage-profiles-backend.s3.amazonaws.com/ac90f888-2316-484a-a0c1-aaad1be8ce01-planetbig.png",
      description:
        "In the expanse of the gaming universe, amidst the sprawling cosmic web, there exists a planet known as Platinum. This lush, verdant world is celebrated across galaxies for its unparalleled contribution to the cosmic cannabis culture, birthing strains that resonate with adventurers and connoisseurs alike.",
      updatedAt: new Date(),
      createdAt: new Date(),
      planetDetailJson: {
        headName: "THE STAR STRAINS",
        data: [
          {
            name: "Blue Dream",
            description:
              "The pride of Platinum, Blue Dream, a sativa-dominant hybrid, flourishes under the crystal-blue skies. Its creative, uplifted, and energetic effects mirror the planet's vibrant spirit, making it a favorite for those seeking solace from stress and anxiety. The strain's flavors of blueberry, berry, and sweet encapsulate the essence of Platinum's lush landscapes.",
          },
          {
            name: "Jack Herer",
            description:
              "Named after a legendary activist, this sativa strain embodies the planet's fiery sunrise. It imparts an energetic, creative, and uplifted state to its users, much like the dawn of a new day on Platinum. The pine, spicy/herbal, and woody flavors pay homage to the ancient forests covering the planet's surface.",
          },
        ],
      },
      deletedAt: null,
      chronicles: {
        name: "THE CHRONICLES OF PLATINUM",
        description:
          "Platinum, a jewel in the celestial tapestry, orbits within the Goldilocks zone of its star, creating an environment ripe for the cultivation of extraordinary cannabis strains. This planet, shrouded in hues of platinum and silver, thrives under the gentle warmth of its sun, fostering a botanical paradise.",
      },
    },
  },
};

export const dappSignInMessage = (
  signerWalletAddress: string,
  walletAddress: string,
  nftIds: number[]
) => {
  return (
    `Welcome to Dr. Green Platform!\n\n` +
    `Click to sign in and accept the Dr. Green Platform Cookie Policy (https://drgreennft.com/cookie-policy) and Privacy Policy (https://drgreennft.com/privacy-policy).\n\n` +
    `This request will not trigger a blockchain transaction or cost any gas fees.\n\n` +
    `Signer Wallet address:\n` +
    `${signerWalletAddress.toLowerCase()}\n\n` +
    `Wallet address:\n` +
    `${walletAddress.toLowerCase()}\n\n` +
    `NFT IDs:\n` +
    `${JSON.stringify(nftIds)}\n\n`
  );
};

export const signInWithNonceMessage = (
  type: LOGIN_TYPE,
  walletAddress: string,
  nonce: number
) => {
  return (
    `Welcome to Dr. Green Digital KEY ${type}!\n\n` +
    `Click to sign in and accept the Dr. Green Digital KEY ${type} Cookie Policy (https://drgreennft.com/cookie-policy) and Privacy Policy (https://drgreennft.com/privacy-policy).\n\n` +
    `This request will not trigger a blockchain transaction or cost any gas fees.\n\n` +
    `Wallet address:\n` +
    `${walletAddress.toLowerCase()}\n\n` +
    `Nonce:\n` +
    `${nonce.toString()}\n\n`
  );
};

export const RoleByType = {
  subAdmin: Role.SUBADMIN,
  nftHolder: Role.USER,
  manager: Role.MANAGER,
  whitelisted: Role.USER,
};

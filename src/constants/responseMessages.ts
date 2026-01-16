export const MESSAGES = {
  SUCCESS: {
    DEFAULT: "Success",
    SEND_EMAIL: "Mail has been sent to",
    VERIFIED_EMAIL: "EMAIL has been verified",
    ADMIN: {
      DISABLE_2FA: "2FA disabled successfully for",
      CREATED_SUB_ADMIN: "Sub admin created and Mail has been sent with email:",
    },
    CART: {
      DELETED: "cart has been deleted successfully",
      STRAIN: {
        DELETED: "strain is deleted successfully from cart",
      },
    },
    DAPP: {
      ALREADY_EXIST: "key name already exists",
      LIMIT_EXCEEDED: "you have exceeded to create api key",
      CREATE_MESSAGE:
        "please keep secure your secret Key, you will see once here",
      DELETE: "you have deleted api key successfully",
      UPDATE: "you have updated api key name successfully",
    },
    AUTH_KEY: {
      NOT_FOUND: 'API key not Found or the user is not the owner.',
    },
  },
  ERROR: {
    INVALID_API_KEY: "This is invalid API key",
    SERVER_ERROR: "Internal Server Error",
    ACCESS_DENIED: "Unauthorized Access",
    INVALID_S3_URL: "Invalid S3 bucket URL format",
    UNIQUE_CONSTRAINT: "Duplicate value for",
    SEND_EMAIL: "Error while sending email",
    EMAIL_VERIFIED: "Email is already verified",
    INVALID_TOKEN: "Invalid token",
    UNAUTHORIZED_ACTION: "User is not authorised",
    FOREIGN_KEY: "foreign key does not exist",
    EMAIL_TYPE:
      "type must be either EMAIL_VERIFICATION or TWO_STEP_VERIFICATION",
    NUM_ARRAY: "Must be an array of numbers",
    INVALID_WALLET_ADDRESS: "Invalid wallet address",
    USERS: {
      CREATE_FAILED: "failed while creating user",
      FETCH_FAILED: "failed while fetching user",
      UPDATE_FAILED: "failed while updating user",
      NOT_FOUND: "User not found",
      UNAUTHORIZED: "Invalid Signature",
      NO_SPACE: "username should not contain space",
      NOT_EXIST: "User id does not exist",
      INVALID_USERNAME: "Invalid username",
      ROLES: "role must be one of the following values: USER, SUBADMIN",
      USERTYPE:
        "userType must be one of the following values: manager, subAdmin",
      NOT_QUALIFIED_FOR_DAPP: "User is not qualified for DAPP",
      DEACTIVATED: "You have been deactivated by admin.",
      NOT_AUTHORIZED_TO_ADD_USER: "Unauthorized to add user with this role",
      NOT_AUTHORIZED_TO_UPDATE_USER:
        "Unauthorized to update user details with this role",
      NOT_AUTHORIZED_TO_UPDATE_OWN_DETAILS:
        "Unauthorized to update your own details",
      INVALID_USER_TO_ADD: "Invalid user to add",
      USER_ALREADY_WHITELISTED:
        "User is already whitelisted with this wallet address",
      WALLET_ADDRESS_ALREADY_EXISTS: "Wallet address already exists",
      EMAIL_ID_ALREADY_EXISTS: "Email Id already exists",
      EXCEED_GOLD_LIMIT: "Exceed gold limit",
      EXCEED_PLATINUM_LIMIT: "Exceed platinum limit",
      EXCEED_STANDARD_LIMIT: "Exceed standard limit",
    },
    AUTHORIZATION: {
      NOT_FOUND: "No authorization header found in the request",
      AUTH_TOKEN_EXPIRED: "Auth Token Expired!",
      INVALID: "Invalid Auth Token",
      CLIENT_HEADER_NOT_PROVIDED: "No client headers were provided ",
    },
    COLLECTION: {
      CREATE_FAILED: "failed while creating collection",
      FETCH_FAILED: "failed while fetching collection",
      UPDATE_FAILED: "failed while updating collection",
      NOT_FOUND: "collection not found",
    },
    EVENT: {
      CREATE_FAILED: "failed while creating event",
      FETCH_FAILED: "failed while fetching event",
      UPDATE_FAILED: "failed while updating event",
      NOT_FOUND: "event not found",
    },
    PRODUCT: {
      CREATE_FAILED: "failed while creating product",
      FETCH_FAILED: "failed while fetching product",
      UPDATE_FAILED: "failed while updating product",
      NOT_FOUND: "product not found",
    },
    COMMISSION: {
      FETCH_FAILED: "failed while fetching commission",
      SUMMARY_FAILED: "failed while fetching commission summary",
    },
    STRAIN: {
      CART: {
        FETCH_FAILED: "failed while fetching from cart",
        DELETE_FAILED: "strain deletion from cart is failed",
      },
      CREATE_FAILED: "failed while creating strain",
      FETCH_FAILED: "failed while fetching strain",
      UPDATE_FAILED: "failed while updating strain",
      NOT_FOUND: "strain not found",
      PLANET_NOT_EXIST: "Planet does not exist",
      ALREADY_EXIST: "Strain already exist in the cart",
    },
    NFT: {
      CREATE_FAILED: "failed while creating key",
      FETCH_FAILED: "failed while fetching keys",
      UPDATE_FAILED: "failed while updating key",
      NOT_FOUND: "key not found",
      SALE_ERROR: "error while putting key on sale",
      NOT_SALE_ERROR: "error while putting key off sale",
      ON_SALE_NOT_FOUND: "key is not on sale",
      SALE_FETCH_FAILED: "failed while fetching keys on sale",
      ALREADY_ON_SALE: "key is already on sale",
      MINTING_COUNT: "error while minting count",
      NOT_ASSOCIATED:
        "You do not have this KEY or are not associated with this KEY.",
    },
    SALE: {
      CREATE_FAILED: "failed while creating sale",
      FETCH_FAILED: "failed while fetching sales",
      UPDATE_FAILED: "failed while updating sale",
      NOT_FOUND: "sale not found",
    },
    ORDER: {
      CREATE_FAILED: "failed while creating order",
      FETCH_FAILED: "failed while fetching orders",
      UPDATE_FAILED: "failed while updating order",
      NOT_FOUND: "order not found",
      WRONG_ORDER_STATUS: "Wrong order status flow",
    },
    ORDERNONCE: {
      CREATE_FAILED: "failed while adding nonce record",
      FETCH_FAILED: "failed while fetching nonce record",
      UPDATE_FAILED: "failed while updating nonce record",
      NOT_FOUND: "Nonce not found",
    },
    CLIENT: {
      CREATE_FAILED: "failed while creating client",
      FETCH_FAILED: "failed while fetching clients",
      UPDATE_FAILED: "failed while updating client",
      NOT_FOUND: "Client not found",
      EMAIL_ALREADY_EXISTS: "Client Email ID already exists",
      CONTACT_NUMBER_ALREADY_EXISTS: "Phone Number already exists",
      CART_NOT_FOUND: "Client Cart not found",
      CART_ITEM_NOT_FOUND: "Cart Item not found with the given strain id",
    },
    DASHBOARD: {
      SUMMARY_FAILED: "failed while fetching summary",
      ANALYTICS_FAILED: "failed while fetching analytics",
      NOT_VALID_RANGE: "Invalid range",
    },
    AXIOS: {
      FETCH_FAILED: "failed while fetching from axios",
    },
    TRANSACTION: {
      FETCH_FAILED: "failed while fetching from transaction",
    },
    WHITELISTEDUSERS: {
      FETCH_FAILED: "failed while fetching from whitelisted users",
    },
    PLANET: {
      CREATE_FAILED: "failed while creating planet",
      FETCH_FAILED: "failed while fetching planets",
      UPDATE_FAILED: "failed while updating planet",
      NOT_FOUND: "planet not found",
    },
    CONTRACT: {
      NOT_APPROVED: "Approval is not given to the marketplace",
      NOT_VALID_OWNER: "Not a valid owner",
      SIGNATURE_VERIFICATION_FAILED: "Signature verification failed",
    },
    CSV:{
      NOT_CREATED:"Error while converting data to CSV format"
    }
  },
};

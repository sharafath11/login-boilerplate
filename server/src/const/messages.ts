
export const messages = {
  auth: {
    loginSuccess: "Login successful",
    logoutSuccess: "Logout successful",
    registrationSuccess: "Registration successful",
    invalidCredentials: "Invalid email or password",
    accountNotFound: "Account not found",
    passwordRequired: "Password is required",
    emailRequired: "Email is required",
    tokenMissing: "Authentication token is missing",
    tokenInvalid: "Invalid or expired token",
    unauthorized: "You are not authorized to perform this action",
    refreshTokenExpired: "Session expired, please login again",
     passwordNotMatch: "Passwords do not match",
    emailAlreadyExists:"This Email already exists"
  },
  common: {
    serverError: "Something went wrong. Please try again.",
    validationError: "Validation failed. Check your input.",
    missingFields: "Required fields are missing",
    success: "Operation completed successfully",
    fail: "Operation failed",
    },
   REPOSITORY: {
    CREATE_ERROR: "Error creating document",
    COUNT_ERROR: "Error counting documents",
    FIND_ALL_ERROR: "Error fetching documents",
    FIND_PAGINATED_ERROR: "Error fetching paginated documents",
    UPDATE_MANY_ERROR: "Failed to update multiple documents",
    UPDATE_ONE_ERROR: "Error updating document with filter",
    FIND_BY_ID_ERROR: "Error finding document by ID",
    FIND_ONE_ERROR: "Error finding document",
    FIND_WITH_PASSWORD_ERROR: "Error finding document with password",
    UPDATE_ERROR: "Error updating document",
    DELETE_ERROR: "Error deleting document",
  },
};

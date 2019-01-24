module.exports = {
  /* -----------------
  Common Messages
  -------------------*/
  actionNotAllowed: 'Action not allowed.',
  listFetched: 'List fetched successfully.',
  linkExpired: 'This link has been expired.',
  linkValid: 'Link is valid.',
  unauth: 'Unauthorized Access.',
  tokenExpired: 'Session expired.',
  fileUploaded: 'File uploaded successfully',
  filFetched: 'File fetched successfully',
  noFileFound: 'File not found',
  fileDeleted: 'File deleted successfully',
  invalidId: 'Please enter a valid id',
  fileSizeExceeded: 'The uploaded file needs to be a color image (smaller than 8,000px by 8,000px), in JPG or PNG format, and less than 5MB in size',
  duplicatePhoneNumber: 'A user with same phone already exists.',
  /* -----------------
  User Messages
  -------------------*/
  uStatusChanged: (newStatus) => {
    return `User ${
      (newStatus == 1)
        ? 'activated'
        : (newStatus == 2 ? 'blocked' : 'deleted')
      } successfully.`
  },
  uNotExist: 'User does not exist.',
  uPassNotMatch: 'Old Password doesn\'t match.',
  uPassChanged: 'Password changed successfully.',
  uPassCantSame: 'Old and new Password can\'t be same.',
  uInvalidCred: 'Invalid credentials.',
  uBlocked: 'You can\'t login as your profile has been blocked by admin.',
  uEmailExist: 'A user with same email already exists.',
  uEmailNotVerifed: 'Please verify you email first.',
  uEmailVerifed: 'Email verified successfully.',
  uResetLinkSent: 'Reset password link sent on email.',
  uResetPassSucc: 'Password reset successfully.',
  uLogoutSuccess: 'Logged out successfully.',
}


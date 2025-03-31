// Get references to the page sections
const signInPage = document.getElementById('signInPage');
const signUpPage = document.getElementById('signUpPage');
const createAccountPage = document.getElementById('createAccountPage');

// Header action span that shows "Sign in to" or "Sign up to"
const headerAction = document.getElementById('headerAction');

// Get the links/buttons for switching pages
const goToSignUp = document.getElementById('goToSignUp');
const goToSignInFromSignUp = document.getElementById('goToSignInFromSignUp');
const goToSignInFromCreate = document.getElementById('goToSignInFromCreate');
const continueWithEmail = document.getElementById('continueWithEmail');

// Popup elements
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Function to show the popup (if needed)
function showPopup() {
  popup.style.display = 'flex';
}
function hidePopup() {
  popup.style.display = 'none';
}
closePopup.addEventListener('click', hidePopup);

// Function to switch the visible page
function showPage(pageToShow) {
  // Hide all pages
  signInPage.classList.remove('active');
  signUpPage.classList.remove('active');
  createAccountPage.classList.remove('active');
  // Show the selected page
  pageToShow.classList.add('active');
}

// Update header text and switch pages
goToSignUp.addEventListener('click', () => {
  showPage(signUpPage);
  headerAction.textContent = 'Sign up to';
});
goToSignInFromSignUp && goToSignInFromSignUp.addEventListener('click', () => {
  showPage(signInPage);
  headerAction.textContent = 'Sign in to';
});
goToSignInFromCreate && goToSignInFromCreate.addEventListener('click', () => {
  showPage(signInPage);
  headerAction.textContent = 'Sign in to';
});
continueWithEmail && continueWithEmail.addEventListener('click', () => {
  showPage(createAccountPage);
  headerAction.textContent = 'Sign up to';
});

// Default page on load
showPage(signInPage);
headerAction.textContent = 'Sign in to';

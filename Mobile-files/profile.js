// Get references to page sections
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

// Popup elements (if using)
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');

// Create Account checkbox error elements
const termsCheckbox = document.getElementById('termsCheckbox');
const termsError = document.getElementById('termsError');
const createAccountBtn = document.getElementById('createAccountBtn');

// Utility function to switch visible page
function showPage(pageToShow) {
  signInPage.classList.remove('active');
  signUpPage.classList.remove('active');
  createAccountPage.classList.remove('active');
  pageToShow.classList.add('active');
}

// Update header text and switch pages
goToSignUp.addEventListener('click', () => {
  showPage(signUpPage);
  headerAction.textContent = 'Sign up to';
});
if (goToSignInFromSignUp) {
  goToSignInFromSignUp.addEventListener('click', () => {
    showPage(signInPage);
    headerAction.textContent = 'Sign in to';
  });
}
if (goToSignInFromCreate) {
  goToSignInFromCreate.addEventListener('click', () => {
    showPage(signInPage);
    headerAction.textContent = 'Sign in to';
  });
}
if (continueWithEmail) {
  continueWithEmail.addEventListener('click', () => {
    showPage(createAccountPage);
    headerAction.textContent = 'Sign up to';
  });
}

// Default page on load
showPage(signInPage);
headerAction.textContent = 'Sign in to';

// --- Simulated Actions ---

// Sign In Button (simulate login)
// Validate credentials here and then redirect on success.
document.getElementById('signInBtn').addEventListener('click', () => {
  // Replace with your server validation logic.
  window.location.href = 'profilePage.html';
});

// Google / Apple Sign In for Sign In Page using OAuth redirect via form submission approach
function oauthSignInGoogle() {
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  const form = document.createElement('form');
  form.method = 'GET';
  form.action = oauth2Endpoint;
  
  const params = {
    client_id: '599141524234-mtjv5mda4q7q15enbbmp5p12mb72d9s7.apps.googleusercontent.com', // Replace with your actual client ID
    redirect_uri: 'https://stitchez-art.github.io/Stitchez-Website/Mobile-files/mobile.html', // Replace with your redirect URI
    response_type: 'code', // Use 'code' for Authorization Code flow
    scope: 'profile email',
    include_granted_scopes: 'true',
    state: 'pass-through value'
  };

  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

document.getElementById('signInGoogle').addEventListener('click', oauthSignInGoogle);

// Apple Sign In for Sign In Page (simulate OAuth)
// Replace with actual OAuth redirection when ready.
document.getElementById('signInApple').addEventListener('click', () => {
  alert('Redirecting to Apple sign in... (Replace with real OAuth logic)');
});

// Google / Apple Sign Up for Sign Up Page (simulate OAuth)
document.getElementById('signUpGoogle').addEventListener('click', oauthSignInGoogle);

document.getElementById('signUpApple').addEventListener('click', () => {
  alert('Redirecting to Apple sign up... (Replace with real OAuth logic)');
});

// Create Account Button: Check if terms checkbox is checked
createAccountBtn.addEventListener('click', function() {
  if (!termsCheckbox.checked) {
    termsError.textContent = "Please check the box to agree to the terms.";
    termsError.style.display = "block";
  } else {
    termsError.style.display = "none";
    // Simulate account creation, send confirmation email, etc.
    alert('Account created! A confirmation email has been sent.');
    window.location.href = 'profilePage.html';
  }
});

// Popup close functionality (if using popup)
if (closePopup) {
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

<script setup>
import { ref } from 'vue';
import ModalTemplate from './ModalTemplate.vue';

const technologyAreasOfInterestOptions = ref([
  '3D Printing',
  'AI',
  'Analytics',
  'Autonomous',
  'Data Science',
  'Electric Mobility',
  'Electrical Engineering',
  'Machine Learning',
  'Mechanical Engineering',
  'Mechatronics',
  'Network Engineering',
  'Product Management',
  'Sales, Product Strategy',
  'Robotics',
  'Sales Engineer',
  'Software Engineering',
  'Sourcing / Supply Chain',
  'Test Engineering',
  'UX Design',
]);
const selectedTechnologyAreasOfInterest = ref([]);
const showThankYouModal = ref(false);
const showFormValidation = ref(false);
const formIsSubmitting = ref(false);
const surveyForm = ref(null);

// Creates an array of array values not included in the other given arrays
function difference(...args) {
  return args.reduce((a, b) => a.filter((row) => !b.includes(row)));
}

function resetSurveyForm() {
  showFormValidation.value = false;
  surveyForm.value.reset();
}

function sendSurvey(form) {
  formIsSubmitting.value = true;
  fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeUsmptkldfWuivpfIa6vMlvMIPYTTYNhYKDFAXRXn1HRwBHQ/formResponse', {
    method: 'POST',
    body: form,
    mode: 'no-cors',
  })
    .then((response) => {
      formIsSubmitting.value = false;
      const responseIsValid = (() => {
        if (response.status === 0) {
          return true;
        }
        if (response.status >= 200 && response.status < 300) {
          return true;
        }
        return false;
      })();
      if (responseIsValid === true) {
        resetSurveyForm();
        showThankYouModal.value = true;
      } else {
        console.log('unexpected error response from server: ', { response });
      }
    })
    .catch((error) => {
      formIsSubmitting.value = false;
      console.log('unexpected error sending data to server: ', error.message, error);
    });
}

function isFormValid(submitFormEvent) {
  const formElementArr = Array.prototype.slice.call(submitFormEvent.target.elements);
  const formElementValidityArr = formElementArr.map((el) => el.validity.valid);
  return formElementValidityArr.every((isElValid) => isElValid === true);
}

function handleFormSubmitted(event) {
  showFormValidation.value = true;
  if (!isFormValid(event)) {
    console.log('survey form data is invalid');
    return;
  }
  const {
    surveyeeName,
    surveyeeEmail,
    surveyeeInterest,
    surveyeeLinkedin,
    surveyeeComments,
    surveyeeAgreement,
  } = Object.fromEntries(new FormData(event.target));
  const surveyFormData = new FormData();
  surveyFormData.append('entry.688542695', surveyeeName);
  surveyFormData.append('entry.454859491', surveyeeEmail);
  surveyFormData.append('entry.558846366', surveyeeInterest);
  surveyFormData.append('entry.1332797850', surveyeeLinkedin);
  surveyFormData.append('entry.1787053229', surveyeeComments);
  surveyFormData.append('entry.173122956', surveyeeAgreement);
  sendSurvey(surveyFormData);
}

</script>

<template>
  <div class="container p-3 mb-4 bg-black-transparent">
    <!-- <div class="col-lg-6 offset-lg-3"> -->
    <div class="col">
      <form
        :class="{ 'needs-validation': !showFormValidation }"
        ref="surveyForm"
        @submit.prevent="handleFormSubmitted"
        novalidate
      >
        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-name" class="col-form-label">
            Name
          </label>
          <div class="">
            <input
              type="text"
              class="form-control"
              name="surveyeeName"
              id="surveyee-name"
              placeholder="First and Last Name"
              maxlength="60"
              :disabled="formIsSubmitting === true"
              required
              pattern=".*\S+.*"
            >
            <div class="invalid-feedback">Please enter your name.</div>
          </div>
        </div>

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-email" class="col-form-label">
            E-Mail
          </label>
          <div class="">
            <input
              type="email"
              class="form-control"
              name="surveyeeEmail"
              id="surveyee-email"
              placeholder="E-Mail"
              maxlength="60"
              :disabled="formIsSubmitting === true"
              required
            >
            <div class="invalid-feedback">Please enter an email address we can reach you at.</div>
          </div>
        </div>

        <div class="row mb-2" :class="{ '': true, 'was-validated': showFormValidation }">
          <label for="surveyee-interest" class="col-form-label">
            Technology Area's of Interest
          </label>
          <div class="">
            <VSelect
              multiple
              placeholder="Robotics, Self-Driving, AI"
              :options="difference(technologyAreasOfInterestOptions, selectedTechnologyAreasOfInterest)"
              v-model="selectedTechnologyAreasOfInterest"
            />
            <input
              type="text"
              class="form-control d-none"
              name="surveyeeInterest"
              id="surveyee-interest"
              :value="selectedTechnologyAreasOfInterest.join(', ')"
              required
              pattern=".*\S+.*"
            >
            <div class="invalid-feedback">Please let us know what your technology area's of interest are.</div>
          </div>
        </div>

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-linkedin" class="col-form-label">
            LinkedIn Profile
          </label>
          <div class="">
            <input
              type="text"
              class="form-control"
              name="surveyeeLinkedin"
              id="surveyee-linkedin"
              placeholder="URL to your LinkedIn Profile"
              maxlength="90"
              :disabled="formIsSubmitting === true"
            >
          </div>
        </div>

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-comments" class="col-form-label">
            Comments
          </label>
          <div class="">
            <textarea
              class="form-control"
              name="surveyeeComments"
              id="surveyee-comments"
              placeholder="Comments"
              rows="3"
              maxlength="2048"
              :readonly="formIsSubmitting === true"
            />
          </div>
        </div>

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <div for="surveyee-legal-agreement" class="col">
            <div class="form-check">
              <input
                class="form-check-input" type="checkbox" value="I hereby confirm that dtna is allowed to contact me for recruiting purposes"
                id="surveyee-agreement"
                name="surveyeeAgreement"
                required
                pattern=".*\S+.*"
              >
              <label class="form-check-label" for="surveyee-agreement">
                I hereby confirm that DTNA is allowed to contact me for recruiting purposes.
              </label>
              <div class="invalid-feedback">You must agree to be contacted for recruting purposes in order to submit this form.</div>
            </div>
          </div>
        </div>
        <div class="d-grid">
          <button type="submit" id="submit-btn" class="btn btn-lg btn-dark">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>

  <ModalTemplate v-show="showThankYouModal" @close="showThankYouModal = false">
    <template #header>
      <h1>Thank you!</h1>
    </template>
    <template #body>
      <div class="wrapper text-center">
        <img src="/check-circle.svg" class="img-fluid check-icon" alt="check">
      </div>
      <p class="text-center">Someone from Daimler Truck North America will be in touch soon!</p>
      <p class="text-center">In the meantime check out our open positions on LinkedIn.</p>
      <div class="d-grid">
        <a
          // eslint-disable-next-line max-len
          id="linkedin-btn" class="btn btn-primary" href="https://www.linkedin.com/jobs/daimler-truck-north-america-jobs-worldwide?f_C=2263179&trk=top-card_top-card-primary-button-top-card-primary-cta&position=1&pageNum=0"
          role="button"
        >
          <img src="/Icon-linkedin.svg" class="img-fluid li-icon" alt="LinkedIn"></a>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-link text-center" @click="showThankYouModal = false">Close</button>
    </template>
  </ModalTemplate>
</template>

<style lang="scss">
.bg-black-transparent {
  background: rgb(0 0 0 / 50%);
}

.col-form-label {
  font-weight: 600;
}

.form-control {
  font-weight: 600;
  padding: 0.75rem;

  // color: #b2b2b2;
}

.form-control::input-placeholder { /* WebKit browsers */
  color: #b2b2b2;
}

.form-control:placeholder { /* Mozilla Firefox 4 to 18 */
  color: #b2b2b2;
}

.form-control::placeholder { /* Mozilla Firefox 19+ */
  color: #b2b2b2;
}

.form-control:input-placeholder { /* Internet Explorer 10+ */
  color: #b2b2b2;
}

button#submit-btn {
  font-size: 1.75em;
  font-weight: bold;
  height: 85px;
  border: 1px solid #fff;
  background-color: #000;
}

.check-icon {
  height: 58px;
  margin-bottom: 43px;
}

#linkedin-btn {
  background-color: #0077b5;
}

.vs__dropdown-toggle {
  background: white !important;
  padding: 4px 2px 4px 0 !important;
}

.vs__dropdown-option {
  color: #000; /* Overrides most CSS frameworks */
}

.vs__dropdown-menu {
  color: #000 !important;
}

.vs__dropdown-option--highlight {
  background: #000 !important;
  color: #fff;
}

span.vs__selected {
  padding: 4px;
  background: #000;
  color: white;
  border-radius: 25px;
  padding-right: 10px;
  margin: 2px 0 2px 4px;
  padding-left: 8px;
}

.vs__deselect path {
  fill: #fff !important;
}

// #vs1__combobox {
//   color: #6c757d !important;
// }

.vs__search::placeholder {
  color: #6c757d !important;
}
</style>

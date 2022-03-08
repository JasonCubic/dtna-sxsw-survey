<script setup>
import { ref } from 'vue';
import ModalTemplate from './ModalTemplate.vue';

const showThankYouModal = ref(false);
const showFormValidation = ref(false);
const formIsSubmitting = ref(false);
const surveyForm = ref(null);

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
  <div class="container p-4 bg-black-transparent">
    <div class="col-lg-6 offset-lg-3">
      <h1>DTNA SXSW Survey</h1>
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

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-interest" class="col-form-label">
            Technology Area's of Interest
          </label>
          <div class="">
            <input
              type="text"
              class="form-control"
              name="surveyeeInterest"
              id="surveyee-interest"
              placeholder="Robotics, Self-Driving, AI"
              maxlength="280"
              :disabled="formIsSubmitting === true"
              required
              pattern=".*\S+.*"
            >
            <div class="invalid-feedback">Please let us know what interested you at out booth.</div>
          </div>
        </div>

        <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
          <label for="surveyee-linkedin" class="col-form-label">
            Linkedin Profile
          </label>
          <div class="">
            <input
              type="text"
              class="form-control"
              name="surveyeeLinkedin"
              id="surveyee-linkedin"
              placeholder="URL to your Linkedin Profile"
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

        <button type="submit" class="btn btn-primary">Submit Survey</button>
      </form>
    </div>
  </div>

  <ModalTemplate v-show="showThankYouModal" @close="showThankYouModal = false">
    <template #header>
      <h1>Grattitude</h1>
    </template>
    <template #body>
      <p>Your survey results have been received.  We appreciate you taking the time to fill out our survey.</p>
      <p>Thank You.</p>
    </template>
    <template #footer>
      <button class="btn btn-primary" @click="showThankYouModal = false">OK</button>
    </template>
  </ModalTemplate>
</template>

<style lang="scss">
  .bg-black-transparent {
    background: rgb(0 0 0 / 50%);
  }
</style>

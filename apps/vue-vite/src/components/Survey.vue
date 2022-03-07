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
    console.log('survey form is not valid');
    return;
  }
  const { surveyeeName, surveyeeEmail, surveyeeInterest } = Object.fromEntries(new FormData(event.target));
  const surveyFormData = new FormData();
  surveyFormData.append('entry.688542695', surveyeeName);
  surveyFormData.append('entry.454859491', surveyeeEmail);
  surveyFormData.append('entry.558846366', surveyeeInterest);
  sendSurvey(surveyFormData);
}

</script>

<template>
  <h1>DTNA SXSW Survey</h1>

  <form
    :class="{ 'needs-validation': !showFormValidation }"
    ref="surveyForm"
    @submit.prevent="handleFormSubmitted"
    novalidate
  >
    <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
      <label for="surveyee-name" class="col-md-4 col-lg-3 col-form-label">
        Name
      </label>
      <div class="col-md-8 col-lg-9">
        <input
          type="text"
          class="form-control"
          name="surveyeeName"
          id="surveyee-name"
          placeholder="Your Name"
          maxlength="60"
          :disabled="formIsSubmitting === true"
          required
          pattern=".*\S+.*"
        >
        <div class="invalid-feedback">Please enter your name.</div>
      </div>
    </div>

    <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
      <label for="surveyee-email" class="col-md-4 col-lg-3 col-form-label">
        E-Mail
      </label>
      <div class="col-md-8 col-lg-9">
        <input
          type="email"
          class="form-control"
          name="surveyeeEmail"
          id="surveyee-email"
          placeholder="Your E-Mail"
          maxlength="60"
          :disabled="formIsSubmitting === true"
          required
        >
        <div class="invalid-feedback">Please enter an email address we can reach you at.</div>
      </div>
    </div>

    <div class="row mb-2" :class="{ 'was-validated': showFormValidation }">
      <label for="surveyee-interest" class="col-md-4 col-lg-3 col-form-label">
        Interests?
      </label>
      <div class="col-md-8 col-lg-9">
        <input
          type="text"
          class="form-control"
          name="surveyeeInterest"
          id="surveyee-interest"
          placeholder="Interests"
          maxlength="60"
          :disabled="formIsSubmitting === true"
          required
          pattern=".*\S+.*"
        >
        <div class="invalid-feedback">Please let us know what interested you at out booth.</div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Submit Survey</button>
  </form>

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

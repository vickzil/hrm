// TOGGLE WHATSAPP WIDGETS


export const AUTH_REQUEST = (state) => {
    state.status = 'loading'
};

export const REGISTRATION_INFO = (state, data) => {
    state.registrationInfo = data
};


export const SAVE_COUNTRY_BANK_NAMES = (state, data) => {
    state.countryBankName = data
};



export const SAVE_USER_DATA = (state, data) => {
    state.user = data;
    state.isUserLoggedIn = true
};


export const AUTH_SUCCESS = (state, data) => {
    state.status = 'success'
    state.token = data.token.token
        // state.user = data;
    state.isUserLoggedIn = true
        // console.log(data)
};


export const AUTH_ERROR = (state) => {
    state.status = 'error'
};

export const SHOW_ALERT = (state, payload) => {
    state.alertStatus = true;
    state.alertType = payload.type;
    state.alertMessage = payload.message;

    setTimeout(() => {
        state.alertStatus = false;
        state.alertType = '';
        state.alertMessage = '';
    }, 7000);

};

export const CLOSE_ALERT = (state) => {
    setTimeout(() => {
        state.alertStatus = false;
        state.alertType = '';
        state.alertMessage = '';
    }, 500);

};


export const SAVE_USER_ID = (state, id) => {
    state.userId = id
};


export const SAVE_EMAIL_TOKEN = (state, token) => {
    state.userId = token
};


export const SET_USER_EXPIRED_LOGIN_TIME = (state, time) => {
    state.userExpireLoginTime = time
};


export const SET_REGISTRATION_TEXT = (state, status) => {
    state.registrationText = status
};

export const SET_MAKE_PAYMENT = (state, status) => {
    state.makePayment = status
};

export const SET_EMAIL_CONFIRM_MODAL = (state, status) => {
    state.emailConfirmModal = status
};


export const LOGOUT = (state) => {
    state.status = '';
    state.token = '';
    state.isUserLoggedIn = false
        // state.user = null;
        // state.userAmount = null;
    state.logoutModal = false;
    // state.appId = null;
    // state.userId = null;
    // state.emailToken = null;
    // state.notifications = []
};


export const SHOW_PAGE_LOADING = (state) => {
    state.pageLoading = true
};

export const SHOW_PAGE_PROCESSING = (state) => {
    state.pageProcessing = true
};

export const CLOSE_PAGE_PROCESSING = (state) => {
    state.pageProcessing = false
};

export const SAVE_USER_PAYMENT_OPTIONS = (state, payload) => {
    state.userPaymentOptions = payload
};

export const SHOW_PAYMENT_OPTIONS = (state) => {
    state.selectPaymentOptionModal = true
};

export const CLOSE_PAYMENT_OPTIONS = (state) => {
    state.selectPaymentOptionModal = false
};

export const SHOW_BANK_TRANSFER_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    setTimeout(() => {
        state.bankTransferModal = true
    }, 50);

};

export const CLOSE_BANK_TRANSFER_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    state.bankTransferModal = false
};

export const SHOW_DEBIT_CREDIT_CARD_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    setTimeout(() => {
        state.debitCreditCardModal = true;
        state.amount = 0;
        state.currency = "";
        state.processing = false;
        state.buttonText = "Proceed";
        state.emptyFields = true;
        state.inputError = false;
        state.formError = false;
        state.payWithPaystack = false;
        state.payWithRave = false;
        state.paymentForPaystackInfo = null;
        state.paymentForRaveInfo = null;
        state.errorMessage = "";
        state.showError = false;
    }, 50);
};

export const CLOSE_DEBIT_CREDIT_CARD_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    state.debitCreditCardModal = false;

    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
};

export const SHOW_UPLOAD_EVIDIENCE_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    setTimeout(() => {
        state.uploadEvidienceModal = true
    }, 50);
};

export const CLOSE_UPLOAD_EVIDIENCE_MODAL = (state) => {
    state.selectPaymentOptionModal = false
    state.uploadEvidienceModal = false
};

export const SHOW_PAYMENT_FORM_MODAL = (state) => {
    state.debitCreditCardModal = false
    state.PaymentFormModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
};

export const CLOSE_PAYMENT_FORM_MODAL = (state) => {
    state.debitCreditCardModal = false
    state.PaymentFormModal = false;
};


export const SHOW_UPLOAD_EVIDIENCE_FORM_MODAL = (state) => {
    state.UploadEvidenceFormModal = true
};

export const CLOSE_UPLOAD_EVIDIENCE_FORM_MODAL = (state) => {
    state.UploadEvidenceFormModal = false
};

export const SHOW_COMMING_SOON_MODAL = (state) => {
    state.commingSoonModal = true
};

export const CLOSE_COMMING_SOON_MODAL = (state) => {
    state.commingSoonModal = false
};

export const SHOW_LOGOUT_MODAL = (state) => {
    state.logoutModal = true
};


export const CLOSE_LOGOUT_MODAL = (state) => {
    state.logoutModal = false
};

export const SHOW_WORK_HISTORY_MODAL = (state) => {
    state.addWorkHistoryModal = true
};

export const CLOSE_WORK_HISTORY_MODAL = (state) => {
    state.addWorkHistoryModal = false
};

export const SHOW_SCHOOL_HISTORY_MODAL = (state) => {
    state.addschoolHistoryModal = true
};

export const CLOSE_SCHOOL_HISTORY_MODAL = (state) => {
    state.addschoolHistoryModal = false
};


export const SHOW_GUARANTOR_MODAL = (state) => {
    state.addGuarantorModal = true
};

export const CLOSE_GUARANTOR_MODAL = (state) => {
    state.addGuarantorModal = false
};


export const SHOW_REFEREE_MODAL = (state) => {
    state.addRefereeModal = true
};

export const CLOSE_REFEREE_MODAL = (state) => {
    state.addRefereeModal = false
};

export const SHOW_CERTIFICATION_MODAL = (state) => {
    state.addCertificationModal = true
};

export const CLOSE_CERTIFICATION_MODAL = (state) => {
    state.addCertificationModal = false
};


export const CLOSE_PAGE_LOADING = (state) => {
    setTimeout(() => {
        state.pageLoading = false;
        state.logoutModal = false
    }, 800);
};


export const GET_COUNTRIES = (state, countries) => {
    state.countries = countries;
};

export const CURRENT_SITE_PAGE = (state, page) => {
    state.currentSitePage = page;
};


export const APPEND_WORK_HISTORY = (state, payload) => {
    state.user.userInfo.userWorkHistories.push(payload);
};

export const APPEND_SCHOOL_HISTORY = (state, payload) => {
    state.user.userInfo.userSchoolHistories.push(payload);
};

export const APPEND_CERTIFICATION = (state, payload) => {
    state.user.userInfo.userCertifications.push(payload);
};

export const APPEND_GUARANTOR = (state, payload) => {
    state.user.userInfo.userGuarantors.push(payload);
};

export const APPEND_REFEREE = (state, payload) => {
    state.user.userInfo.refrees.push(payload);
};
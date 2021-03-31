/* eslint-disable */

// PAGE LOADING STATUS
export const getCurrentdate = () => {
    var d = new Date();
    var month = new Array();
    var date = d.getDate();
    var year = d.getFullYear();

    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var m = month[d.getMonth()];

    let currentD = date + "-" + m + "-" + year;

    return currentD;
};

export const isLoggedIn = (state) => {
    return !!state.token;
    // return state.isUserLoggedIn;
};
export const isUserAdmin = (state) => {
    return !!state.isUserAdmin;
    // return state.isUserLoggedIn;
};

export const isAdmin = (state) => {
    let userRole = state.user.userInfo.roles;
    let adminRole;

    if (userRole) {
        adminRole = userRole.includes("admin");
    }
    return !!adminRole;
};

export const isAuthenticated = () => {
    let expiresAt = sessionStorage.getItem("appexrat");

    let date = new Date(expiresAt);

    let minusHour = date.setMinutes(date.getMinutes() - 60);
    let newExpiry = new Date().setMinutes(new Date().getMinutes());

    let newDate = newExpiry < minusHour;
    return !!newDate;
};

export const status = (state) => {
    return state.status;
};
export const authStatus = (state) => {
    return state.status;
};

export const isUserLoggedIn = (state) => {
    return state.isUserLoggedIn;
};

export const registrationInfo = (state) => {
    return state.registrationInfo;
};

export const pageLoading = (state) => {
    return state.pageLoading;
};

export const pageProcessing = (state) => {
    return state.pageProcessing;
};
export const alertStatus = (state) => {
    return state.alertStatus;
};
export const alertType = (state) => {
    return state.alertType;
};

export const alertMessage = (state) => {
    return state.alertMessage;
};


export const user = (state) => {
    return state.user;
};


export const userAmount = (state) => {
    return state.userAmount;
};

export const currentpayment = (state) => {
    return state.currentpayment;
};

export const countries = (state) => {
    return state.countries;
};

export const logoutModal = (state) => {
    return state.logoutModal;
};

export const addWorkHistoryModal = (state) => {
    return state.addWorkHistoryModal;
};

export const addschoolHistoryModal = (state) => {
    return state.addschoolHistoryModal;
};

export const guarantorModal = (state) => {
    return state.guarantorModal;
};

export const addCertificationModal = (state) => {
    return state.addCertificationModal;
};

export const addGuarantorModal = (state) => {
    return state.addGuarantorModal;
};

export const addRefereeModal = (state) => {
    return state.addRefereeModal;
};

export const userBankDetails = (state) => {
    return state.userBankDetails;
};

export const makePayment = (state) => {
    return state.makePayment;
};


export const selectPaymentOptionModal = (state) => {
    return state.selectPaymentOptionModal;
};

export const userPaymentOptions = (state) => {
    return state.userPaymentOptions;
};

export const bankTransferModal = (state) => {
    return state.bankTransferModal;
};

export const debitCreditCardModal = (state) => {
    return state.debitCreditCardModal;
};

export const uploadEvidienceModal = (state) => {
    return state.uploadEvidienceModal;
};

export const UploadEvidenceFormModal = (state) => {
    return state.UploadEvidenceFormModal;
};

export const addBvnModal = (state) => {
    return state.addBvnModal;
};

export const PaymentFormModal = (state) => {
    return state.PaymentFormModal;
};

export const clickedPaymentType = (state) => {
    return state.clickedPaymentType;
};

export const commingSoonModal = (state) => {
    return state.commingSoonModal;
};

export const currentSitePage = (state) => {
    return state.currentSitePage;
};

export const userId = (state) => {
    return state.userId;
};

export const AppId = (state) => {
    return state.AppId;
};



export const emailToken = (state) => {
    return state.emailToken;
};

export const emailConfirmModal = (state) => {
    return state.emailConfirmModal;
};

export const userExpireLoginTime = (state) => {
    return state.userExpireLoginTime;
};

export const registrationText = (state) => {
    return state.registrationText;
};

export const countryBankName = (state) => {
    return state.countryBankName;
};

export const RequestId = () => {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};



// export const projectById = (state) => {
//     return (projectid) => {
//         return state.projects.find((project) => project.id == projectid);
//     };
// };
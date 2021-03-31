import axios from 'axios'
import router from '../router'


// Login
export const registrationInfo = ({
    commit,
    state
}) => {
    let url = `${state.hrmURL}/v1.0/OAuth/getRegistrationInfo`;
    let data = {
        "AppId": state.AppId,
        "RequestId": state.RequestId,
    }

    axios.post(url, data).then(response => {
        console.log(response.data.data);
        commit("REGISTRATION_INFO", response.data.data);


    }).catch(err => {
        console.log(err)
        commit("CLOSE_PAGE_PROCESSING");
        router.push("/").catch(error => {
            if (error) {
                error;
            }
        });
    });
};


export const saveUserData = ({
    commit
}, data) => {
    commit('SAVE_USER_DATA', data)
};

export const fetchUserData = ({
    commit,
    state
}, code) => {

    const url = `${state.hrmURL}/v1.0/Dashboard/getDashboardInfo`;

    let data = {
        "AppId": state.AppId,
        "RequestId": state.RequestId,
        "UserCode": code
    };


    axios.post(url, data)
        .then(response => {
            if (response.data.success) {
                const data = response.data.data;

                if (data.userInfo.code) {
                    console.log(data)
                    commit('SAVE_USER_DATA', data);
                    commit('CLOSE_PAGE_PROCESSING');
                } else {

                    sessionStorage.clear();

                    commit('LOGOUT')

                    router.push("/").catch(error => {
                        if (error) {
                            error;
                        }
                    });
                }

            }
        }).catch(err => {
            console.log(err)
            router.push("/").catch(error => {
                if (error) {
                    error;
                }
                sessionStorage.clear();
            });
        })
};


export const fetchBankNames = ({
    commit,
    state
}, data) => {

    const url = `${state.walletURL}/v1.0/Country/getCountryInfo`;

    axios
        .post(url, data)
        .then(response => {
            // console.log(response);
            if (response.data.success) {
                let responseData = response.data.data;

                // let countryBankName = responseData.filter(bank => {
                //     return bank.code === this.country;
                // });
                commit('SAVE_COUNTRY_BANK_NAMES', responseData)
            }
        })
        .catch(err => {
            console.log(err);
        });

};

export const getPaymentOptions = ({
    commit,
    state
}) => {

    const url = `${state.walletURL}/v1.0/Wallet/getFundWalletOptions`;

    var data = {
        AppId: state.AppId,
        RequestId: state.RequestId,
        Email: state.user.userInfo.email
    };

    axios
        .post(url, data)
        .then(res => {
            if (res.data.success == true) {

                commit('SAVE_USER_PAYMENT_OPTIONS', res.data.data);

                commit('CLOSE_PAGE_PROCESSING');
                commit('SHOW_PAYMENT_OPTIONS');
            } else {
                let payload = {
                    type: "error",
                    message: res.data.message
                };
                commit('SHOW_ALERT', payload);
                commit('CLOSE_PAGE_PROCESSING');
            }

            // console.log(res);
        })
        .catch(err => {
            let payload = {
                type: "error",
                message: "Could not connect to server!!"
            };
            commit('SHOW_ALERT', payload);
            commit('CLOSE_PAGE_PROCESSING');
            console.log(err);
        });

};



// Login
export const login = ({
    commit
}, data) => {
    commit('AUTH_SUCCESS', data)
};


// Logout
export const logout = ({
    commit
}) => {

    return new Promise((resolve) => {
        commit('LOGOUT')
        sessionStorage.clear();
        // location.reload()
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
};




export const authRequest = ({
    commit
}) => {
    commit('AUTH_REQUEST');
};

export const authError = ({
    commit
}) => {
    commit('AUTH_ERROR');
};

export const showAlert = ({
    commit
}, payload) => {
    commit('SHOW_ALERT', payload);
};


export const closeAlert = ({
    commit
}) => {
    commit('CLOSE_ALERT');
};


export const showPageLoading = ({
    commit
}) => {
    commit('SHOW_PAGE_LOADING');
};

export const closePageLoading = ({
    commit
}) => {
    commit('CLOSE_PAGE_LOADING');
};

export const showPageProcessing = ({
    commit
}) => {
    commit('SHOW_PAGE_PROCESSING');
};

export const closePageProcessing = ({
    commit
}) => {
    commit('CLOSE_PAGE_PROCESSING');
};

export const saveUserPaymentOptions = ({
    commit
}, payload) => {
    commit('SAVE_USER_PAYMENT_OPTIONS', payload);
};

export const showPaymentOptions = ({
    commit
}) => {
    commit('SHOW_PAYMENT_OPTIONS');
};

export const closePaymentOptions = ({
    commit
}) => {
    commit('CLOSE_PAYMENT_OPTIONS');
};

export const showBankTransferModal = ({
    commit
}) => {
    commit('SHOW_BANK_TRANSFER_MODAL');
};

export const closeBankTransferModal = ({
    commit
}) => {
    commit('CLOSE_BANK_TRANSFER_MODAL');
};

export const showDebitCreditCardModal = ({
    commit
}) => {
    commit('SHOW_DEBIT_CREDIT_CARD_MODAL');
};

export const closeDebitCreditCardModal = ({
    commit
}) => {
    commit('CLOSE_DEBIT_CREDIT_CARD_MODAL');
};

export const showUploadEvidienceModal = ({
    commit
}) => {
    commit('SHOW_UPLOAD_EVIDIENCE_MODAL');
};

export const closeUploadEvidienceModal = ({
    commit
}) => {
    commit('CLOSE_UPLOAD_EVIDIENCE_MODAL');
};

export const showUploadEvidenceFormModal = ({
    commit
}) => {
    commit('SHOW_UPLOAD_EVIDIENCE_FORM_MODAL');
};

export const closeUploadEvidenceFormModal = ({
    commit
}) => {
    commit('CLOSE_UPLOAD_EVIDIENCE_FORM_MODAL');
};

export const showCommingSoonModal = ({
    commit
}) => {
    commit('SHOW_COMMING_SOON_MODAL');
};
export const closeCommingSoonModal = ({
    commit
}) => {
    commit('CLOSE_COMMING_SOON_MODAL');
};

export const showPaymentFormModal = ({
    commit
}) => {
    commit('SHOW_PAYMENT_FORM_MODAL');
};
export const closePaymentFormModal = ({
    commit
}) => {
    commit('CLOSE_PAYMENT_FORM_MODAL');
};

export const showLogoutModal = ({
    commit
}) => {
    commit('SHOW_LOGOUT_MODAL');
};


export const closeLogoutModal = ({
    commit
}) => {
    commit('CLOSE_LOGOUT_MODAL');
};

export const showWorkHistoryModal = ({
    commit
}) => {
    commit('SHOW_WORK_HISTORY_MODAL');
};

export const closeWorkHistoryModal = ({
    commit
}) => {
    commit('CLOSE_WORK_HISTORY_MODAL');
};


export const showGuarantorModal = ({
    commit
}) => {
    commit('SHOW_GUARANTOR_MODAL');
};

export const closeGuarantorModal = ({
    commit
}) => {
    commit('CLOSE_GUARANTOR_MODAL');
};


export const showRefereeModal = ({
    commit
}) => {
    commit('SHOW_REFEREE_MODAL');
};

export const closeRefereeModal = ({
    commit
}) => {
    commit('CLOSE_REFEREE_MODAL');
};


export const showSchoolHistoryModal = ({
    commit
}) => {
    commit('SHOW_SCHOOL_HISTORY_MODAL');
};

export const closeSchoolHistoryModal = ({
    commit
}) => {
    commit('CLOSE_SCHOOL_HISTORY_MODAL');
};

export const showCertificationModal = ({
    commit
}) => {
    commit('SHOW_CERTIFICATION_MODAL');
};

export const closeCertificationModal = ({
    commit
}) => {
    commit('CLOSE_CERTIFICATION_MODAL');
};


export const saveUserId = ({
    commit
}, id) => {
    commit('SAVE_USER_ID', id);
};

export const setUserExpireLoginTime = ({
    commit
}, time) => {
    commit('SET_USER_EXPIRED_LOGIN_TIME', time);
};

export const setRegistrationText = ({
    commit
}, status) => {
    commit('SET_REGISTRATION_TEXT', status);
};

export const setMakePayment = ({
    commit
}, status) => {
    commit('SET_MAKE_PAYMENT', status);
};

export const setEmailConfirmationModal = ({
    commit
}, status) => {
    commit('SET_EMAIL_CONFIRM_MODAL', status);
};

export const saveEmailToken = ({
    commit
}, token) => {
    commit('SAVE_EMAIL_TOKEN', token);
};

export const currentSitePage = ({
    commit
}, page) => {
    commit('CURRENT_SITE_PAGE', page);
};


export const appendWorkHistory = ({
    commit
}, payload) => {
    commit('APPEND_WORK_HISTORY', payload);
};

export const appendSchoolHistory = ({
    commit
}, payload) => {
    commit('APPEND_SCHOOL_HISTORY', payload);
};

export const appendCertification = ({
    commit
}, payload) => {
    commit('APPEND_CERTIFICATION', payload);
};

export const appendGuarantor = ({
    commit
}, payload) => {
    commit('APPEND_GUARANTOR', payload);
};

export const appendReferee = ({
    commit
}, payload) => {
    commit('APPEND_REFEREE', payload);
}
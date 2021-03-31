<template>
  <span>
    <PageProcessing />
    <PageLoadingOverlay />
    <AddWorkHistoryModal />
    <AddSchoolHistoryModal />
    <AddCertificationModal />
    <AddGuarantorModal />
    <MakePaymentModal />
    <SelectPaymentOption />
    <DebitCreditCardModal />
    <ForeignBankTransferModal />
    <BankTransferModal />
    <PaymentFormModal />
    <UploadEvidenceFormModal />
    <AddRefereeModal />
    <CommingSoon />
    <AddBvnModal />
    <LogoutModal />
  </span>
</template>

<script>
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import PageProcessing from "../components/loaders/PageProcessing";
import MakePaymentModal from "../components/modals/payments/MakePaymentModal";
import SelectPaymentOption from "../components/modals/payments/SelectPaymentOption";
import DebitCreditCardModal from "../components/modals/payments/DebitCreditCardModal";
import BankTransferModal from "../components/modals/payments/BankTransferModal";
import ForeignBankTransferModal from "../components/modals/payments/ForeignBankTransferModal";
import AddBvnModal from "../components/modals/payments/AddBvnModal";
import PaymentFormModal from "../components/modals/payments/PaymentFormModal";
import UploadEvidenceFormModal from "../components/modals/payments/UploadEvidenceFormModal";
import CommingSoon from "../components/modals/comming-soon/CommingSoon";
import LogoutModal from "../components/modals/LogoutModal";
import AddWorkHistoryModal from "../components/modals/work/AddWorkHistoryModal";
import AddSchoolHistoryModal from "../components/modals/school/AddSchoolHistoryModal";
import AddCertificationModal from "../components/modals/certificate/AddCertificationModal";
import AddGuarantorModal from "../components/modals/guarantor/AddGuarantorModal";
import AddRefereeModal from "../components/modals/referee/AddRefereeModal";

export default {
  components: {
    PageProcessing,
    PageLoadingOverlay,
    MakePaymentModal,
    SelectPaymentOption,
    DebitCreditCardModal,
    ForeignBankTransferModal,
    BankTransferModal,
    AddBvnModal,
    PaymentFormModal,
    UploadEvidenceFormModal,
    AddWorkHistoryModal,
    AddSchoolHistoryModal,
    AddCertificationModal,
    AddGuarantorModal,
    AddRefereeModal,
    CommingSoon,
    LogoutModal
  }
};
</script>

<style>
</style>

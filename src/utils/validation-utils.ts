import { errors_message } from '@/constants/errors_constants';
import { notify } from '@/(layout)/v1/ToasterComponent';
interface ValidationRules {
  name: RegExp;
  email: RegExp;
  mobile: RegExp;
}

const validationRules: ValidationRules = {
  name: /^[a-zA-Z ]{2,32}$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /^[0-9]{10}$/,
};

class FormValidator {
  formError: string | null = null;
  country: string | null = null;

  validName(name: string): boolean {
    return validationRules.name.test(name);
  }

  validateName(name: string): boolean {
    this.formError = null;
    if (!name) {
      // this.formError = "Name Required";
      this.formError = errors_message?.NAME_REQUIRED;
      notify(this.formError, 'error');
      return false;
    } else if (!this.validName(name)) {
      // this.formError = "Name should have minimum 2 and maximum 32 characters";
      this.formError = errors_message?.NAME_SHOULD_HAVE_MINIMUM_2_AND_MAXIMUM_32_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validEmail(email: string): boolean {
    return validationRules.email.test(String(email).toLowerCase());
  }

  validateEmail(email: string): boolean {
    this.formError = null;
    if (!email) {
      // this.formError = "Please fill out this field";
      this.formError = errors_message?.PLEASE_FILL_OUT_THIS_FIELD;
      notify(this.formError, 'error');
      return false;
    } else if (!this.validEmail(email)) {
      // this.formError = "Please enter a valid email address";
      this.formError = errors_message?.PLEASE_ENTER_A_VALID_EMAIL_ADDRESS;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validateCountryCode(): boolean {
    this.formError = null;
    if (!this.country) {
      // this.formError = "The Country code could not be fetched! Please try again after sometime";
      this.formError = errors_message?.THE_COUNTRY_CODE_COULD_NOT_BE_FETCHED_PLEASE_TRY_AGAIN_AFTER_SOMETIME;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validateMobileno(mobile: string): boolean {    
    this.formError = null;
    if (!mobile) {
      // this.formError = "Please fill out this field";
      this.formError = errors_message?.PLEASE_FILL_OUT_THIS_FIELD;
      // toast.error(this.formError, { duration: 4000, position: 'bottom-center' });
      // this.formError = "Mobileno Required";
      notify(this.formError, 'error');
      return false;
    } else if (mobile.length < 8) {
      // this.formError = "Please enter a valid mobile number";
      this.formError = errors_message?.PLEASE_ENTER_A_VALID_MOBILE_NUMBER;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validMobile(mobile: string): boolean {
    return validationRules.mobile.test(mobile);
  }

  validateMobile(mobile: string): boolean {     
    this.formError = null;
    if (!mobile) {
      // this.formError = "Mobile Number Required";
      this.formError = errors_message?.MOBILE_NUMBER_REQUIRED;
      notify(this.formError, 'error');
      return false;
    } else if (!this.validMobile(mobile)) {
      // this.formError = "Please enter a valid mobile number";
      this.formError = errors_message?.PLEASE_ENTER_A_VALID_MOBILE_NUMBER;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validateEmailOrMobile(userInput: string): boolean {
    this.formError = null;
    if (!userInput) {
      // this.formError = "Email or Mobile required";
      this.formError = errors_message?.EMAIL_OR_MOBILE_NUMBER_REQUIRED;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validatePassword(password: string): boolean {    
    this.formError = null;
    if (!password) {
      // this.formError = "Password Required!";
      this.formError = errors_message?.PASSWORD_REQUIRED;
      notify(this.formError, 'error');
      return false;
    } else if (password.length < 6) {
      // this.formError = "Password should be minimum 6 characters";
      this.formError = errors_message?.PASSWORD_SHOULD_BE_MINIMUM_6_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    } else if (password.length > 16) {
      // this.formError = "Password should be maximum 16 characters";
      this.formError = errors_message?.PASSWORD_SHOULD_BE_MAXIMUM_16_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validateTicketTitle(title:string, message:string) {
    this.formError = null;
    if(!title) {
      this.formError = "Title should be not empty!";
      notify(this.formError, 'error');
      return false;
    } else if(title.length <= 5 ||  title.length >= 100) {
      // this.formError = "Title should be minimum 5 and maximum 100 characters";
      this.formError = errors_message?.TITLE_SHOULD_BE_MINIMUM_FIVE_AND_MAXIMUM_HUNDRED_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    }

    if(!message) {
      // this.formError = "Message should be not empty!";
      this.formError = errors_message?.MESSAGE_SHOULDNT_BE_EMPTY;
      notify(this.formError, 'error');
      return false;
    }
   
    if(message.length < 10 || message.length > 256) {
      // this.formError = "Message should be minimum 10 and maximum 256 characters";
      this.formError = errors_message?.MESSAGE_SHOULD_BE_MINIMUM_TEN_AND_MAXIMUM_TWOFIFTYSIX_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }

  validateNewPass(otp:string, newPasswordEnter:any) {
    
    this.formError = null;
    if(!otp || otp == "NaN") {
      // this.formError = "OTP should be not empty!";
      this.formError = errors_message?.OTP_SHOULD_NOT_EMPTY;
      notify(this.formError, 'error');
      return false;
    } else if(otp.length < 6) {
      // this.formError = "Please Enter Valid OTP";
      this.formError = errors_message?.PLEASE_ENTER_VALID_OTP;
      notify(this.formError, 'error');
      return false;
    }

    if(!newPasswordEnter) {
      this.formError = errors_message?.ENTER_NEW_PASSWORD;
      // this.formError = "Enter new password!";
      notify(this.formError, 'error');
      return false;
    }
   
    if(newPasswordEnter.length < 6 || newPasswordEnter.length > 15) {
      // this.formError = "New Password should be minimum 6 and maximum 15 characters";
      this.formError = errors_message?.NEW_PASSWORD_SHOULD_BE_MINIMUM_SIX_AND_MAXIMUM_FIFTEEN_CHARACTERS;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }
  
  validateOTP(otp:any): boolean{ 
    this.formError = null;
    if(otp.length == 0){       
      // this.formError = "OTP required";
      this.formError = errors_message?.OTP_REQUIRED;
      notify(this.formError, 'error');
      return false;
    }else if(otp.length < 6){
      // this.formError = "OTP should be 6 digit";
      this.formError = errors_message?.OPT_SHOULD_BE_6_DIGIT;
      // toast.error(this.formError, { duration: 4000, position: 'bottom-center' });
      notify(this.formError, 'error');
      return false;
    }
    return true
  }

  validateUpdateProfile(name:string) {
    this.formError = null;
    if(!name) {
      // this.formError = "Name should be not empty!";
      this.formError = errors_message?.NAME_SHOULD_NOT_EMPTY;
      notify(this.formError, 'error');
      return false;
    } else if(name.length <= 3) {
      // this.formError = "Name should be minimum 3 characters";
      this.formError = errors_message?.NAME_SHOULD_MIN_THREE_CHAR;
      notify(this.formError, 'error');
      return false;
    }

    return true;
  }
  validateNewOtp(otp:string) {
    
    this.formError = null;
    if(!otp || otp == "NaN") {
      // this.formError = "OTP should be not empty!";
      this.formError = errors_message?.OTP_SHOULD_NOT_EMPTY;
      notify(this.formError, 'error');
      return false;
    } else if(otp.length < 6) {
      // this.formError = "Please Enter 6 digit OTP";
      this.formError = errors_message?.ENTER_6_DIGIT_OTP;
      notify(this.formError, 'error');
      return false;
    }
    return true;
  }
}

export default FormValidator;

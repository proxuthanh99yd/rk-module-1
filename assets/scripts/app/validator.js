export default function Validate(formSelector) {
    function getParent(thisElement, parentElement) {
        while (true) {
            if (thisElement.parentElement.matches(parentElement)) {
                return thisElement.parentElement;
            }
            thisElement = thisElement.parentElement;
        }
    }
    const formRules = {};
    const validatorRules = {
        required(value) {
            return value ? undefined : 'This field required '
        },
        password(value) {
            const pwd = document.querySelector(`${formSelector} input[name="password"]`).value
            if (pwd) {
                return value === pwd ? undefined : `mat khau nhap lai k dung`
            } else {
                return validatorRules.required(value);
            }
        },
        email(value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Email is required';
        },
        min(min) {
            return (value) =>
                value.length >= min ? undefined : `'Vui long nhap it nhat ${min} ki tu`
        },
        max(max) {
            return (value) =>
                value.length <= max ? undefined : `'nhap toi da ${min} ki tu`
        },
    }

    const formElement = document.querySelector(formSelector);

    if (formElement) {

        const inputs = formElement.querySelectorAll('[name][rule]');
        for (const input of inputs) {

            const rules = input.getAttribute('rule').split('|')

            for (let rule of rules) {

                let ruleFunc = validatorRules[rule]

                if (rule.includes(':')) {
                    const ruleInfo = rule.split(':')
                    ruleFunc = validatorRules[ruleInfo[0]](ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            input.onblur = handelValidate;
            input.oninput = handelClearErr;
        }
    }

    formElement.onsubmit = (e) => {
        e.preventDefault();

        const inputs = formElement.querySelectorAll('[name][rule]');
        let isValid = true;

        for (const input of inputs) {
            if (!handelValidate({ target: input })) isValid = false;
        }

        if (isValid) {
            if (this.onSubmit) {
                const enableInputs = formElement.querySelectorAll('[name]');
                const formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }

                    return values;
                }, {});

                this.onSubmit(formValues);
            }
        }
    }
    function handelValidate(e) {
        const rules = formRules[e.target.name];
        let errMsg;
        for (const rule of rules) {
            errMsg = rule(e.target.value)
        }

        if (errMsg) {
            const formGroup = getParent(e.target, '.form-group');
            if (formGroup) {
                formGroup.classList.add('invalid')
                const formMsg = formGroup.querySelector('.form-message');
                if (formMsg) formMsg.innerText = errMsg;


            }
        }
        return !errMsg;
    }

    function handelClearErr(e) {
        const formGroup = getParent(e.target, '.form-group');
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid')
            const formMsg = formGroup.querySelector('.form-message');
            if (formMsg) formMsg.innerText = '';

        }
    }
}
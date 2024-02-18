import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules/dist/vee-validate-rules";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(AllRules).forEach((rule: any) => {
    // @ts-ignore
    defineRule(rule, AllRules[rule]);
  });
  defineRule("required", (value: Maybe<string | number>) => {
    if (value) {
      return true;
    }
    return "This field is required";
  });
  defineRule('numeric',(value: Maybe<string>) => {
    return value && /^\d+(?:\.\d+)?$/.test(value) ? true : 'This field must be a number'
  })
});

import type { Invoice } from "~/types/invoice";

export const getAllInvoices: ApiFunction = () => {
  return {
    url: "invoices",
    key: "invoices",
  };
};

export const getInvoice: ApiFunction = (requestPayload) => {
  return {
    url: `invoices/${requestPayload!.id}`,
    key: `invoice${requestPayload!.id}`,
  };
};

export const addInvoice: ApiFunction<{ data: Invoice }> = (requestPayload) => {
  return {
    url: "/invoices",
    method: "POST",
    data: requestPayload?.data,
  };
};

export const editInvoice: ApiFunction<{ data: Invoice }> = (requestPayload) => {
  return {
    url: `/invoices/${requestPayload?.data?.id}`,
    method: "PUT",
    data: requestPayload?.data,
  };
};

export const deleteInvoice: ApiFunction = (requestPayload) => {
  return {
    url: `/invoices/${requestPayload!.id}`,
    method: "DELETE",
  };
};

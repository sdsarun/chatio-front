const isProduction: boolean = process.env.NODE_ENV === "production";
const isDevelopment: boolean = process.env.NODE_ENV === "development";
const isTest: boolean = process.env.NODE_ENV === "test";

export { isProduction, isDevelopment, isTest };
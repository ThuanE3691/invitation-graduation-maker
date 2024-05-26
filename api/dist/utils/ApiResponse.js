"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateErrorApiResponse = exports.CreateSuccessApiResponse = void 0;
const CreateSuccessApiResponse = (data) => {
    return {
        success: true,
        data: data,
        error: null,
    };
};
exports.CreateSuccessApiResponse = CreateSuccessApiResponse;
const CreateErrorApiResponse = (error) => {
    return {
        success: false,
        error: error,
    };
};
exports.CreateErrorApiResponse = CreateErrorApiResponse;

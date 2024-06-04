import React from 'react';


function add(a, b) {
    return String(Number(a) + Number(b));
}

function subtract(a, b) {
    return String(Number(a) - Number(b));
}

function divide(a,b) {
    return String(Number(a) / Number(b));
}

function multiplication(a,b) {
    return String(Number(a) * Number(b));
}

export {add, subtract, divide, multiplication}

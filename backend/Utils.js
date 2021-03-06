"use strict";

const isUndefined = obj => (typeof obj == "undefined") || (obj == null);

const isObject = obj => typeof obj == "object";

/*
 * Reason for checking isObject is sometimes javascript misbehaves by throwing error for checking Array.isArray for "undefined"
 */
const isArray = Array.isArray;

/*
 * This function will take string and try to force parse it with several functionalities which listed below
 *  1) JSON.parse
 *  2) eval
 */
const forceParseJSON = str => {
	if (typeof str != "string") {
		throw (new Error("Can't parse variable with data type other than string"));
	}
	try {
		return JSON.parse(str);
	} catch (err) {
		try {
			return eval('(' + str + ')');
		} catch (err) {
			return eval(str);
		}
	}
}

/*
 * This function is used as a constructor for representing Success
 */
function Success(message) {
	this.message = message;
	this.toString = function() {
		return this.message;
	}
}

/*
 * This function will take a message and check whether it is Error or normal message
 * If it is instance of Error. Then it will return message from the error
 * orElse it will return that message itself
 */
const extractError = err => {
	if (err instanceof Error) {
		return err.message;
	}
	return err;
}

/*
 * This function will take a message and check whether it is instance of Error or not
 * If it is has instance as Error . it will simply return . orElse it will convert to Error and return
 */
const convertToError = err => {
	if (err instanceof Error) {
		return err;
	}
	return (new Error(err));
}

/*
 * This function will check whether the data feed to the function is object or not.
 * If it is object . It will simply return . orElse it will try to hard parse and return final response
 */
const convertObject = obj => {
	if (isObject(obj)) {
		return obj;
	}
	forceParseJSON(obj);
}

/*
 * This function check whether any one key is present object or not.
 * If it presents . it will return the key orElse it will return null value
 */
const getFirst = (obj, keys) => {
	for (let index in keys) {
		if (obj.hasOwnProperty(keys[index])) {
			return keys[index];
		}
	}
}


// Exports from this module
exports.isUndefined = isUndefined;
exports.isObject = isObject;
exports.isArray = isArray;
exports.forceParseJSON = forceParseJSON;
exports.Success = Success;
exports.extractError = extractError;
exports.convertToError = convertToError;
exports.convertObject = convertObject;
exports.getFirst = getFirst;
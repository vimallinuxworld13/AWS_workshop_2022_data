"use strict";
const AWS = require("aws-sdk");
const ses = new AWS.SES();

module.exports.createContact = async (event, context) => {
  console.log("Received:::", event);
  const { to, from, subject, message } = JSON.parse(event.body);

  if (!to || !from || !subject || !message) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify({ message: " to or from... are not set properly!" }),
    };
  }
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };
  try {
    await ses.sendEmail(params).promise();
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        message: "email sent successfully!",
        success: true,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify({
        message: "The email failed to send",
        success: true,
      }),
    };
  }
};

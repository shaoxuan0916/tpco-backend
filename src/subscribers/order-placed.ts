import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";

// import express, { Request, Response } from "express";
// import { Resend } from "resend";

const nodemailer = require("nodemailer");

export default async function handleOrderPlaced({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const sendGridService = container.resolve("sendgridService");
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, {
    // you can include other relations as well
    relations: ["items"],
  });

  // ------------- Nodemailer ------------------
  // Create a transporter using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shaoxuandev10@gmail.com", // Your Gmail address
      pass: "jklw oqkq wzau pxhp", // Your Gmail app password
    },
  });

  // Email options
  const mailOptions = {
    from: "shaoxuandev10@gmail.com", // sender address
    to: `${order.email}`, // list of receivers
    subject: "Hello world", // Subject line
    text: "Hello world? nodemailer", // plain text body
    html: "<b>Hello world? nodemailer</b>", // HTML body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("nodemailer error", error);
    }
    console.log("Message sent: %s", info.messageId);
  });

  // ------------- Sendgrid ------------------
  try {
    await sendGridService.sendEmail({
      templateId: "d-6a5267b599a34291b06288209bdaf1c0",
      from: "shaoxuandev10@gmail.com",
      to: order.email,
      dynamic_template_data: {
        // any data necessary for your template...
        items: order.items,
        status: order.status,
      },
    });

    console.log("email sent!");
  } catch (error) {
    console.log("email not sent :(", error);
  }
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};

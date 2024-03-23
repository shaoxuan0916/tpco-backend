import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";
import { render } from "@react-email/render";
import { ParcelShippedEmailer } from "../emailer/ParcelShippedEmailer";

const nodemailer = require("nodemailer");

export default async function handleParcelShipped({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, {
    // you can include other relations as well
    relations: ["fulfillments", "customer", "shipping_address", "items"],
  });

  // ------------- Nodemailer ------------------

  // Create a transporter using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    // TODO: update TPCO customer service gmail, and also update ENV on railway
    auth: {
      user: process.env.EMAIL_SEND_FROM, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Your Gmail app password
    },
  });

  const emailHtml = render(ParcelShippedEmailer({ order: order }));

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_SEND_FROM, // sender address
    to: `${order.email}`, // list of receivers
    subject: `Order #${order.display_id} Shipped | The Parent Company`, // Subject line
    html: emailHtml, // HTML body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("nodemailer error", error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}

export const config: SubscriberConfig = {
  // event: OrderService.Events.FULFILLMENT_CREATED,
  event: OrderService.Events.SHIPMENT_CREATED,
  context: {
    subscriberId: "parcel-shipped-handler",
  },
};

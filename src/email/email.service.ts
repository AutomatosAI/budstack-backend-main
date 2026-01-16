import { Injectable, Logger } from "@nestjs/common";
import { configData } from "src/config";
import * as SendGrid from "@sendgrid/mail";
import { CONSTANT } from "src/constants";
import { ConfigService } from "@nestjs/config";
import { emailTemplates } from "./email-templates";
import { Role } from "@prisma/client";

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  config = configData(this.configService);
  private readonly logger = new Logger();

  async sendEmail({
    data,
    subject,
    mail_type,
    to_user,
    from_user = null,
    userType,
  }) {
    try {
      from_user = from_user ? from_user : this.config.ADMIN_EMAIL;
      const template = this.templateGenerator(
        to_user,
        from_user,
        data.path,
        data.payload,
        mail_type,
        userType
      );
      SendGrid.setApiKey(this.config.SENDGRID_API_KEY);
      const msg = {
        to: to_user.email,
        from: this.config.ADMIN_EMAIL,
        subject: subject,
        html: template,
        trackingSettings: {
          clickTracking: { enable: false },
          // openTracking: { enable: false },
        },
      };
      return await SendGrid.send(msg);
    } catch (error) {
      this.logger.log(error.response);
      throw error;
    }
  }

  templateGenerator(
    to_user,
    from_user,
    path,
    payload,
    mail_type: string,
    userType: Role
  ) {
    let template = "";
    if (mail_type == CONSTANT.MAIL_TYPE.VERIFICATION_INVITE) {
      template = `<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:v="urn:schemas-microsoft-com:vml">
      
      <head>
          <title></title>
          <!--[if !mso]><!-->
          <meta content="IE=edge" http-equiv="X-UA-Compatible">
          <!--<![endif]-->
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
          <!--[if lte mso 11]>
        <style type="text/css" data-inliner="ignore">
        .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
          <!--[if !mso]><!--><!--<![endif]-->
          <style>
              a:link {
                  color: #222427;
                  font-weight: 400;
                  text-decoration: none;
                  font-style: normal;
              }
      
              a:visited {
                  color: #222427;
                  font-weight: 400;
                  text-decoration: none;
                  font-style: normal;
              }
      
              a:active {
                  color: #222427;
                  font-weight: 400;
                  text-decoration: none;
                  font-style: normal;
              }
      
              a:hover {
                  color: #222427;
                  font-weight: 400;
                  text-decoration: none;
                  font-style: normal;
              }
          </style>
          <style>
              @media only screen and (min-width: 480px) {
                  .mj-column-per-100 {
                      width: 100% !important;
                      max-width: 100%;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  div.kl-row.colstack div.kl-column {
                      display: block !important;
                      width: 100% !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  .hlb-wrapper .hlb-block-settings-content {
                      padding: 9px !important;
                  }
      
                  .hlb-logo {
                      padding-bottom: 9px !important;
                  }
      
                  .r2-tbl {
                      width: 100%;
                  }
      
                  .r2-tbl .lnk {
                      width: 100%;
                  }
      
                  .r2-tbl .hlb-subblk:last-child {
                      padding-right: 0 !important;
                  }
      
                  .r2-tbl .hlb-subblk {
                      padding-right: 10px !important;
                  }
      
                  .kl-hlb-stack {
                      display: block !important;
                      width: 100% !important;
                      padding-right: 0 !important;
                  }
      
                  .kl-hlb-stack.vspc {
                      margin-bottom: 9px;
                  }
      
                  .kl-hlb-wrap {
                      display: inline-block !important;
                      width: auto !important;
                  }
      
                  .kl-hlb-no-wrap {
                      display: table-cell !important;
                  }
      
                  .kl-hlb-wrap.nospc.nospc {
                      padding-right: 0 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  .component-wrapper .mob-no-spc {
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  td.kl-img-base-auto-width {
                      width: 100% !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  .kl-text {
                      padding-right: 18px !important;
                      padding-left: 18px !important;
                  }
              }
      
              @media screen and (max-width: 480px) {
                  .kl-sl-stk {
                      display: block !important;
                      width: 100% !important;
                      padding: 0 0 9px !important;
                      text-align: center !important;
                  }
      
                  .kl-sl-stk.lbls {
                      padding: 0 !important;
                  }
      
                  .kl-sl-stk.spcblk {
                      display: none !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  td.mobile-only {
                      display: table-cell !important;
                  }
      
                  div.mobile-only {
                      display: block !important;
                  }
      
                  table.mobile-only {
                      display: table !important;
                  }
      
                  .desktop-only {
                      display: none !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  .table-mobile-only {
                      display: table-cell !important;
                      max-height: none !important;
                  }
      
                  .table-mobile-only.block {
                      display: block !important;
                  }
      
                  .table-mobile-only.inline-block {
                      display: inline-block !important;
                  }
      
                  .table-desktop-only {
                      max-height: 0 !important;
                      display: none !important;
                      mso-hide: all !important;
                      overflow: hidden !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
      
                  body.mce-content-body,
                  .kl-text>div,
                  .kl-table-subblock div,
                  .kl-split-subblock>div {
                      font-size: 14px !important;
                      line-height: 1.3 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  h1 {
                      font-size: 40px !important;
                      line-height: 1.1 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  h2 {
                      font-size: 32px !important;
                      line-height: 1.1 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  h3 {
                      font-size: 24px !important;
                      line-height: 1.1 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  h4 {
                      font-size: 18px !important;
                      line-height: 1.1 !important;
                  }
              }
      
              @media only screen and (max-width: 480px) {
                  .root-container {
                      width: 100% !important;
                  }
      
                  .root-container-spacing {
                      padding: 10px !important;
                  }
      
                  .content-padding {
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                  }
      
                  .content-padding.first {
                      padding-top: 0 !important;
                  }
      
                  .content-padding.last {
                      padding-bottom: 0 !important;
                  }
      
                  .component-wrapper {
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                  }
              }
          </style>
      </head>
      
      <body
          style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; word-spacing: normal; background-color: #FFFFFF;">
          <div class="root-container" id="bodyTable"
              style="background-color: #FFFFFF; background-repeat: repeat; background-size: auto; background-position: left top;">
              <div class="root-container-spacing" style="padding-top: 50px; padding-bottom: 20px; font-size: 0;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation"
                      style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
                      <tbody>
                          <tr>
                              <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
                                  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                                  <div style="margin:0px auto;max-width:600px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                          width="100%">
                                          <tbody>
                                              <tr>
                                                  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; direction: ltr; font-size: 0px; padding: 0px; text-align: center;"
                                                      align="center">
                                                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                                                      <div
                                                          style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
                                                          <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                              role="presentation"
                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background: #FFFFFF; background-color: #FFFFFF; width: 100%; border-radius: 0px 0px 0px 0px;"
                                                              width="100%" bgcolor="#FFFFFF">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center;"
                                                                          align="center">
                                                                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
                                                                          <div class="content-padding first last"
                                                                              style="padding-left: 0; padding-right: 0; padding-top: 0; padding-bottom: 0;">
                                                                              <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
                                                                              <div class="kl-row colstack"
                                                                                  style="display:table;table-layout:fixed;width:100%;">
                                                                                  <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
                                                                                  <div class="kl-column"
                                                                                      style="display:table-cell;vertical-align:top;width:100%;">
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class="hlb-block-settings-content"
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 12px; padding-right: 179px; padding-bottom: 12px; padding-left: 179px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="top"
                                                                                                                          class="kl-header-link-bar"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px 0px 0px 0px; word-break: break-word;">
                                                                                                                          <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: 0;"
                                                                                                                              width="100%">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td align="center"
                                                                                                                                          class="hlb-logo"
                                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; display: table-cell; width: 100%; padding-bottom: 0px;"
                                                                                                                                          width="100%">
                                                                                                                                          <table
                                                                                                                                              border="0"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
                                                                                                                                              <tbody>
                                                                                                                                                  <tr>
                                                                                                                                                      <!--[if true]><td style="width:600px;" bgcolor="transparent"><![endif]-->
                                                                                                                                                      <!--[if !true]><!-->
                                                                                                                                                      <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 600px;"
                                                                                                                                                          width="600">
                                                                                                                                                          <!--<![endif]-->
                                                                                                                                                          <a href="https://drgreennft.com/"
                                                                                                                                                              style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                                              target="_blank">
                                                                                                                                                              <img src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png"
                                                                                                                                                                  style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; width: 100%; background-color: transparent;"
                                                                                                                                                                  width="600"
                                                                                                                                                                  height="auto">
                                                                                                                                                          </a>
                                                                                                                                                      </td>
                                                                                                                                                  </tr>
                                                                                                                                              </tbody>
                                                                                                                                          </table>
                                                                                                                                      </td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class="hlb-block-settings-content"
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="top"
                                                                                                                          class="kl-header-link-bar"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px 0px 0px 0px; word-break: break-word;">
                                                                                                                          <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: 0;"
                                                                                                                              width="100%">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td
                                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
                                                                                                                                          <table
                                                                                                                                              align="center"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              class="r2-tbl"
                                                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed;"
                                                                                                                                              width="100%">
                                                                                                                                              <tr
                                                                                                                                                  style="text-align:center;">
                                                                                                                                                  <td align="center"
                                                                                                                                                      class="kl-hlb-stack block vspc hlb-subblk"
                                                                                                                                                      style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                                                                      valign="middle">
                                                                                                                                                      <table
                                                                                                                                                          border="0"
                                                                                                                                                          cellpadding="0"
                                                                                                                                                          cellspacing="0"
                                                                                                                                                          class="lnk"
                                                                                                                                                          style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
                                                                                                                                                          <tr>
                                                                                                                                                              <td align="center"
                                                                                                                                                                  bgcolor="transparent"
                                                                                                                                                                  role="presentation"
                                                                                                                                                                  style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;"
                                                                                                                                                                  valign="middle">
                                                                                                                                                                  <a href="https://drgreennft.com/about-us"
                                                                                                                                                                      style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px"
                                                                                                                                                                      target="_blank">
                                                                                                                                                                      ABOUT
                                                                                                                                                                      US
                                                                                                                                                                  </a>
                                                                                                                                                              </td>
                                                                                                                                                          </tr>
                                                                                                                                                      </table>
                                                                                                                                                  </td>
                                                                                                                                                  <td align="center"
                                                                                                                                                      class="kl-hlb-stack block vspc hlb-subblk"
                                                                                                                                                      style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                                                                      valign="middle">
                                                                                                                                                      <table
                                                                                                                                                          border="0"
                                                                                                                                                          cellpadding="0"
                                                                                                                                                          cellspacing="0"
                                                                                                                                                          class="lnk"
                                                                                                                                                          style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
                                                                                                                                                          <tr>
                                                                                                                                                              <td align="center"
                                                                                                                                                                  bgcolor="transparent"
                                                                                                                                                                  role="presentation"
                                                                                                                                                                  style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;"
                                                                                                                                                                  valign="middle">
                                                                                                                                                                  <a href="https://marketplace.drgreennft.com/"
                                                                                                                                                                      style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px"
                                                                                                                                                                      target="_blank">
                                                                                                                                                                      DIGITAL
                                                                                                                                                                      KEY
                                                                                                                                                                  </a>
                                                                                                                                                              </td>
                                                                                                                                                          </tr>
                                                                                                                                                      </table>
                                                                                                                                                  </td>
                                                                                                                                                  <td align="center"
                                                                                                                                                      class="kl-hlb-stack block hlb-subblk"
                                                                                                                                                      style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                                                                      valign="middle">
                                                                                                                                                      <table
                                                                                                                                                          border="0"
                                                                                                                                                          cellpadding="0"
                                                                                                                                                          cellspacing="0"
                                                                                                                                                          class="lnk"
                                                                                                                                                          style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
                                                                                                                                                          <tr>
                                                                                                                                                              <td align="center"
                                                                                                                                                                  bgcolor="transparent"
                                                                                                                                                                  role="presentation"
                                                                                                                                                                  style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;"
                                                                                                                                                                  valign="middle">
                                                                                                                                                                  <a href="https://drgreennft.com/contact"
                                                                                                                                                                      style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px"
                                                                                                                                                                      target="_blank">
                                                                                                                                                                      CONTACT
                                                                                                                                                                      US
                                                                                                                                                                  </a>
                                                                                                                                                              </td>
                                                                                                                                                          </tr>
                                                                                                                                                      </table>
                                                                                                                                                  </td>
                                                                                                                                              </tr>
                                                                                                                                          </table>
                                                                                                                                      </td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="center"
                                                                                                                          class="kl-image"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; word-break: break-word;">
                                                                                                                          <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td class="kl-img-base-auto-width"
                                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border: solid 1px #262626; padding: 1px 1px 1px 1px; background-color: #262626; width: 596px;"
                                                                                                                                          valign="top"
                                                                                                                                          width="596"
                                                                                                                                          bgcolor="#262626">
                                                                                                                                          <table
                                                                                                                                              border="0"
                                                                                                                                              cellpadding="0"
                                                                                                                                              cellspacing="0"
                                                                                                                                              style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
                                                                                                                                              <tbody>
                                                                                                                                                  <tr>
                                                                                                                                                      <td valign="top"
                                                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
                                                                                                                                                          <a href="https://drgreennft.com/"
                                                                                                                                                              style="color:#222427; font-style:normal; font-weight:400; text-decoration:none">
                                                                                                                                                              <img src="${CONSTANT.DR_GREEN_WELCOME_IMAGE_URL}"
                                                                                                                                                                  style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; font-size: 13px; width: 100%;"
                                                                                                                                                                  width="596"
                                                                                                                                                                  height="auto">
                                                                                                                                                          </a>
                                                                                                                                                      </td>
                                                                                                                                                  </tr>
                                                                                                                                              </tbody>
                                                                                                                                          </table>
                                                                                                                                      </td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="left"
                                                                                                                          class="kl-text"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                          <div
                                                                                                                              style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                              <div
                                                                                                                                  style="text-align: center;">
                                                                                                                                  <span
                                                                                                                                      style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                      <span
                                                                                                                                          style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                      </span>
                                                                                                                                      <span
                                                                                                                                          style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Hi
                                                                                                                                          <span>${to_user.username}</span></span>
                                                                                                                                  </span>
                                                                                                                              </div>
                                                                                                                              <div
                                                                                                                                  style="text-align: center;  margin: 15px 0;">
                                                                                                                                  <span
                                                                                                                                      style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                      <span
                                                                                                                                          style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Welcome
                                                                                                                                          to
                                                                                                                                          the
                                                                                                                                          Dr.
                                                                                                                                          Green
                                                                                                                                          community
                                                                                                                                          and
                                                                                                                                          thank
                                                                                                                                          you
                                                                                                                                          for
                                                                                                                                          setting
                                                                                                                                          up
                                                                                                                                          your
                                                                                                                                          account.
                                                                                                                                          We wanted to take a moment to extend
                                                                                                                                          a warm welcome. This email is for verify your email</span>
                                                                                                                                  </span>
                                                                                                                              </div>
                                                                                                                          </div>
                                                                                                                          <div
                                                                                                                              style="text-align: center;">
                                                                                                                              <span
                                                                                                                                  style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                  <span
                                                                                                                                      style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                      <a style="text-decoration: none; display: inline-block; width: 147px; font-family: Kanit; font-weight: 400; font-size: 1rem; color: #0aba90; line-height: 24px; letter-spacing: 3px; text-transform: uppercase; transition: all 0.3s ease-in-out; border: solid 1px #0aba90; border-radius: 8px; padding: 16px 24px;"
                                                                                                                                          href=${this.config.FRONTEND_URL}${path}?token=${payload}>Verify Email</a>
                                                                                                                                  </span>
                                                                                                                              </span>
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td align="left"
                                                                                                                          class="kl-text"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                          <div
                                                                                                                              style="text-align: center; margin: 15px 0;">
                                                                                                                              <span
                                                                                                                                  style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                  <span
                                                                                                                                      style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Alternatively,
                                                                                                                                      you
                                                                                                                                      can
                                                                                                                                      copy
                                                                                                                                      and
                                                                                                                                      paste
                                                                                                                                      the
                                                                                                                                      following
                                                                                                                                      URL
                                                                                                                                      into
                                                                                                                                      your
                                                                                                                                      web
                                                                                                                                      browser:</span>
                                                                                                                              </span>
                                                                                                                          </div>
                                                                                                                          <div
                                                                                                                              style="text-align: center;">
                                                                                                                              <a href=${this.config.FRONTEND_URL}${path}?token=${payload}
                                                                                                                                  style="color:#00B9B1; font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px; word-break: break-all;">
                                                                                                                                  ${this.config.FRONTEND_URL}${path}?token=${payload}
                                                                                                                              </a>
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
      
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 9px; padding-bottom: 9px; padding-left: 9px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
                                                                                                                          <div
                                                                                                                              style="width:100%;text-align:center">
                                                                                                                              <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;padding-right:10px;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://discord.com/invite/DrGreen"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="Custom"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/dec5697c-f302-4563-a8ff-7f19edfd89a1.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 48px;"
                                                                                                                                              width="48"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style=""><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://t.me/DrGreenNFTentry"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="Custom"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/21269dd6-e21b-4aa4-a424-307d8348b765.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 48px;"
                                                                                                                                              width="48"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if true]></tr></table><![endif]-->
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="left"
                                                                                                                          class="kl-text"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                          <div
                                                                                                                              style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                              <div
                                                                                                                                  style="text-align: center;">
                                                                                                                                  <span
                                                                                                                                      style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(255, 255, 255); font-size: 18px;">
                                                                                                                                      Visit
                                                                                                                                      our
                                                                                                                                      website
                                                                                                                                      and
                                                                                                                                      join
                                                                                                                                      our
                                                                                                                                      <span
                                                                                                                                          style="color: rgb(0, 185, 177);">Discord</span>
                                                                                                                                      and
                                                                                                                                      <span
                                                                                                                                          style="color: rgb(0, 185, 177);">Telegram</span>
                                                                                                                                      communities
                                                                                                                                      for
                                                                                                                                      more
                                                                                                                                      details.
                                                                                                                                  </span>
                                                                                                                              </div>
                                                                                                                              <div
                                                                                                                                  style="text-align: center;">
                                                                                                                              </div>
                                                                                                                              <div
                                                                                                                                  style="text-align: center;">
                                                                                                                                  <span
                                                                                                                                      style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(0, 185, 177); font-size: 18px;">
                                                                                                                                      Got
                                                                                                                                      any
                                                                                                                                      questions?
                                                                                                                                  </span>
                                                                                                                              </div>
                                                                                                                              <div
                                                                                                                                  style="text-align: center;">
                                                                                                                                  <span
                                                                                                                                      style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(255, 255, 255); font-size: 18px;">
                                                                                                                                      Please
                                                                                                                                      reach
                                                                                                                                      out
                                                                                                                                      to
                                                                                                                                      our
                                                                                                                                      admin
                                                                                                                                      team
                                                                                                                                  </span>
                                                                                                                              </div>
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; vertical-align: top; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td align="center"
                                                                                                                          class="kl-image"
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; word-break: break-word;">
                                                                                                                          <table
                                                                                                                              border="0"
                                                                                                                              cellpadding="0"
                                                                                                                              cellspacing="0"
                                                                                                                              style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
                                                                                                                              <tbody>
                                                                                                                                  <tr>
                                                                                                                                      <td class="kl-img-base-auto-width"
                                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border: 0; padding: 0px 0px 0px 0px; width: 600px;"
                                                                                                                                          valign="top"
                                                                                                                                          width="600">
                                                                                                                                          <a href="https://drgreennft.com/"
                                                                                                                                              style="color:#222427; font-style:normal; font-weight:400; text-decoration:none">
                                                                                                                                              <img src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/5508376d-70c8-4fbc-be4e-a25d15801e7f.png"
                                                                                                                                                  style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; font-size: 13px; width: 100%;"
                                                                                                                                                  width="600"
                                                                                                                                                  height="auto">
                                                                                                                                          </a>
                                                                                                                                      </td>
                                                                                                                                  </tr>
                                                                                                                              </tbody>
                                                                                                                          </table>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                      <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                                                                          style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
                                                                                          <table border="0" cellpadding="0"
                                                                                              cellspacing="0"
                                                                                              role="presentation"
                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"
                                                                                              width="100%">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td class
                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 9px; padding-bottom: 9px; padding-left: 9px;"
                                                                                                          bgcolor="#262626"
                                                                                                          valign="top">
                                                                                                          <table border="0"
                                                                                                              cellpadding="0"
                                                                                                              cellspacing="0"
                                                                                                              role="presentation"
                                                                                                              style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;"
                                                                                                              width="100%">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td
                                                                                                                          style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
                                                                                                                          <div
                                                                                                                              style="width:100%;text-align:center">
                                                                                                                              <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;padding-right:10px;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://www.facebook.com/drgreennftportugal"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="Facebook"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/facebook_96.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;"
                                                                                                                                              width="32"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;padding-right:10px;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://twitter.com/DrGreen_nft"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="Twitter"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/twitter_96.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;"
                                                                                                                                              width="32"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;padding-right:10px;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="${CONSTANT.SOCIAL_MEDIA_URLS.INSTAGRAM_URL}"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="Instagram"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;"
                                                                                                                                              width="32"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;padding-right:10px;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://www.linkedin.com/company/drgreennft"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="LinkedIn"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/linkedin_96.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;"
                                                                                                                                              width="32"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if !true]><!-->
                                                                                                                              <div class
                                                                                                                                  style="display:inline-block;">
                                                                                                                                  <!--<![endif]-->
                                                                                                                                  <!--[if true]><td style=""><![endif]-->
                                                                                                                                  <div
                                                                                                                                      style="text-align: center;">
                                                                                                                                      <a href="https://www.youtube.com/@DrGreen_NFT"
                                                                                                                                          style="color:#222427; font-style:normal; font-weight:400; text-decoration:none"
                                                                                                                                          target="_blank">
                                                                                                                                          <img alt="YouTube"
                                                                                                                                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/youtube_96.png"
                                                                                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;"
                                                                                                                                              width="32"
                                                                                                                                              height="auto">
                                                                                                                                      </a>
                                                                                                                                  </div>
                                                                                                                                  <!--[if true]></td><![endif]-->
                                                                                                                                  <!--[if !true]><!-->
                                                                                                                              </div>
                                                                                                                              <!--<![endif]-->
                                                                                                                              <!--[if true]></tr></table><![endif]-->
                                                                                                                          </div>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </div>
                                                                                  </div>
                                                                                  <!--[if true]></td><![endif]-->
                                                                              </div>
                                                                              <!--[if true]></tr></table><![endif]-->
                                                                          </div>
                                                                          <!--[if mso | IE]></table><![endif]-->
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </div>
                                                      <!--[if mso | IE]></td></tr></table></table><![endif]-->
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </body>
      
      </html>`;
    } else if (mail_type == CONSTANT.MAIL_TYPE.TWO_STEP_VERIFICATION) {
      template = `<div style="
      min-height: 474px;
      max-height: max-content;
      width: 676px;
      background: #10101c;
      color: rgb(255, 255, 255);
      border-radius: 8px;
      margin: auto;
    ">

      <div style=" padding: 40px;position: relative;">
          <div style="
          position: relative;
                  top: 20px;
                  text-align: center;
                  font-family: 'Poppins';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 30px;
                  line-height: 42px;
                ">
                Dr.Green
          </div>
          <div style="
          position: relative;
                  top: 50px;
                  font-family: 'Poppins';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 21px;
                  line-height: 30px;
                  padding-bottom: 20px;
                  text-align: center;
                  color: white
                ">
              <p>Hi <span>${to_user.username ? to_user.username : to_user.email}</span>,</p>

              <span>
                  <p>Please verify your identity by clicking the link in this email to complete the two-step verification process.</p>
                  <p>If you have
                      any questions or need
                      assistance, our support team is always available to help. Please reach out to
                      <a style="text-decoration: #10101c;" href="mailto:${this.config.SUPPORT_ADMIN_EMAIL}"><u>Dr.Green Support</u></a> for
                      any
                      issues.</p>
                  <p>Thank you for choosing Dr.Green </p>
                  <p>Best Regards,</p>
                  <p>Team Dr.Green</p>
              </span>
              <p>
                  <br> <a style="display: inline-block;
                              width: 147px;
                              padding: 10px 10px;
                              text-align: center;
                              text-decoration: none;
                              color: #ffffff;
                              background-color: #9E62FF;
                              border-radius: 5px;
                              outline: none;" href="${this.config.FRONTEND_URL}${path}?token=${payload}">Verify Email</a>
              </p></span>
          </div>
      </div>

  </div>`;
    } else if (mail_type == CONSTANT.MAIL_TYPE.SUBADMIN_OR_MANAGER_ABOARD) {
      const role = userType == Role.MANAGER ? "manager" : "sub admin";
      template = `<div style="
      min-height: 474px;
      max-height: max-content;
      width: 676px;
      background: #10101c;
      color: rgb(255, 255, 255);
      border-radius: 8px;
      margin: auto;
    ">

      <div style=" padding: 40px;position: relative;">
          <div style="
          position: relative;
                  top: 20px;
                  text-align: center;
                  font-family: 'Poppins';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 30px;
                  line-height: 42px;
                ">
                Dr.Green
          </div>
          <div style="
          position: relative;
                  top: 50px;
                  font-family: 'Poppins';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 21px;
                  line-height: 30px;
                  padding-bottom: 20px;
                  text-align: center;
                  color: white
                ">
              <p>Hi <span>${to_user.fullName ? to_user.fullName : to_user.email}</span>,</p>

              <span>
                  <p>Welcome aboard to the Dr.green platform. You are added as ${role} for this platform. Please use this wallet address ${payload} for signIn via Metamask.</p>
                  <p>If you have
                      any questions or need
                      assistance, our support team is always available to help. Please reach out to
                      <a style="text-decoration: #10101c;" href="mailto:${this.config.SUPPORT_ADMIN_EMAIL}"><u>Dr.Green Support</u></a> for
                      any
                      issues.</p>
                  <p>Thank you for choosing Dr.Green </p>
                  <p>Best Regards,</p>
                  <p>Team Dr.Green</p>
              </span>
              <p>
                  <br> <a style="display: inline-block;
                              width: 147px;
                              padding: 10px 10px;
                              text-align: center;
                              text-decoration: none;
                              color: #ffffff;
                              background-color: #9E62FF;
                              border-radius: 5px;
                              outline: none;" href="${this.config.FRONTEND_URL}${path}">Sign In</a>
              </p></span>
          </div>
      </div>

  </div>`;
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION) {
      template = emailTemplates.kycVerification(
        payload.userName,
        payload.verificationUrl,
        this.config.SUPPORT_ADMIN_EMAIL
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_PASSED) {
      template = emailTemplates.kycVerificationPassed(
        payload.userName,
        this.config.SUPPORT_ADMIN_EMAIL
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_FAILED) {
      template = emailTemplates.kycVerificationFailed(
        payload.firstName,
        this.config.SUPPORT_ADMIN_EMAIL
      );
    } else if (
      mail_type == CONSTANT.MAIL_TYPE.CLIENT_KYC_VERIFICATION_FAILED_REVIEW
    ) {
      template = emailTemplates.kycVerificationFailedReview(
        payload.customerName,
        payload.customerEmail
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_KYC_PROCESS_NOT_STARTED) {
      template = emailTemplates.kycVerificationStart(
        payload.firstName,
        payload.verificationUrl,
        this.config.SUPPORT_ADMIN_EMAIL
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_APPROVAL) {
      template = emailTemplates.orderApprovalEmail(
        payload.fullName,
        payload.clientId,
        payload.orderId,
        payload.orderDate,
        payload.addressLine1,
        payload.addressLine2,
        payload.city,
        payload.postCode,
        payload.country,
        payload.productName1,
        payload.product1Quantity,
        payload.productName2,
        payload.product2Quantity
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_INVOICE) {
      template = emailTemplates.orderInvoiceEmail(
        payload.orderId,
        payload.orderAmount,
        payload.tcnInvoiceUrl,
        payload.usdtInvoiceUrl,
        payload.ethInvoiceUrl,
        payload.btcInvoiceUrl,
        payload.fiatInvoiceUrl,
        this.config.SUPPORT_ADMIN_EMAIL
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_PAYMENT_RECEIVED) {
      template = emailTemplates.paymentReceivedEmail(
        payload.fullName,
        payload.clientId,
        payload.orderId,
        payload.orderDate,
        payload.addressLine1,
        payload.addressLine2,
        payload.city,
        payload.postCode,
        payload.country,
        payload.productName1,
        payload.product1Quantity,
        payload.productName2,
        payload.product2Quantity
      );
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_PLACED) {
      template = emailTemplates.orderPlacedEmail(payload.userName);
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_SHIPPED) {
      template = emailTemplates.orderShippedEmail(payload.userName);
    } else if (mail_type == CONSTANT.MAIL_TYPE.CLIENT_ORDER_DELIVERED) {
      template = emailTemplates.orderDeliveredEmail(payload.userName);
    }
    return template;
  }
}

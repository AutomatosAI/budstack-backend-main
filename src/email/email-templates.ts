import { CONSTANT } from "src/constants";

export const emailTemplates = {
  orderApprovalEmail: (
    fullName: string,
    clientId: string,
    orderId: string,
    orderDate: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postCode: string,
    country: string,
    productName1: string,
    product1Quantity: number,
    productName2: string,
    product2Quantity: number
  ) => `<!doctype html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>New Order Pending Verification - Order #[ORDER_NUMBER]</title>
    <!--[if !mso]><!-->
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <!--<![endif]-->
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css" data-inliner="ignore">
        .mj-outlook-group-fix {
          width: 100% !important;
        }
      </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <!--<![endif]-->
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
        .kl-text > div,
        .kl-table-subblock div,
        .kl-split-subblock > div {
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
    style="
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      word-spacing: normal;
      background-color: #ffffff;
    "
  >
    <div
      class="root-container"
      id="bodyTable"
      style="
        background-color: #ffffff;
        background-repeat: repeat;
        background-size: auto;
        background-position: left top;
      "
    >
      <div
        class="root-container-spacing"
        style="padding-top: 50px; padding-bottom: 20px; font-size: 0"
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="kl-section"
          role="presentation"
          style="
            border-collapse: collapse;
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            width: 100%;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  border-collapse: collapse;
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                "
              >
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin: 0px auto; max-width: 600px">
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      border-collapse: collapse;
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      width: 100%;
                    "
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            border-collapse: collapse;
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            direction: ltr;
                            font-size: 0px;
                            padding: 0px;
                            text-align: center;
                          "
                          align="center"
                        >
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div
                            style="
                              background: #ffffff;
                              background-color: #ffffff;
                              margin: 0px auto;
                              border-radius: 0px 0px 0px 0px;
                              max-width: 600px;
                            "
                          >
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                border-collapse: collapse;
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                background: #ffffff;
                                background-color: #ffffff;
                                width: 100%;
                                border-radius: 0px 0px 0px 0px;
                              "
                              width="100%"
                              bgcolor="#FFFFFF"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      border-collapse: collapse;
                                      mso-table-lspace: 0;
                                      mso-table-rspace: 0;
                                      direction: ltr;
                                      font-size: 0px;
                                      padding: 20px 0;
                                      padding-bottom: 0px;
                                      padding-left: 0px;
                                      padding-right: 0px;
                                      padding-top: 0px;
                                      text-align: center;
                                    "
                                    align="center"
                                  >
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
                                    <div
                                      class="content-padding first last"
                                      style="
                                        padding-left: 0;
                                        padding-right: 0;
                                        padding-top: 0;
                                        padding-bottom: 0;
                                      "
                                    >
                                      <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
                                      <div
                                        class="kl-row colstack"
                                        style="
                                          display: table;
                                          table-layout: fixed;
                                          width: 100%;
                                        "
                                      >
                                        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
                                        <div
                                          class="kl-column"
                                          style="
                                            display: table-cell;
                                            vertical-align: top;
                                            width: 100%;
                                          "
                                        >
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="hlb-block-settings-content"
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      background-color: #262626;
                                                      vertical-align: top;
                                                      padding-top: 12px;
                                                      padding-right: 179px;
                                                      padding-bottom: 12px;
                                                      padding-left: 179px;
                                                    "
                                                    bgcolor="#262626"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="top"
                                                            class="kl-header-link-bar"
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                              font-size: 0px;
                                                              padding: 0px 0px
                                                                0px 0px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                border-collapse: collapse;
                                                                mso-table-lspace: 0;
                                                                mso-table-rspace: 0;
                                                                color: #000000;
                                                                font-family:
                                                                  Ubuntu,
                                                                  Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                font-size: 13px;
                                                                line-height: 22px;
                                                                table-layout: auto;
                                                                width: 100%;
                                                                border: 0;
                                                              "
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    align="center"
                                                                    class="hlb-logo"
                                                                    style="
                                                                      border-collapse: collapse;
                                                                      mso-table-lspace: 0;
                                                                      mso-table-rspace: 0;
                                                                      display: table-cell;
                                                                      width: 100%;
                                                                      padding-bottom: 0px;
                                                                    "
                                                                    width="100%"
                                                                  >
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        mso-table-lspace: 0;
                                                                        mso-table-rspace: 0;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <!--[if true]><td style="width:600px;" bgcolor="transparent"><![endif]-->
                                                                          <!--[if !true]><!-->
                                                                          <td
                                                                            style="
                                                                              border-collapse: collapse;
                                                                              mso-table-lspace: 0;
                                                                              mso-table-rspace: 0;
                                                                              width: 600px;
                                                                            "
                                                                            width="600"
                                                                          >
                                                                            <!--<![endif]-->
                                                                            <a
                                                                              href="https://drgreennft.com/"
                                                                              style="
                                                                                color: #222427;
                                                                                font-style: normal;
                                                                                font-weight: 400;
                                                                                text-decoration: none;
                                                                              "
                                                                              target="_blank"
                                                                            >
                                                                              <img
                                                                                src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png"
                                                                                style="
                                                                                  -ms-interpolation-mode: bicubic;
                                                                                  border: 0;
                                                                                  line-height: 100%;
                                                                                  max-width: 100%;
                                                                                  display: block;
                                                                                  outline: none;
                                                                                  text-decoration: none;
                                                                                  height: auto;
                                                                                  width: 100%;
                                                                                  background-color: transparent;
                                                                                "
                                                                                width="600"
                                                                                height="auto"
                                                                              />
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
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="hlb-block-settings-content"
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      background-color: #262626;
                                                      vertical-align: top;
                                                      padding-top: 9px;
                                                      padding-right: 18px;
                                                      padding-bottom: 9px;
                                                      padding-left: 18px;
                                                    "
                                                    bgcolor="#262626"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="top"
                                                            class="kl-header-link-bar"
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                              font-size: 0px;
                                                              padding: 0px 0px
                                                                0px 0px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                border-collapse: collapse;
                                                                mso-table-lspace: 0;
                                                                mso-table-rspace: 0;
                                                                color: #000000;
                                                                font-family:
                                                                  Ubuntu,
                                                                  Helvetica,
                                                                  Arial,
                                                                  sans-serif;
                                                                font-size: 13px;
                                                                line-height: 22px;
                                                                table-layout: auto;
                                                                width: 100%;
                                                                border: 0;
                                                              "
                                                              width="100%"
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    style="
                                                                      border-collapse: collapse;
                                                                      mso-table-lspace: 0;
                                                                      mso-table-rspace: 0;
                                                                    "
                                                                  >
                                                                    <table
                                                                      align="center"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      class="r2-tbl"
                                                                      style="
                                                                        border-collapse: collapse;
                                                                        mso-table-lspace: 0;
                                                                        mso-table-rspace: 0;
                                                                        table-layout: fixed;
                                                                      "
                                                                      width="100%"
                                                                    >
                                                                      <tr
                                                                        style="
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <td
                                                                          align="center"
                                                                          class="kl-hlb-stack vspc hlb-subblk block"
                                                                          style="
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0;
                                                                            mso-table-rspace: 0;
                                                                          "
                                                                          valign="middle"
                                                                        >
                                                                          <table
                                                                            border="0"
                                                                            cellpadding="0"
                                                                            cellspacing="0"
                                                                            class="lnk"
                                                                            style="
                                                                              mso-table-lspace: 0;
                                                                              mso-table-rspace: 0;
                                                                              border-collapse: separate;
                                                                              line-height: 100%;
                                                                            "
                                                                          >
                                                                            <tr>
                                                                              <td
                                                                                align="center"
                                                                                bgcolor="transparent"
                                                                                role="presentation"
                                                                                style="
                                                                                  border-collapse: collapse;
                                                                                  mso-table-lspace: 0;
                                                                                  mso-table-rspace: 0;
                                                                                  word-break: normal;
                                                                                  border: none;
                                                                                  border-radius: 5px;
                                                                                  cursor: auto;
                                                                                  font-style: Normal;
                                                                                  mso-padding-alt: 10px
                                                                                    10px
                                                                                    10px
                                                                                    10px;
                                                                                  background: transparent;
                                                                                "
                                                                                valign="middle"
                                                                              >
                                                                                <a
                                                                                  href="https://drgreennft.com/about-us"
                                                                                  style="
                                                                                    color: #fff;
                                                                                    font-style: Normal;
                                                                                    font-weight: 400;
                                                                                    text-decoration: none;
                                                                                    display: inline-block;
                                                                                    background: transparent;
                                                                                    font-family:
                                                                                      &quot;Titillium Web&quot;,
                                                                                      Helvetica,
                                                                                      Arial,
                                                                                      sans-serif;
                                                                                    font-size: 16px;
                                                                                    line-height: 100%;
                                                                                    letter-spacing: 0;
                                                                                    margin: 0;
                                                                                    text-transform: none;
                                                                                    padding: 10px
                                                                                      10px
                                                                                      10px
                                                                                      10px;
                                                                                    mso-padding-alt: 0;
                                                                                    border-radius: 5px;
                                                                                  "
                                                                                  target="_blank"
                                                                                >
                                                                                  ABOUT
                                                                                  US
                                                                                </a>
                                                                              </td>
                                                                            </tr>
                                                                          </table>
                                                                        </td>
                                                                        <td
                                                                          align="center"
                                                                          class="kl-hlb-stack vspc hlb-subblk block"
                                                                          style="
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0;
                                                                            mso-table-rspace: 0;
                                                                          "
                                                                          valign="middle"
                                                                        >
                                                                          <table
                                                                            border="0"
                                                                            cellpadding="0"
                                                                            cellspacing="0"
                                                                            class="lnk"
                                                                            style="
                                                                              mso-table-lspace: 0;
                                                                              mso-table-rspace: 0;
                                                                              border-collapse: separate;
                                                                              line-height: 100%;
                                                                            "
                                                                          >
                                                                            <tr>
                                                                              <td
                                                                                align="center"
                                                                                bgcolor="transparent"
                                                                                role="presentation"
                                                                                style="
                                                                                  border-collapse: collapse;
                                                                                  mso-table-lspace: 0;
                                                                                  mso-table-rspace: 0;
                                                                                  word-break: normal;
                                                                                  border: none;
                                                                                  border-radius: 5px;
                                                                                  cursor: auto;
                                                                                  font-style: Normal;
                                                                                  mso-padding-alt: 10px
                                                                                    10px
                                                                                    10px
                                                                                    10px;
                                                                                  background: transparent;
                                                                                "
                                                                                valign="middle"
                                                                              >
                                                                                <a
                                                                                  href="https://marketplace.drgreennft.com/"
                                                                                  style="
                                                                                    color: #fff;
                                                                                    font-style: Normal;
                                                                                    font-weight: 400;
                                                                                    text-decoration: none;
                                                                                    display: inline-block;
                                                                                    background: transparent;
                                                                                    font-family:
                                                                                      &quot;Titillium Web&quot;,
                                                                                      Helvetica,
                                                                                      Arial,
                                                                                      sans-serif;
                                                                                    font-size: 16px;
                                                                                    line-height: 100%;
                                                                                    letter-spacing: 0;
                                                                                    margin: 0;
                                                                                    text-transform: none;
                                                                                    padding: 10px
                                                                                      10px
                                                                                      10px
                                                                                      10px;
                                                                                    mso-padding-alt: 0;
                                                                                    border-radius: 5px;
                                                                                  "
                                                                                  target="_blank"
                                                                                >
                                                                                  DIGITAL
                                                                                  KEY
                                                                                </a>
                                                                              </td>
                                                                            </tr>
                                                                          </table>
                                                                        </td>
                                                                        <td
                                                                          align="center"
                                                                          class="kl-hlb-stack hlb-subblk block"
                                                                          style="
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0;
                                                                            mso-table-rspace: 0;
                                                                          "
                                                                          valign="middle"
                                                                        >
                                                                          <table
                                                                            border="0"
                                                                            cellpadding="0"
                                                                            cellspacing="0"
                                                                            class="lnk"
                                                                            style="
                                                                              mso-table-lspace: 0;
                                                                              mso-table-rspace: 0;
                                                                              border-collapse: separate;
                                                                              line-height: 100%;
                                                                            "
                                                                          >
                                                                            <tr>
                                                                              <td
                                                                                align="center"
                                                                                bgcolor="transparent"
                                                                                role="presentation"
                                                                                style="
                                                                                  border-collapse: collapse;
                                                                                  mso-table-lspace: 0;
                                                                                  mso-table-rspace: 0;
                                                                                  word-break: normal;
                                                                                  border: none;
                                                                                  border-radius: 5px;
                                                                                  cursor: auto;
                                                                                  font-style: Normal;
                                                                                  mso-padding-alt: 10px
                                                                                    10px
                                                                                    10px
                                                                                    10px;
                                                                                  background: transparent;
                                                                                "
                                                                                valign="middle"
                                                                              >
                                                                                <a
                                                                                  href="https://drgreennft.com/contact"
                                                                                  style="
                                                                                    color: #fff;
                                                                                    font-style: Normal;
                                                                                    font-weight: 400;
                                                                                    text-decoration: none;
                                                                                    display: inline-block;
                                                                                    background: transparent;
                                                                                    font-family:
                                                                                      &quot;Titillium Web&quot;,
                                                                                      Helvetica,
                                                                                      Arial,
                                                                                      sans-serif;
                                                                                    font-size: 16px;
                                                                                    line-height: 100%;
                                                                                    letter-spacing: 0;
                                                                                    margin: 0;
                                                                                    text-transform: none;
                                                                                    padding: 10px
                                                                                      10px
                                                                                      10px
                                                                                      10px;
                                                                                    mso-padding-alt: 0;
                                                                                    border-radius: 5px;
                                                                                  "
                                                                                  target="_blank"
                                                                                >
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
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      background-color: #262626;
                                                      vertical-align: top;
                                                      padding-top: 0px;
                                                      padding-right: 0px;
                                                      padding-bottom: 0px;
                                                      padding-left: 0px;
                                                    "
                                                    bgcolor="#262626"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            class="kl-image"
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                              font-size: 0px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                mso-table-lspace: 0;
                                                                mso-table-rspace: 0;
                                                                border-collapse: collapse;
                                                                border-spacing: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    class="kl-img-base-auto-width"
                                                                    style="
                                                                      border-collapse: collapse;
                                                                      mso-table-lspace: 0;
                                                                      mso-table-rspace: 0;
                                                                      border: solid
                                                                        1px
                                                                        #262626;
                                                                      padding: 1px
                                                                        1px 1px
                                                                        1px;
                                                                      background-color: #262626;
                                                                      width: 596px;
                                                                    "
                                                                    valign="top"
                                                                    width="596"
                                                                    bgcolor="#262626"
                                                                  >
                                                                    <table
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      style="
                                                                        mso-table-lspace: 0;
                                                                        mso-table-rspace: 0;
                                                                        border-collapse: collapse;
                                                                        border-spacing: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            valign="top"
                                                                            style="
                                                                              border-collapse: collapse;
                                                                              mso-table-lspace: 0;
                                                                              mso-table-rspace: 0;
                                                                            "
                                                                          >
                                                                            <a
                                                                              href="https://drgreennft.com/"
                                                                              style="
                                                                                color: #222427;
                                                                                font-style: normal;
                                                                                font-weight: 400;
                                                                                text-decoration: none;
                                                                              "
                                                                            >
                                                                              <img
                                                                                src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png"
                                                                                style="
                                                                                  -ms-interpolation-mode: bicubic;
                                                                                  border: 0;
                                                                                  line-height: 100%;
                                                                                  max-width: 100%;
                                                                                  display: block;
                                                                                  outline: none;
                                                                                  text-decoration: none;
                                                                                  height: auto;
                                                                                  font-size: 13px;
                                                                                  width: 100%;
                                                                                "
                                                                                width="596"
                                                                                height="auto"
                                                                              />
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
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      background-color: #262626;
                                                      vertical-align: top;
                                                      padding-top: 9px;
                                                      padding-right: 18px;
                                                      padding-bottom: 9px;
                                                      padding-left: 18px;
                                                    "
                                                    bgcolor="#262626"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            class="kl-text"
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                              font-size: 0px;
                                                              padding: 0px;
                                                              padding-top: 0px;
                                                              padding-right: 0px;
                                                              padding-bottom: 0px;
                                                              padding-left: 0px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <div
                                                              style="
                                                                font-family:
                                                                  Arial,
                                                                  &quot;Helvetica Neue&quot;,
                                                                  Helvetica,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                letter-spacing: 0px;
                                                                line-height: 1.5;
                                                                text-align: left;
                                                                color: #222427;
                                                              "
                                                            >
                                                              <div
                                                                style="
                                                                  text-align: center;
                                                                  margin: 20px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Dear Admin
                                                                  Team,
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  A new order
                                                                  has been
                                                                  placed on the
                                                                  Dr. Green dApp
                                                                  and is
                                                                  currently
                                                                  pending
                                                                  verification.
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Please review
                                                                  the details
                                                                  below and take
                                                                  the necessary
                                                                  steps to
                                                                  verify the
                                                                  order.
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Customer Name:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${fullName}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Customer
                                                                  Number:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${clientId}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Order Number:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${orderId}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Order Date:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${orderDate}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin-top: 15px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Dispatch
                                                                  Address:
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 3px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${addressLine1}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${addressLine2}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${city},
                                                                  ${postCode}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    15px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${country}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Products
                                                                  Ordered:
                                                                </span>
                                                              </div>
                                                              <table
                                                                class="product-table"
                                                                width="100%"
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                                style="
                                                                  border-collapse: collapse;
                                                                  width: 100%;
                                                                  border: 1px
                                                                    solid
                                                                    #ffffff;
                                                                "
                                                              >
                                                                <thead>
                                                                  <tr>
                                                                    <th
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #ffffff;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Name
                                                                    </th>
                                                                    <th
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #ffffff;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Quantity
                                                                    </th>
                                                                  </tr>
                                                                </thead>
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${productName1}
                                                                    </td>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${product1Quantity}
                                                                    </td>
                                                                  </tr>

                                                                  <!-- Only include this row if productName2 exists -->
                                                                  ${
                                                                    productName2
                                                                      ? `
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${productName2}
                                                                    </td>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${product2Quantity}
                                                                    </td>
                                                                  </tr>
                                                                  `
                                                                      : ""
                                                                  }
                                                                </tbody>
                                                              </table>

                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: italic;
                                                                    color: #C5C5C5;
                                                                    font-size: 16px;
                                                                  "
                                                                >
                                                                  (Full list in
                                                                  admin
                                                                  dashboard)
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Please log
                                                                  into the admin
                                                                  panel to
                                                                  verify the
                                                                  user and
                                                                  authorize the
                                                                  order for
                                                                  payment.
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin-top: 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Best regards,
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Dr. Green
                                                                  Platform
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: italic;
                                                                    color: #ffffff;
                                                                    font-size: 16px;
                                                                  "
                                                                >
                                                                  Order
                                                                  Monitoring
                                                                  System
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
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      vertical-align: top;
                                                      padding-top: 0px;
                                                      padding-right: 0px;
                                                      padding-bottom: 0px;
                                                      padding-left: 0px;
                                                    "
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            class="kl-image"
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                              font-size: 0px;
                                                              word-break: break-word;
                                                            "
                                                          >
                                                            <table
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              style="
                                                                mso-table-lspace: 0;
                                                                mso-table-rspace: 0;
                                                                border-collapse: collapse;
                                                                border-spacing: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    class="kl-img-base-auto-width"
                                                                    style="
                                                                      border-collapse: collapse;
                                                                      mso-table-lspace: 0;
                                                                      mso-table-rspace: 0;
                                                                      border: 0;
                                                                      padding: 0px
                                                                        0px 0px
                                                                        0px;
                                                                      width: 600px;
                                                                    "
                                                                    valign="top"
                                                                    width="600"
                                                                  >
                                                                    <a
                                                                      href="https://drgreennft.com/"
                                                                      style="
                                                                        color: #222427;
                                                                        font-style: normal;
                                                                        font-weight: 400;
                                                                        text-decoration: none;
                                                                      "
                                                                    >
                                                                      <img
                                                                        src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/5508376d-70c8-4fbc-be4e-a25d15801e7f.png"
                                                                        style="
                                                                          -ms-interpolation-mode: bicubic;
                                                                          border: 0;
                                                                          line-height: 100%;
                                                                          max-width: 100%;
                                                                          display: block;
                                                                          outline: none;
                                                                          text-decoration: none;
                                                                          height: auto;
                                                                          font-size: 13px;
                                                                          width: 100%;
                                                                        "
                                                                        width="600"
                                                                        height="auto"
                                                                      />
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
                                          <div
                                            class="mj-column-per-100 mj-outlook-group-fix component-wrapper"
                                            style="
                                              font-size: 0px;
                                              text-align: left;
                                              direction: ltr;
                                              vertical-align: top;
                                              width: 100%;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-collapse: collapse;
                                                mso-table-lspace: 0;
                                                mso-table-rspace: 0;
                                                width: 100%;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class
                                                    style="
                                                      border-collapse: collapse;
                                                      mso-table-lspace: 0;
                                                      mso-table-rspace: 0;
                                                      background-color: #262626;
                                                      vertical-align: top;
                                                      padding-top: 9px;
                                                      padding-right: 9px;
                                                      padding-bottom: 9px;
                                                      padding-left: 9px;
                                                    "
                                                    bgcolor="#262626"
                                                    valign="top"
                                                  >
                                                    <table
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="
                                                        border-collapse: collapse;
                                                        mso-table-lspace: 0;
                                                        mso-table-rspace: 0;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              border-collapse: collapse;
                                                              mso-table-lspace: 0;
                                                              mso-table-rspace: 0;
                                                            "
                                                          >
                                                            <div
                                                              style="
                                                                width: 100%;
                                                                text-align: center;
                                                              "
                                                            >
                                                              <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
                                                              <!--[if !true]><!-->
                                                              <div
                                                                class
                                                                style="
                                                                  display: inline-block;
                                                                  padding-right: 10px;
                                                                "
                                                              >
                                                                <!--<![endif]-->
                                                                <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                <div
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://www.facebook.com/drgreennftportugal"
                                                                    style="
                                                                      color: #222427;
                                                                      font-style: normal;
                                                                      font-weight: 400;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                  >
                                                                    <img
                                                                      alt="Facebook"
                                                                      src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/facebook_96.png"
                                                                      style="
                                                                        -ms-interpolation-mode: bicubic;
                                                                        border: 0;
                                                                        height: auto;
                                                                        line-height: 100%;
                                                                        outline: none;
                                                                        text-decoration: none;
                                                                        max-width: 100%;
                                                                        width: 32px;
                                                                      "
                                                                      width="32"
                                                                      height="auto"
                                                                    />
                                                                  </a>
                                                                </div>
                                                                <!--[if true]></td><![endif]-->
                                                                <!--[if !true]><!-->
                                                              </div>
                                                              <!--<![endif]-->
                                                              <!--[if !true]><!-->
                                                              <div
                                                                class
                                                                style="
                                                                  display: inline-block;
                                                                  padding-right: 10px;
                                                                "
                                                              >
                                                                <!--<![endif]-->
                                                                <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                <div
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://twitter.com/DrGreen_nft"
                                                                    style="
                                                                      color: #222427;
                                                                      font-style: normal;
                                                                      font-weight: 400;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                  >
                                                                    <img
                                                                      alt="Twitter"
                                                                      src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/twitter_96.png"
                                                                      style="
                                                                        -ms-interpolation-mode: bicubic;
                                                                        border: 0;
                                                                        height: auto;
                                                                        line-height: 100%;
                                                                        outline: none;
                                                                        text-decoration: none;
                                                                        max-width: 100%;
                                                                        width: 32px;
                                                                      "
                                                                      width="32"
                                                                      height="auto"
                                                                    />
                                                                  </a>
                                                                </div>
                                                                <!--[if true]></td><![endif]-->
                                                                <!--[if !true]><!-->
                                                              </div>
                                                              <!--<![endif]-->
                                                              <!--[if !true]><!-->
                                                              <div
                                                                class
                                                                style="
                                                                  display: inline-block;
                                                                  padding-right: 10px;
                                                                "
                                                              >
                                                                <!--<![endif]-->
                                                                <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                <div
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="${CONSTANT.SOCIAL_MEDIA_URLS.INSTAGRAM_URL}"
                                                                    style="
                                                                      color: #222427;
                                                                      font-style: normal;
                                                                      font-weight: 400;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                  >
                                                                    <img
                                                                      alt="Instagram"
                                                                      src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png"
                                                                      style="
                                                                        -ms-interpolation-mode: bicubic;
                                                                        border: 0;
                                                                        height: auto;
                                                                        line-height: 100%;
                                                                        outline: none;
                                                                        text-decoration: none;
                                                                        max-width: 100%;
                                                                        width: 32px;
                                                                      "
                                                                      width="32"
                                                                      height="auto"
                                                                    />
                                                                  </a>
                                                                </div>
                                                                <!--[if true]></td><![endif]-->
                                                                <!--[if !true]><!-->
                                                              </div>
                                                              <!--<![endif]-->
                                                              <!--[if !true]><!-->
                                                              <div
                                                                class
                                                                style="
                                                                  display: inline-block;
                                                                  padding-right: 10px;
                                                                "
                                                              >
                                                                <!--<![endif]-->
                                                                <!--[if true]><td style="padding-right:10px;"><![endif]-->
                                                                <div
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://www.linkedin.com/company/drgreennft"
                                                                    style="
                                                                      color: #222427;
                                                                      font-style: normal;
                                                                      font-weight: 400;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                  >
                                                                    <img
                                                                      alt="LinkedIn"
                                                                      src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/linkedin_96.png"
                                                                      style="
                                                                        -ms-interpolation-mode: bicubic;
                                                                        border: 0;
                                                                        height: auto;
                                                                        line-height: 100%;
                                                                        outline: none;
                                                                        text-decoration: none;
                                                                        max-width: 100%;
                                                                        width: 32px;
                                                                      "
                                                                      width="32"
                                                                      height="auto"
                                                                    />
                                                                  </a>
                                                                </div>
                                                                <!--[if true]></td><![endif]-->
                                                                <!--[if !true]><!-->
                                                              </div>
                                                              <!--<![endif]-->
                                                              <!--[if !true]><!-->
                                                              <div
                                                                class
                                                                style="
                                                                  display: inline-block;
                                                                "
                                                              >
                                                                <!--<![endif]-->
                                                                <!--[if true]><td style=""><![endif]-->
                                                                <div
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <a
                                                                    href="https://www.youtube.com/@DrGreen_NFT"
                                                                    style="
                                                                      color: #222427;
                                                                      font-style: normal;
                                                                      font-weight: 400;
                                                                      text-decoration: none;
                                                                    "
                                                                    target="_blank"
                                                                  >
                                                                    <img
                                                                      alt="YouTube"
                                                                      src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/youtube_96.png"
                                                                      style="
                                                                        -ms-interpolation-mode: bicubic;
                                                                        border: 0;
                                                                        height: auto;
                                                                        line-height: 100%;
                                                                        outline: none;
                                                                        text-decoration: none;
                                                                        max-width: 100%;
                                                                        width: 32px;
                                                                      "
                                                                      width="32"
                                                                      height="auto"
                                                                    />
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
    </html>`,

  paymentReceivedEmail: (
    fullName: string,
    clientId: string,
    orderId: string,
    orderDate: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postCode: string,
    country: string,
    productName1: string,
    product1Quantity: number,
    productName2: string,
    product2Quantity: number
  ) => `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml">

    <head>
    <title>Order Ready for Dispatch - Order #${orderId}</title>
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
                                                                                                                                                        <img src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png"
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
                                                                                                                            style="text-align: center; margin: 20px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: #ffffff; font-size: 18px;">
                                                                                                                                Dear Admin Team,
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            style="text-align: left; margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: #ffffff; font-size: 18px;">
                                                                                                                                Payment has been received for the following order, and it is now ready for dispatch.
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            style="text-align: left; margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: #ffffff; font-size: 18px;">
                                                                                                                                Please prepare the shipment and generate the waybill using the details below.
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Customer Name:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${fullName}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Customer
                                                                  Number:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${clientId}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Order Number:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${orderId}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Order Date:
                                                                </span>
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${orderDate}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin-top: 15px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Dispatch
                                                                  Address:
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 3px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${addressLine1}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${addressLine2}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    5px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${city},
                                                                  ${postCode}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    15px 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 300;
                                                                    font-style: normal;
                                                                    color: #C5C5C5;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  ${country}
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Products
                                                                  Ordered:
                                                                </span>
                                                              </div>
                                                              <table
                                                                class="product-table"
                                                                width="100%"
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                                style="
                                                                  border-collapse: collapse;
                                                                  width: 100%;
                                                                  border: 1px
                                                                    solid
                                                                    #ffffff;
                                                                "
                                                              >
                                                                <thead>
                                                                  <tr>
                                                                    <th
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #ffffff;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Name
                                                                    </th>
                                                                    <th
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #ffffff;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      Quantity
                                                                    </th>
                                                                  </tr>
                                                                </thead>
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${productName1}
                                                                    </td>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${product1Quantity}
                                                                    </td>
                                                                  </tr>

                                                                  <!-- Only include this row if productName2 exists -->
                                                                  ${
                                                                    productName2
                                                                      ? `
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${productName2}
                                                                    </td>
                                                                    <td
                                                                      style="
                                                                        text-align: center;
                                                                        border: 1px
                                                                          solid
                                                                          #ffffff;
                                                                        padding: 8px;
                                                                        color: #C5C5C5;
                                                                        font-size: 18px;
                                                                        font-family:
                                                                          &quot;Titillium Web&quot;,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      "
                                                                    >
                                                                      ${product2Quantity}
                                                                    </td>
                                                                  </tr>
                                                                  `
                                                                      : ""
                                                                  }
                                                                </tbody>
                                                              </table>

                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  margin: 5px 0
                                                                    15px 0;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: italic;
                                                                    color: #C5C5C5;
                                                                    font-size: 16px;
                                                                  "
                                                                >
                                                                  (Full list in
                                                                  admin
                                                                  dashboard)
                                                                </span>
                                                              </div>
                                                                                                                        <div
                                                                                                                            style="text-align: left; margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: #ffffff; font-size: 18px;">
                                                                                                                                This order can now be handed off to our logistics partner.
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                style="
                                                                  text-align: left;
                                                                  margin-top: 20px;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Best regards,
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                  
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 600;
                                                                    font-style: normal;
                                                                    color: #ffffff;
                                                                    font-size: 18px;
                                                                  "
                                                                >
                                                                  Dr. Green
                                                                  Platform
                                                                </span>
                                                              </div>
                                                              <div
                                                                style="
                                                                  text-align: left;
                                                                "
                                                              >
                                                                <span
                                                                  style="
                                                                    font-family:
                                                                      &quot;Titillium Web&quot;,
                                                                      Helvetica,
                                                                      Arial,
                                                                      sans-serif;
                                                                    font-weight: 400;
                                                                    font-style: italic;
                                                                    color: #ffffff;
                                                                    font-size: 16px;
                                                                  "
                                                                >
                                                                  Order
                                                                  Monitoring
                                                                  System
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
    </html>`,

  orderInvoiceEmail: (
    orderId: string,
    orderAmount: number,
    tcnUrl: string,
    usdtUrl: string,
    ethUrl: string,
    btcUrl: string,
    fiatUrl: string,
    adminEmail: string
  ) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #121212;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
  
        .logo-container {
          background-color: #ffffff;
          padding: 10px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
  
        .logo-container img {
          max-width: 100px;
        }
  
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          justify-content: center;
          background-color: #1a1a1a;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
  
        .title {
          font-size: 24px;
          font-weight: bold;
          color: #32cd32;
        }
  
        .subtitle {
          margin: 20px 0;
          font-size: 16px;
          color: #b3b3b3;
        }
  
        .invoice {
          margin: 20px 0;
          padding: 20px;
          background-color: #2b2b2b;
          border-radius: 10px;
          text-align: left;
        }
  
        .invoice-details {
          margin-bottom: 20px;
        }
  
        .invoice-details div {
          margin: 10px 0;
          color: #e0e0e0;
        }
  
        .invoice-details strong {
          color: #32cd32;
        }
  
        .payment-options {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
  
        .payment-option {
          background-color: #2b2b2b;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          width: 30%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
  
        .payment-option img {
          max-width: 50px;
          max-height: 50px;
          margin-bottom: 10px;
        }
  
        .payment-option div {
          color: #ffffff;
          margin-bottom: 10px;
        }
  
        .payment-option button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #32cd32;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
  
        @media (max-width: 600px) {
          .payment-option {
            width: 100%;
            margin-bottom: 20px;
          }
  
          .logo-container {
            flex-direction: column;
          }
  
          .logo-container img {
            max-width: 80px;
          }
        }
  
        .support-info {
          margin-top: 30px;
          text-align: left;
          color: #b3b3b3;
        }
  
        .support-info a {
          color: #32cd32;
          text-decoration: underline;
        }
  
        .hlb-block-settings-content {
          background-color: #1a1a1a;
          vertical-align: top;
          padding: 12px 10%;
          width: 100%;
        }
  
        .kl-header-link-bar {
          font-size: 0;
          padding: 0;
          word-break: break-word;
        }
  
        .hlb-logo img {
          display: block;
          width: 200px;
          height: auto;
          background-color: transparent;
        }
  
        /* Media queries for different screen sizes */
        @media (max-width: 768px) {
          /* Tablet and smaller screens */
          .hlb-block-settings-content {
            padding: 12px 5%;
          }
        }
  
        @media (max-width: 480px) {
          /* Mobile screens */
          .hlb-block-settings-content {
            padding: 12px 2%;
          }
  
          .kl-header-link-bar {
            font-size: 12px;
            /* Adjust font size for smaller screens */
          }
        }
  
        .responsive-table {
          width: 100%;
          max-width: 600px;
          /* Maximum width for the table */
          border-collapse: separate;
          /* Use separate borders to allow margins between cells */
          margin: 0 auto;
          /* Center align the table on larger screens */
          table-layout: fixed;
          /* Ensures equal width for each column */
          border-spacing: 10px;
          /* Adds space between table cells */
        }
  
        .payment-option-cell {
          padding: 20px;
          /* Adds consistent padding around content */
          background-color: #2b2b2b;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: calc(33.33% - 20px);
          /* Adjusted width to account for margins */
          box-sizing: border-box;
          /* Include padding in the width */
        }
  
        .payment-option-cell img {
          max-width: 50px;
          max-height: 50px;
          margin-bottom: 10px;
        }
  
        .payment-option-cell button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #32cd32;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
  
        /* Media query for mobile devices */
        @media only screen and (max-width: 480px) {
          .responsive-table {
            width: 100% !important;
            /* Ensure table takes the full width on mobile */
          }
  
          .payment-option-cell {
            display: block !important;
            /* Stack table cells vertically */
            width: 100% !important;
            /* Make each cell full width */
            margin-bottom: 20px !important;
            /* Adds space between cells */
            box-sizing: border-box;
            /* Ensures padding is included within the width */
          }
        }
      </style>
    </head>
  
    <body
      style="
        font-family: Arial, sans-serif;
        background-color: #121212;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      "
    >
      <!-- Main Container -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width: 800px;
          margin: 0 auto;
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        "
      >
        <!-- Logo Container -->
        <tr>
          <td class="hlb-block-settings-content">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="width: 100%; border: 0"
            >
              <tbody>
                <tr>
                  <td align="center" class="kl-header-link-bar">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        color: #000;
                        font-family: Ubuntu, Helvetica, Arial, sans-serif;
                        font-size: 13px;
                        line-height: 22px;
                        width: 100%;
                        table-layout: auto;
                      "
                    >
                      <tbody>
                        <tr>
                          <td align="center" class="hlb-logo">
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="border-collapse: collapse"
                            >
                              <tbody>
                                <tr>
                                  <td style="max-width: 100%">
                                    <a
                                      href="https://drgreennft.com/"
                                      style="color: #222; text-decoration: none"
                                      target="_blank"
                                    >
                                      <img
                                        src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png"
                                        alt="Logo"
                                      />
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
        <!-- <tr>
              <td align="center" style="padding: 10px; background-color: #1a1a1a; border-radius: 10px;">
                  <img src="${CONSTANT.DR_GREEN_SKULL_IMAGE_URL}" alt="Logo" style="max-width: 100px;">
              </td>
          </tr> -->
  
        <!-- Title -->
        <tr>
          <td
            style="
              padding: 20px 0;
              font-size: 24px;
              font-weight: bold;
              color: #32cd32;
            "
          >
            Invoice Created
          </td>
        </tr>
  
        <!-- Subtitle -->
        <tr>
          <td style="padding: 10px 20px; font-size: 16px; color: #b3b3b3">
            Thank you for your order! Please find your invoice details below and
            choose one of the payment options to complete your purchase.
          </td>
        </tr>
  
        <!-- Invoice Details -->
          <tr>
            <td
              style="
                background-color: #2b2b2b;
                padding: 20px;
                border-radius: 10px;
                color: #e0e0e0;
                text-align: left;
              "
            >
              <div style="margin-bottom: 10px">
                <strong style="color: #32cd32">Order ID:</strong> ${orderId}
              </div>
              <div style="margin-bottom: 10px">
                <strong style="color: #32cd32">Date:</strong> ${new Date().toUTCString()}
              </div>
              <div style="margin-bottom: 10px">
                <strong style="color: #32cd32">Order Amount:</strong> $${orderAmount}
              </div>
              <div style="margin-bottom: 10px">
                <strong style="color: #32cd32">Delivery Fee:</strong> $${CONSTANT.DELIVERY_CHARGE}
              </div>
              <div style="margin-bottom: 10px; font-weight: bold; font-size: 18px;">
                <strong style="color: #32cd32">Total Payable:</strong> $${orderAmount + CONSTANT.DELIVERY_CHARGE}
              </div>
            </td>
          </tr>
  
        <!-- Payment Options -->
        <tr>
          <td style="padding: 20px 0">
            <!-- Payment Option Table -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              class="responsive-table"
            >
              <tr>
              ${
                tcnUrl
                  ? `
                <!-- Testnet Payment Option -->
                <td align="center" class="payment-option-cell">
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/3320.png"
                    alt="TestCoin (TCN)"
                    style="max-width: 50px; max-height: 50px; margin-bottom: 10px"
                  />
                  <div style="color: #ffffff; margin-bottom: 10px">
                    TestCoin (TCN)
                  </div>
                  <a href="${tcnUrl}" style="text-decoration: none">
                    <button
                      style="
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #32cd32;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                    >
                      PAY NOW
                    </button>
                  </a>
                </td>
                `
                  : ""
              }
  
                <!-- Bitcoin Payment Option -->
                ${
                  btcUrl
                    ? `
                <td align="center" class="payment-option-cell">
                  <img
                    src="https://bitcoin.org/img/icons/opengraph.png"
                    alt="Bitcoin (BTC)"
                    style="max-width: 50px; max-height: 50px; margin-bottom: 10px"
                  />
                  <div style="color: #ffffff; margin-bottom: 10px">
                    Bitcoin (BTC)
                  </div>
                  <a href="${btcUrl}" style="text-decoration: none">
                    <button
                      style="
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #32cd32;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                    >
                      PAY NOW
                    </button>
                  </a>
                </td>
                `
                    : ""
                }
  
                <!-- Ethereum Payment Option -->
                ${
                  ethUrl
                    ? `
                <td align="center" class="payment-option-cell">
                  <img
                    src="https://ethereum.org/_next/static/media/eth-diamond-purple.7929ed26.png"
                    alt="Ethereum (ETH)"
                    style="max-width: 50px; max-height: 50px; margin-bottom: 10px"
                  />
                  <div style="color: #ffffff; margin-bottom: 10px">
                    Ethereum (ETH)
                  </div>
                  <a href="${ethUrl}" style="text-decoration: none">
                    <button
                      style="
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #32cd32;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                    >
                      PAY NOW
                    </button>
                  </a>
                </td>
                `
                    : ""
                }
  
                <!-- Tether Payment Option -->
                ${
                  usdtUrl
                    ? `
                <td align="center" class="payment-option-cell">
                  <img
                    src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                    alt="Tether (USDT)"
                    style="max-width: 50px; max-height: 50px; margin-bottom: 10px"
                  />
                  <div style="color: #ffffff; margin-bottom: 10px">
                    Tether (USDT)
                  </div>
                  <a href="${usdtUrl}" style="text-decoration: none">
                    <button
                      style="
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #32cd32;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                    >
                      PAY NOW
                    </button>
                  </a>
                </td>
                `
                    : ""
                }

                <!-- Fiat Payment Option -->
                ${
                  fiatUrl
                    ? `
                <td align="center" class="payment-option-cell">
                  <img
                    src="https://checkout.pay-inn.com/assets/images/1006251571739391974.png"
                    alt="USD"
                    style="max-width: 50px; max-height: 50px; margin-bottom: 10px"
                  />
                  <div style="color: #ffffff; margin-bottom: 10px">
                    USD
                  </div>
                  <a href="${fiatUrl}" style="text-decoration: none">
                    <button
                      style="
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #32cd32;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                      "
                    >
                      PAY NOW
                    </button>
                  </a>
                </td>
                `
                    : ""
                }
              </tr>
            </table>
          </td>
        </tr>
  
        <!-- Support Information -->
        <tr>
          <td style="padding: 30px 20px; color: #b3b3b3; text-align: left">
            <p>
              If you have any questions or need assistance, our support team is
              always available to help. Please reach out to
              <a
                href="mailto:${adminEmail}"
                style="color: #32cd32; text-decoration: underline"
                >Dr.Green Support</a
              >
              for any issues.
            </p>
            <p>Thank you for choosing Dr.Green</p>
            <p>Best Regards,</p>
            <p>Team Dr.Green</p>
          </td>
        </tr>
  
        <tr>
          <td
            class=""
            style="
              background-color: #1a1a1a;
              vertical-align: top;
              padding-top: 9px;
              padding-right: 9px;
              padding-bottom: 9px;
              padding-left: 9px;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style=""
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <div style="width: 100%; text-align: center">
                      <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
                      <!--[if !true]><!-->
                      <div
                        class=""
                        style="display: inline-block; padding-right: 10px"
                      >
                        <!--<![endif]-->
                        <!--[if true]><td style="padding-right:10px;"><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://discord.com/invite/DrGreen"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="Custom"
                              src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/dec5697c-f302-4563-a8ff-7f19edfd89a1.png"
                              style="width: 48px"
                              width="48"
                            />
                          </a>
                        </div>
                        <!--[if true]></td><![endif]-->
                        <!--[if !true]><!-->
                      </div>
                      <!--<![endif]-->
                      <!--[if !true]><!-->
                      <div class="" style="display: inline-block">
                        <!--<![endif]-->
                        <!--[if true]><td style=""><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://t.me/DrGreenNFTentry"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="Custom"
                              src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/21269dd6-e21b-4aa4-a424-307d8348b765.png"
                              style="width: 48px"
                              width="48"
                            />
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
  
        <tr>
          <td
            class=""
            style="
              background-color: #1a1a1a;
              vertical-align: top;
              padding-top: 9px;
              padding-right: 18px;
              padding-bottom: 9px;
              padding-left: 18px;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style=""
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    align="left"
                    class="kl-text"
                    style="
                      font-size: 0px;
                      padding: 0px;
                      padding-top: 0px;
                      padding-right: 0px;
                      padding-bottom: 0px;
                      padding-left: 0px;
                      word-break: break-word;
                    "
                  >
                    <div
                      style="
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        letter-spacing: 0px;
                        line-height: 1.5;
                        text-align: left;
                        color: #222427;
                      "
                    >
                      <div style="text-align: center">
                        <span
                          style="
                            font-family: 'Titillium Web', Helvetica, Arial,
                              sans-serif;
                            font-weight: 400;
                            font-style: normal;
                            color: rgb(255, 255, 255);
                            font-size: 18px;
                          "
                        >
                          Visit our website and join our
                          <span style="color: rgb(0, 185, 177)">Discord</span> and
                          <span style="color: rgb(0, 185, 177)">Telegram</span>
                          communities for more details.
                        </span>
                      </div>
                      <div style="text-align: center"></div>
                      <div style="text-align: center">
                        <span
                          style="
                            font-family: 'Titillium Web', Helvetica, Arial,
                              sans-serif;
                            font-weight: 400;
                            font-style: normal;
                            color: rgb(0, 185, 177);
                            font-size: 18px;
                          "
                        >
                          Got any questions?
                        </span>
                      </div>
                      <div style="text-align: center">
                        <span
                          style="
                            font-family: 'Titillium Web', Helvetica, Arial,
                              sans-serif;
                            font-weight: 400;
                            font-style: normal;
                            color: rgb(255, 255, 255);
                            font-size: 18px;
                          "
                        >
                          Please reach out to our admin team
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
  
        <tr>
          <td
            class=""
            style="
              vertical-align: top;
              padding-top: 0px;
              padding-right: 0px;
              padding-bottom: 0px;
              padding-left: 0px;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style=""
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    class="kl-image"
                    style="font-size: 0px; word-break: break-word"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="border-collapse: collapse; border-spacing: 0px"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="kl-img-base-auto-width"
                            style="
                              border: 0;
                              padding: 0px 0px 0px 0px;
                              width: 600px;
                            "
                            valign="top"
                          >
                            <a
                              href="https://drgreennft.com/"
                              style="
                                color: #222427;
                                font-style: normal;
                                font-weight: 400;
                                text-decoration: none;
                              "
                            >
                              <img
                                src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/5508376d-70c8-4fbc-be4e-a25d15801e7f.png"
                                style="
                                  display: block;
                                  outline: none;
                                  text-decoration: none;
                                  height: auto;
                                  font-size: 13px;
                                  width: 100%;
                                "
                                width="600"
                              />
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
  
        <tr>
          <td
            class=""
            style="
              background-color: #1a1a1a;
              vertical-align: top;
              padding-top: 9px;
              padding-right: 9px;
              padding-bottom: 9px;
              padding-left: 9px;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style=""
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <div style="width: 100%; text-align: center">
                      <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
                      <!--[if !true]><!-->
                      <div
                        class=""
                        style="display: inline-block; padding-right: 10px"
                      >
                        <!--<![endif]-->
                        <!--[if true]><td style="padding-right:10px;"><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://www.facebook.com/drgreennftportugal"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="Facebook"
                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/facebook_96.png"
                              style="width: 32px"
                              width="32"
                            />
                          </a>
                        </div>
                        <!--[if true]></td><![endif]-->
                        <!--[if !true]><!-->
                      </div>
                      <!--<![endif]-->
                      <!--[if !true]><!-->
                      <div
                        class=""
                        style="display: inline-block; padding-right: 10px"
                      >
                        <!--<![endif]-->
                        <!--[if true]><td style="padding-right:10px;"><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://twitter.com/DrGreen_nft"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="Twitter"
                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/twitter_96.png"
                              style="width: 32px"
                              width="32"
                            />
                          </a>
                        </div>
                        <!--[if true]></td><![endif]-->
                        <!--[if !true]><!-->
                      </div>
                      <!--<![endif]-->
                      <!--[if !true]><!-->
                      <div
                        class=""
                        style="display: inline-block; padding-right: 10px"
                      >
                        <!--<![endif]-->
                        <!--[if true]><td style="padding-right:10px;"><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="${CONSTANT.SOCIAL_MEDIA_URLS.INSTAGRAM_URL}"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="Instagram"
                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png"
                              style="width: 32px"
                              width="32"
                            />
                          </a>
                        </div>
                        <!--[if true]></td><![endif]-->
                        <!--[if !true]><!-->
                      </div>
                      <!--<![endif]-->
                      <!--[if !true]><!-->
                      <div
                        class=""
                        style="display: inline-block; padding-right: 10px"
                      >
                        <!--<![endif]-->
                        <!--[if true]><td style="padding-right:10px;"><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://www.linkedin.com/company/drgreennft"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="LinkedIn"
                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/linkedin_96.png"
                              style="width: 32px"
                              width="32"
                            />
                          </a>
                        </div>
                        <!--[if true]></td><![endif]-->
                        <!--[if !true]><!-->
                      </div>
                      <!--<![endif]-->
                      <!--[if !true]><!-->
                      <div class="" style="display: inline-block">
                        <!--<![endif]-->
                        <!--[if true]><td style=""><![endif]-->
                        <div style="text-align: center">
                          <a
                            href="https://www.youtube.com/@DrGreen_NFT"
                            style="
                              color: #222427;
                              font-style: normal;
                              font-weight: 400;
                              text-decoration: none;
                            "
                            target="_blank"
                          >
                            <img
                              alt="YouTube"
                              src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/youtube_96.png"
                              style="width: 32px"
                              width="32"
                            />
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
      </table>
      <!-- End Main Container -->
    </body>
  </html>
  `,

  orderPlacedEmail: (firstName: string) => `<!DOCTYPE html>
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
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Hey
                                                                                                                                    <span>${firstName}</span></span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Thanks
                                                                                                                                    for
                                                                                                                                    placing
                                                                                                                                    your
                                                                                                                                    order
                                                                                                                                    with
                                                                                                                                    Dr.
                                                                                                                                    Green
                                                                                                                                    -
                                                                                                                                    we've
                                                                                                                                    received
                                                                                                                                    your
                                                                                                                                    payment
                                                                                                                                    and
                                                                                                                                    your
                                                                                                                                    items
                                                                                                                                    are
                                                                                                                                    now
                                                                                                                                    being
                                                                                                                                    processed
                                                                                                                                    for
                                                                                                                                    delivery.
                                                                                                                                    We're
                                                                                                                                    just
                                                                                                                                    as
                                                                                                                                    excited
                                                                                                                                    as
                                                                                                                                    you
                                                                                                                                    are!
                                                                                                                                    🌿</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                    To
                                                                                                                                    check
                                                                                                                                    the
                                                                                                                                    status
                                                                                                                                    of
                                                                                                                                    your
                                                                                                                                    order
                                                                                                                                    at
                                                                                                                                    any
                                                                                                                                    time,
                                                                                                                                    simply
                                                                                                                                    log
                                                                                                                                    in
                                                                                                                                    to
                                                                                                                                    your
                                                                                                                                    account
                                                                                                                                    and
                                                                                                                                    head
                                                                                                                                    over
                                                                                                                                    to
                                                                                                                                    your
                                                                                                                                    dashboard.
                                                                                                                                    Everything
                                                                                                                                    you
                                                                                                                                    need
                                                                                                                                    to
                                                                                                                                    track
                                                                                                                                    your
                                                                                                                                    order
                                                                                                                                    is
                                                                                                                                    right
                                                                                                                                    there.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">We'll
                                                                                                                                    let
                                                                                                                                    you
                                                                                                                                    know
                                                                                                                                    as
                                                                                                                                    soon
                                                                                                                                    as
                                                                                                                                    your
                                                                                                                                    delivery
                                                                                                                                    is
                                                                                                                                    out
                                                                                                                                    for
                                                                                                                                    dispatch
                                                                                                                                    –
                                                                                                                                    until
                                                                                                                                    then,
                                                                                                                                    sit
                                                                                                                                    back,
                                                                                                                                    relax,
                                                                                                                                    and
                                                                                                                                    get
                                                                                                                                    ready
                                                                                                                                    to
                                                                                                                                    experience
                                                                                                                                    the
                                                                                                                                    benefits
                                                                                                                                    of
                                                                                                                                    your
                                                                                                                                    medical
                                                                                                                                    cannabis
                                                                                                                                    delivered
                                                                                                                                    straight
                                                                                                                                    to
                                                                                                                                    your
                                                                                                                                    door.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Thanks
                                                                                                                                    for
                                                                                                                                    choosing
                                                                                                                                    Dr.
                                                                                                                                    Green.
                                                                                                                                    We're
                                                                                                                                    here
                                                                                                                                    for
                                                                                                                                    you
                                                                                                                                    every
                                                                                                                                    step
                                                                                                                                    of
                                                                                                                                    the
                                                                                                                                    way.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">To
                                                                                                                                    your
                                                                                                                                    health,
                                                                                                                                    <br>
                                                                                                                                    <span
                                                                                                                                        style="font-weight: bold">
                                                                                                                                        The
                                                                                                                                        Dr.
                                                                                                                                        Green
                                                                                                                                        Team
                                                                                                                                    </span>
                                                                                                                                </span>
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

  </html>`,

  orderShippedEmail: (firstName: string) => `<!DOCTYPE html>
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
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Hey
                                                                                                                                    <span>${firstName}</span></span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                    We've got some great news - your order has officially left the building and is on its way to you! 🌿
Our team at Dr. Green has carefully packed your items, and they're now en route for delivery.
                                                                                                                                   </span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                    You can check the live status of your shipment anytime by logging into your account and heading over to your dashboard.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">We know you're looking forward to it – and so are we! Your medical cannabis is just a short journey away from reaching your doorstep.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Thanks again for choosing Dr. Green. We're honored to be part of your wellness journey.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">To
                                                                                                                                    your
                                                                                                                                    health,
                                                                                                                                    <br>
                                                                                                                                    <span
                                                                                                                                        style="font-weight: bold">
                                                                                                                                        The
                                                                                                                                        Dr.
                                                                                                                                        Green
                                                                                                                                        Team
                                                                                                                                    </span>
                                                                                                                                </span>
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

  </html>`,

  orderDeliveredEmail: (firstName: string) => `<!DOCTYPE html>
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
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Hey
                                                                                                                                    <span>${firstName}</span></span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                   It's here! Your order from Dr. Green has just been delivered. 💚
                                                                                                                                   </span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
                                                                                                                                   We hope everything arrived safe, fresh, and exactly as expected. You can confirm your delivery and review the details in your dashboard by logging into your account.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Have questions, feedback, or just want to share your experience? We're always here to help.
Enjoy the relief, relaxation, and wellness your order brings.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Thank you for being a valued member of the Dr. Green community.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">To
                                                                                                                                    your
                                                                                                                                    health,
                                                                                                                                    <br>
                                                                                                                                    <span
                                                                                                                                        style="font-weight: bold">
                                                                                                                                        The
                                                                                                                                        Dr.
                                                                                                                                        Green
                                                                                                                                        Team
                                                                                                                                    </span>
                                                                                                                                </span>
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

  </html>`,

  kycVerification: (
    userName: string,
    verificationUrl: string,
    adminEmail: string
  ) => `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
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
  .kl-text > div,
  .kl-table-subblock div,
  .kl-split-subblock > div {
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
  </style></head>
  <body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; word-spacing: normal; background-color: #FFFFFF;">
  <div class="root-container" id="bodyTable" style="background-color: #FFFFFF; background-repeat: repeat; background-size: auto; background-position: left top;">
  <div class="root-container-spacing" style="padding-top: 50px; padding-bottom: 20px; font-size: 0;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
  <div style="margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; direction: ltr; font-size: 0px; padding: 0px; text-align: center;" align="center">
  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
  <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background: #FFFFFF; background-color: #FFFFFF; width: 100%; border-radius: 0px 0px 0px 0px;" width="100%" bgcolor="#FFFFFF">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; direction: ltr; font-size: 0px; padding: 20px 0; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center;" align="center">
  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
  <div class="content-padding first last" style="padding-left: 0; padding-right: 0; padding-top: 0; padding-bottom: 0;">
  <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
  <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
  <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
  <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class="hlb-block-settings-content" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 12px; padding-right: 179px; padding-bottom: 12px; padding-left: 179px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="top" class="kl-header-link-bar" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px 0px 0px 0px; word-break: break-word;">
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: 0;" width="100%">
  <tbody>
  <tr>
  <td align="center" class="hlb-logo" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; display: table-cell; width: 100%; padding-bottom: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
  <tbody>
  <tr>
  <!--[if true]><td style="width:600px;" bgcolor="transparent"><![endif]-->
  <!--[if !true]><!--><td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 600px;" width="600"><!--<![endif]-->
  <a href="https://drgreennft.com/" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/4736e151-fcd9-4537-927f-60d3798a3977.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; width: 100%; background-color: transparent;" width="600" height="auto">
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class="hlb-block-settings-content" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="top" class="kl-header-link-bar" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px 0px 0px 0px; word-break: break-word;">
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; color: #000000; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; table-layout: auto; width: 100%; border: 0;" width="100%">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <table align="center" cellpadding="0" cellspacing="0" class="r2-tbl" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed;" width="100%">
  <tr style="text-align:center;">
  <td align="center" class="kl-hlb-stack block vspc hlb-subblk" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" valign="middle">
  <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
  <tr>
  <td align="center" bgcolor="transparent" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;" valign="middle">
  <a href="https://drgreennft.com/about-us" style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px" target="_blank">
  ABOUT US
  </a>
  </td>
  </tr>
  </table>
  </td>
  <td align="center" class="kl-hlb-stack block vspc hlb-subblk" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" valign="middle">
  <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
  <tr>
  <td align="center" bgcolor="transparent" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;" valign="middle">
  <a href="https://marketplace.drgreennft.com/" style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px" target="_blank">
  DIGITAL KEY
  </a>
  </td>
  </tr>
  </table>
  </td>
  <td align="center" class="kl-hlb-stack block hlb-subblk" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" valign="middle">
  <table border="0" cellpadding="0" cellspacing="0" class="lnk" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: separate; line-height: 100%;">
  <tr>
  <td align="center" bgcolor="transparent" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; word-break: normal; border: none; border-radius: 5px; cursor: auto; font-style: Normal; mso-padding-alt: 10px 10px 10px 10px; background: transparent;" valign="middle">
  <a href="https://drgreennft.com/contact" style="color:#FFF; font-style:Normal; font-weight:400; text-decoration:none; display:inline-block; background:transparent; font-family:&quot;Titillium Web&quot;, Helvetica, Arial, sans-serif; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:10px 10px 10px 10px; mso-padding-alt:0; border-radius:5px" target="_blank">
  CONTACT US
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="center" class="kl-image" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; word-break: break-word;">
  <table border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
  <tbody>
  <tr>
  <td class="kl-img-base-auto-width" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border: solid 1px #262626; padding: 1px 1px 1px 1px; background-color: #262626; width: 596px;" valign="top" width="596" bgcolor="#262626">
  <table border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
  <tbody>
  <tr>
  <td valign="top" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <a href="https://drgreennft.com/" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none">
  <img src="${CONSTANT.DR_GREEN_WELCOME_IMAGE_URL}" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; font-size: 13px; width: 100%;" width="596" height="auto">
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="left" class="kl-text" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
  <div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
  <div style="text-align: center;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
  <span style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">  </span>
  <span style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Hi <span>${userName}</span></span>
  </span></div>
  <div style="text-align: center;  margin: 15px 0;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
  <span style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Welcome to the Dr. Green community and thank you for setting up your account. We now need to complete the verification process. To complete this process, please click on the link below:</span>
  </span>
  </div>
  </div>
  <div style="text-align: center;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
  <span style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">
  <a 
  style="text-decoration: none; display: inline-block; width: 147px; font-family: Kanit; font-weight: 400; font-size: 1rem; color: #0aba90; line-height: 24px; letter-spacing: 3px; text-transform: uppercase; transition: all 0.3s ease-in-out; border: solid 1px #0aba90; border-radius: 8px; padding: 16px 24px;" 
  href="${verificationUrl}">Click Here</a>  
  </span>
  </span>
  </div>
  </td>
  </tr>
  <tr>
  <td align="left" class="kl-text" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
  <div style="text-align: center; margin: 15px 0;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
  <span style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Alternatively, you can copy and paste the following URL into your web browser:</span>
  </span>
  </div>
  <div style="text-align: center;">
  <a href=${verificationUrl} style="color:#00B9B1; font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px; word-break: break-all;">
  ${verificationUrl}
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
  
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 9px; padding-bottom: 9px; padding-left: 9px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <div style="width:100%;text-align:center">
  <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;padding-right:10px;"><!--<![endif]-->
  <!--[if true]><td style="padding-right:10px;"><![endif]-->
  <div style="text-align: center;">
  <a href="https://discord.com/invite/DrGreen" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="Custom" src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/dec5697c-f302-4563-a8ff-7f19edfd89a1.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 48px;" width="48" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;"><!--<![endif]-->
  <!--[if true]><td style=""><![endif]-->
  <div style="text-align: center;">
  <a href="https://t.me/DrGreenNFTentry" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="Custom" src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/21269dd6-e21b-4aa4-a424-307d8348b765.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 48px;" width="48" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="left" class="kl-text" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
  <div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
  <div style="text-align: center;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(255, 255, 255); font-size: 18px;">
  Visit our website and join our <span style="color: rgb(0, 185, 177);">Discord</span> and <span style="color: rgb(0, 185, 177);">Telegram</span> communities for more details.
  </span>
  </div>
  <div style="text-align: center;"> </div>
  <div style="text-align: center;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(0, 185, 177); font-size: 18px;">
  Got any questions?
  </span>
  </div>
  <div style="text-align: center;">
  <span style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; color: rgb(255, 255, 255); font-size: 18px;">
  Please reach out to our admin team
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; vertical-align: top; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td align="center" class="kl-image" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; word-break: break-word;">
  <table border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace: 0; mso-table-rspace: 0; border-collapse: collapse; border-spacing: 0px;">
  <tbody>
  <tr>
  <td class="kl-img-base-auto-width" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; border: 0; padding: 0px 0px 0px 0px; width: 600px;" valign="top" width="600">
  <a href="https://drgreennft.com/" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none">
  <img src="https://d3k81ch9hvuctc.cloudfront.net/company/YcNHKm/images/5508376d-70c8-4fbc-be4e-a25d15801e7f.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; max-width: 100%; display: block; outline: none; text-decoration: none; height: auto; font-size: 13px; width: 100%;" width="600" height="auto">
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
  <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;" width="100%">
  <tbody>
  <tr>
  <td class style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #262626; vertical-align: top; padding-top: 9px; padding-right: 9px; padding-bottom: 9px; padding-left: 9px;" bgcolor="#262626" valign="top">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
  <tbody>
  <tr>
  <td style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <div style="width:100%;text-align:center">
  <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;padding-right:10px;"><!--<![endif]-->
  <!--[if true]><td style="padding-right:10px;"><![endif]-->
  <div style="text-align: center;">
  <a href="https://www.facebook.com/drgreennftportugal" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="Facebook" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/facebook_96.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;" width="32" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;padding-right:10px;"><!--<![endif]-->
  <!--[if true]><td style="padding-right:10px;"><![endif]-->
  <div style="text-align: center;">
  <a href="https://twitter.com/DrGreen_nft" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="Twitter" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/twitter_96.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;" width="32" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;padding-right:10px;"><!--<![endif]-->
  <!--[if true]><td style="padding-right:10px;"><![endif]-->
  <div style="text-align: center;">
  <a href="${CONSTANT.SOCIAL_MEDIA_URLS.INSTAGRAM_URL}" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="Instagram" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;" width="32" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;padding-right:10px;"><!--<![endif]-->
  <!--[if true]><td style="padding-right:10px;"><![endif]-->
  <div style="text-align: center;">
  <a href="https://www.linkedin.com/company/drgreennft" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="LinkedIn" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/linkedin_96.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;" width="32" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
  <!--[if !true]><!--><div class style="display:inline-block;"><!--<![endif]-->
  <!--[if true]><td style=""><![endif]-->
  <div style="text-align: center;">
  <a href="https://www.youtube.com/@DrGreen_NFT" style="color:#222427; font-style:normal; font-weight:400; text-decoration:none" target="_blank">
  <img alt="YouTube" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/youtube_96.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; width: 32px;" width="32" height="auto">
  </a>
  </div>
  <!--[if true]></td><![endif]-->
  <!--[if !true]><!--></div><!--<![endif]-->
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
  </td></tr></tbody></table></div>
  </div></body>
  </html>`,

  kycVerificationPassed: (
    firstName: string,
    adminEmail: string
  ) => `<!DOCTYPE html>
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
                                                                                                                                    <span>${firstName}</span></span>
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
                                                                                                                                    family
                                                                                                                                    -
                                                                                                                                    you're
                                                                                                                                    now
                                                                                                                                    officially
                                                                                                                                    verified
                                                                                                                                    on
                                                                                                                                    the
                                                                                                                                    Dr.
                                                                                                                                    Green
                                                                                                                                    platform!
                                                                                                                                    Your
                                                                                                                                    KYC
                                                                                                                                    and
                                                                                                                                    medical
                                                                                                                                    checks
                                                                                                                                    are
                                                                                                                                    all
                                                                                                                                    approved,
                                                                                                                                    and
                                                                                                                                    your
                                                                                                                                    account
                                                                                                                                    is
                                                                                                                                    ready
                                                                                                                                    to
                                                                                                                                    go.
                                                                                                                                    Just
                                                                                                                                    log
                                                                                                                                    in
                                                                                                                                    with
                                                                                                                                    the
                                                                                                                                    details
                                                                                                                                    you
                                                                                                                                    used
                                                                                                                                    during
                                                                                                                                    sign-up
                                                                                                                                    and
                                                                                                                                    you're
                                                                                                                                    in!</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Inside
                                                                                                                                    the
                                                                                                                                    store,
                                                                                                                                    you'll
                                                                                                                                    now
                                                                                                                                    see
                                                                                                                                    the
                                                                                                                                    full
                                                                                                                                    selection
                                                                                                                                    of
                                                                                                                                    products
                                                                                                                                    available
                                                                                                                                    to
                                                                                                                                    you
                                                                                                                                    based
                                                                                                                                    on
                                                                                                                                    your
                                                                                                                                    region.
                                                                                                                                    Go
                                                                                                                                    ahead
                                                                                                                                    –
                                                                                                                                    browse,
                                                                                                                                    build
                                                                                                                                    your
                                                                                                                                    first
                                                                                                                                    order,
                                                                                                                                    and
                                                                                                                                    enjoy
                                                                                                                                    the
                                                                                                                                    convenience
                                                                                                                                    of
                                                                                                                                    having
                                                                                                                                    medical
                                                                                                                                    cannabis
                                                                                                                                    delivered
                                                                                                                                    straight
                                                                                                                                    to
                                                                                                                                    your
                                                                                                                                    door.
                                                                                                                                    You
                                                                                                                                    deserve
                                                                                                                                    it.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">Need
                                                                                                                                    help
                                                                                                                                    or
                                                                                                                                    have
                                                                                                                                    questions?
                                                                                                                                    We're
                                                                                                                                    always
                                                                                                                                    here
                                                                                                                                    to
                                                                                                                                    support
                                                                                                                                    you.</span>
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="left"
                                                                                                                    class="kl-text"
                                                                                                                    style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; font-size: 0px; padding: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; word-break: break-word;">
                                                                                                                    <div
                                                                                                                        style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#222427;">
                                                                                                                        <div
                                                                                                                            style="text-align: center;  margin: 15px 0;">
                                                                                                                            <span
                                                                                                                                style="font-family: 'Titillium Web', Helvetica, Arial, sans-serif; font-weight: 400; font-style: normal; font-size: 18px;">
                                                                                                                                <span
                                                                                                                                    style="color: #ffffff; font-family: Titillium Web, Helvetica, Arial, sans-serif;">To
                                                                                                                                    your
                                                                                                                                    health,
                                                                                                                                    <br>
                                                                                                                                    The
                                                                                                                                    Dr.
                                                                                                                                    Green
                                                                                                                                    Team</span>
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

  </html>`,

  kycVerificationFailed: (
    firstName: string,
    adminEmail: string
  ) => `<!DOCTYPE html>
  <html>
  <head>
    <title>KYC Verification Failed</title>
  </head>
  <body>
    <p>Dear ${firstName},</p>
  
    <p>We regret to inform you that your KYC verification has failed.</p>
    <p>Our LHI team will review your information and take the necessary action. You will be notified of any updates.</p>

    <p>If you have any questions or need assistance, our support team is always available to help. Please reach out to <a style="text-decoration: #10101c;" href="mailto:${adminEmail}"><u>Dr.Green Support</u></a> for any issues.</p>
    <p>Thank you for choosing Dr.Green </p>
    <p>Best Regards,</p>
    <p>Team Dr.Green</p>
  </body>
  </html>
  `,

  kycVerificationFailedReview: (
    customerName: string,
    customerEmail: string
  ) => `<!DOCTYPE html>
  <html>
  <head>
    <title>KYC Verification Failed</title>
  </head>
  <body>
    <p>Dear Admin,</p>
  
    <p>The KYC verification for the user <strong>${customerName}</strong> (Email: ${customerEmail}) has failed.</p>
  
    <p>Please review the details and take the necessary actions.</p>
  
    <p>Thank you,</p>
  </body>
  </html>
  `,

  kycVerificationStart: (
    firstName: string,
    verificationUrl: string,
    adminEmail: string
  ) => `<!DOCTYPE html>
  <html>
  <head>
    <title>Complete Your KYC Verification</title>
  </head>
  <body>
    <p>Dear ${firstName},</p>
  
    <p>We hope this email finds you well.</p>
  
    <p>We noticed that your KYC (Know Your Customer) verification process is not yet completed. KYC verification is an essential step to ensure the security and integrity of your account.</p>
  
    <p>Please complete your KYC verification at your earliest convenience by clicking on the link below:</p>
    <p><a style="display: inline-block; width: 147px; padding: 10px 10px; text-align: center; text-decoration: none; color: #ffffff; background-color: #9E62FF; border-radius: 5px; outline: none;" href="${verificationUrl}">Complete KYC Verification</a></p>
    <p>Alternatively, you can copy and paste the following URL into your web browser:</p>
    <p>${verificationUrl}</p>
  
    <p>If you have any questions or need assistance, our support team is always available to help. Please reach out to <a style="text-decoration: #10101c;" href="mailto:${adminEmail}"><u>Dr.Green Support</u></a> for any issues.</p>
    <p>Thank you for choosing Dr.Green </p>
    <p>Best Regards,</p>
    <p>Team Dr.Green</p>
  </body>
  </html>
  `,
};
